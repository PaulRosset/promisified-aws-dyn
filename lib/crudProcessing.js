//

const AWS = require("aws-sdk");

class AWSUtils {
  constructor(connection) {
    this.connection = connection;
    this.dyn = new AWS.DynamoDB(this.connection);
  }

  // createTable
  createTable(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.createTable(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  // delete a table
  deleteTable(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.deleteTable(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }
}

module.exports = AWSUtils;
