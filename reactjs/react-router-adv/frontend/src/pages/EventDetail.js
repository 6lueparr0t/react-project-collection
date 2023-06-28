import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");

  // 에러 처리
  if (data?.isError) {
    return <p>{data.message}</p>;
  }

  const event = data.event;

  return (
    <EventItem event={event} />
  )
}

export default EventDetailPage;

// 컴포넌트 마다 loader 를 두어, App.js 의 Router 에서 선언한다.
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

// 삭제 event 정의
export async function action({request, params}) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });
  
  if(!response.ok) {
   return json({ message: "Could not delete event." }, {
     status: 500,
   });
  }

  // 완료 후 /events 로 이동
  return redirect("/events");
 }
 