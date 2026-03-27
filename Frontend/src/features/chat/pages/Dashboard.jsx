import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import useChat from '../hooks/useChat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const messagesEndRef = useRef(null)

  const chats = useSelector((state) => state.chat?.chats || {})
  const currentChatId = useSelector((state) => state.chat?.currentChatId)

  const messages = chats[currentChatId]?.messages || []
  const hasMessages = messages.length > 0

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    const trimmed = chatInput.trim()
    if (!trimmed) return
    chat.handleSendMessage({ message: trimmed, chatId: currentChatId })
    setChatInput('')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        .dia-root { font-family: 'DM Sans', sans-serif; }

        /* Animated background blobs */
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(28px,-18px) scale(1.04); }
          66%      { transform: translate(-18px,14px) scale(0.97); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-22px,20px) scale(1.05); }
          80%      { transform: translate(18px,-12px) scale(0.96); }
        }
        @keyframes blobC {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(14px,22px) scale(1.06); }
        }
        .blob-a { animation: blobA 14s ease-in-out infinite; }
        .blob-b { animation: blobB 17s ease-in-out infinite; }
        .blob-c { animation: blobC 20s ease-in-out infinite; }

        /* Entrance animations */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu1 { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .fu2 { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.17s both; }
        .fu3 { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.30s both; }
        .fu4 { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.44s both; }
        .fu5 { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.58s both; }

        /* Message pop-in */
        @keyframes msgPop {
          from { opacity:0; transform:translateY(8px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .msg-pop { animation: msgPop 0.3s cubic-bezier(.22,1,.36,1) both; }

        /* Hide scrollbar */
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }

        /* Input card transitions */
        .input-card {
          transition: box-shadow 0.25s ease, transform 0.2s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
        }
        .input-card.focused {
          box-shadow: 0 10px 52px rgba(0,0,0,0.13), 0 2px 14px rgba(0,0,0,0.07);
          transform: translateY(-1px);
        }

        /* Buttons */
        .btn-early  { transition: background 0.18s, box-shadow 0.18s; }
        .btn-early:hover  { background: rgba(0,0,0,0.09) !important; }
        .btn-dl     { transition: background 0.18s, transform 0.16s, box-shadow 0.18s; }
        .btn-dl:hover     { background: #111 !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.28) !important; }
        .btn-dl:active    { transform: translateY(0); }
        .send-btn   { transition: background 0.2s, transform 0.15s; }
        .send-btn:hover   { transform: scale(1.07); }
        .send-btn:active  { transform: scale(0.95); }

        /* Markdown styles inside AI bubbles */
        .md p           { margin-bottom: 0.45em; line-height: 1.7; }
        .md p:last-child { margin-bottom:0; }
        .md ul          { list-style:disc; padding-left:1.3em; margin-bottom:0.45em; }
        .md ol          { list-style:decimal; padding-left:1.3em; margin-bottom:0.45em; }
        .md li          { margin-bottom:0.2em; }
        .md code        { background:rgba(0,0,0,0.07); padding:1px 5px; border-radius:4px; font-size:0.84em; font-family:monospace; }
        .md pre         { background:rgba(0,0,0,0.05); padding:10px 14px; border-radius:10px; overflow-x:auto; margin-bottom:0.45em; }
        .md pre code    { background:none; padding:0; }
        .md strong      { font-weight:600; }
        .md a           { color:#0055cc; text-decoration:underline; }
        .md h1,.md h2,.md h3 { font-weight:600; margin-bottom:0.35em; }
      `}</style>

      {/* ══════════════════════════════════
            MAIN WRAPPER
         ══════════════════════════════════ */}
      <main
        className="dia-root min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg,#eef0f8 0%,#f0eef8 25%,#f5eef5 55%,#f8eef0 100%)',
        }}
      >

        {/* ── BACKGROUND BLOBS ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Top-left lavender */}
          <div className="blob-a absolute -top-36 -left-36 w-[560px] h-[560px] rounded-full opacity-60"
            style={{ background: 'radial-gradient(circle,#cdd4f8 0%,#c2cff5 45%,transparent 72%)' }} />
          {/* Bottom-left peach */}
          <div className="blob-b absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full opacity-58"
            style={{ background: 'radial-gradient(circle,#fcd0c8 0%,#f9bece 50%,transparent 72%)' }} />
          {/* Bottom-right pink */}
          <div className="blob-c absolute bottom-8 -right-8 w-[420px] h-[420px] rounded-full opacity-48"
            style={{ background: 'radial-gradient(circle,#f8c8d2 0%,#f2c0dc 52%,transparent 72%)' }} />
          {/* Top-right pale blue */}
          <div className="blob-a absolute -top-8 right-24 w-[300px] h-[300px] rounded-full opacity-35"
            style={{ background: 'radial-gradient(circle,#d5e8f8 0%,transparent 70%)' }} />
        </div>

        {/* ══════════════════════════════════
              CONTENT
           ══════════════════════════════════ */}
        <div className="relative z-10 w-full max-w-[560px] mx-auto px-4 flex flex-col items-center">

          {/* ── LOGO ── */}
          <div className="fu1 flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#0a0a0a' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <span className="text-[17px] font-semibold tracking-tight" style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}>
              Dia
            </span>
          </div>

          {/* ── HEADLINE ── */}
          <h1
            className="fu2 text-center leading-tight mb-7"
            style={{
              fontSize: 'clamp(30px,5.5vw,50px)',
              fontWeight: 400,
              color: '#0a0a0a',
              letterSpacing: '-0.025em',
            }}
          >
            Chat with your tabs
          </h1>

          {/* ── CTA BUTTONS ── */}
          <div className="fu3 flex items-center gap-3 mb-8 flex-wrap justify-center">
            <button
              className="btn-early px-5 py-2.5 rounded-full text-[13.5px] font-medium"
              style={{
                background: 'rgba(0,0,0,0.07)',
                color: '#333',
                border: 'none',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              Early access
            </button>
            <button
              className="btn-dl px-5 py-2.5 rounded-full text-[13.5px] font-semibold"
              style={{
                background: '#0a0a0a',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
              }}
            >
              Download Dia
            </button>
          </div>

          {/* ── CHAT MESSAGES ── */}
          {hasMessages && (
            <div
              className="fu4 no-scrollbar w-full mb-4 space-y-3 px-1"
              style={{ maxHeight: 320, overflowY: 'auto' }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  className={`msg-pop flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* Assistant avatar */}
                  {msg.role !== 'user' && (
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5"
                      style={{ background: '#0a0a0a' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                      </svg>
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className="max-w-[80%] px-4 py-3 text-[13.5px]"
                    style={{
                      borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                      background: msg.role === 'user'
                        ? '#0a0a0a'
                        : 'rgba(255,255,255,0.80)',
                      color: msg.role === 'user' ? '#fff' : '#1a1a1a',
                      backdropFilter: msg.role !== 'user' ? 'blur(16px)' : 'none',
                      WebkitBackdropFilter: msg.role !== 'user' ? 'blur(16px)' : 'none',
                      border: msg.role !== 'user' ? '1px solid rgba(255,255,255,0.9)' : 'none',
                      boxShadow: msg.role === 'user'
                        ? '0 2px 12px rgba(0,0,0,0.2)'
                        : '0 2px 16px rgba(0,0,0,0.07)',
                      lineHeight: 1.65,
                    }}
                  >
                    {msg.role === 'user' ? (
                      <p style={{ margin: 0 }}>{msg.content}</p>
                    ) : (
                      <div className="md">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {/* User avatar */}
                  {msg.role === 'user' && (
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5 text-[11px] font-semibold"
                      style={{ background: 'rgba(0,0,0,0.1)', color: '#444' }}
                    >
                      U
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* ── INPUT BOX ── */}
          <form
            onSubmit={handleSubmitMessage}
            className={`fu${hasMessages ? '5' : '4'} input-card ${inputFocused ? 'focused' : ''} w-full rounded-2xl overflow-hidden`}
            style={{
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.88)',
            }}
          >
            {/* Top: search icon + input + send */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
              {/* Search icon */}
              <svg className="flex-shrink-0" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="#c0c0c0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>

              {/* Text input */}
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Hey Dia..."
                className="flex-1 bg-transparent outline-none text-[14px]"
                style={{
                  color: '#111',
                  fontFamily: "'DM Sans', sans-serif",
                  caretColor: '#0a0a0a',
                }}
              />

              {/* Send button */}
              <button
                type="submit"
                className="send-btn w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: chatInput.trim() ? '#0a0a0a' : '#d8d8d8',
                  border: 'none',
                  cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/>
                  <polyline points="5 12 12 5 19 12"/>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(0,0,0,0.055)', margin: '0 16px' }} />

            {/* Bottom: + Add tabs or files */}
            <div className="flex items-center gap-1.5 px-4 py-2.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#c0c0c0" strokeWidth="2.4" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span className="text-[12.5px]" style={{ color: '#c0c0c0' }}>
                Add tabs or files
              </span>
            </div>
          </form>

          {/* ── FOOTER HINT ── */}
          {!hasMessages && (
            <p className="fu5 text-[12px] mt-4" style={{ color: '#bbb' }}>
              Not an Arc member?{' '}
              <button
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#999', fontWeight: 600, fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#555'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >
                Join the waitlist →
              </button>
            </p>
          )}
        </div>
      </main>
    </>
  )
}

export default Dashboard
