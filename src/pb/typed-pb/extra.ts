import { Collection, Field } from "./extra-types";

export interface GenerateOptions {
  url: string;
  email: string;
  password: string;
}

interface Columns {
  create: string[];
  update: string[];
  response: string[];
}

interface Relation {
  name: string;
  target: CollectionDefinition;
  unique: boolean;
}

interface CollectionDefinition {
  id: string;
  name: string;
  type: Collection["type"];
  typeName: string;
  columns: Columns;
  relations: Relation[];
}

export function createCollectionTypes({
  name,
  relations,
  columns,
  type,
  typeName,
}: CollectionDefinition) {
  const prefix = pascalCase(type);
  const base = `${prefix}Collection`;

  let out = `// ===== ${name} =====`;

  const { response, create, update } = columns;

  const responseColumns = [`collectionName: '${name}';`, ...response];

  out += `\n\nexport interface ${typeName}Response extends ${base}Response {\n\t${responseColumns.join(
    `\n\t`
  )}\n}`;

  if (type !== "view") {
    const createBody = create.length ? `{\n\t${create.join(`\n\t`)}\n}` : "{}";

    out += `\n\nexport interface ${typeName}Create extends ${base}Create ${createBody}`;

    const updateBody = update.length ? `{\n\t${update.join(`\n\t`)}\n}` : "{}";

    out += `\n\nexport interface ${typeName}Update extends ${base}Update ${updateBody}`;
  }

  const createRelations = () => {
    return relations
      .map(
        (r) =>
          `${/^\w+$/.test(r.name) ? r.name : `'${r.name}'`}: ${r.target.typeName}Collection${
            r.unique ? "" : "[]"
          };`
      )
      .join("\n\t\t");
  };

  const collectionBody = [
    `type: '${type}';`,
    `collectionId: string;`,
    `collectionName: '${name}';`,
    `response: ${typeName}Response;`,
    type !== "view" && `create: ${typeName}Create;`,
    type !== "view" && `update: ${typeName}Update;`,
    `relations: ${
      relations.length === 0 ? "Record<string, never>;" : `{\n\t\t${createRelations()}\n\t};`
    }`,
  ].filter(Boolean);

  out += `\n\nexport interface ${typeName}Collection {
	${collectionBody.join("\n\t")}
}`;

  return out;
}

export function buildCollectionDefinitions(collections: Collection[]) {
  const deferred: Array<() => void> = [];
  const definitions = new Map<string, CollectionDefinition>();

  for (const collection of collections) {
    const columns: Columns = {
      create: [],
      update: [],
      response: [],
    };
    const relations: Relation[] = [];

    for (const field of collection.fields) {
      getFieldType(field, columns);

      if (field.type === "relation") {
        deferred.push(() => {
          const from = definitions.get(collection.id);
          const target = definitions.get(field.collectionId);

          if (!from)
            throw new Error(
              `Collection ${collection.id} not found for relation ${collection.name}.${field.name}`
            );
          if (!target)
            throw new Error(
              `Collection ${field.collectionId} not found for relation ${collection.name}.${field.name}`
            );

          relations.push({
            name: field.name,
            target,
            unique: field.maxSelect === 1,
          });
        

          /**
           * indirect expand
           * @see https://pocketbase.io/docs/expanding-relations/#indirect-expand
           */

          const indicies = collection.indexes.map(parseIndex);

          const isUnique = indicies.some(
            (index) =>
              index && index.unique && index.fields.length === 1 && index.fields[0] === field.name
          );

          target.relations.push({
            name: `${collection.name}_via_${field.name}`,
            target: from,
            unique: isUnique,
          });
        });
      }
    }

    definitions.set(collection.id, {
      id: collection.id,
      name: collection.name,
      type: collection.type,
      columns,
      relations,
      typeName: pascalCase(collection.name),
    });
  }

  deferred.forEach((c) => c());

  return Array.from(definitions.values());
}

export function getFieldType(field: Field, { response, create, update }: Columns) {

  const addResponse = (type: string, name = field.name) => response.push(`${name}: ${type};`);
  const addCreate = (type: string, name = field.name) =>
    create.push(`${name}${field.required ? "" : "?"}: ${type};`);
  const addUpdate = (type: string, name = field.name) => update.push(`${name}?: ${type};`);
  const addAll = (type: string) => {
    addResponse(type);
    addCreate(type);
    addUpdate(type);
  };

  switch (field.type) {
    case "text":
    case "editor": // rich text
    case "email": {
      addAll("string");
      break;
    }
    case "password": {
      addCreate("string | URL");
      break;
    }
    case "url": {
      addCreate("string | URL");
      addUpdate("string | URL");
      addResponse("string");
      break;
    }
    case "date": {
      addCreate("string | Date");
      addUpdate("string | Date");
      addResponse("string");
      break;
    }
    case "autodate": {
      addCreate("string | Date");
      addUpdate("string | Date");
      addResponse("string");
      break;
    }
    case "number": {
      const type = "number";
      addAll(type);
      addUpdate(type, `'${field.name}+'`);
      addUpdate(type, `'${field.name}-'`);
      break;
    }
    case "bool": {
      addAll("boolean");
      break;
    }
    case "select": {
      console.log("select field", field);  
      const single = field.maxSelect === 1;
      const values =
        !field.required && single ? ["", ...field.values] : field.values;
      const singleType = values.map((v) => `'${v}'`).join(" | ");
      const type = single ? `${singleType}` : `MaybeArray<${singleType}>`;

      addResponse(single ? singleType : `Array<${singleType}>`);
      addCreate(type);
      addUpdate(type);
      if (!single) {
        addUpdate(type, `'${field.name}+'`);
        addUpdate(type, `'${field.name}-'`);
      }

      break;
    }
    case "relation": {
      const singleType = "string";
      console.log("relation field", field);
      const single = field.maxSelect === 1;
      const type = single ? singleType : `MaybeArray<${singleType}>`;

      addResponse(single ? singleType : `Array<${singleType}>`);
      addCreate(type);
      addUpdate(type);
      if (!single) {
        addUpdate(type, `'${field.name}+'`);
        addUpdate(type, `'${field.name}-'`);
      }
      break;
    }
    case "file": {
        console.log("file field", field);
      const single = field.maxSelect === 1;
        addResponse(single ? "string" : `Array<string>`);
      addCreate(single ? `File | null` : `MaybeArray<File>`);
      addUpdate(single ? `File | null` : `MaybeArray<File>`);
      if (!single) {
        addUpdate("string", `'${field.name}-'`);
      }
      break;
    }
    case "json": {
      addAll("any");
      break;
    }
    default:
      console.warn(`Unknown type ${(field as { type: string }).type}.`);
      console.warn(
        `Feel free to open an issue about this warning https://github.com/david-plugge/typed-pocketbase/issues.`
      );
      addAll("unknown");
  }
}

export function parseIndex(index: string) {
  const match = index.match(
    /^CREATE(\s+UNIQUE)?\s+INDEX\s+`(\w+)`\s+ON\s+`(\w+)`\s+\(([\s\S]*)\)$/
  );
  if (!match) return null;
  const [_, unique, name, collection, definition] = match;

  const fields = Array.from(definition.matchAll(/`(\S*)`/g)).map((m) => m[1]);

  return {
    unique: !!unique,
    name,
    collection,
    fields,
  };
}

export function pascalCase(str: string) {
  return str
    .replace(/[-_]([a-z])/g, (m) => m[1].toUpperCase())
    .replace(/^\w/, (s) => s.toUpperCase());
}
