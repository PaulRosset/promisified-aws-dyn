# promisified-aws-dyn

Abstract class promisified for AWS dynamodb SDK

## Get the class

`yarn add`

## Launch DynamodDB locally

Download the `.tar.gz` [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

To start dynamoDB:

`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

DynamoDB will be launch on `localhost:8000`.

## Methods encapsulated

`createTable(params = {}, callback) ⇒ AWS.Request`
`listTables(params = {}, callback) ⇒ AWS.Request`
`deleteTable(params = {}, callback) ⇒ AWS.Request`
`getItem(params = {}, callback) ⇒ AWS.Request`
`putItem(params = {}, callback) ⇒ AWS.Request`
`deleteItem(params = {}, callback) ⇒ AWS.Request`
`updateItem(params = {}, callback) ⇒ AWS.Request`

## Testing

> Make sure to launch DynamoDB locally.

`yarn test`

# License

MIT
