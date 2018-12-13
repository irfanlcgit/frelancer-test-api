import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "EmailAddres = :EmailAddress",
    ExpressionAttributeValues: {
      ":EmailAddress": data.EmailAddres
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    if (result.Items.length > 0) {
      // Return the retrieved items
      var items,i;
      var item = 'Item not found.';
      var status = false;
      items=result.Items
      for(i = 0; i < items.length; i++){
        if('Password' in items[i]){
            item = items[i];
            status = true;
        }
      }
        return success({ status: status, "item": item });
      } else {
        return success({ status: false, error: "Item not found." });
      }
  } catch (e) {
    return failure({ status: false });
  }
}