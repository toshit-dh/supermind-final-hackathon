import  { useState, useEffect } from "react";
import ChatBot from "./ChatBot"
import { ChatBubbleOutlineRounded } from "@mui/icons-material";
export default function Home() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetch_users() {
      try {
        const usersText = await fetch("http://localhost:5000/fetch?limit=50");
        const usersJson = await usersText.json();
        setUsers(usersJson);
        console.log(usersJson);
      } catch (error) {
        console.log(error);
      }
    }
    fetch_users();
  }, []);
  return (
    <>
      <div
        className="w-full flex flex-col justify-center items-center text-white"
        style={{
          height: "calc(100vh - 64px)",
        }}
      >
        <div className="relative z-10 text-center bg-slate-500p-8 rounded-xl shadow-lg h-4/5 w-4/5">
          <p>Content</p>
        </div>
      </div>
      {
        <div
          className={`fixed bottom-4 right-4 flex items-center justify-center ${
            isChatBotOpen ? "w-96 h-96" : "w-8 h-8"
          } bg-gray-800 text-white rounded-lg shadow-lg`}
          style={{
            zIndex: 9999,
          }}
        >
          {isChatBotOpen ? (
            <ChatBot setIsChatBotOpen={setIsChatBotOpen} users={users} />
          ) : (
            <button onClick={() => setIsChatBotOpen(true)}>
              <ChatBubbleOutlineRounded />
            </button>
          )}
        </div>
      }
    </>
  );
}
