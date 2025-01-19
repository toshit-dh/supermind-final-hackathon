import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import { AiOutlineLoading } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

interface ChatBotProps {
  setIsChatBotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChatMessage {
  type: "user" | "bot";
  message: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ setIsChatBotOpen }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    setChatHistory([...chatHistory, { type: "user", message: userInput }]);

    setUserInput("");
    setLoading(true);
    try {
      const botResponseText = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });
      const responseJson = await botResponseText.json();

      const botResponse =
        responseJson.outputs[0].outputs[0].messages[0].message;
      console.log(botResponse);

      setLoading(false);
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", message: botResponse },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsChatBotOpen(false);
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col p-4 border-2 border-white-500 rounded-md relative">
      {/* Close button at the top right */}
      <div className="header flex flex-row items-center gap-6 justify-center h-8">
        <h2 className="text-white text-2xl text-center">ChatBot</h2>
        {loading && (
          <AiOutlineLoading className="text-white animate-spin bg-slate-900" />
        )}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white rounded-lg bg-slate-500"
        >
          <Close />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.type === "user" ? "justify-start" : "justify-end"
                }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${chat.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-white"
                  }`}
              >
                <ReactMarkdown>{chat.message}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-2 rounded-l-lg text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className={`p-2 ${loading ? "bg-gray-700" : "bg-blue-500"
            } text-white rounded-r-lg ml-2`}
          disabled={loading || userInput === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
