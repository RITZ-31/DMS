import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  Box,
  Typography,
  Card,
  CardContent
} from "@mui/material";

import { useState } from "react";


function SmartCalendar({events}) {


const [date,setDate] = useState(new Date());



const selectedEvents = events.filter(
(event)=>
new Date(event.date)
.toDateString()
===
date.toDateString()
);



return (

<Box mt={3}>


<Typography
variant="h6"
fontWeight="bold"
mb={2}
>
📅 Smart Calendar
</Typography>



<Calendar

value={date}

onChange={setDate}


/>



{
selectedEvents.length > 0 &&


selectedEvents.map(event=>(

<Card
key={event._id}
sx={{
mt:2,
borderRadius:3
}}
>

<CardContent>

<Typography
fontWeight="bold"
>
{event.title}
</Typography>


<Typography>
Priority: {event.priority}
</Typography>


</CardContent>

</Card>

))

}



{
selectedEvents.length===0 &&

<Typography
mt={2}
color="text.secondary"
>
No events on this day.
</Typography>

}



</Box>

)


}


export default SmartCalendar;