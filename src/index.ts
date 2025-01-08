import express, { Request, Response } from "express";
import { db } from "./firebase.config";
import ChatStorageController from "./ChatStorageController";
import { chatController } from "./chatController";
import venon from "venom-bot";

const app = express();
const port = 3001;

try {
  venon
    .create({ session: "Bourbonzinho" })
    .then((client) => chatController.start(client));
} catch (error) {
  console.error(error);
}

app.get("/status", async (req: Request, res: Response) => {
  res.send(chatController.status);
});

app.get("/all", async (req: Request, res: Response) => {
  const docRef = await db.collection("users").listDocuments();

  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
