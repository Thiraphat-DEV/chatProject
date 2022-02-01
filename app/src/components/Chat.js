import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({socker, username, room}) => {
    //  Wachirawit
    const [curMessage, setCurMessage] = useState("")//เก็บข้อมูล Message,ข้อมูลจากผู้ใช้
    const [messageList, setMessageList] = useState([])//เก็บประวัติ Message,ประวัติของข้อมูล
    return (
        <div className="chat-window">
            {/* ส่วนหัว */}
            <div className='chat-header'>
                <p>กล่องข้อความ</p>
            </div>
            {/* ส่วนกลาง */}
            <div className='chat-body'>
                {/* ไว้เลื่อนดูข้อความ */}
                <ScrollToBottom className="message-container">
                    {messageList.map((content) => {
                        return (
                            <div>
                                <div className='message-content'>
                                    {/* Message */}
                                    <p>{content.message}</p>
                                </div>

                                <div className="message-meta">
                                    <p id="time">{content.time}</p>
                                    <p id="author">{content.author}</p>
                                    {/* ผู้เขียน */}
                                </div>
                            </div>

                        )
                    })}
                </ScrollToBottom>
            </div>
                    {/* ส่วนล่าง */}
            <div className='chat-footer'>
                <input type="text" value={curMessage} placeholder='Messages' onKeyPress={(e) =>{
                        e.key === "Enter" && sendMessage()      // เมื่อกด Enter จะทำการส่งข้อความ  
             }}
            onChange={(e) =>{
                setCurMessage(e.target.value)  //Message ของผู้ใช้
            }}  
            />
             <Button onClick={sendMessage}>SEND</Button>  {/* ปุ่มส่งข้อความ */}
            </div>
        </div>
    );
};

export default Chat;

