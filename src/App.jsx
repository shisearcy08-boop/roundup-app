import { useState, useEffect, useRef } from "react";

const ACCENT = "#00e5a0";
const BLUE = "#3b9eff";
const RED = "#ff4f6d";
const BG = "#0a0c0f";
const CARD = "#111418";
const BORDER = "#1e2530";
const MUTED = "#6b7a8d";
const TEXT = "#e8edf5";
const SUBTEXT = "#b0bfcf";

const transactions = [
  { id: 1, merchant: "Blue Bottle Coffee", category: "☕", amount: 4.50, date: "Today, 9:12am" },
  { id: 2, merchant: "Whole Foods", category: "🛒", amount: 31.73, date: "Today, 8:01am" },
  { id: 3, merchant: "Uber", category: "🚗", amount: 12.40, date: "Yesterday" },
  { id: 4, merchant: "Netflix", category: "📺", amount: 15.99, date: "May 26" },
  { id: 5, merchant: "Shell Gas", category: "⛽", amount: 48.22, date: "May 25" },
  { id: 6, merchant: "Chipotle", category: "🌯", amount: 13.85, date: "May 24" },
];

const roundUp = amt => parseFloat((Math.ceil(amt) - amt).toFixed(2));
const totalSaved = transactions.reduce((s, t) => s + roundUp(t.amount), 0).toFixed(2);

const tips = [
  "You've saved the most this week from grocery runs. Keep it up! 🛒",
  "At this rate, you'll hit $500 saved by August. 🎯",
  "Your round-ups average $0.42 per transaction — right on track.",
  "Try enabling 2× round-ups on weekends to save even faster.",
];

