import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "./types";

// ─── NavButtons ───────────────────────────────────────────────────────────────
export function NavButtons({ onHome, onBack }: { onHome: () => void; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button onClick={onHome} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <Icon name="Home" size={15} />
        <span>Главная</span>
      </button>
      <span className="text-muted-foreground/40">|</span>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <Icon name="ArrowLeft" size={15} />
        <span>Назад</span>
      </button>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export function Breadcrumb({ items, onNavigate }: { items: { label: string; section?: Section }[]; onNavigate: (s: Section) => void }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Icon name="ChevronRight" size={14} />}
          {item.section ? (
            <button onClick={() => onNavigate(item.section!)} className="hover:text-primary transition-colors story-link">{item.label}</button>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
interface HeaderProps {
  section: Section;
  isLoggedIn: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  setIsLoggedIn: (v: boolean) => void;
  navigate: (s: Section) => void;
  handleQuestion: () => void;
}

export function Header({ section, isLoggedIn, mobileMenuOpen, setMobileMenuOpen, setIsLoggedIn, navigate, handleQuestion }: HeaderProps) {
  return (
    <header className="bg-teal-dark text-white shadow-lg sticky top-0 z-50">
      <div className="border-b border-white/10 py-1 px-4 md:px-8 flex items-center justify-between text-xs text-white/50">
        <span>УИиП</span>
        <a href="https://omgau.org" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">ФГБОУ ВО Омский ГАУ</a>
      </div>
      <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <button onClick={() => navigate("home")} className="flex items-center gap-3 group flex-shrink-0">
          <img src="https://cdn.poehali.dev/files/0d251974-c62e-4e11-b3a1-17bee3ab60eb.png" alt="УИиП" className="h-16 w-auto object-cover rounded-xl group-hover:scale-105 transition-transform" />
        </button>

        <nav className="hidden xl:flex items-center gap-0.5 flex-wrap">
          {NAV_ITEMS.map(item => (
            <button key={item.section} onClick={() => navigate(item.section)}
              className={`px-2.5 py-1.5 rounded text-xs transition-all ${section === item.section ? "bg-black/10 text-black" : "text-black hover:bg-black/10"}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-1 text-white/60 hover:text-white text-xs transition-colors">
              <Icon name="LogOut" size={15} /><span className="hidden sm:inline">Выйти</span>
            </button>
          ) : (
            <button onClick={() => navigate("login")} className="flex items-center gap-1 text-white/60 hover:text-white text-xs transition-colors">
              <Icon name="LogIn" size={15} /><span className="hidden sm:inline">Войти</span>
            </button>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden text-white/70 hover:text-white ml-1">
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden bg-teal-dark border-t border-white/10 px-4 py-3 grid grid-cols-3 gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.section} onClick={() => navigate(item.section)}
              className="flex items-center gap-1.5 px-2 py-2 rounded text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Icon name={item.icon} size={13} />{item.label}
            </button>
          ))}
          <button onClick={() => navigate("calendar")}
            className="flex items-center gap-1.5 px-2 py-2 rounded text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <Icon name="Calendar" size={13} />Календарь
          </button>
          <button onClick={handleQuestion}
            className="col-span-3 mt-1 flex items-center justify-center gap-2 bg-gold text-deep py-2 rounded text-xs font-semibold">
            <Icon name="MessageCircleQuestion" size={13} />Задать вопрос
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
interface FooterProps {
  navigate: (s: Section) => void;
  handleQuestion: () => void;
}

export function Footer({ navigate, handleQuestion }: FooterProps) {
  return (
    <footer className="bg-deep text-white/70 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="https://cdn.poehali.dev/files/0d251974-c62e-4e11-b3a1-17bee3ab60eb.png" alt="УИиП логотип" className="h-12 w-auto object-cover rounded-xl" />
              <span className="font-merriweather font-bold text-white text-sm">Управление инноваций и предпринимательства</span>
            </div>
            <p className="text-xs leading-relaxed">ФГБОУ ВО Омский ГАУ<br />644008, г. Омск, Институтская площадь, 1</p>
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-3">Контакты</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><Icon name="Mail" size={12} />ov.kosenchuk@omgau.org</div>
              <div className="flex items-center gap-2"><Icon name="Phone" size={12} />+7 (3812) 65-10-88</div>
              <div className="flex items-center gap-2"><Icon name="Globe" size={12} />omgau.org</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>© 2026 Управление инноваций и предпринимательства </span>
          <button onClick={handleQuestion} className="flex items-center gap-1.5 text-gold hover:text-gold/80 transition-colors"></button>
        </div>
      </div>
    </footer>
  );
}

// ─── QuestionDialog ───────────────────────────────────────────────────────────
interface QuestionDialogProps {
  questionOpen: boolean;
  questionText: string;
  questionSent: boolean;
  setQuestionOpen: (v: boolean) => void;
  setQuestionText: (v: string) => void;
  sendQuestion: () => void;
}

export function QuestionDialog({ questionOpen, questionSent, setQuestionOpen, setQuestionText: _, sendQuestion: __ }: QuestionDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    await fetch("https://functions.poehali.dev/f51a956a-328e-4cdf-b880-af3d8208db88", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, source: "Задать вопрос" }),
    });
    setLoading(false);
    setSent(true);
    setTimeout(() => { setSent(false); setQuestionOpen(false); setMessage(""); setName(""); setEmail(""); }, 3000);
  };

  if (!questionOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setQuestionOpen(false)}>
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-merriweather font-bold text-lg text-deep">Задать вопрос</h3>
          <button onClick={() => setQuestionOpen(false)} className="text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>
        </div>
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="CheckCircle" size={28} className="text-primary" />
            </div>
            <p className="font-medium text-deep">Вопрос отправлен!</p>
            <p className="text-sm text-muted-foreground mt-1">Ответ придёт на почту is.ryzhova@omgau.org</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-deep mb-1 block">Сообщение</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Введите ваш вопрос..."
                className="w-full border border-border rounded-lg p-3 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
            </div>
            <div>
              <label className="text-xs font-medium text-deep mb-1 block">Имя</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
            </div>
            <div>
              <label className="text-xs font-medium text-deep mb-1 block">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email для ответа"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
            </div>
            <button onClick={handleSend} disabled={!message.trim() || loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-teal-light transition-colors disabled:opacity-40">
              {loading ? "Отправляем..." : "Отправить сообщение"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}