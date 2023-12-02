"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import parse from "html-react-parser";

function themThePChoXuongDong(chuoi) {
  // Thay thế '\n\n' thành '</p><p>' và '\n' thành ' ', ':' thành ':</p><p>'
  const chuoiDaThayThe = `<p>${chuoi
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, " ")
    .replace(/:/g, ":</p><p>")}</p>`;

  return chuoiDaThayThe;
}

export default function ChatBotComponent() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function scrollToNew() {
    var scrollingDiv = document.getElementById("chatlog");
    scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isLoading) {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: inputValue },
      ]);

      sendMessage(inputValue);
    }

    setInputValue("");
  }

  function sendMessage(message) {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((respone) => {
        console.log(respone);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: respone.data.choices[0].message.content },
        ]);
        setIsLoading(false);
        scrollToNew();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  return (
    <Draggable handle="h1">
      <div
        className="flex flex-col shadow-lg z-10 fixed top-[60px] left-[80px]
       bg-white w-[300px] max-w-lg bottom-[40px] rounded-sm justify-between p-2"
      >
        <h1 className="w-full flex items-center justify-center cursor-move">
          🤖 ChatBot v.0.1
        </h1>
        <Separator className="mt-2" />
        <div
          id="chatlog"
          className=" overflow-y-auto w-full flex-1 bg-gray-100 py-2"
        >
          {chatLog.map((message, index) => {
            if (message.type === "bot") {
              return (
                <div
                  id={index}
                  key={index}
                  className="flex px-2 py-4"
                >
                  <p className="text-3xl">🤖</p>
                  <div className="flex flex-col text-black font-mono pl-2">
                    <b>ChatBot #1</b>
                    <div className="flex flex-col gap-2">
                      {parse(themThePChoXuongDong(message.message))}
                    </div>
                  </div>
                </div>
              );
            }
            if (message.type === "user") {
              return (
                <div
                  id={index}
                  key={index}
                  className="flex px-2 py-4"
                >
                  <p className="text-3xl">👩‍💻</p>
                  <div className="flex flex-col text-black font-mono pl-2">
                    <b>You</b>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            }
          })}
          {chatLog?.length === 0 && (
            <div className="flex justify-center flex-col items-center w-full h-full gap-2">
              <img
                src="/typing.svg"
                alt="typing"
              />
              <pre>Đang bảo trì! </pre>
              <pre>Code: invalid_api_key</pre>
            </div>
          )}

          {isLoading && (
            <div className="flex px-2 py-4">
              <p className="text-3xl">🤖</p>
              <div className="flex flex-col text-black font-mono pl-2">
                <b>ChatBot #1</b>
                <div className="flex gap-2 pl-4 py-2">
                  <div class="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div class="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div class="h-2 w-2 bg-black rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-md border pt-2 bg-white py-2 px-4 flex justify-between items-center gap-2"
        >
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Trò chuyện với chát bot..."
            value={inputValue}
            disabled={true}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-200 p-2 rounded-sm cursor-pointer"
          >
            <img
              src="/up.svg"
              className="w-4 h-4"
              alt="up"
            />
          </button>
        </form>
      </div>
    </Draggable>
  );
}
