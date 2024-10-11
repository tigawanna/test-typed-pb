
/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Auth record email address.
	 */
	tokenKey?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];
// ==== start of _mfas block =====


export interface MfasResponse extends BaseCollectionResponse {
	collectionName: '_mfas';
	id: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created: string;
	updated: string;
}

export interface MfasCreate extends BaseCollectionCreate {
	id: string;
	collectionRef: string;
	recordRef: string;
	method: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface MfasUpdate extends BaseCollectionUpdate {
	id?: string;
	collectionRef?: string;
	recordRef?: string;
	method?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface MfasCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_mfas';
	response: MfasResponse;
	create: MfasCreate;
	update: MfasUpdate;
	relations: Record<string, never>;
}

// ==== end of _mfas block =====

// ==== start of _otps block =====


export interface OtpsResponse extends BaseCollectionResponse {
	collectionName: '_otps';
	id: string;
	collectionRef: string;
	recordRef: string;
	created: string;
	updated: string;
}

export interface OtpsCreate extends BaseCollectionCreate {
	id: string;
	collectionRef: string;
	recordRef: string;
	password: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface OtpsUpdate extends BaseCollectionUpdate {
	id?: string;
	collectionRef?: string;
	recordRef?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface OtpsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_otps';
	response: OtpsResponse;
	create: OtpsCreate;
	update: OtpsUpdate;
	relations: Record<string, never>;
}

// ==== end of _otps block =====

// ==== start of _externalAuths block =====


export interface ExternalAuthsResponse extends BaseCollectionResponse {
	collectionName: '_externalAuths';
	id: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created: string;
	updated: string;
}

export interface ExternalAuthsCreate extends BaseCollectionCreate {
	id: string;
	collectionRef: string;
	recordRef: string;
	provider: string;
	providerId: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ExternalAuthsUpdate extends BaseCollectionUpdate {
	id?: string;
	collectionRef?: string;
	recordRef?: string;
	provider?: string;
	providerId?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface ExternalAuthsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_externalAuths';
	response: ExternalAuthsResponse;
	create: ExternalAuthsCreate;
	update: ExternalAuthsUpdate;
	relations: Record<string, never>;
}

// ==== end of _externalAuths block =====

// ==== start of _authOrigins block =====


export interface AuthOriginsResponse extends BaseCollectionResponse {
	collectionName: '_authOrigins';
	id: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created: string;
	updated: string;
}

export interface AuthOriginsCreate extends BaseCollectionCreate {
	id: string;
	collectionRef: string;
	recordRef: string;
	fingerprint: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface AuthOriginsUpdate extends BaseCollectionUpdate {
	id?: string;
	collectionRef?: string;
	recordRef?: string;
	fingerprint?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface AuthOriginsCollection {
	type: 'base';
	collectionId: string;
	collectionName: '_authOrigins';
	response: AuthOriginsResponse;
	create: AuthOriginsCreate;
	update: AuthOriginsUpdate;
	relations: Record<string, never>;
}

// ==== end of _authOrigins block =====

// ==== start of _superusers block =====


export interface SuperusersResponse extends AuthCollectionResponse {
	collectionName: '_superusers';
	id: string;
	tokenKey: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	created: string;
	updated: string;
}

export interface SuperusersCreate extends AuthCollectionCreate {
	id: string;
	password: string;
	tokenKey: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface SuperusersUpdate extends AuthCollectionUpdate {
	id?: string;
	tokenKey?: string;
	email?: string;
	emailVisibility?: boolean;
	verified?: boolean;
	created?: string | Date;
	updated?: string | Date;
}

export interface SuperusersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: '_superusers';
	response: SuperusersResponse;
	create: SuperusersCreate;
	update: SuperusersUpdate;
	relations: Record<string, never>;
}

// ==== end of _superusers block =====

// ==== start of users block =====


export interface UsersResponse extends AuthCollectionResponse {
	collectionName: 'users';
	id: string;
	tokenKey: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	name: string;
	avatar: string;
	created: string;
	updated: string;
}

export interface UsersCreate extends AuthCollectionCreate {
	id: string;
	password: string;
	tokenKey: string;
	email: string;
	emailVisibility?: boolean;
	verified?: boolean;
	name?: string;
	avatar?: File | null;
	created?: string | Date;
	updated?: string | Date;
}

export interface UsersUpdate extends AuthCollectionUpdate {
	id?: string;
	tokenKey?: string;
	email?: string;
	emailVisibility?: boolean;
	verified?: boolean;
	name?: string;
	avatar?: File | null;
	created?: string | Date;
	updated?: string | Date;
}

export interface UsersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'users';
	response: UsersResponse;
	create: UsersCreate;
	update: UsersUpdate;
	relations: {
		posts_via_user: PostsCollection[];
		comments_via_user: CommentsCollection[];
	};
}

// ==== end of users block =====

// ==== start of posts block =====


export interface PostsResponse extends BaseCollectionResponse {
	collectionName: 'posts';
	id: string;
	body: string;
	image: string;
	canonical: string;
	published_at: string;
	genre: '' | 'cool' | 'chill' | 'meh';
	tags: any;
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
	tags?: any;
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
	tags?: any;
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

// ==== end of posts block =====

// ==== start of comments block =====


export interface CommentsResponse extends BaseCollectionResponse {
	collectionName: 'comments';
	id: string;
	body: string;
	post: string;
	user: string;
	parent: string;
	created: string;
	updated: string;
}

export interface CommentsCreate extends BaseCollectionCreate {
	id: string;
	body?: string;
	post: string;
	user: string;
	parent?: string;
	created?: string | Date;
	updated?: string | Date;
}

export interface CommentsUpdate extends BaseCollectionUpdate {
	id?: string;
	body?: string;
	post?: string;
	user?: string;
	parent?: string;
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

// ==== end of comments block =====


// ===== Schema =====

export type Schema = {
	_mfas: MfasCollection;
	_otps: OtpsCollection;
	_externalAuths: ExternalAuthsCollection;
	_authOrigins: AuthOriginsCollection;
	_superusers: SuperusersCollection;
	users: UsersCollection;
	posts: PostsCollection;
	comments: CommentsCollection;
};