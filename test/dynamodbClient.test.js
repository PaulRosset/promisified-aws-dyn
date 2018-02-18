const AWS = require("aws-sdk");
const AWSUtilsClient = require("./../lib/ProcessingClient");

const params = {
  TableName: "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH" }, //Partition key
    { AttributeName: "title", KeyType: "RANGE" } //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};
let dynClient;

beforeAll(async done => {
  dynClient = new AWSUtilsClient({
    endpoint: new AWS.Endpoint("http://localhost:8000"),
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.KEYSECRETAWS,
    region: "eu-west-2",
    apiVersion: "2012-08-10"
  });
  await dynClient.createTable(params);
  done();
});

describe("Testing put method Client dynamoDb", () => {
  test("Testing add data through put method and Query Data after it", async done => {
    try {
      await dynClient.put({
        TableName: "Movies",
        Item: {
          year: 2016,
          title: "Im a title"
        }
      });
      const data = await dynClient.get({
        TableName: "Movies",
        Key: {
          year: 2016,
          title: "Im a title"
        }
      });
      expect(data).toBeTruthy();
      expect(data.Item.title).toEqual("Im a title");
      expect(data.Item.year).toEqual(2016);
      done();
    } catch (e) {
      if (e) throw e;
    }
  });
});

afterAll(async done => {
  try {
    await dynClient.deleteTable({ TableName: "Movies" });
    done();
  } catch (e) {
    if (e) throw e;
  }
});