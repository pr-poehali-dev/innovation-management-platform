import Icon from "@/components/ui/icon";
import { NavButtons } from "./LayoutComponents";
import { Section, EventType, CalendarEvent, GrantItem, NewsItem, EVENTS, NEWS, VICTORIES, typeLabel, typeBadgeColor } from "./types";

// ─── Shared props types ───────────────────────────────────────────────────────
interface NavProps { navigate: (s: Section) => void; goHome: () => void; goBack: () => void; }

// ─── HomeSection ──────────────────────────────────────────────────────────────
export function HomeSection({ navigate }: { navigate: (s: Section) => void }) {
  return (
    <div>
      <section className="bg-gradient-to-br from-teal-dark via-teal to-teal-light text-white py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-10 right-16 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <h1 className="font-merriweather font-black text-3xl md:text-5xl leading-tight mb-4">
            Управление инноваций<br />
            <span className="text-gold">и предпринимательства</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-2xl">
            Конкурсы, гранты, мероприятия и программы акселерации — всё в одном месте для студентов, учёных и бизнес-партнёров.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("calendar")} className="bg-white/15 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/25 transition-colors flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={16} />Календарь событий
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8 items-center">
          <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 pr-8 border-r border-border">
            <span className="font-merriweather font-black text-7xl leading-none text-primary">2025</span>
            <span className="font-merriweather font-bold text-2xl text-deep mt-1">год</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
            {[
              { value: "34 ед.", label: "Заявок подано на инновационные конкурсы", icon: "FileText" },
              { value: "5 чел.", label: "Победителей конкурсов", icon: "Trophy" },
              { value: "5 млн.", label: "Конкурсное финансирование", icon: "Banknote" },
              { value: "5 ед.", label: "Научные мероприятия", icon: "Rocket" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon name={s.icon} size={18} className="text-primary" />
                </div>
                <div className="font-merriweather font-bold text-2xl text-deep">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-merriweather font-bold text-2xl text-deep mb-8">Разделы портала</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { section: "about" as Section, icon: "Info", title: "О нас", desc: "Цели, задачи, структура" },
            { section: "news" as Section, icon: "Newspaper", title: "Новости", desc: "Актуальные события" },
            { section: "students" as Section, icon: "Medal", title: "Конкурсы", desc: "Гранты, конкурсы, стипендии" },
            { section: "victories" as Section, icon: "Trophy", title: "Победители", desc: "Наши достижения" },
            { section: "science" as Section, icon: "FlaskConical", title: "Инновации", desc: "Наука и бизнес" },
            { section: "partners" as Section, icon: "Handshake", title: "Партнёры", desc: "Партнёры и соратники" },
            { section: "links" as Section, icon: "Link", title: "Ссылки", desc: "Ресурсы и платформы" },
            { section: "infographics" as Section, icon: "BarChart3", title: "Инфографика", desc: "Визуальные данные" },
            { section: "survey" as Section, icon: "ClipboardList", title: "Анкета", desc: "Опросы и формы" },
            { section: "contacts" as Section, icon: "Phone", title: "Контакты", desc: "Как с нами связаться" },
          ].map(card => (
            <button key={card.section} onClick={() => navigate(card.section)}
              className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group hover-scale">
              <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                <Icon name={card.icon} size={17} className="text-primary group-hover:text-white" />
              </div>
              <div className="font-semibold text-sm text-black">{card.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{card.desc}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-merriweather font-bold text-2xl text-deep">Последние новости</h2>
            <button onClick={() => navigate("news")} className="text-primary text-sm hover:underline flex items-center gap-1">Все новости<Icon name="ArrowRight" size={13} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[...NEWS].sort((a, b) => b.id - a.id).slice(0, 3).map(n => (
              <div key={n.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
                <span className="text-xs bg-teal-50 text-primary px-2 py-0.5 rounded-full font-medium">{n.tag}</span>
                <h3 className="font-semibold text-sm text-deep mt-2 mb-1 leading-snug">{n.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{n.text}</p>
                <div className="text-xs text-muted-foreground mt-3">{n.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-merriweather font-bold text-2xl text-deep">Ближайшие события</h2>
          <button onClick={() => navigate("calendar")} className="text-primary text-sm hover:underline flex items-center gap-1">Все события<Icon name="ArrowRight" size={13} /></button>
        </div>
        <div className="space-y-3">
          {EVENTS.slice(0, 4).map(ev => (
            <div key={ev.id} className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="bg-teal-50 rounded-lg p-2 flex-shrink-0"><Icon name="Calendar" size={17} className="text-primary" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm text-deep">{ev.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadgeColor(ev.type)}`}>{typeLabel(ev.type)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{ev.description}</p>
              </div>
              <div className="text-xs text-muted-foreground flex-shrink-0">{ev.date.split("-").reverse().join(".")}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── AboutSection ─────────────────────────────────────────────────────────────
export function AboutSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">О нас</h1>
      <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-100 rounded-xl p-6 mb-8">
        <p className="text-base text-foreground leading-relaxed">Управление инноваций и предпринимательства ФГБОУ ВО Омский ГАУ обеспечивает комплексное сопровождение инновационной деятельности университета, поддерживает молодых учёных, студентов-предпринимателей и развивает партнёрство с бизнес-сообществом.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { icon: "Target", title: "Цели управления", items: ["Развитие инновационной экосистемы", "Коммерциализация научных разработок", "Поддержка студенческого предпринимательства", "Привлечение конкурсного финансирования", "Укрепление связей с партнёрами"] },
          { icon: "ListTodo", title: "Основные задачи", items: ["Нормативное обеспечение, организация, управление и сопровождение инновационной деятельности университета", "Развитие корпоративного сотрудничества с реальным сектором экономики", "Развитие студенческого предпринимательства", "Ведение реестра инновационных проектов"] },
        ].map((block, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon name={block.icon} size={17} className="text-primary" />
              <h3 className="font-merriweather font-bold text-deep">{block.title}</h3>
            </div>
            <ul className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name={i === 0 ? "CheckCircle" : "ArrowRight"} size={13} className={`mt-0.5 flex-shrink-0 ${i === 0 ? "text-primary" : "text-gold-dark"}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NewsSection ──────────────────────────────────────────────────────────────
interface NewsSectionProps extends NavProps { setSelectedNews: (n: NewsItem) => void; }
export function NewsSection({ goHome, goBack, navigate, setSelectedNews }: NewsSectionProps) {
  const handleClick = (n: NewsItem) => {
    if (n.fullText) { setSelectedNews(n); navigate("news-detail"); }
  };
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Новости</h1>
      <div className="space-y-4">
        {[...NEWS].sort((a, b) => b.id - a.id).map(n => (
          <article
            key={n.id}
            onClick={() => handleClick(n)}
            className={`bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow ${n.fullText ? "cursor-pointer" : ""}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs bg-teal-50 text-primary px-2.5 py-1 rounded-full font-medium">{n.tag}</span>
              <span className="text-xs text-muted-foreground">{n.date}</span>
              {n.fullText && <span className="ml-auto text-xs text-primary flex items-center gap-1">Подробнее <Icon name="ArrowRight" size={12} /></span>}
            </div>
            <h2 className="font-merriweather font-bold text-lg text-deep mb-2">{n.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{n.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// ─── NewsDetailSection ────────────────────────────────────────────────────────
interface NewsDetailSectionProps extends NavProps { selectedNews: NewsItem | null; }
export function NewsDetailSection({ goHome, goBack, selectedNews }: NewsDetailSectionProps) {
  if (!selectedNews) return null;
  const paragraphs = selectedNews.fullText?.split("\n\n") ?? [];
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs bg-teal-50 text-primary px-2.5 py-1 rounded-full font-medium">{selectedNews.tag}</span>
        <span className="text-xs text-muted-foreground">{selectedNews.date}</span>
      </div>
      <h1 className="font-merriweather font-bold text-2xl text-deep mb-6">{selectedNews.title}</h1>
      {selectedNews.image && (
        <img src={selectedNews.image} alt="" className="w-full rounded-xl border border-border mb-6 object-contain" />
      )}
      <div className="space-y-4">
        {paragraphs.map((para, i) => {
          if (para.startsWith("•") || para.includes("\n•")) {
            const lines = para.split("\n").filter(Boolean);
            return (
              <ul key={i} className="space-y-1.5 ml-2">
                {lines.map((line, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                    <Icon name="ChevronRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{line.replace(/^•\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            );
          }
          const colonIdx = para.indexOf(":");
          if (colonIdx > 0 && colonIdx < 40 && !para.startsWith("⚡")) {
            const label = para.slice(0, colonIdx);
            const rest = para.slice(colonIdx + 1);
            return (
              <p key={i} className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-deep">{label}:</span>{rest}
              </p>
            );
          }
          return <p key={i} className="text-sm text-foreground leading-relaxed whitespace-pre-line">{para}</p>;
        })}
      </div>
      {(selectedNews.link || selectedNews.images) && (
        <div className="flex items-center gap-4 mt-8">
          {selectedNews.link && (
            <a
              href={selectedNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Подробнее о конкурсе <Icon name="ExternalLink" size={14} />
            </a>
          )}
          {selectedNews.images && selectedNews.images.map((src, i) => (
            <img key={i} src={src} alt="QR-код" className="w-16 h-16 rounded-lg border border-border object-contain" />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── VictoriesSection ─────────────────────────────────────────────────────────
interface VictoriesSectionProps extends NavProps {
  victoriesFilter: string;
  setVictoriesFilter: (v: string) => void;
  filteredVictories: typeof VICTORIES;
}

export function VictoriesSection({ goHome, goBack, victoriesFilter, setVictoriesFilter, filteredVictories }: VictoriesSectionProps) {
  const types = ["all", ...Array.from(new Set(VICTORIES.map(v => v.type)))];
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-6">Победы</h1>
      <div className="flex gap-2 flex-wrap mb-6">
        {types.map(t => (
          <button key={t} onClick={() => setVictoriesFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${victoriesFilter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
            {t === "all" ? "Все" : t}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVictories.map(v => (
          <div key={v.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Trophy" size={19} className="text-gold-dark" />
              </div>
              <span className="text-xs text-muted-foreground">{v.year}</span>
            </div>
            <h3 className="font-merriweather font-bold text-deep mb-1">{v.title}</h3>
            <p className="text-sm font-medium text-primary mb-2">{v.project}</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Icon name="User" size={11} />{v.winner}</div>
              <div className="flex items-center gap-1.5"><Icon name="Building" size={11} />{v.fund}</div>
              <div className="flex items-center gap-1.5"><Icon name="Banknote" size={11} />{v.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CalendarSection ──────────────────────────────────────────────────────────
interface CalendarSectionProps extends NavProps {
  calendarFilter: EventType | "all";
  setCalendarFilter: (v: EventType | "all") => void;
  filteredEvents: CalendarEvent[];
}

export function CalendarSection({ goHome, goBack, calendarFilter, setCalendarFilter, filteredEvents }: CalendarSectionProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-6">Интерактивный календарь событий</h1>
      <div className="flex gap-2 flex-wrap mb-6">
        {([["all", "Все события"], ["competition", "Конкурсы"], ["grant", "Стипендии"], ["event", "Мероприятия"]] as const).map(([val, label]) => (
          <button key={val} onClick={() => setCalendarFilter(val as EventType | "all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${calendarFilter === val ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredEvents.map(ev => (
          <div key={ev.id} className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white ${ev.type === "grant" ? "bg-teal" : ev.type === "competition" ? "bg-blue-500" : "bg-amber-500"}`}>
              <span className="text-sm font-bold leading-none">{ev.date.split("-")[2]}</span>
              <span className="text-xs leading-none opacity-80">{["", "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"][parseInt(ev.date.split("-")[1])]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeColor(ev.type)}`}>{typeLabel(ev.type)}</span>
                {ev.deadline && <span className="text-xs text-red-500 flex items-center gap-1"><Icon name="Clock" size={10} />Дедлайн: {ev.deadline.split("-").reverse().join(".")}</span>}
              </div>
              <h3 className="font-semibold text-deep">{ev.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{ev.description}</p>
            </div>
            <Icon name="Bell" size={15} className="text-muted-foreground flex-shrink-0 mt-1 cursor-pointer hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}