import { create, Message, Whatsapp } from "venom-bot";
import { db } from "./firebase.config";

type Chat = {
  id: String;
  author: String;
  content: String;
};

// type Message = {
//   id: String;
//   body: String;
//   timestamp: String;
// };

export default class ChatStorageController {
  static newChat(message: Chat) {
    console.log(`
      -------------------------------------
      message.author: ${message.author}
      message.content: ${message.content.padEnd(100)}
      `);
  }
}
