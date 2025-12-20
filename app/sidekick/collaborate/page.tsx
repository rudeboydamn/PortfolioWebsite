"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/theme-toggle';

type Message = {
  id: string;
  sender: 'user' | 'expert';
  message: string;
  timestamp: string;
};

type MindMapNode = {
  id: string;
  label: string;
  isRoot?: boolean;
};

export default function SidekickCollaboratePage() {
  const [topic, setTopic] = useState('');
  const [userName, setUserName] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [mindMapNodes, setMindMapNodes] = useState<MindMapNode[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newSessionId = `session-${Date.now()}`;
    setSessionId(newSessionId);
    
    // Initialize mind map with root node
    setMindMapNodes([
      { id: 'root', label: topic, isRoot: true }
    ]);

    // Add initial AI message
    setTimeout(() => {
      setMessages([{
        id: Date.now().toString(),
        sender: 'expert',
        message: `Welcome to the collaborative session on "${topic}"! I'm your AI expert. Feel free to ask questions, share your thoughts, or explore different aspects of this topic together. What would you like to explore first?`,
        timestamp: new Date().toISOString(),
      }]);
    }, 500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: messageInput,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `That's an interesting perspective on ${topic}. Let me add some context...`,
        `Great question! This relates to several key aspects we should explore.`,
        `Building on your point, there are a few important considerations here.`,
        `I see what you're getting at. Let me elaborate on this further.`,
        `That's a crucial observation. Here's how it connects to the broader topic.`,
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'expert',
        message: responses[Math.floor(Math.random() * responses.length)] + ` The concept you mentioned is fundamental to understanding ${topic}. Would you like me to dive deeper into any specific aspect, or shall we explore related subtopics?`,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Add to mind map
      const newNode: MindMapNode = {
        id: Date.now().toString(),
        label: messageInput.slice(0, 40) + (messageInput.length > 40 ? '...' : ''),
      };
      setMindMapNodes(prev => [...prev, newNode]);
    }, 1500);
  };

  const handleEndSession = () => {
    setSessionId(null);
    setMessages([]);
    setMindMapNodes([]);
    setTopic('');
    setUserName('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--background)', 
      color: 'rgba(255,255,255,0.9)', 
      fontFamily: "'Poppins', sans-serif", 
      padding: '2rem' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-color: #6366f1;
          --text-color: rgba(255,255,255,0.9);
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }

        [data-theme="dark"] {
          --primary-color: #818cf8;
          --background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        .collaborate-container { max-width: 1200px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #6366f1, #4f46e5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.1rem; }
        
        .card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 25px; padding: 2rem; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 2rem; }
        .card-title { font-size: 1.5rem; font-weight: 600; color: white; margin-bottom: 1.5rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; color: rgba(255,255,255,0.9); font-weight: 500; margin-bottom: 0.5rem; font-size: 0.95rem; }
        .form-input { width: 100%; padding: 1rem 1.25rem; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.1); border-radius: 15px; color: white; font-size: 1rem; transition: all 0.3s ease; font-family: inherit; }
        .form-input:focus { outline: none; border-color: #6366f1; background: rgba(255,255,255,0.1); }
        .form-input::placeholder { color: rgba(255,255,255,0.4); }
        
        .btn-start { width: 100%; padding: 1rem 2rem; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none; border-radius: 15px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }
        .btn-start:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4); }
        
        .session-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        
        .chat-container { display: flex; flex-direction: column; }
        .session-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem; }
        .session-topic { font-size: 1.3rem; font-weight: 600; color: white; }
        .session-id { font-size: 0.85rem; color: rgba(255,255,255,0.5); }
        .btn-end { padding: 0.5rem 1rem; background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 10px; font-size: 0.85rem; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }
        .btn-end:hover { background: rgba(239, 68, 68, 0.3); }
        
        .messages-container { flex: 1; min-height: 400px; max-height: 500px; overflow-y: auto; padding: 1rem; background: rgba(0,0,0,0.1); border-radius: 15px; margin-bottom: 1rem; }
        .message { margin-bottom: 1rem; }
        .message.user { text-align: right; }
        .message.expert { text-align: left; }
        .message-bubble { display: inline-block; max-width: 80%; padding: 1rem 1.25rem; border-radius: 15px; text-align: left; }
        .message.user .message-bubble { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border-bottom-right-radius: 5px; }
        .message.expert .message-bubble { background: rgba(255,255,255,0.1); color: white; border-bottom-left-radius: 5px; }
        .message-sender { font-size: 0.75rem; font-weight: 600; margin-bottom: 0.25rem; opacity: 0.8; }
        .message-text { line-height: 1.6; }
        
        .typing-indicator { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.6); font-size: 0.9rem; padding: 0.5rem; }
        .typing-dots { display: flex; gap: 4px; }
        .typing-dot { width: 8px; height: 8px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out; }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        
        .message-form { display: flex; gap: 0.75rem; }
        .message-input { flex: 1; padding: 1rem; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.1); border-radius: 15px; color: white; font-size: 1rem; font-family: inherit; }
        .message-input:focus { outline: none; border-color: #6366f1; }
        .message-input::placeholder { color: rgba(255,255,255,0.4); }
        .btn-send { padding: 1rem 1.5rem; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none; border-radius: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }
        .btn-send:hover { box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4); }
        
        .mindmap-container { }
        .mindmap-title { font-size: 1.2rem; font-weight: 600; color: white; margin-bottom: 1rem; }
        .mindmap-nodes { }
        .mindmap-node { padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-radius: 10px; font-size: 0.9rem; }
        .mindmap-node.root { background: rgba(99, 102, 241, 0.3); color: white; font-weight: 600; font-size: 1rem; margin-bottom: 1rem; }
        .mindmap-node:not(.root) { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); margin-left: 1rem; border-left: 2px solid rgba(99, 102, 241, 0.4); }
        .mindmap-hint { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
        
        @media (max-width: 900px) {
          .session-layout { grid-template-columns: 1fr; }
          .mindmap-container { order: 2; }
          .chat-container { order: 1; }
          .messages-container { min-height: 300px; max-height: 400px; }
        }
        
        @media (max-width: 768px) {
          .page-title { font-size: 1.8rem; }
          .message-bubble { max-width: 90%; }
        }
      `}</style>
      
      <div className="collaborate-container">
        <Link href="/sidekick" className="back-link">
          ← Back to Sidekick
        </Link>
        
        <ThemeToggle />
        
        <h1 className="page-title">mySidekick Collaboration</h1>
        <p className="page-subtitle">Real-time collaborative knowledge curation with AI experts</p>

        {!sessionId ? (
          /* Session Creation Form */
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="card-title">Start New Session</h2>
            
            <form onSubmit={handleStartSession}>
              <div className="form-group">
                <label className="form-label">Discussion Topic *</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g., Climate Change Solutions, AI Ethics"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Name (optional)</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-start">
                💬 Start Collaborative Session
              </button>
            </form>
          </div>
        ) : (
          /* Active Session Interface */
          <div className="session-layout">
            <div className="chat-container">
              <div className="card">
                <div className="session-header">
                  <div>
                    <div className="session-topic">{topic}</div>
                    <div className="session-id">Session ID: {sessionId}</div>
                  </div>
                  <button className="btn-end" onClick={handleEndSession}>
                    End Session
                  </button>
                </div>

                <div className="messages-container">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-bubble">
                        <div className="message-sender">
                          {msg.sender === 'user' ? (userName || 'You') : 'AI Expert'}
                        </div>
                        <div className="message-text">{msg.message}</div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="typing-indicator">
                      <span>AI Expert is typing</span>
                      <div className="typing-dots">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                <form className="message-form" onSubmit={handleSendMessage}>
                  <input 
                    type="text"
                    className="message-input"
                    placeholder="Ask a question or share insights..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button type="submit" className="btn-send">
                    Send
                  </button>
                </form>
              </div>
            </div>

            <div className="mindmap-container">
              <div className="card">
                <h3 className="mindmap-title">Knowledge Mind Map</h3>
                
                <div className="mindmap-nodes">
                  {mindMapNodes.map((node) => (
                    <div 
                      key={node.id} 
                      className={`mindmap-node ${node.isRoot ? 'root' : ''}`}
                    >
                      {node.label}
                    </div>
                  ))}
                </div>
                
                <p className="mindmap-hint">
                  Mind map updates as you explore the topic together
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
