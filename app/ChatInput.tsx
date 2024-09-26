"use client";

import { v4 as uuid } from "uuid";
import { FormEvent, useState } from "react";
import { Message } from "@/typings";

function ChatInput() {
  const [input, setInput] = useState("");

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Elon Musk",
      profilePic: "https://i.ibb.co/zNpT1Ft/elon.jpg",
      email: "elon@tesla.com",
    };

    //   Upload message function
    const uploadMessageToUpstash = async () => {
      const res = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log("Message added >>>", data);
    };

    uploadMessageToUpstash();
  };

  return (
    <form
      onSubmit={addMessage}
      className="flex px-10 py-5 space-x-2 border-t border-gray-100 fixed z-50 bottom-0 w-full"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
