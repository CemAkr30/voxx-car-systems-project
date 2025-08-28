import {useEffect, useRef, useState} from "react";
import {Client, type IMessage} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {WebSocketMessage} from "@/types";

type UseWebSocketTopicOptions<T extends WebSocketMessage> = {
    topic: string;
    onMessage?: (message: T) => void;
};

export function useWebSocketTopic<T extends WebSocketMessage>({
                                                                  topic,
                                                                  onMessage,
                                                              }: UseWebSocketTopicOptions<T>) {
    const [messages, setMessages] = useState<T[]>([]);
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://voxxcarsystems.online/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(topic, (message: IMessage) => {
                    try {
                        const parsed: T = JSON.parse(message.body);
                        setMessages((prev) => [...prev, parsed]);
                        if (onMessage) onMessage(parsed);
                        console.log(JSON.parse(message.body));
                    } catch (e) {
                        console.error("Failed to parse message", e);
                    }
                });
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [topic, onMessage]);

    return messages;
}
