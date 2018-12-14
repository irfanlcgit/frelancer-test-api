import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  if(data.Update === 'UpdateUserAtLogin'){
    const params = {
      TableName: "Timecards",
      // 'Key' defines the partition key and sort key of the item to be updated
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'noteId': path parameter
      Key: {
        Guid: event.requestContext.identity.cognitoIdentityId
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET FirstName = :FirstName, LastName = :LastName, EmailAddress = :EmailAddress, MobileNumber = :MobileNumber, Password = :Password, LastLogin = :LastLogin",
      ExpressionAttributeValues: {
          ":FirstName": data.FirstName ? data.FirstName : null,
          ":LastName": data.LastName ? data.LastName : null,
          ":EmailAddress": data.EmailAddress ? data.EmailAddress : null,
          ":MobileNumber": data.MobileNumber ? data.MobileNumber : null,
          ":Password": data.Password ? data.Password : null,
          ":LastLogin": Date.now()
      },
      ReturnValues: "ALL_NEW"
    };
  
  }else if(data.Update === 'UserInfo'){
    const params = {
      TableName: "users",
      // 'Key' defines the partition key and sort key of the item to be updated
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'noteId': path parameter
      Key: {
        Guid: event.requestContext.identity.cognitoIdentityId
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET FirstName = :FirstName, LastName = :LastName, EmailAddress = :EmailAddress, MobileNumber = :MobileNumber, Password = :Password",
      ExpressionAttributeValues: {
        ":FirstName": data.FirstName ? data.FirstName : null,
        ":LastName": data.LastName ? data.LastName : null,
        ":EmailAddress": data.EmailAddress ? data.EmailAddress : null,
        ":MobileNumber": data.MobileNumber ? data.MobileNumber : null,
        ":Password": data.Password ? data.Password : null
      },
      ReturnValues: "ALL_NEW"
    };

  }else if(data.Update === 'UpdatePassword'){
    const params = {
      TableName: "users",
      // 'Key' defines the partition key and sort key of the item to be updated
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'noteId': path parameter
      Key: {
        Guid: event.requestContext.identity.cognitoIdentityId
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET Password = :Password",
      ExpressionAttributeValues: {
          ":Password": data.Password ? data.Password : null
      },
      ReturnValues: "ALL_NEW"
    };

  }else {
    const params = {
      TableName: "users",
      // 'Key' defines the partition key and sort key of the item to be updated
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'noteId': path parameter
      Key: {
        Guid: event.requestContext.identity.cognitoIdentityId
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET SignatureTyped = :SignatureTyped",
      ExpressionAttributeValues: {
        ":SignatureTyped": data.SignatureTyped ? data.SignatureTyped : null
      },
      ReturnValues: "ALL_NEW"
    };

  }

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
