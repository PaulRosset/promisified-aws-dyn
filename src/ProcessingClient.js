//@flow

const AWS = require("aws-sdk");
const AWSUtils = require("./Processing");

class AWSUtilsClient extends AWSUtils {
  connection: Object;
  dyn: Object;
  AWSUtilsClient: Object;
  constructor(connection: Object) {
    super(connection);
    this.AWSUtilsClient = new AWS.DynamoDB.DocumentClient({
      service: this.dyn
    });
  }

  // createTable
  put(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.AWSUtilsClient.put(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  get(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.AWSUtilsClient.get(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  delete(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.AWSUtilsClient.delete(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  update(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.AWSUtilsClient.update(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  query(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.AWSUtilsClient.query(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  scan(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.AWSUtilsClient.scan(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }
}

module.exports = AWSUtilsClient;
