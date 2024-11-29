"use client";
import React, { useEffect, useState } from "react";

function page() {
    const[socket,setsocket]=useState<WebSocket | null>(null)
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
    const pc  = new RTCPeerConnection()
    const offer  = await pc.createOffer()
    await pc.setLocalDescription(offer)
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
