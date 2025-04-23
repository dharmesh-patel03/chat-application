import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/messages";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("User1");
  const [receiver, setReceiver] = useState("User2");

  const fetchMessages = async () => {
    const res = await fetch(`${API_URL}?user1=${sender}&user2=${receiver}`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sender, receiver]);

  const sendMessage = async () => {
    if (!content.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, receiver, content }),
    });

    setContent("");
    fetchMessages();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-4 bg-green-600 text-white dark:bg-green-700">
        Two User Chat App 🗨️
      </div>

      <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800">
        <div className="flex gap-3">
          <label className="text-sm dark:text-white">Sender:</label>
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="px-2 py-1 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option>User1</option>
            <option>User2</option>
          </select>

          <label className="text-sm dark:text-white">Receiver:</label>
          <select
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="px-2 py-1 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option>User1</option>
            <option>User2</option>
          </select>
        </div>
      </div>

      {/* <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, i) => {
          const isOwn = msg.sender === sender;
          return (
            <div key={i} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`py-1 px-5 rounded-lg max-w-xs shadow ${
                isOwn ? 'bg-green-500 text-white rounded-br-none' : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white rounded-bl-none'
              }`}>
                <div>{msg.content}</div>
                <div className="text-[10px] text-right opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, i) => {
          const isOwn = msg.sender === sender;
          return (
            <div key={i} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} relative`}>
              <div className="relative max-w-xs">
                {/* Tail */}
                <div
                  className={`absolute shadow z-20  bottom-0 ${isOwn ? 'right-[-8px]' : 'left-[-8px]'
                    } w-0 h-0 border-t-[10px] border-t-[#b40f0f00] border-b-0 border-b-transparent ${isOwn
                      ? 'border-l-8 border-l-[#005C4B]'
                      : 'border-r-8 border-r-white dark:border-r-[#202C33]'
                    }`}
                ></div>

                {/* Bubble */}
                <div
                  className={`py-1 px-3 rounded-lg text-sm shadow relative ${isOwn
                      ? 'bg-[#005C4B] text-white rounded-br-none'
                      : 'bg-white text-gray-800 dark:bg-[#202C33] dark:text-white rounded-bl-none'
                    }`}
                >
                  <div>{msg.content}</div>
                  <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-gray-200 dark:text-gray-400">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <div className="p-3 flex items-center gap-2 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-full dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
