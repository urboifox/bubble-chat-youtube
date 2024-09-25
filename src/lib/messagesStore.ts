import { get, writable } from "svelte/store";

export type Message = {
  id: number;
  editing: boolean;
};

const messages = writable<Message[]>([]);

function updateMessage(id: number, update: Partial<Message>) {
  messages.update((messages) => {
    return messages.map((message) => {
      if (message.id === id) {
        return { ...message, ...update };
      }
      return message;
    });
  });
}

function createNewMessage() {
  const lastMessage = getLastMessage();

  if (lastMessage?.editing) return;

  messages.update((messages) => {
    return [...messages, { editing: true, id: +Date.now() }];
  });
}

function shiftMessages() {
  messages.update((messages) => messages.slice(1));
}

function removeLastMessage() {
  messages.update((messages) => messages.slice(0, -1));
}

function getLastMessage() {
  return get(messages).at(-1);
}

export {
  messages,
  updateMessage,
  createNewMessage,
  getLastMessage,
  shiftMessages,
  removeLastMessage,
};
