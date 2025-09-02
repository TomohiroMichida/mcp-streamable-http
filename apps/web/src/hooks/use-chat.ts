import { useState } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useChat = (): {
  messages: Message[];
  loading: boolean;
  sendMessage: (prompt: string) => Promise<void>;
} => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/completions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }
      );
      const data = await res.json();

      const aiMessage: Message = {
        role: 'assistant',
        content: data.content ?? 'No response',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
};
