//@flow

const AWS = require("aws-sdk");

class AWSUtils {
  connection: Object;
  dyn: Object;
  constructor(connection: Object) {
    this.connection = connection;
    this.dyn = new AWS.DynamoDB(this.connection);
  }

  // createTable
  createTable(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.dyn.createTable(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  // delete a table
  deleteTable(params: Object): Promise<Object> {
    return new Promise(
      (resolve: (data: Object) => void, reject: (err: Object) => void) => {
        this.dyn.deleteTable(params, (err: Object, data: Object) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }
}

module.exports = AWSUtils;
