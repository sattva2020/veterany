'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChatIcon, CloseIcon, SendIcon } from '@/components/icons'

interface Message {
  text: string
  sender: 'bot' | 'user'
}

export default function ChatWidget({ locale = 'uk', dict }: { locale?: string; dict?: Record<string, string> }) {
  const d = dict || { greeting: 'Вітаємо! 👋 Як ми можемо вам допомогти?', placeholder: 'Напишіть повідомлення...', title: 'Онлайн-помічник' }
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: d.greeting, sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }])
    setInput('')

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'Дякуємо за ваше повідомлення! Наш спеціаліст незабаром зв\'яжеться з вами. Якщо у вас термінове питання, зателефонуйте: +38 (044) 123-45-67',
        sender: 'bot'
      }])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-window-header">
            <div>
              <h4>Чат підтримки</h4>
              <p>Зазвичай відповідаємо протягом 5 хвилин</p>
            </div>
            <button className="chat-window-close" onClick={() => setIsOpen(false)} aria-label="Закрити чат">
              <CloseIcon size={20} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Напишіть повідомлення..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} aria-label="Надіслати">
              <SendIcon size={18} />
            </button>
          </div>
        </div>
      )}

      <button className="chat-widget-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Відкрити чат">
        {isOpen ? <CloseIcon size={24} /> : <ChatIcon size={24} />}
      </button>
    </>
  )
}
