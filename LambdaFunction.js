// LambdaFunction.js
const AWS = require('aws-sdk');
const phoneNumberToVanity = require('./phoneNumberToVanity');

const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    accessKeyId: 'test', // these credentials are predefined by LocalStack
    secretAccessKey: 'test'
  });

exports.handler = async (event) => {
    const phoneNumber = event.Details.ContactData.CustomerEndpoint.Address;
    console.log("Phone Number:", phoneNumber);
    const vanityNumbers = phoneNumberToVanity(phoneNumber);
    console.log("vanityNumbers", vanityNumbers);
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
