// server.js
const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;


const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: `${process.env.REGION}`,
    endpoint:  `${process.env.DYNAMODB_ENDPOINT}`,
    accessKeyId:  `${process.env.ACCESS_KEY_ID}`, // these credentials are predefined by LocalStack
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
  });

app.get('/last-five-vanity', async (req, res) => {
    const params = {
        TableName: 'VanityNumbersTable',
        Limit: 5
    };

    try {
        const data = await ddbClient.scan(params).promise();
        res.json(data.Items);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error retrieving data");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
