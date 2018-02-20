# promisified-aws-dyn

Abstract class promisified for AWS dynamodb SDK

## Get the class

`npm i promisified-aws-dyn`

## Launch DynamodDB locally

Download the `.tar.gz` [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

To start dynamoDB locally:

`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

DynamoDB will be launch on `localhost:8000`.

# Usage

```
const AWSUtils = require("promisified-aws-dyn");
const dyn = new AWSUtils({
    endpoint: new AWS.Endpoint("http://localhost:8000"),
    accessKeyId: ACCESSKEYID,
    secretAccessKey: KEYSECRETAWS,
    region: REGION,
    apiVersion: "2012-08-10"
  });
```

## Methods encapsulated

### Methods above are part of DynamoDB Class

`createTable(params = {}, callback) ⇒ AWS.Request`

`listTables(params = {}, callback) ⇒ AWS.Request`

`deleteTable(params = {}, callback) ⇒ AWS.Request`

`getItem(params = {}, callback) ⇒ AWS.Request`

`putItem(params = {}, callback) ⇒ AWS.Request`

`deleteItem(params = {}, callback) ⇒ AWS.Request`

`updateItem(params = {}, callback) ⇒ AWS.Request`

`query(params = {}, callback) ⇒ AWS.Request`

### Methods above are from the DynamoDB.DocumentClient(), usefull when dealing with JSON object

`put(params = {}, callback) ⇒ AWS.Request`

`get(params = {}, callback) ⇒ AWS.Request`

`update(params = {}, callback) ⇒ AWS.Request`

`delete(params = {}, callback) ⇒ AWS.Request`

## Testing

> Make sure to launch DynamoDB locally.

`yarn test`

# License

MIT
