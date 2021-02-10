import React, { useEffect, useState } from "react";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <h1>{participant.sid}</h1>
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? <h1>{room.localParticipant.sid}</h1> : ""}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
