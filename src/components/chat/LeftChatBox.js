import React, { useState } from "react";
import profile from "../Images/dp.jpg";
import { BsGithub, BsFillChatLeftDotsFill, BsPlusCircle } from "react-icons/bs";
import { SearchBox } from "./SearchBox";
import ChatLog from "./ChatLog";
import ConversationAdd from "./ConversationAdd";

function LeftChatBox(props) {
  // State variables
  const [add, setAdd] = useState(false); // Toggle for conversation add functionality
  const [searchInput, setSearchInput] = useState(""); // Search input value

  // Function to toggle the conversation add functionality
  const handleAdd = () => {
    setAdd(!add);
  };

  const { data2 } = props;

  return (
    <div className="col-md-4 sidebar">
      <div className="sticker sticky-md-top  left">
        <div >
          <img
            src={profile}
            alt=""
            width="50px"
            height="50px"
            className="rounded-circle"
          />
          <div className="float-end mt-3">
            {/* Plus Button: Add Users */}
            <BsPlusCircle
              className="ms-3 text-primary addUser h3"
              onClick={handleAdd}
            />
            {/* Render Conversation Add component when 'add' is true */}
            {add && <ConversationAdd setAdd={setAdd} />}

            {/* Emoji */}
            <BsFillChatLeftDotsFill className="ms-3 text-primary h4" />
          </div>
        </div>
        {/* Search Box Component */}
        <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>

      {/* Chat User Section */}
      <div className="users">
        {data2 &&
          data2.friends
            .filter((val) => {
              // Filter users based on search input
              if (searchInput === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item, index) => {
              // Render ChatLog component for users with non-empty chatlog
              if (item.chatlog.length > 0) {
                return <ChatLog item={item} key={index} />;
              }
            })}
      </div>
    </div>
  );
}

export default LeftChatBox;
