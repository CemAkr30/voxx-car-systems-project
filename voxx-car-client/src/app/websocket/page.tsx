'use client';

import {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';

type AdresEvent = {
    type: string;
    id: string;
};

export default function WebSocketPage() {
    const [messages, setMessages] = useState<AdresEvent[]>([]);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get token from localStorage (safely)
        let token: string | null = null;

        try {
            // Only run localStorage in browser environment
            if (typeof window !== 'undefined') {
                debugger;
                token = localStorage.getItem('access_token');
            }
        } catch (e) {
            console.error('Error accessing localStorage:', e);
            setError('Could not access authentication token');
        }

        // Create STOMP client with authorization header
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
            connectHeaders: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            onConnect: () => {
                console.log('Connected with authorization');
                setConnected(true);
                setError(null);

                client.subscribe('/topic/adres', message => {
                    try {
                        const body: AdresEvent = JSON.parse(message.body);
                        setMessages(prev => [...prev, body]);
                    } catch (e) {
                        console.error('Error parsing message:', e);
                    }
                });
            },
            onStompError: frame => {
                console.error('STOMP error:', frame);
                setError(`Connection error: ${frame.headers?.message || 'Unknown error'}`);
                setConnected(false);
            },
            onDisconnect: () => {
                console.log('Disconnected');
                setConnected(false);
            }
        });

        // Start client if token exists
        if (!token) {
            setError('No authentication token found');
            console.warn('No authentication token found in localStorage');
        }

        try {
            client.activate();
        } catch (e) {
            console.error('Error activating STOMP client:', e);
            setError('Failed to establish connection');
        }

        // Cleanup function
        return () => {
            try {
                if (client.connected) {
                    client.deactivate();
                }
            } catch (e) {
                console.error('Error during cleanup:', e);
            }
        };
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Adres Olayları</h1>
            <p className="text-gray-500">
                Bağlantı durumu: {connected ? 'Bağlandı' : 'Bağlanıyor...'}
            </p>

            {error && (
                <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
                    {error}
                </div>
            )}

            <ul className="mt-4 list-disc pl-6">
                {messages.length === 0 && (
                    <li className="text-gray-400">Henüz mesaj yok</li>
                )}
                {messages.map((msg, idx) => (
                    <li key={idx} className="mb-1">
                        <span className="font-semibold">{msg.type}</span> - ID: {msg.id}
                    </li>
                ))}
            </ul>
        </div>
    );
}