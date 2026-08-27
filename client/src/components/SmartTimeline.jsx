import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import api from "../services/api";
import { useState } from "react";
import SmartCalendar from "./SmartCalendar";
import { toast } from "react-toastify";




function SmartTimeline({ events, fetchEvents }) {

 const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
 const createEvent = async () => {

  try {

    const token = localStorage.getItem("token");

    await api.post(
      "/timeline",
      {
        title,
        date,
        priority
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


   toast.success("Event Added");


    setTitle("");
    setDate("");
    setPriority("Medium");


    await fetchEvents();


  } catch(error) {

    console.log(
      error.response?.data || error.message
    );

   toast.error(
    error.response?.data?.message || "Failed to add event"
);

  }

};
const deleteEvent = async (id) => {

  try {

    const token = localStorage.getItem("token");

   await api.delete(
  `/timeline/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


   toast.success("Event deleted");
 

await fetchEvents();


  } catch(error){

    console.log(
      error.response?.data || error.message
    );

  toast.error(
    error.response?.data?.message || "Failed to delete event"
);

  }

};
  const getDaysLeft = (date) => {

    const today = new Date();

    const eventDate = new Date(date);


    const difference =
      eventDate - today;


    return Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );

  };



  const getStatus = (date) => {

    const days = getDaysLeft(date);


    if(days < 0)
      return {
        text:"Overdue",
        color:"default"
      };


    if(days <= 1)
      return {
        text:"Critical",
        color:"error"
      };


    if(days <= 7)
      return {
        text:"Upcoming",
        color:"warning"
      };


    return {
      text:"Planned",
      color:"success"
    };

  };



  const sortedEvents = [...events].sort(
    (a,b)=>
    new Date(a.date)
    -
    new Date(b.date)
  );
const focusEvent = sortedEvents[0];
const getSuggestions = () => {

  const suggestions = [];


  if(sortedEvents.length === 0){
    suggestions.push(
      "Add important dates to create your smart plan."
    );
    return suggestions;
  }


  if(focusEvent){

    const days = getDaysLeft(focusEvent.date);


    if(days <= 3){

      suggestions.push(
        `${focusEvent.title} is coming soon. Start preparing now.`
      );

    }

    else{

      suggestions.push(
        `You have enough time for ${focusEvent.title}. Plan ahead.`
      );

    }

  }



  const highPriority =
  events.filter(
    event =>
    event.priority === "High"
  );


  if(highPriority.length > 0){

    suggestions.push(
      `${highPriority.length} high priority task needs attention.`
    );

  }



  if(events.length >= 5){

    suggestions.push(
      "You have many upcoming tasks. Create a weekly plan."
    );

  }


  return suggestions;

};
const getConflicts = () => {

  const conflicts = [];


  for(let i = 0; i < sortedEvents.length; i++){

    for(let j = i + 1; j < sortedEvents.length; j++){


      const firstDate =
      new Date(sortedEvents[i].date);


      const secondDate =
      new Date(sortedEvents[j].date);



      const difference =
      Math.abs(
        secondDate - firstDate
      )
      /
      (1000 * 60 * 60 * 24);



      if(difference <= 2){

        conflicts.push({
          first: sortedEvents[i].title,
          second: sortedEvents[j].title,
          days: Math.floor(difference)
        });

      }

    }

  }


  return conflicts;

};
return (

<Box>


<Typography
variant="h5"
fontWeight="bold"
mb={3}
>
🧠 Smart Timeline
</Typography>

<Card
sx={{
mb:3,
p:2,
borderRadius:3
}}
>

<Typography
fontWeight="bold"
>
➕ Add Important Date
</Typography>


<TextField
fullWidth
label="Event Name"
value={title}
onChange={(e)=>setTitle(e.target.value)}
sx={{mt:2}}
/>


<TextField
fullWidth
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
sx={{mt:2}}
InputLabelProps={{
shrink:true
}}
/>


<TextField
select
fullWidth
label="Priority"
value={priority}
onChange={(e)=>setPriority(e.target.value)}
sx={{mt:2}}
>

<MenuItem value="High">
High
</MenuItem>

<MenuItem value="Medium">
Medium
</MenuItem>

<MenuItem value="Low">
Low
</MenuItem>

</TextField>


<Button
variant="contained"
fullWidth
sx={{mt:2}}
onClick={createEvent}
>
Save Event
</Button>


</Card>
{
focusEvent && (

<Card
sx={{
mb:3,
borderRadius:3,
background:"#ede7f6"
}}
>

<CardContent>

<Typography
fontWeight="bold"
fontSize={18}
>
⭐ Today's Focus
</Typography>


<Typography mt={1}>
{focusEvent.title}
</Typography>


<Typography>
⏳ 
{getDaysLeft(focusEvent.date)} days left
</Typography>


</CardContent>

</Card>

)
}


{
sortedEvents.length === 0 ?

<Typography>
No events added yet.
</Typography>


:

sortedEvents.map((event)=>(


<Card
key={event._id}
sx={{
mb:2,
borderRadius:3,
boxShadow:3
}}
>


<CardContent>


<Typography
fontWeight="bold"
fontSize={18}
>
{event.title}
</Typography>



<Typography
color="text.secondary"
>
📅 
{
new Date(event.date).toLocaleDateString(
  "en-US",
  {
    day:"numeric",
    month:"short",
    year:"numeric"
  }
)
}
</Typography>



<Chip

label={
getStatus(event.date).text
}

color={
getStatus(event.date).color
}

sx={{
mt:1
}}

/>

<Button
variant="outlined"
color="error"
sx={{
mt:2
}}
onClick={()=>deleteEvent(event._id)}
>
Delete
</Button>

<Typography
mt={1}
>
⏳ 
{
getDaysLeft(event.date) < 0

?

"Deadline passed"

:

`${getDaysLeft(event.date)} days left`

}

</Typography>


</CardContent>


</Card>


))

}


<Card
sx={{
mt:3,
borderRadius:3,
background:"#fff8e1"
}}
>

<CardContent>

<Typography
fontWeight="bold"
fontSize={18}
>
💡 Smart Suggestions
</Typography>


{
getSuggestions().map(
(suggestion,index)=>(

<Typography
key={index}
mt={2}
>
✨ {suggestion}
</Typography>

))
}


</CardContent>

</Card>
<Card
sx={{
mt:3,
borderRadius:3,
background:"#ffebee"
}}
>

<CardContent>

<Typography
fontWeight="bold"
fontSize={18}
>
⚠️ Schedule Alerts
</Typography>


{
getConflicts().length === 0 ?

<Typography mt={2}>
✅ No schedule conflicts detected.
</Typography>


:

getConflicts().map(
(conflict,index)=>(

<Box key={index} mt={2}>

<Typography>
⚠️ {conflict.first} and {conflict.second}
</Typography>


<Typography color="text.secondary">
Only {conflict.days} day(s) apart.
Plan your time carefully.
</Typography>

</Box>

))

}


</CardContent>

</Card>
<SmartCalendar events={events}/>
</Box>


)

}


export default SmartTimeline;