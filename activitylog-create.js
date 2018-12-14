import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
      TableName: "ActivityLog",
      Item: {
        Guid: event.requestContext.identity.cognitoIdentityId,
        SignatureFile: data.SignatureFile
      }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success({ status: true, "result":params.Item});
  } catch (e) {
    return failure({ status: false });
  }
}
