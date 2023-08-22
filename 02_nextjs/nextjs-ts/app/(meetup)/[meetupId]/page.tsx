import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "@/app/components/meetups/MeetupDetail";

export default async function Page({
  params,
}: {
  params: {
    meetupId: string;
  };
}) {
  const meetupInfo = await getMeetupInfo(params);
  return (
    <Fragment>
      <Head>
        <title>{meetupInfo.meetupData.title}</title>
        <meta name="description" content={meetupInfo.meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupInfo.meetupData.image}
        title={meetupInfo.meetupData.title}
        address={meetupInfo.meetupData.address}
        description={meetupInfo.meetupData.description}
      />
    </Fragment>
  );
}

export const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!",
  },
];

export async function getMeetupInfo(params: { meetupId: string }) {
  // fetch data for a single meetup
  const meetupId = params.meetupId;

  const selectedMeetup:
    | {
        id: string;
        title: string;
        image: string;
        address: string;
        description: string;
      }
    | undefined = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupId);

  return {
    meetupData: {
      id: selectedMeetup?.id.toString(),
      title: selectedMeetup?.title,
      address: selectedMeetup?.address,
      image: selectedMeetup?.image,
      description: selectedMeetup?.description,
    },
  };
}
