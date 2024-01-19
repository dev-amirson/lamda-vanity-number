# Vanity Number Generator

## Description
This serverless application generates vanity phone numbers based on a given phone number. It leverages AWS Lambda and DynamoDB for backend processing. For local development and testing, LocalStack is used to emulate AWS services, and LocalLambda is used for running Lambda functions locally.

## Prerequisites
- Docker
- AWS CLI
- Node.js

## Setup and Installation

### Local Development Environment

#### LocalStack
LocalStack is used for emulating AWS services locally.

1. **Start LocalStack**:
    Run LocalStack as a Docker container.
    ```bash
    docker run -d --name localstack -p 4566:4566 -p 4571:4571 localstack/localstack
    ```
   
2. **Pull LocalStack Docker Image**:
    Ensure you have the latest LocalStack image.
    ```bash
    docker pull localstack/localstack
    ```

#### AWS CLI
AWS CLI is used to interact with AWS services, including those emulated by LocalStack.

1. **Install AWS CLI**:
    ```bash
    brew install awscli
    ```
   
2. **Configure AWS CLI for LocalStack**:
    Set dummy AWS credentials for local development.
    ```bash
    aws configure set aws_access_key_id test
    aws configure set aws_secret_access_key test
    aws configure set region us-east-1
    ```

3. **Verify AWS CLI Configuration**:
    Ensure your setup is correct by listing DynamoDB tables.
    ```bash
    aws --endpoint-url=http://localhost:4566 dynamodb list-tables
    ```

### DynamoDB Local Setup

1. **Create DynamoDB Table**:
    Set up the `VanityNumbersTable` in your local DynamoDB instance.
    ```bash
    aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name VanityNumbersTable \
    --attribute-definitions AttributeName=PhoneNumber,AttributeType=S \
    --key-schema AttributeName=PhoneNumber,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
    ```

### Running Lambda Functions Locally

For local execution and testing of Lambda functions, use `localambda` to simulate the AWS Lambda environment.

## Usage

Invoke the Lambda function through AWS CLI or SDKs by passing a phone number as input. The function will generate vanity numbers, store them in DynamoDB, and return the top 5 numbers.

## Components
- **LambdaFunction.js**: AWS Lambda function serving as the entry point.
- **phoneNumberToVanity.js**: Contains the logic to convert phone numbers to vanity numbers.
- **server.js**: An Express.js server for exposing the vanity numbers through a RESTful API.
- **package.json**: Defines project dependencies.
- **event.json**: Sample event data for testing the Lambda function locally.

## Dependencies
- `@aws-sdk/client-dynamodb`: AWS SDK for interacting with DynamoDB.
- `@aws-sdk/lib-dynamodb`: Utility library for DynamoDB Document Client.
- `@aws-sdk/client-s3`: AWS SDK for interacting with S3.
- `express`: Used for setting up the server.

## Running the Application

lambda-local -l LambdaFunction.js -h handler -e event.json --timeout 30