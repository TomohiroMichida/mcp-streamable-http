'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/use-chat';

export default function ChatPage() {
  const [prompt, setPrompt] = useState('');
  const { messages, loading, sendMessage } = useChat();

  const handleSend = async () => {
    if (!prompt.trim()) return;

    await sendMessage(prompt);
    setPrompt('');
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">エージェントPOC</h1>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 mb-4 overflow-y-auto shadow-sm">
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">
                    {message.role === 'user' ? 'あなた' : 'AIエージェント'}
                  </div>
                  <pre className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </pre>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">AI</div>
                  <div className="text-sm text-gray-600">入力中...</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-lg mb-2">💬</div>
              <p>会話を始めましょう</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="AIへの指示を入力してください..."
          disabled={loading}
        />
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleSend}
            disabled={loading || !prompt.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? '送信中...' : '送信'}
          </Button>
        </div>
      </div>
    </div>
  );
}
