import { MongoClient } from "mongodb";

const connection = async (scheme) => {
  const client = await MongoClient.connect(
    "mongodb+srv://6lueparr0t:BykLUzvRlL4dQdd5@cluster0.pdtntyw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const collection = db.collection(scheme);

  return [client, db, collection];
};

export default connection;
