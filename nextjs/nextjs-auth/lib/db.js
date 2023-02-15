import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://6lueparr0t:BykLUzvRlL4dQdd5@cluster0.pdtntyw.mongodb.net/auth?retryWrites=true&w=majority"
  );

  return client;
}
