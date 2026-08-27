const express=require("express");

const router=express.Router();


const {
createEvent,
getEvents,
deleteEvent
}=require("../controllers/eventController");


const {protect}=require("../middleware/authMiddleware");



router.post(
"/",
protect,
createEvent
);


router.get(
"/",
protect,
getEvents
);


// Delete Event
router.delete(
  "/:id",
  protect,
  deleteEvent
);

module.exports=router;