import { BsCursorFill } from "react-icons/bs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationHeader from "./ConversationHeader";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import { addChatLog } from "../../store/chatSlice";

function RightChatBox() {
  const items = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    let date = Date();
    let time = date.slice(16, 21);
    if (text !== "") {
      // Dispatch action to add chat log
      dispatch(addChatLog({ text: text, timestamp: time }));
    } else {
      alert("Send Some Message");
    }

    setText("");
  };

  return (
    <div className="col-md-8 right-bar">
      {/* Conversation Header */}
      <ConversationHeader />

      {/* Chat Users */}
      <div className="chat setting">
        <div className="scroll">
          {items[0] && items[1] ? (
            // Render chat logs if there is data
            items[0].friends.map((item, index) => {
              if (item.id == items[1].chatID) {
                return (
                  <div key={index}>
                    {item.chatlog.map((chatLog, index) => (
                      <div>
                        {/* Render sent messages */}
                        <SendMessage item={chatLog} key={index} />
                        {/* Render received messages */}
                        <RecieveMessage item={chatLog} key={index} />
                      </div>
                    ))}
                  </div>
                );
              }
            })
          ) : (
            // Render welcome message if there is no data
            <div className="start-user">
              <h3 className="mt-4">click on profile and chat.. </h3>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input Area */}
      {items[1] && (
        <div className="bg-light sticky-md-top">
          <form onSubmit={handleSendMessage}>
            <div className="float-end mt-3 chatbox d-flex">
              <input
                type="text"
                id="inputtag"
                value={text}
                className="form-control mb-3"
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
              />
              <div className="mt-3">
                <button className="btn">
                  <BsCursorFill className="ms-4 me-3 h3 mb-3 text-primary" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RightChatBox;
