import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Room from "./Room";

const VideoChat = () => {
  // state for form
  const [formState, setFormState] = useState({
    username: "",
    roomname: "",
    isConnecting: false,
  });
  const [room, setRoom] = useState("");
  // handle input change
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // set isConnecting true
    setFormState({
      ...formState,
      isConnecting: true,
    });
    // get videToken from express server

    const data = await fetch("http://localhost:3001/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: formState.username,
        room: formState.roomname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(data.token);
    // connect video room
    Video.connect(data.token, {
      name: formState.roomname,
    })
      .then((room) => {
        setFormState({
          ...formState,
          isConnecting: false,
        });
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setFormState({
          ...formState,
          isConnecting: false,
        });
      });
  };

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  if (room)
    return (
      <Room
        roomName={formState.roomname}
        room={room}
        handleLogout={handleLogout}
      />
    );

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
