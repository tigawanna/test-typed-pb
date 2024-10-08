import PocketBase from "pocketbase";
import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "./db-types";
import { buildCollectionDefinitions } from "./typed-pb/extra";
import { Collection } from "./typed-pb/extra-types";

export const PB_URL = "http://127.0.0.1:8090";
export const RC_PB_URL = "http://127.0.0.1:8091";

export const pb = new PocketBase(PB_URL);
export const typedPb = new TypedPocketBase<Schema>(PB_URL);

export async function healthCheck() {
  try {
    const healthCheck = await pb.health.check();
    console.log("✅ Health check successful", healthCheck);
  } catch (error: any) {
    console.error("❌ Health check failed", error.message);
  }
}

export async function getPostsWithComments() {
  try {
    typedPb.autoCancellation(false);
    const typedPostsWithComments = await typedPb.from("posts").getFullList({
      select: {
        expand: {
          "comments(post)": true,
          user: {
            avatar: true,
            id: true,
          },
        },
      },
    });

    const typedUsersWithPosts = await typedPb.from("users").getFullList({
      select: {
        expand: {},
      },
    });
    console.log("✅ Get posts with comments successful", typedPostsWithComments);

    console.log("✅ Get users with posts successful", typedUsersWithPosts);
    return typedPostsWithComments;
  } catch (error: any) {
    console.log("❌ Get posts with comments failed", error.message);
  }
}

export async function getCollectiontypes(url: string) {
  try {
    const pb = new PocketBase(url);
    await pb.admins.authWithPassword("admin1@email.com", "admin1@email.com");
    const collections = await pb.collections.getFullList<Collection>();
    console.log(" ✅ Get collections", collections);
    const definitions = buildCollectionDefinitions(collections);

    console.log(definitions);

  } catch (error) {
    console.log("❌ Get collections failed", error);
  }
}
export async function getRCCollectionTypes() {
  try {
    const pb = new PocketBase(RC_PB_URL);
    // pb.collection("_superusers").impersonate()
    pb.collection("users").
    // await pb.admins.authWithPassword("admin1@email.com", "admin1@email.com");
    await pb.collection("_superusers").authWithPassword("admin1@email.com", "admin1@email.com");
    const collections = await pb.collections.getFullList<Collection>();
        console.log(" ✅ Get collections", collections);
    const definitions = buildCollectionDefinitions(collections);
    console.log(definitions);

    // console.log(" ✅ Get collections", collections);
  } catch (error) {
    console.log("❌ Get collections failed", error);
  }
}
