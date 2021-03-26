import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { API_URL, LIKES_URL } from './reusable/url'
 
export const App = () => {

  //State variables 

  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState(' ')

  

  // Hook that will call the function after component is mounted

  useEffect(() => {
    fetchMessageList();

  },[])

  
  

  //Function to fetch message list from outer API

  const fetchMessageList = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(message => setMessageList(message))
    .catch(err => console.error(err)) 
  }

  const onNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  }  

  //Function that will prevent the form to refresh and that will send the POST request

  const onFormSubmit = (event) => {
    event.preventDefault();

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: newMessage })
      };
  
      fetch(API_URL, options)
        .then(res => res.json())
        .then(receivedMessage => setMessageList([...messageList, receivedMessage]))
  
    /* const onLikesIncrease = (id) => {
      fetch(LIKES_URL(id))
    } */
  
    }
   

    return (
      <div>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="newMessage">Write new message!</label>
          <input
            id="newMessage"
            type="text"
            value={newMessage}
            onChange={onNewMessageChange}
          />
          <button type="onSubmit">Send message!</button>
        </form> 
        
        {/* Iterating over the array of messages. This is a representation of asingle message */}

        {messageList.map(message => (
          <div key={message._id}>
            <h4>{message.message}</h4>
            {/* <button onClick= { () => onLikesIncrease(message._id)}>
              {message.likes}
              ♥️
            </button> */}
            <p className ="date-created">-{moment(message.createdAt).fromNow()}</p> 
          </div>  
        ))}
      </div>
  )
}