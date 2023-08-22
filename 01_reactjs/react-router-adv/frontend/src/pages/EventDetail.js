import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const {event, events} = useRouteLoaderData("event-detail");

  // 상세 페이지에서 페이지 내용과 리스트를 보여준다.
  return (
    <>
      <Suspense fallback={<p style={({textAlign : "center"})}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={({textAlign : "center"})}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage;

const loadEvent = async (eventId) => {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
 
 if(!response.ok) {
  return json({ message: "Could not fetch details for selected event." }, {
    status: 500,
  });
 } else {
  const resData = await response.json();
  return resData.event;
 }
};

const loadEvents = async () => {
  const response = await fetch(`http://localhost:8080/events/`);
 
 if(!response.ok) {
  return json({ message: "Could not fetch details for selected event." }, {
    status: 500,
  });
 } else {
  const resData = await response.json();
  return resData.events;
 }
};

// 컴포넌트 마다 loader 를 두어, App.js 의 Router 에서 선언한다.
export async function loader({request, params}) {
 const eventId = params.eventId;
 
 // loadEvent 앞에 await 를 주면 event 를 기다렸다가
 // 그 다음 리스트를 출력한다.
 return defer({
  event: await loadEvent(eventId), 
  events: loadEvents(),
 });
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
 