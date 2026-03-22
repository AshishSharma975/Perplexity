{/* 🌈 Background Blob */}
<div className="absolute inset-0 -z-10 flex justify-center items-center">
  <div className="w-[600px] h-[600px] bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
</div>

{/* 🧠 MAIN */}
<div className="flex flex-col items-center justify-center h-full px-4">

  {/* 👇 IF NO CHAT */}
  {messages.length === 0 ? (
    <>
      <h2 className="text-gray-500">Hey {user?.user?.name || "Alex"}</h2>

      <h1 className="text-4xl md:text-5xl font-semibold mt-2 mb-6 text-center">
        How can Aurora help you today?
      </h1>

      {/* INPUT */}
      <div className="w-full max-w-2xl bg-black text-white rounded-3xl p-5 shadow-xl">

        <input
          type="text"
          placeholder="Type your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full bg-transparent outline-none text-lg"
        />

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-400">
            Upload or type your idea
          </span>

          <button
            onClick={handleSend}
            className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  ) : (
    /* 💬 CHAT UI CENTER */
    <div className="w-full max-w-3xl flex flex-col gap-4">

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`px-5 py-3 rounded-2xl max-w-xl text-sm shadow-md ${
              msg.role === "user"
                ? "bg-black text-white"
                : "bg-white/70 backdrop-blur-md"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {/* 🔥 Input stays center */}
      <div className="mt-6 bg-black text-white rounded-2xl p-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center"
        >
          ➤
        </button>
      </div>

    </div>
  )}

</div>