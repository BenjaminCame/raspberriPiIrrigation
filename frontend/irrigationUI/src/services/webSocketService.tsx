import { useEffect, useRef, useState } from 'react';

export default function webScoketConnection(){
    const [messages, setMessages] = useState<string[]>([]);
    const [status, setStatus] = useState('connection to server...');
    const [inputValue, setInputValue] = useState('');
    const wsRef = useRef<WebSocket | null>(null);

    useEffect (() => {
        const ws = new WebSocket(`ws://${window.location.hostname}:3000`)
        wsRef.current = ws;

        ws.onopen = () => {
        console.log('Connected to the Irrigation WebSocket server');
        setStatus('Connected');
        };

        ws.onmessage = (event: MessageEvent) => {
        setMessages(prev => [...prev, `Server: ${event.data}`]);
        };

        ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setStatus('Error');
        };

        ws.onclose = () => {
        console.log('Disconnected from the server');
        setStatus('Disconnected');
        };

        return () => {
            ws.close();
        }
    },[])

    const sendMessage = () => {
        if (wsRef.current && inputValue.trim() !== '') {
            wsRef.current.send(inputValue);
            setMessages(prev => [...prev, `You: ${inputValue}`]);
            setInputValue('');
        }
    }

    return (
      <div>
        <h1>WebSocket Client</h1>
        <div id="status">{status}</div>
        <div id="messages" style={{ margin: '1em 0', minHeight: '100px', border: '1px solid #ccc', padding: '0.5em' }}>
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    )
}