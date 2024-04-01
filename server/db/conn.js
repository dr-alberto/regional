const mongoose = require("mongoose");

const dbURI = process.env.ATLAS_URI;
mongoose.connect(dbURI);

module.exports = {
  connectToServer: async function (callback) {
    try {
      await mongoose.connection.once("open", () => {
        console.log("Connected to MongoDB");
      });
    } catch (err) {
      return callback(err);
    }
  },

  getDb: function () {
    return mongoose.connection;
  },
};
