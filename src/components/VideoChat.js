import React, { useState, useCallback } from "react";
import Room from "./Room";

const VideoChat = () => {
  const [formState, setFormState] = useState({
      username: '',
      roomname: '',
      isConnecting: false
  })

  const handleChange = useCallback((event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  }, []);

  const handleSubmit = () => {
    setFormState({
      ...formState,
      isConnecting: true
    })
    console.log(formState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={formState.username}
          onChange={handleChange}
          readOnly={formState.isConnecting}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={formState.username}
          onChange={handleChange}
          readOnly={formState.isConnecting}
          required
        />
      </div>

      <button type="submit" disabled={formState.isConnecting}>
        {formState.isConnecting ? "Connecting" : "Join"}
      </button>
    </form>
  )
};

export default VideoChat;
