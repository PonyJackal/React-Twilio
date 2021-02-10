import React, { useState, useCallback } from "react";

const VideoChat = () => {
  const [formState, setFormState] = useState({
    username: "",
    roomname: "",
    isConnecting: false,
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      isConnecting: true,
    });
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          name="username"
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
          name="roomname"
          type="text"
          id="room"
          value={formState.roomname}
          onChange={handleChange}
          readOnly={formState.isConnecting}
          required
        />
      </div>

      <button type="submit" disabled={formState.isConnecting}>
        {formState.isConnecting ? "Connecting" : "Join"}
      </button>
    </form>
  );
};

export default VideoChat;
