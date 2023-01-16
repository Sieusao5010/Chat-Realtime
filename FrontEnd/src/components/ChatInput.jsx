import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  // const handleEmojiClick = (event, emoji) => {
  //   let message = msg;
  //   message += emoji.emoji;
  //   console.log(emoji);
  //   setMsg(message);
  // };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={(e) => {
                let message = msg;
                message += e.emoji;
                setMsg(message);
                setShowEmojiPicker(!showEmojiPicker);
              }}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      positon: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        box-shadow: 0 3px 10px #9a86f3;
        border-color: #9a86f3;
        position: absolute;
        top: 130px;

        .epr-header {
          background-color: #080420;
          .epr-header-overlay {
            .epr-search-container {
              input {
                background-color: transparent;
                color: white;
              }
            }
          }
        }
        .epr-body {
          background-color: #080420;
          .epr-emoji-list {
            .epr-emoji-category-label {
              background-color: #080420;
              color: white;
            }
          }
          .EmojiScrollWrapper::webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
        }
        .epr-preview {
          display: none;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      color: white;
      width: 90%;
      // height: 60%;
      background-color: transparent;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0 2rem;
      border-radius: 2rem;
      justify-content: center;
      align-items: center;
      background-color: #9186f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
export default ChatInput;
