import { useState, useEffect, useRef } from "react";
import "../styles/adminchat.css";
import io from "socket.io-client";
import React from "react";

const socket = io.connect("http://localhost:5174");

function AdminChat({ username, setUsername }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      const messageData = {
        author: username,
        message: inputValue,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("chat_message", messageData);
      setInputValue("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("chat_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, [socket]);

  return (
    <div className="chat-content">
      {/* <h1 className="chatTitle">Welcome, {username}</h1> */}
      <div className="chatBox">
        <ul className="chatMessages">
          {messages.map((msg, index) => (
            <React.Fragment key={`message-${index}`}>
              <p key={`user-${index}`} className="chatUser">
                {msg.author}
              </p>
              <li
                key={index}
                className={
                  msg.author === username ? "myMessage" : "otherMessage"
                }
              >
                <p>{msg.message}</p>
              </li>
              <h4 className="time">{msg.time}</h4>
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </ul>
        <form id="form" onSubmit={handleSubmit}>
          <input
            className="chatInput"
            type="text"
            id="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default AdminChat;
