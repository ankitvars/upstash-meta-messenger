"use client";
import React from "react";

function LogoutButton() {
  return (
    <button
      onClick={() => alert("Logged out!")}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
    >
      Sign Out
    </button>
  );
}

export default LogoutButton;
