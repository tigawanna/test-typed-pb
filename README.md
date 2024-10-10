# Required changes
- add batch api
- flatten the collection schema

- [detailed list of clien api changes](https://github.com/pocketbase/js-sdk/blob/develop/CHANGELOG.md)


### New APIs

- batch
```ts
const batch = pb.createBatch();

batch.collection("example1").create({ ... });
batch.collection("example2").update("RECORD_ID", { ... });
batch.collection("example3").delete("RECORD_ID");
batch.collection("example4").upsert({ ... });

const result = await batch.send();
```
- impersonate 
```ts
// new impersonate method
pb.collection("users").impersonate("RECORD_ID")
```

- OPT auth method
  
```ts
  const result = await pb.collection("users").requestOTP("test@example.com");
// ... show a modal for users to check their email and to enter the received code ...

await pb.collection("users").authWithOTP(result.otpId, "EMAIL_CODE");
```
- 
```ts
// change admin before   ->  after
pb.admins.* ->  pb.collection("_superusers").*
```
