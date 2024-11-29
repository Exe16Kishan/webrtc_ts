"use client";
import React, { useEffect, useState } from "react";

function page() {
    const[socket,setsocket]=useState<WebSocket | null>(null) // to store the socket 
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "sender",
        })
      );
    };
    setsocket(socket)
  }, []);

  async function start(){
    // create a instance of webrtc
    const pc  = new RTCPeerConnection()
    // create an offer 
    const offer  = await pc.createOffer()
    // set it to local decription
    await pc.setLocalDescription(offer)
    // send the data sdp to the other side through signaling 
    socket?.send(JSON.stringify({type:"createOffer",
        sdp:pc.localDescription

    }))
  }

  return (
    <div>
      <button onClick={start}>Sender </button>
    </div>
  );
}

export default page;
