import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { ObjectId } from "mongodb";
import connection from "../../components/db/connection";

function MeetupDetails(props) {
  return (
    // <MeetupDetail
    //   image={
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/600px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg"
    //   }
    //   title={"A First Meetup"}
    //   address={"[12345] 퇴근하구 집으로 5"}
    //   description={"The meetup description"}
    // />
    <Fragment>
      <Head>
        <title>{props.meetupData?.title}</title>
        <meta
          name="description"
          content={props.meetupData?.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData?.image}
        title={props.meetupData?.title}
        address={props.meetupData?.address}
        description={props.meetupData?.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const [client, , meetupsCollection] = await connection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };

  // return {
  //   fallback: false,
  //   paths: [
  //     {
  //       params: {
  //         meetupId: "m1",
  //       },
  //     },
  //     {
  //       params: {
  //         meetupId: "m2",
  //       },
  //     },
  //   ],
  // };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const [client, , meetupsCollection] = await connection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  // server side 에서만 보임
  // console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
