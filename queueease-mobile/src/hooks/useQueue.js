import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { getQueueState } from '../api/queue.api';
import { unwrapApiData } from '../utils/helpers';

export const useQueue = (clinicId) => {
  const socket = useContext(SocketContext);
  
  const [currentToken, setCurrentToken] = useState(0);
  const [totalBookedToday, setTotalBookedToday] = useState(0);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState(0);

  // Fetch initial state
  useEffect(() => {
    let isMounted = true;

    const fetchInitialQueue = async () => {
      try {
        setLoading(true);
        const data = await getQueueState(clinicId);
        const queue = unwrapApiData(data);
        if (isMounted && queue) {
          setCurrentToken(queue.currentToken ?? 0);
          setTotalBookedToday(queue.totalBookedToday ?? 0);
          setEstimatedWaitTime(queue.estimatedWaitTime ?? 0);
        }
      } catch (error) {
        console.error('Failed to fetch initial queue state', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (clinicId) {
      fetchInitialQueue();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [clinicId]);

  // Handle Socket.IO connection and events
  useEffect(() => {
    if (!socket || !clinicId) return;

    // Join room for this clinic
    socket.emit('join:clinic', clinicId);

    // Listen for queue updates
    const handleQueueUpdate = (data) => {
      const queue = unwrapApiData(data) || {};
      setCurrentToken((prev) => (queue.currentToken !== undefined ? queue.currentToken : prev));
      setTotalBookedToday((prev) => (queue.totalBookedToday !== undefined ? queue.totalBookedToday : prev));
      setEstimatedWaitTime((prev) => (queue.estimatedWaitTime !== undefined ? queue.estimatedWaitTime : prev));
    };

    socket.on('queue:updated', handleQueueUpdate);

    // Cleanup: leave room and remove listener
    return () => {
      socket.off('queue:updated', handleQueueUpdate);
      socket.emit('leave:clinic', clinicId);
    };
  }, [socket, clinicId]);

  // Derive remaining whenever counts change
  useEffect(() => {
    setRemaining(Math.max((totalBookedToday || 0) - (currentToken || 0), 0));
  }, [currentToken, totalBookedToday]);

  return {
    currentToken,
    totalBookedToday,
    estimatedWaitTime,
    remaining,
    loading
  };
};