function Nav({ screen, setScreen }) {
  const items = [
    { id: "home", icon: "⬡", label: "Home" },
    { id: "activity", icon: "↻", label: "Activity" },
    { id: "invest", icon: "↗", label: "Invest" },
    { id: "ai", icon: "✦", label: "AI" },
  ];
  return (
    <div style={{
      display: "flex", background: CARD,
      borderTop: `1px solid ${BORDER}`, flexShrink: 0,
    }}>
      {items.map(({ id, icon, label }) => (
        <button key={id} onClick={() => setScreen(id)} style={{
          flex: 1, background: "none", border: "none", cursor: "pointer",
          padding: "10px 0", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 3,
          color: screen === id ? ACCENT : MUTED,
          transition: "color 0.2s",
        }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

function Ring({ pct, size = 120, stroke = 10, color = ACCENT, children }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={BORDER} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>{children}</div>
    </div>
  );
}

function HomeScreen() {
  const goal = 500;
  const saved = 187.34;
  const pct = saved / goal;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1 }}>GOOD MORNING</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: TEXT }}>Hey, Alex 👋</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${BLUE}, ${ACCENT})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, color: "#000",
        }}>A</div>
      </div>

      {/* Savings ring card */}
      <div style={{
        background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
        padding: "24px 20px", display: "flex", alignItems: "center",
        gap: 24, marginBottom: 16,
      }}>
        <Ring pct={pct} size={110} stroke={9} color={ACCENT}>
          <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>${saved}</div>
          <div style={{ fontSize: 9, color: MUTED, fontFamily: "monospace", letterSpacing: 1 }}>SAVED</div>
        </Ring>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>EMERGENCY FUND GOAL</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: TEXT, marginBottom: 2 }}>${goal}</div>
          <div style={{ fontSize: 13, color: SUBTEXT, marginBottom: 12 }}>{Math.round(pct * 100)}% complete</div>
          <div style={{ background: "#0d1014", borderRadius: 4, height: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 4,
              background: `linear-gradient(90deg, ${ACCENT}, ${BLUE})`,
              width: `${pct * 100}%`, transition: "width 0.8s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[
          { label: "This Week", value: `$${totalSaved}`, color: ACCENT },
          { label: "This Month", value: "$14.82", color: BLUE },
          { label: "All Time", value: "$187.34", color: "#a78bfa" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            flex: 1, background: CARD, border: `1px solid ${BORDER}`,
            borderRadius: 12, padding: "14px 12px",
          }}>
            <div style={{ fontSize: 17, fontWeight: 700, color, marginBottom: 2 }}>{value}</div>
            <div style={{ fontSize: 10, color: MUTED, fontFamily: "monospace", letterSpacing: 0.5 }}>{label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Recent round-ups */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1, marginBottom: 12 }}>RECENT ROUND-UPS</div>
        {transactions.slice(0, 3).map(t => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 0", borderBottom: `1px solid ${BORDER}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#0d1014", border: `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>{t.category}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{t.merchant}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{t.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: SUBTEXT }}>${t.amount.toFixed(2)}</div>
              <div style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>+${roundUp(t.amount).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0" }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Activity</div>

      {/* Bar chart */}
      <div style={{
        background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
        padding: 20, marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1, marginBottom: 16 }}>WEEKLY ROUND-UPS</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
          {[1.2, 2.4, 0.8, 3.1, 2.7, 1.9, parseFloat(totalSaved)].map((v, i) => {
            const max = 3.5;
            const days = ["M","T","W","T","F","S","S"];
            const isToday = i === 6;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", borderRadius: 4,
                  height: `${(v / max) * 72}px`,
                  background: isToday ? ACCENT : "#1e2a3a",
                  transition: "height 0.5s ease",
                }} />
                <div style={{ fontSize: 10, color: isToday ? ACCENT : MUTED, fontFamily: "monospace" }}>{days[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All transactions */}
      <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1, marginBottom: 12 }}>ALL TRANSACTIONS</div>
      {transactions.map(t => (
        <div key={t.id} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 0", borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "#0d1014", border: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
          }}>{t.category}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{t.merchant}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{t.date}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: SUBTEXT }}>${t.amount.toFixed(2)}</div>
            <div style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>+${roundUp(t.amount).toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvestScreen() {
  const [selected, setSelected] = useState("conservative");
  const plans = [
    { id: "conservative", label: "Conservative", return: "4–6%", risk: "Low", color: ACCENT, desc: "Bonds & stable funds" },
    { id: "balanced", label: "Balanced", return: "7–10%", risk: "Med", color: BLUE, desc: "Mix of stocks & bonds" },
    { id: "growth", label: "Growth", return: "10–14%", risk: "High", color: "#a78bfa", desc: "Equity-focused growth" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0" }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 4 }}>Invest</div>
      <div style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>Your round-ups, put to work.</div>

      <div style={{
        background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
        padding: 20, marginBottom: 16, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 }}>TOTAL PORTFOLIO VALUE</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: ACCENT, marginBottom: 4 }}>$42.18</div>
        <div style={{ fontSize: 13, color: ACCENT }}>↑ +$3.21 this month (8.2%)</div>
      </div>

      <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", letterSpacing: 1, marginBottom: 12 }}>CHOOSE YOUR STRATEGY</div>
      {plans.map(p => (
        <div key={p.id} onClick={() => setSelected(p.id)} style={{
          background: selected === p.id ? `${p.color}12` : CARD,
          border: `1px solid ${selected === p.id ? p.color : BORDER}`,
          borderRadius: 12, padding: "14px 16px", marginBottom: 10, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s",
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: selected === p.id ? p.color : BORDER, flexShrink: 0,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: TEXT, fontWeight: 600 }}>{p.label}</div>
            <div style={{ fontSize: 12, color: MUTED }}>{p.desc}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, color: p.color, fontWeight: 600 }}>{p.return}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{p.risk} risk</div>
          </div>
        </div>
      ))}

      <div style={{
        background: "#0d1014", border: `1px dashed ${BORDER}`,
        borderRadius: 12, padding: "14px 16px", marginTop: 6,
      }}>
        <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
          💡 AI insight: Based on your savings rate, switching to <span style={{ color: BLUE }}>Balanced</span> could earn you an extra <span style={{ color: ACCENT }}>~$18</span> by year end.
        </div>
      </div>
    </div>
  );
}

function AIScreen() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi Alex! I'm your RoundUp AI. I can help you understand your spending, set goals, and make smarter financial decisions. What's on your mind?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setLoading(true);

    try {
      const systemPrompt = `You are a friendly, concise AI financial assistant inside the RoundUp app — a micro-savings app that rounds up purchases to the nearest dollar and saves the spare change. The user's name is Alex. They have saved $187.34 so far toward a $500 emergency fund goal. Their recent transactions include: coffee ($4.50), groceries ($31.73), Uber ($12.40), Netflix ($15.99), gas ($48.22), Chipotle ($13.85). Keep responses short (2–4 sentences), warm, and actionable. Use dollar amounts and specifics where possible. Avoid generic advice.`;

        // Simulated AI responses for deployed version (no backend proxy yet)
      const responses = [
        `Great question! Based on your spending, you've saved ${totalSaved} this week alone. At this pace you'll hit your $500 goal by late August! 🎯`,
        "Your biggest round-up opportunity is groceries — you shop frequently and those small cents add up fast. Consider enabling 2× round-ups on grocery purchases.",
        "Looking at your transactions, you spend an average of $18/day. Even saving just the round-ups puts you ahead of 60% of Americans your age.",
        "Your Netflix and Uber round-ups are small but consistent — that's actually the best kind of saving. Slow and steady wins the race! 💪",
        "Based on your current savings rate, I'd recommend the Balanced investment strategy. It could earn you an extra ~$18 by year end on top of your round-ups.",
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Hmm, something went wrong. Try again!" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 12px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: TEXT }}>AI Advisor</div>
        <div style={{ fontSize: 12, color: MUTED }}>Personalized to your finances</div>
      </div>

      {/* Quick tips */}
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {["How am I doing?", "Help me save faster", "Best investment?", "Spending habits"].map(q => (
            <button key={q} onClick={() => { setInput(q); }} style={{
              background: "#0d1014", border: `1px solid ${BORDER}`,
              borderRadius: 20, padding: "6px 14px", cursor: "pointer",
              color: SUBTEXT, fontSize: 12, whiteSpace: "nowrap",
              fontFamily: "inherit", flexShrink: 0,
            }}>{q}</button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            marginBottom: 12,
          }}>
            {m.role === "assistant" && (
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${ACCENT}, ${BLUE})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, marginRight: 8, alignSelf: "flex-end", marginBottom: 2,
              }}>✦</div>
            )}
            <div style={{
              maxWidth: "78%",
              background: m.role === "user" ? `${ACCENT}18` : CARD,
              border: `1px solid ${m.role === "user" ? ACCENT + "40" : BORDER}`,
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              padding: "10px 14px",
              fontSize: 13, color: SUBTEXT, lineHeight: 1.6,
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT}, ${BLUE})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
            }}>✦</div>
            <div style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderRadius: "16px 16px 16px 4px", padding: "10px 14px",
            }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%", background: MUTED,
                    animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px", borderTop: `1px solid ${BORDER}`,
        display: "flex", gap: 10, flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask anything about your money..."
          style={{
            flex: 1, background: "#0d1014", border: `1px solid ${BORDER}`,
            borderRadius: 24, padding: "10px 16px", color: TEXT,
            fontSize: 13, fontFamily: "inherit", outline: "none",
          }}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{
          width: 40, height: 40, borderRadius: "50%",
          background: input.trim() && !loading ? ACCENT : BORDER,
          border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
          color: "#000", fontSize: 16, display: "flex",
          alignItems: "center", justifyContent: "center",
          transition: "background 0.2s", flexShrink: 0,
        }}>↑</button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const screens = { home: <HomeScreen />, activity: <ActivityScreen />, invest: <InvestScreen />, ai: <AIScreen /> };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "#050608", padding: 16,
    }}>
      <div style={{
        width: 375, height: 720,
        background: BG, borderRadius: 40,
        border: `1px solid ${BORDER}`,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px #1e2530",
        fontFamily: "'Sora', system-ui, sans-serif",
      }}>
        {/* Status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 24px 0", flexShrink: 0,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>9:41</div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div style={{ fontSize: 12, color: TEXT }}>●●●●</div>
            <div style={{ fontSize: 12, color: TEXT }}>WiFi</div>
            <div style={{ fontSize: 12, color: TEXT }}>🔋</div>
          </div>
        </div>

        {screens[screen]}
        <Nav screen={screen} setScreen={setScreen} />
      </div>
    </div>
  );
}