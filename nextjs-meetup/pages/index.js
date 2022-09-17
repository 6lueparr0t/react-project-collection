import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import connection from "../components/db/connection";

// 이제 DUMMY_MEETUPS 을 쓰지 않는다.
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/600px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg",
//     address: "[12345] 퇴근하구 집으로 5",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/600px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg",
//     address: "[12345] 퇴근하구 집으로 5",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // 사전 렌더링 되므로 이제 더 이상 필요하지 않다.
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  // return <MeetupList meetups={loadedMeetups} />;
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// 매 요청마다 페이지를 생성한다.
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const [client, , meetupsCollection] = await connection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  // console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
    // revalidate:1(1초)
    // revalidate:10(10초)
    // revalidate:3600(1시간)
  };

  // return {
  //   props: {
  //     meetups: DUMMY_MEETUPS
  //   },
  //   revalidate:10
  //   // revalidate:1(1초)
  //   // revalidate:10(10초)
  //   // revalidate:3600(1시간)
  // };
}

export default HomePage;
