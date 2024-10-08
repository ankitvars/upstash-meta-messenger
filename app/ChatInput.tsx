"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { v4 as uuid } from "uuid";
import { FormEvent, useState } from "react";
import { Message } from "@/typings";
import useSWR from "swr";
import fetcher from "@/utils/fetchMessages";
import { Session, unstable_getServerSession } from "next-auth";

type Props = {
  session: Session | null; // Use Session type with null
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name ?? "Unknown User", // Use optional chaining and a fallback
      profilePic: session?.user?.image ?? "https://i.ibb.co/zNpT1Ft/elon.jpg", // Fallback profile picture
      email: session?.user?.email ?? "unknown@domain.com", // Fallback email
    };

    //   Upload message function
    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((response) => response.json());

      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="flex px-10 py-5 space-x-2 border-t bg-white border-gray-100 fixed z-50 bottom-0 w-full"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!session}
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
