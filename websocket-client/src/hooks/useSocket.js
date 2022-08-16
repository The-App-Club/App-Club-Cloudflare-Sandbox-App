import { useEffect } from 'react';

function useSocket({ ws, onOpen, onMessage, onClose, onError }) {
  useEffect(() => {
    if (!ws) {
      throw new Error("server didn't accept ws");
    }

    ws.addEventListener('open', onOpen);
    ws.addEventListener('message', onMessage);
    ws.addEventListener('close', onClose);
    ws.addEventListener('error', onError);

    return () => {
      ws.removeEventListener('open', onOpen);
      ws.removeEventListener('message', onMessage);
      ws.removeEventListener('close', onClose);
      ws.removeEventListener('error', onError);
    };
  }, [ws, onOpen, onMessage, onClose, onError]);

  return;
}

export { useSocket };
