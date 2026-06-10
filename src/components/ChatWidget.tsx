'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChatIcon, CloseIcon, SendIcon } from '@/components/icons'

interface Message {
  text: string
  sender: 'bot' | 'user'
}

export default function ChatWidget({ locale = 'uk', dict, phone }: { locale?: string; dict?: Record<string, string>; phone?: string }) {
  const d = dict || { greeting: 'Вітаємо! 👋 Як ми можемо вам допомогти?', placeholder: 'Напишіть повідомлення...', title: 'Онлайн-помічник' }
  const replyBase = d.reply || (locale === 'en'
    ? 'Thank you for reaching out! To let us contact you, click "I need help" at the top of the page and leave your contact details, or use the form in the Contacts section.'
    : 'Дякуємо за звернення! Щоб ми могли з вами зв\'язатися, натисніть «Потребую допомоги» вгорі сторінки та залиште контакти, або скористайтеся формою в розділі «Контакти».')
  const replyPhone = phone
    ? (locale === 'en' ? ` If it is urgent, call us: ${phone}` : ` Якщо питання термінове, телефонуйте: ${phone}`)
    : ''
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

    // Best-effort доставка в CRM (якщо CRM_WEBHOOK_URL налаштовано на сервері).
    fetch('/api/crm-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'chat-message', message: userMsg, locale }),
    }).catch((err) => console.error('[FIX] ChatWidget: failed to forward message', err))

    setTimeout(() => {
      setMessages(prev => [...prev, { text: replyBase + replyPhone, sender: 'bot' }])
    }, 600)
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
              <h4>{d.title || (locale === 'en' ? 'Support chat' : 'Чат підтримки')}</h4>
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
              placeholder={d.placeholder || (locale === 'en' ? 'Type a message...' : 'Напишіть повідомлення...')}
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
