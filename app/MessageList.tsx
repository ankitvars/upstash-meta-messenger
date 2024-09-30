"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import fetcher from "@/utils/fetchMessages";
import React, { useEffect } from "react";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "@/pusher";
import { Message } from "@/typings";
import Loading from "./loading";

type Props = {
  initialMessages?: Message[];
};

// This component fetches messages from the server and renders them in a list.
function MessageList({ initialMessages }: Props) {
  const {
    data: messages,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new_message", async (newMessage: Message) => {
      if (messages?.find((message) => message.id === newMessage.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [newMessage, ...messages],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
          {(messages || initialMessages)?.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </div>
      )}
    </>
  );
}

export default MessageList;
