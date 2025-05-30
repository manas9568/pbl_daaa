"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    const socketInstance = io(url, {
      auth: {
        token,
      },
    })

    socketInstance.on("connect", () => {
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [url])

  return { socket, isConnected }
}
