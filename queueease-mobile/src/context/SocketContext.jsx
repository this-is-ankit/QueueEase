import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'http://192.168.1.45:5000';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (!token || !user) {
      console.log('[Socket.IO] Skipping connection: user is not authenticated');

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }

      return undefined;
    }

    console.log(`[Socket.IO] Connecting to ${SOCKET_URL}`);

    const newSocket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      transports: ['polling', 'websocket'],
    });

    const handleConnect = () => {
      console.log('[Socket.IO] Connected:', newSocket.id);
    };

    const handleDisconnect = (reason) => {
      console.log('[Socket.IO] Disconnected:', reason);
    };

    const handleConnectError = (error) => {
      console.error('[Socket.IO] Connection Error:', error.message);
    };

    const handleReconnectAttempt = (attempt) => {
      console.log(`[Socket.IO] Reconnection attempt ${attempt}`);
    };

    const handleReconnectFailed = () => {
      console.error('[Socket.IO] Reconnection failed');
    };

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);
    newSocket.on('connect_error', handleConnectError);
    newSocket.io.on('reconnect_attempt', handleReconnectAttempt);
    newSocket.io.on('reconnect_failed', handleReconnectFailed);

    return () => {
      console.log('[Socket.IO] Cleaning up connection');
      newSocket.off('connect', handleConnect);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.off('connect_error', handleConnectError);
      newSocket.io.off('reconnect_attempt', handleReconnectAttempt);
      newSocket.io.off('reconnect_failed', handleReconnectFailed);
      newSocket.disconnect();

      if (socketRef.current === newSocket) {
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, [token, user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
