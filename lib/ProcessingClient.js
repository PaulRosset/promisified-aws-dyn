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
}

module.exports = AWSUtilsClient;
