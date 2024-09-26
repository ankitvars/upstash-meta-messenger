import React from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

function HomePage() {
  return (
    <main>
      {/* Message List */}
      <MessageList />

      {/* Chat Input */}
      <ChatInput />
    </main>
  );
}

export default HomePage;
