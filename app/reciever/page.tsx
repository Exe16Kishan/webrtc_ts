"use client"
import React, { useEffect } from 'react'

function page() {
    useEffect(()=>{

        const socket = new WebSocket('ws://localhost:8080')
        socket.onopen=()=>{
            socket.send(JSON.stringify({
                type:'receiver'
            }))
        }


    },[])
    
  return (
    <div>

    


    </div>
  )
}

export default page