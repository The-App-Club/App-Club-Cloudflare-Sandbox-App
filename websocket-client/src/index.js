import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { useSocket } from './hooks/useSocket';

const url = new URL('https://websocket-server.something.workers.dev');
url.protocol = 'wss';
url.pathname = '/ws';
const ws = new WebSocket(url);

const App = ({ children }) => {
  const [eventInfoList, setEventInfoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [count, setCount] = useState(0);

  const handleOpen = () => {
    console.log('Opened websocket');
    updateCount(0);
  };

  const handleMessage = ({ data }) => {
    console.log(data);
    const { count, tz, error } = JSON.parse(data);
    addNewEvent(data);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage('');
      updateCount(count);
    }
  };

  const handleClose = () => {
    console.log('Closed websocket');
    updateCount(0);
    setErrorMessage('');
    setEventInfoList([]);
  };

  useSocket({
    ws,
    onOpen: handleOpen,
    onMessage: handleMessage,
    onClose: handleClose,
    onError: () => {},
  });

  const addNewEvent = (data) => {
    setEventInfoList([...eventInfoList, data]);
  };

  const handleUnkwonClick = (e) => {
    ws.send('HUH');
  };

  const handleCloseConnection = (e) => {
    ws.close();
  };

  const updateCount = (count) => {
    setCount(count);
  };

  const handleClick = (e) => {
    ws.send('CLICK');
  };

  return (
    <div>
      <p>
        Number of clicks: <span id="num">{count}</span>
      </p>
      <button id="click" onClick={handleClick}>
        Click me
      </button>

      <p>
        You can also send a message that the WebSocket server doesn't recognize.
        This will cause the WebSocket server to return an "error" payload back
        to the client.
      </p>
      <button onClick={handleUnkwonClick}>Simulate Unknown Message</button>

      <p>
        When you're done clicking, you can close the connection below. Further
        clicks won't work until you refresh the page.
      </p>
      <button onClick={handleCloseConnection}>Close connection</button>

      <p id="error" style={{ color: 'red' }}>
        {errorMessage}
      </p>

      <h4>Incoming WebSocket data</h4>
      <ul id="events">
        {eventInfoList.map((eventInfo, index) => {
          return <li key={index}>{JSON.stringify(eventInfo)}</li>;
        })}
      </ul>
    </div>
  );
};

// https://github.com/reactwg/react-18/discussions/5
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
