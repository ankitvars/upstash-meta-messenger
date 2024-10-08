import { Message } from "@/typings";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import React from "react";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={session?.user?.image ?? ""}
          className="rounded-full mx-2"
          alt="Profile Picture"
          height={10}
          width={50}
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {session?.user?.name || "Unknown"}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit ${
              isUser
                ? "text-white bg-blue-400 ml-auto order-2"
                : "text-white bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo date={message.created_at} />
            {/* {new Date(message.created_at).toLocaleString()} */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
