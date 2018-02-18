const AWS = require("aws-sdk");
const AWSUtils = require("./../lib/Processing");

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

beforeAll(async done => {
  dyn = new AWSUtils({
    endpoint: new AWS.Endpoint("http://localhost:8000"),
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.KEYSECRETAWS,
    region: "eu-west-2",
    apiVersion: "2012-08-10"
  });
  done();
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

const data = {
  Item: {
    Artist: {
      S: "John Doe"
    },
    SongTitle: {
      S: "Hello World"
    }
  },
  ReturnConsumedCapacity: "TOTAL",
  TableName: "Music"
};

const wantedEntry = {
  Key: {
    Artist: {
      S: "John Doe"
    },
    SongTitle: {
      S: "Hello World"
    }
  },
  TableName: "Music"
};

var wantedUpdate = {
  ExpressionAttributeNames: {
    "#A": "Year"
  },
  ExpressionAttributeValues: {
    ":t": {
      S: "2089"
    }
  },
  Key: {
    Artist: {
      S: "John Doe"
    },
    SongTitle: {
      S: "Hello World"
    }
  },
  ReturnValues: "ALL_NEW",
  TableName: "Music",
  UpdateExpression: "SET #A = :t"
};

const paramsToQuery = {
  ExpressionAttributeValues: {
    ":v1": {
      S: "John Doe"
    }
  },
  KeyConditionExpression: "Artist = :v1",
  ProjectionExpression: "SongTitle",
  TableName: "Music"
};

describe("Add entry in Base", () => {
  beforeAll(async done => {
    try {
      await dyn.createTable(table1);
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  test("Add Entry in Base Music", async done => {
    try {
      const res = await dyn.putItem(data);
      expect(res).toBeTruthy();
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  test("Select item previously added", async done => {
    try {
      const res = await dyn.getItem(wantedEntry);
      expect(res).toBeTruthy();
      expect(res).toMatchSnapshot();
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  test("Delete item previously added", async done => {
    try {
      const res = await dyn.deleteItem(wantedEntry);
      const deletedEntry = await dyn.getItem(wantedEntry);
      expect(deletedEntry).toEqual({});
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  test("Update item previously added", async done => {
    try {
      const res = await dyn.putItem(data);
      const startEntry = await dyn.getItem(wantedEntry);
      expect(startEntry.Item.Artist.S).toEqual("John Doe");
      expect(startEntry.Item.SongTitle.S).toEqual("Hello World");
      await dyn.updateItem(wantedUpdate);
      const finalEntry = await dyn.getItem(wantedEntry);
      expect(finalEntry).toMatchSnapshot();
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  // Query the songTitle properties from the artist John Doe
  test("Testing result returned form the methode query()", async done => {
    try {
      const resBefore = await dyn.query(paramsToQuery);
      expect(resBefore).toBeTruthy();
      expect(resBefore).toMatchSnapshot();
      done();
    } catch (e) {
      if (e) throw e;
    }
  });

  afterAll(async done => {
    try {
      await dyn.deleteTable({ TableName: "Music" });
      done();
    } catch (e) {
      if (e) throw e;
    }
  });
});
