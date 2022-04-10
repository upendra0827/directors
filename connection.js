const prodConnection = require("./prodConnection");
const devConnection = require("./devConnection");

if (process.env.NODE_ENV === "production") {
  // for production
  module.exports = prodConnection;
} else {
  //for devlopment mode;
  module.exports = devConnection;
}
