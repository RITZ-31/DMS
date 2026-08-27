const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:true
  },

  date:{
    type:Date,
    required:true
  },

  priority:{
    type:String,
    default:"Medium"
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }

},
{
 timestamps:true
}
);


module.exports = mongoose.model("Event", eventSchema);