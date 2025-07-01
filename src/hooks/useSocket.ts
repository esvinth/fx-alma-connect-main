import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/config/api';

export const useSocket = () => {
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(SOCKET_URL);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return socket.current;
};