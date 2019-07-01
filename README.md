# Collr

API for connected dog collars

## Running the application

Create a file in `config/secrets.json`. In it, record your
* awsAccessKeyId
* awsSecretAccessKey
* awsRegion
* tableName
* partitionKey
* sortKey

Run:

```bash
npm run start
```

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
