import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventForm event={data.event} />
}

export async function action ({request, params}) {
  const eventId = params.eventId;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    throw json({message : "Could not save event."}, { status: 500});
  }

  return redirect(`/events/${eventId}`);
}

export default EditEventPage;