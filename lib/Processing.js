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

  getTable(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.listTables(params, (err, data) => {
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

  // get an Item in the table
  getItem(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.getItem(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  // Create an Item in the table
  putItem(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.putItem(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  // Delete item
  deleteItem(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.deleteItem(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }

  updateItem(params) {
    return new Promise(
      (resolve, reject) => {
        this.dyn.updateItem(params, (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        });
      }
    );
  }
}

module.exports = AWSUtils;
