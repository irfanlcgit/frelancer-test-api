// import * as dynamoDbLib from "./libs/dynamodb-lib";
// import { success, failure } from "./libs/response-lib";
var AWS = require('aws-sdk');



// export async function main(event, context) {
//   const params = {
//     TableName: "osaftest",
//     // 'Key' defines the partition key and sort key of the item to be removed
//     // - 'userId': Identity Pool identity id of the authenticated user
//     // - 'noteId': path parameter
//     Key: {
//       userId: event.requestContext.identity.cognitoIdentityId,
//       noteId: event.pathParameters.id
//     }
//   };

//   try {
//     const result = await dynamoDbLib.call("delete", params);
//     return success({ status: true });
//   } catch (e) {
//     return failure({ status: false });
//   }

// Set region
AWS.config.update({region: 'us-east-1'});

// Create publish parameters
var params = {
  Message: "Thanks", /* required */
  PhoneNumber: '+923349726019',
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
console.log("Check 123",publishTextPromise);
// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
//   npx aws-api-gateway-cli-test --username ="admin@example.com" --password="Passw0rd!" --user-pool-id="us-east-1_LVNG4dMJ9" --app-client-id= "7o1mp15m0td13mlk7hlc5hj15j" --cognito-region="us-east-1" --identity-pool-id="us-east-1:db567adc-de9d-4e01-9c60-f3818427ab56" --invoke-url="https://rr4bkdtmii.execute-api.us-east-1.amazonaws.com/notes" --api-gateway-region="us-east-1" --path-template /notes --method POST --body "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"
    console.log("Check");


// }

var phonelistPromise = new AWS.SNS({apiVersion: '2010-03-31'}).listPhoneNumbersOptedOut({}).promise();

// Handle promise's fulfilled/rejected states
  phonelistPromise.then(
    function(data) {
      console.log(data);
    }).catch(
    function(err) {
      console.error(err, err.stack);
    }
  );