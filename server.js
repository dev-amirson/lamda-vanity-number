// server.js
const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;

const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    accessKeyId: 'test', // these credentials are predefined by LocalStack
    secretAccessKey: 'test'
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
