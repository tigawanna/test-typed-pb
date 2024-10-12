import { addPointsForCustomTypes } from "../lib/pb/custom-type-generation";
import { filterByCollection } from "../lib/pb/filter-collections";


const dummy_types_with_no_json_fields = `
// ==== start of uwus block =====


export interface UwusResponse extends BaseCollectionResponse {
	collectionName: 'uwus';
	id: string;
	name: string;
	baggage?: UwusBaggage
	created: string;
	updated: string;
}

export interface UwusCreate extends BaseCollectionCreate {
	id: string;
	name?: string;
	baggage?: UwusBaggage
	created?: string | Date;
	updated?: string | Date;
}

export interface UwusUpdate extends BaseCollectionUpdate {
	id?: string;
	name?: string;
	baggage?: UwusBaggage
	created?: string | Date;
	updated?: string | Date;
}

export interface UwusCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'uwus';
	response: UwusResponse;
	create: UwusCreate;
	update: UwusUpdate;
	relations: {
		comments_via_mango: CommentsCollection[];
	};
}

// ==== end of uwus block =====
`;

const dummy_types_with_json_fields = `
// ===== posts =====

export interface PostsResponse extends BaseCollectionResponse {
	collectionName: 'posts';
	id: string;
	body: string;
	image: string;
	canonical: string;
	published_at: string;
	genre: '' | 'cool' | 'chill' | 'meh';
	tags: Record<string, any> | Array<any> | null;
	draft: boolean;
	user: string;
	created: string;
	updated: string;
}

export interface PostsCreate extends BaseCollectionCreate {
	id: string;
	body?: string;
	image?: File | null;
	canonical?: string | URL;
	published_at?: string | Date;
	genre?: '' | 'cool' | 'chill' | 'meh';
	tags?: Record<string, any> | Array<any> | null;
	draft?: boolean;
	user?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PostsUpdate extends BaseCollectionUpdate {
	id?: string;
	body?: string;
	image?: File | null;
	canonical?: string | URL;
	published_at?: string | Date;
	genre?: '' | 'cool' | 'chill' | 'meh';
	tags?: Record<string, any> | Array<any> | null;
	draft?: boolean;
	user?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface PostsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'posts';
	response: PostsResponse;
	create: PostsCreate;
	update: PostsUpdate;
	relations: {
		user: UsersCollection;
		comments_via_post: CommentsCollection[];
	};
}

// ===== comments =====

export interface CommentsResponse extends BaseCollectionResponse {
	collectionName: 'comments';
	id: string;
	body: string;
	post: string;
	user: string;
	parent: string;
	mango: string;
	created: string;
	updated: string;
}

export interface CommentsCreate extends BaseCollectionCreate {
	id: string;
	body?: string;
	post: string;
	user: string;
	parent?: string;
	mango?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface CommentsUpdate extends BaseCollectionUpdate {
	id?: string;
	body?: string;
	post?: string;
	user?: string;
	parent?: string;
	mango?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface CommentsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'comments';
	response: CommentsResponse;
	create: CommentsCreate;
	update: CommentsUpdate;
	relations: {
		post: PostsCollection;
		user: UsersCollection;
		parent: CommentsCollection;
		comments_via_parent: CommentsCollection[];
	};
}

// ===== uwus =====

export interface UwusResponse extends BaseCollectionResponse {
	collectionName: 'uwus';
	id: string;
	name: string;
	baggage: Record<string, any> | Array<any> | null;
	created: string;
	updated: string;
}

export interface UwusCreate extends BaseCollectionCreate {
	id: string;
	name?: string;
	baggage?: Record<string, any> | Array<any> | null;
	created?: string | Date;
	updated?: string | Date;
}

export interface UwusUpdate extends BaseCollectionUpdate {
	id?: string;
	name?: string;
	baggage?: Record<string, any> | Array<any> | null;
	created?: string | Date;
	updated?: string | Date;
}

export interface UwusCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'uwus';
	response: UwusResponse;
	create: UwusCreate;
	update: UwusUpdate;
}

// ===== Schema =====

export type Schema = {
	posts: PostsCollection;
	comments: CommentsCollection;
	uwus: UwusCollection;
};
`;


// const { extracted_custom_db_types, extracted_custom_db_types_array } = addPointsForCustomTypes(
//   dummy_types_with_json_fields
// );
// console.log({ extracted_custom_db_types, extracted_custom_db_types_array });
filterByCollection(dummy_types_with_json_fields,"comment")
.then((filtered) => {
	const schema_section = filtered.text_output.split("export type Schema")[1];
	console.log(schema_section)
	console.log(filtered.all_block_indexes)
})
.catch((err) => console.log(err));





