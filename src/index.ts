import express, { Request, Response } from "express";
import { db } from "./firebase.config";
import { ChatController, CLIENT_STATUS } from "./chatController";
const app = express();
const port = 3001;

app.get("/start", async (req: Request, res: Response) => {
  if (ChatController.status != CLIENT_STATUS.CONNECTED) {
    await ChatController.start()
    res.send({ status: CLIENT_STATUS.CONNECTING });
  }
  if (ChatController.status === CLIENT_STATUS.CONNECTED) {
    res.send({ status: CLIENT_STATUS.CONNECTED });
  }
});

app.get("/status", async (req: Request, res: Response) => {
  res.send({ status: ChatController.status });
});

app.get("/last", async (req: Request, res: Response) => {
  res.send(ChatController.lastMessages());
});

app.get("/all", async (req: Request, res: Response) => {
  const docRef = await db.collection("users").listDocuments();

  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
