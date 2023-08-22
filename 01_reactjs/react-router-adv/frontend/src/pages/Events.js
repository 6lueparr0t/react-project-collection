import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={({textAlign : "center"})}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;

  // return <EventsList events={events} />;
};

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    return json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export function loader() {
  // 데이터 fetching을 연기(deferring)
  // 데이터가 도착할 때까지 기다리지 않고 페이지를 표시할 때 사용
  return defer({
    events: loadEvents(),
  });
}
