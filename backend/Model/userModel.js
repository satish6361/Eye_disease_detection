const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter valid name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter  email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter password"],
    minLength: [1, "Please Enter valid password"],
  },
  patients:[
    {
        name:{
            type:String,
            required:true,
        },
        patemail:{
          type: String,
          required: [true, "Please Enter  email"],
        },
        prediction:{
            type:String,
            default:"Not Yet Predicted"
        }
    }
],
});

module.exports = mongoose.model("User", userSchema);
