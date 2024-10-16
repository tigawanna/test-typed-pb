import PocketBase from "pocketbase";
import { TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { buildCollectionDefinitions } from "./typed-pb/extra";
import { Collection } from "./typed-pb/extra-types";
import { Schema } from "../lib/pb/types/pb-types";

export const PB_URL = "http://127.0.0.1:8090";
// export const RC_PB_URL = "http://127.0.0.1:8091";

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
      const batch = pb.createBatch();
      batch.collection("example1").create({

      },{
   
      });

    await pb.admins.authWithPassword("admin1@email.com", "admin1@email.com");
        await pb.collection("_superusers").requestOTP("admin1@email.com");

        await pb.collection("_superusers").authRefresh()
        await pb.collection("users").authWithOTP("otp code", "EMAIL_CODE");

          
    const collections = await pb.collections.getFullList<Collection>();
    // console.log(" ✅ Get collections", collections);
    const definitions = buildCollectionDefinitions(collections);

    console.log({definitions});

  } catch (error) {
    console.log("❌ Get collections failed", error);
  }
}
export async function getRCCollectionTypes() {
  try {
  const pb = new TypedPocketBase<Schema>(PB_URL);
    // const impersinateClient = await pb.impersonate("_superusers","user_id_being_impersonated",20);
    // impersinateClient.from("posts").create({...});
    // impersinateClient.from("posts").update({...});
      // const batch = pb.fromBatch()
      // batch.from("users").create({...});
      // batch.from("users").upsert({...});
      // await batch.send();


    // await pb.from("_superusers").authWithPassword("admin1@email.com", "admin1@email.com");
    const collections = await pb.collections.getFullList<Collection>();
    // console.log(" ✅ Get collections", collections);
        const definitions = buildCollectionDefinitions(collections);

        console.log({ definitions });
  // console.log(" ✅ Get collections", collections);
  } catch (error) {
    console.log("❌ Get collections failed", error);
  }
}
