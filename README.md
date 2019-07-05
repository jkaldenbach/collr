# Collr

API for connected dog collars

## Running the application

Create a file in `config/secrets.json`. In it, record your
* awsAccessKeyId
* awsSecretAccessKey
* awsRegion

Run:

```bash
npm run start
```

To run the server in development mode, which causes restarts on file updates, use

```bash
npm run dev
```

## Testing

Prior to testing, update the AWS credentials to point to the test or local DynamoDB instance. Then run:

```bash
npm run test
```

Service integration tests are located under `test/services`. Controllers are covered by end-to-end integration tests located under `test/routes`. Any model-specific unit tests should be stored in `test/models`.

## Documentation

JSDoc is used for documentation and to provide hints to IDEs. An HTML documenation page can be generated using the jsdoc package.



## Instructions

imagine you’ve been assigned to work with a new dog collar. this collar will communicate directly with a cloud infrastructure that you will be developing. the collar will report the dogs physical activity, barking and location in individual json payloads for thousands of customers.
 
what you need to do:
* document and implement the endpoints where the collar’s payloads will be received and where it can be queried. the only requirement of this endpoint is that it must utilize aws dynamodb. 
* architect this as if you were going to flesh out the rest of the service later.
 
what we are going to evaluate: 
* architecture
* code quality and best practices
* documentation
* other factors
