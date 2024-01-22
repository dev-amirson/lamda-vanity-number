// LambdaFunction.js
const AWS = require('aws-sdk');
const phoneNumberToVanity = require('./phoneNumberToVanity');
require('dotenv').config();


const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: `${process.env.REGION}`,
    endpoint:  `${process.env.DYNAMODB_ENDPOINT}`,
    accessKeyId:  `${process.env.ACCESS_KEY_ID}`, // these credentials are predefined by LocalStack
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
  });


exports.handler = async (event) => {
    const phoneNumber = event.Details.ContactData.CustomerEndpoint.Address;
    const vanityNumbers = phoneNumberToVanity(phoneNumber);
    const bestVanityNumbers = vanityNumbers.slice(0, 5); // Assume these are the best

    const params = {
        TableName: 'VanityNumbersTable',
        Item: {
            'PhoneNumber': phoneNumber,
            'VanityNumbers': bestVanityNumbers
        }
    };

    try {
        await ddbClient.put(params).promise();
        console.log("Success: Entry added to the table.");
        return { 'VanityNumbers': bestVanityNumbers };
    } catch (error) {
        console.error("Error:", error);
        throw new Error('Error saving to DynamoDB');
    }
};
