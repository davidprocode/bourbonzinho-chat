import { create, Message, Whatsapp } from "venom-bot";
import { Storage } from "./firebase.config";
import { Timestamp } from "firebase/firestore";

export enum CLIENT_STATUS {
  CONNECTED = "CONNECTED",
  NEVER_CONNECTED = "NEVER_CONNECTED",
  NOT_CONNECTED = "NOT_CONNECTED",
  CONNECTING = "CONNECTING",
}

export class ChatController {
  status: CLIENT_STATUS = CLIENT_STATUS.NEVER_CONNECTED;
  session?: Whatsapp;

  async getAllMessagesPretty() {
    return await Storage.messageGetAllPretty();
  }

  async getAllMessages() {
    return await Storage.messageGetAll();
  }

  async getLastMessages() {
    return await Storage.messageGetLast();
  }

  handleMessage(message: Message) {
    let docRefid;

    if (!message.isGroupMsg || !message.isMedia) {
      Storage.messageSave({
        id: message.id,
        author: message.sender.id ?? message.author,
        authorName:
          message.sender.formattedName.toString() ??
          message.notifyName.toString(),
        profilePicThumbObj: message.sender.profilePicThumbObj.eurl,
        body: message.content,
        raw: message,
        timestamp: Timestamp.now(),
      }).then((docRef) => {
        console.log("::::", docRef);

        docRefid = docRef;
      });
    }

    return docRefid;
  }

  async getSocketStatus() {
    return await this.session?.getStateConnection();
  }

  start() {
    this.status = CLIENT_STATUS.CONNECTING;
    if (!this.session) {
      create({ session: "Bourbonzinho" })
        .then((client) => {
          this.status = CLIENT_STATUS.CONNECTED;
          this.session = client;
          this.session.onMessage((message) => this.handleMessage(message));
          return this.session;
        })
        .catch(() => {
          this.status = CLIENT_STATUS.NOT_CONNECTED;
        });
    }
  }
}
