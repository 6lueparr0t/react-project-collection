import { MongoClient } from "mongodb";
import connection from '../../components/db/connection';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // fetch data from an API
    const [client, , meetupsCollection] = await connection("meetups");
    const result = await meetupsCollection.insertOne(data);
    // console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
