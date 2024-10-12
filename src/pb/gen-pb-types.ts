import { writeFile } from "node:fs/promises";
import { checkAndCreateNestsedDir, readOrCreateFile, runCommand } from "./fs";
import { filterByCollection } from "../lib/pb/filter-collections";
import { getCustomTypes, modifyAndInjectCustomSTypes } from "../lib/pb/custom-type-generation";
import { resolve } from "node:path";

export const DEFAULT_PB_FILES_DIR = "./src/lib/pb";

export async function getPBType() {
  const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL ?? "admin1@email.com";
  const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD ?? "admin1@email.com";

  const commands = [
    "npx",
    "typed-pocketbase",
    "--email",
    PB_ADMIN_EMAIL,
    "--password",
    PB_ADMIN_PASSWORD,
  ];
  console.log(" ================ running command =============== ", commands);
  const output = await runCommand(commands.join(" "));
  return output;
}

async function main() {
  await checkAndCreateNestsedDir(DEFAULT_PB_FILES_DIR);
  const PB_TYPES_PATH = resolve(`${DEFAULT_PB_FILES_DIR}/database.ts`);
  const CUSTOM_PB_TYPES_PATH = resolve(`${DEFAULT_PB_FILES_DIR}/custom-database.ts`);
  const raw_typed_pb_types = await getPBType();
  await writeFile(`${DEFAULT_PB_FILES_DIR}/raw-typed-pb-types.ts`, raw_typed_pb_types, "utf-8");
  const { text_output } = await filterByCollection(raw_typed_pb_types);

  const custom_db_types_string = await readOrCreateFile(CUSTOM_PB_TYPES_PATH);
  const { extracted_custom_db_types, extracted_custom_db_types_array } = await getCustomTypes(
    text_output,
    custom_db_types_string
  );

  await writeFile(CUSTOM_PB_TYPES_PATH, extracted_custom_db_types, "utf-8");
  const final_db_types = await modifyAndInjectCustomSTypes({
    content: text_output,
    extracted_custom_db_types,
    extracted_custom_db_types_array,
  });

  await writeFile(PB_TYPES_PATH, final_db_types, "utf-8");
}
main()
  .then((res) => {
    console.log("=== main block success === ");
  })
  .catch((err) => {
    console.log("=== main block error === ", err);
  });

// filterByCollection()
//   .then((res) => {
//     console.log("===== succesfull types generation ==== ");
//   })
//   .catch((err) => {
//     console.log("===== error types generation ==== ", err);
//   });
