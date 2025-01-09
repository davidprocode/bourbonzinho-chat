import { Message, Chat } from "venom-bot";
import { db } from "./firebase.config";

type HandledMessage = {
  id: String;
  author: String;
  authorName: String;
  profilePicThumbObj: String;
  content: String;
  chat: Object;
  raw: Message;
};

// type Message = {
//   id: String;
//   body: String;
//   timestamp: String;
// };

export default class ChatStorageController {
  static onChat(message: HandledMessage) {
    console.log(`
      -------------------------------------
      message.author: ${message.author}
      message.authorName: ${message.authorName}
      message.profilePicThumbObj: ${message.profilePicThumbObj}
      message.content: ${message.content.padEnd(100)}
      `);
    console.log(message.chat);
  }
}
