import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NavButtons } from "./LayoutComponents";
import { Section, PARTNERS } from "./types";

interface NavProps { navigate: (s: Section) => void; goHome: () => void; goBack: () => void; }

export function SurveySection({ goHome, goBack }: NavProps) {
  const [form, setForm] = useState({ name: "", email: "", role: "", topic: "", comment: "" });
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Анкетирование</h1>
      {sent ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4"><Icon name="CheckCircle" size={30} className="text-primary" /></div>
          <h3 className="font-merriweather font-bold text-xl text-deep mb-2">Анкета отправлена!</h3>
          <p className="text-muted-foreground text-sm">Спасибо за участие. Ваши ответы помогают улучшить нашу работу.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="text-sm text-muted-foreground">Заполните анкету — ваши ответы помогают нам улучшать сервисы для студентов и партнёров.</p>
          {[{ k: "name", l: "Ваше имя", p: "Иван Иванов" }, { k: "email", l: "Email", p: "email@example.com" }].map(f => (
            <div key={f.k}>
              <label className="text-xs font-medium text-deep mb-1 block">{f.l}</label>
              <input value={form[f.k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
            </div>
          ))}
          {[
            { k: "role", l: "Ваша роль", opts: ["Студент", "Аспирант", "Преподаватель", "Сотрудник", "Партнёр"] },
            { k: "topic", l: "Интересующая тема", opts: ["Гранты", "Конкурсы", "Акселераторы", "Наука", "Партнёрство"] },
          ].map(f => (
            <div key={f.k}>
              <label className="text-xs font-medium text-deep mb-1 block">{f.l}</label>
              <select value={form[f.k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background">
                <option value="">Выберите...</option>
                {f.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-deep mb-1 block">Комментарий</label>
            <textarea value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))} placeholder="Ваши предложения..."
              className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
          </div>
          <button onClick={() => setSent(true)} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-teal-light transition-colors">
            Отправить анкету
          </button>
        </div>
      )}
    </div>
  );
}

export function ContactsSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Контакты</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          {[
            { icon: "Building", label: "Организация", value: "ФГБОУ ВО ОмГАУ им. П.А. Столыпина" },
            { icon: "MapPin", label: "Адрес", value: "644008, г. Омск, Институтская площадь, 1" },
            { icon: "Phone", label: "Телефон", value: "+7 (3812) 65-10-88" },
            { icon: "Mail", label: "E-mail", value: "is.ryzhova@omgau.org" },
            { icon: "Globe", label: "Сайт ОмГАУ", value: "omgau.org" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0"><Icon name={item.icon} size={14} className="text-primary" /></div>
              <div><div className="text-xs text-muted-foreground">{item.label}</div><div className="text-sm font-medium text-deep">{item.value}</div></div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-merriweather font-bold text-deep mb-4">Написать нам</h3>
          <div className="space-y-3">
            {[{ l: "Имя", p: "Ваше имя" }, { l: "Email", p: "Email для ответа" }].map((f, i) => (
              <div key={i}><label className="text-xs font-medium text-deep mb-1 block">{f.l}</label><input placeholder={f.p} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" /></div>
            ))}
            <div><label className="text-xs font-medium text-deep mb-1 block">Сообщение</label><textarea placeholder="Ваш вопрос или предложение..." className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" /></div>
            <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-teal-light transition-colors">Отправить сообщение</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PartnersSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Наши партнёры</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {PARTNERS.map((p, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="text-3xl flex-shrink-0">{p.logo}</div>
            <div><h3 className="font-semibold text-sm text-deep">{p.name}</h3><p className="text-xs text-muted-foreground mt-0.5">{p.type}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LoginSectionProps extends NavProps {
  loginForm: { email: string; password: string };
  setLoginForm: (f: { email: string; password: string }) => void;
  loginError: string;
  handleLogin: () => void;
}

export function LoginSection({ goHome, goBack, loginForm, setLoginForm, loginError, handleLogin }: LoginSectionProps) {
  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <NavButtons onHome={goHome} onBack={goBack} />
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-teal-dark rounded-2xl flex items-center justify-center mx-auto mb-3"><Icon name="LogIn" size={22} className="text-white" /></div>
          <h1 className="font-merriweather font-bold text-xl text-deep">Вход в систему</h1>
          <p className="text-xs text-muted-foreground mt-1">Управление инноваций и предпринимательства</p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-deep mb-1 block">Email</label>
            <input type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="is.ryzhova@omgau.org"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
          </div>
          <div>
            <label className="text-xs font-medium text-deep mb-1 block">Пароль</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
          </div>
          {loginError && <p className="text-xs text-red-500 flex items-center gap-1"><Icon name="AlertCircle" size={11} />{loginError}</p>}
          <button onClick={handleLogin} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-teal-light transition-colors">Войти</button>
        </div>
      </div>
    </div>
  );
}
