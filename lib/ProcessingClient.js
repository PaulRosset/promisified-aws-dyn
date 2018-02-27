//

const AWS = require("aws-sdk");
const AWSUtils = require("./Processing");

class AWSUtilsClient extends AWSUtils {
  constructor(connection) {
    super(connection);
    this.AWSUtilsClient = new AWS.DynamoDB.DocumentClient({
      service: this.dyn
    });
  }

  // createTable
  put(params) {
    return new Promise(
      (resolve, reject) => {
        this.AWSUtilsClient.put(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  get(params) {
    return new Promise(
      (resolve, reject) => {
        this.AWSUtilsClient.get(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  delete(params) {
    return new Promise(
      (resolve, reject) => {
        this.AWSUtilsClient.delete(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  update(params) {
    return new Promise(
      (resolve, reject) => {
        this.AWSUtilsClient.update(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  query(params) {
    return new Promise(
      (resolve, reject) => {
        this.AWSUtilsClient.query(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  scan(params) {
    return new Promise(
      (resolve, reject) => {
        this.AWSUtilsClient.scan(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }
}

module.exports = AWSUtilsClient;
