import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
  //  Wachirawit
  const [curMessage, setCurMessage] = useState(""); //เก็บข้อมูล Message,ข้อมูลจากผู้ใช้
  const [messageList, setMessageList] = useState([]); //เก็บประวัติ Message,ประวัติของข้อมูล

  //Thiraphat
  const sendMessage = async () => {
    if (curMessage !== "") {
      //ถ้ามี message
      const messageData = {
        //create object messageที่ต้องการจะส่ง
        room: room,
        author: username, // ชื่อผู้ส่ง
        message: curMessage, //ข้อความผู้ส่ง
        // เวลาตอนที่ส่ง
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()).getMinutes()
        }`,
      };
      await socket.emit("send_message", messageData); //message ของผู้ใช้ที่ทำการส่ง โดย emit message จะต้องตรงกับmessage ที่เปิดไว้ใน server
      setMessageList((list) => [...list, messageData]); //ประวัติของ message เดิม เเละ message ของผู้ใช้ที่ทำการส่งไปใหม่
      setCurMessage(""); // set message ให้เป็นค่าว่าง เมื่อทำการส่งข้อความเเล้ว
    }
  };

  useEffect(() => {
    socket.on('receive_message',(data) => { //เก็บประวัติ Message
        setMessageList((list) => [...list, data]) //ประวัติ message เเละข้อความใหม่
    })
  }, [socket])//รันเฉพาะตอนที่socket มีการเปลี่ยนเเปลง
  return (
    <div className="chat-window">
      {/* ส่วนหัว */}
      <div className="chat-header">
        <p>กล่องข้อความ</p>
      </div>
      {/* ส่วนกลาง */}
      <div className="chat-body">
        {/* ไว้เลื่อนดูข้อความ */}
        <ScrollToBottom className="message-container">
          {messageList.map((content) => {
            return (
              <div
                className="message"
                id={username === content.author ? "you" : "other"}
              >
                <div className="message-content">
                  {/* Message */}
                  <p>{content.message}</p>
                </div>

                <div className="message-meta">
                  <p id="author">{content.author}</p>
                  {/* ผู้เขียน */}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      {/* ส่วนล่าง */}
      <div className="chat-footer">
        <input
          type="text"
          value={curMessage}
          placeholder="Messages"
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage(); // เมื่อกด Enter จะทำการส่งข้อความ
          }}
          onChange={(e) => {
            setCurMessage(e.target.value); //Message ของผู้ใช้
          }}
        />
        <Button onClick={sendMessage}>SEND</Button> {/* ปุ่มส่งข้อความ */}
      </div>
    </div>
  );
};

export default Chat;
