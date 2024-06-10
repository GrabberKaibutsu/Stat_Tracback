const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  session: {
    id: { type: Schema.Types.ObjectId },
    username: { type: String },
  },
});
module.exports = mongoose.model("User4", userSchema);