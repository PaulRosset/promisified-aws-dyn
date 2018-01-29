# promisified-aws-dyn

Abstract class promisified for AWS dynamodb SDK

## Launch DynamodDB locally

Download the `.tar.gz` [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

TO start dynamoDB:

`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

DynamoDB will be launch on `localhost:8000`.
