import { create, Message, Whatsapp } from "venom-bot";
import ChatStorageController from "./ChatStorageController";

export enum CLIENT_STATUS {
  CONNECTED = "CONNECTED",
  NEVER_CONNECTED = "NEVER_CONNECTED",
  NOT_CONNECTED = "NOT_CONNECTED",
  CONNECTING = "CONNECTING",
}

export class ChatController {
  static lastMessages(): any {
    throw new Error("Method not implemented.");
  }
  static status: CLIENT_STATUS;
  static session: Whatsapp;

  lastMessages(): Object {
    return {};
  }

  static handleMessage(message: Message): void {
    if (message.isNewMsg) {
      ChatStorageController.newChat({
        id: message.id,
        author: message.author,
        content: message.content,
      });
    }
    throw new Error("Method not implemented.");
  }

  static async start() {
    this.status = CLIENT_STATUS.CONNECTING;
    create({ debug: true, session: "Bourbonzinho", headless: false })
      .then((client) => {
        this.session = client;
        this.status = CLIENT_STATUS.CONNECTED;
      })
      .catch(() => {
        this.status = CLIENT_STATUS.NOT_CONNECTED;
      });
  }
}

ChatController.session.onAnyMessage((message) => {
  ChatController.handleMessage(message);
});
