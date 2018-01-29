const AWS = require("aws-sdk");
const AWSUtils = require("./../lib/crudProcessing");

const table1 = {
  AttributeDefinitions: [
    {
      AttributeName: "Artist",
      AttributeType: "S"
    },
    {
      AttributeName: "SongTitle",
      AttributeType: "S"
    }
  ],
  KeySchema: [
    {
      AttributeName: "Artist",
      KeyType: "HASH"
    },
    {
      AttributeName: "SongTitle",
      KeyType: "RANGE"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: "Music"
};
let dyn;

beforeAll(() => {
  dyn = new AWSUtils({
    endpoint: new AWS.Endpoint("http://localhost:8000"),
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.KEYSECRETAWS,
    region: "eu-west-2"
  });
});

describe("Testing tables", () => {
  test("Creation table Music", async done => {
    try {
      const res = await dyn.createTable(table1);
      expect(res).toBeTruthy();
      expect(res.TableDescription.TableName).toEqual("Music");
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  test("List table freshly created", async done => {
    try {
      const res = await dyn.getTable({});
      expect(res).toBeTruthy();
      expect(res.TableNames).toContain("Music");
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  test("Deleting table Music", async done => {
    try {
      const res = await dyn.deleteTable({ TableName: "Music" });
      expect(res).toBeTruthy();
      expect(res.TableDescription.TableName).toEqual("Music");
      done();
    } catch (e) {
      if (e) throw e;
    }
  });
});

describe("Add entry in Base", () => {
  beforeAll(async done => {
    try {
      await dyn.createTable(table1);
    } catch (e) {
      if (e) throw e;
    }
  });

  test("Add Entry in Base Music", done => {});

  afterAll(async done => {
    try {
      await dyn.deleteTable({ TableName: "Music" });
      done();
    } catch (e) {
      if (e) throw e;
    }
  });
});
