import { useLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  const event = data.event;

  return (
    <EventItem event={event} />
  )
}

export default EventDetailPage;

export async function loader({request, params}) {
 const eventId = params.eventId;
 const response = await fetch(`http://localhost:8080/events/${eventId}`);
 
 if(!response.ok) {
  return json({ message: "Could not fetch details for selected event." }, {
    status: 500,
  });
 } else {
  return response;
 }
}
