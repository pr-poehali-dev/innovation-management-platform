import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────────────────────────
type Section =
  | "home" | "about" | "news" | "victories" | "students" | "business"
  | "science" | "team" | "links" | "infographics" | "survey" | "contacts"
  | "partners" | "login" | "calendar" | "grant-detail";

type EventType = "competition" | "grant" | "event";

interface CalendarEvent {
  id: number; title: string; date: string; type: EventType; deadline?: string; description: string;
}
interface TeamMember {
  name: string; role: string; email: string; phone?: string; photo: string; isHead?: boolean;
}
interface GrantItem {
  id: number; title: string; fund: string; amount: string; deadline: string;
  year: number; description: string; requirements: string[]; active: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const EVENTS: CalendarEvent[] = [
  { id: 1, title: "УМНИК — приём заявок", date: "2026-03-15", type: "grant", deadline: "2026-03-15", description: "Программа поддержки молодых учёных до 30 лет. Грант до 1 млн руб." },
  { id: 2, title: "Студенческий стартап — 2026", date: "2026-04-01", type: "competition", deadline: "2026-04-01", description: "Конкурс проектов среди студентов вузов РФ. Грант 1 млн руб." },
  { id: 3, title: "Форум инновационных технологий", date: "2026-03-28", type: "event", description: "Ежегодный форум с участием ведущих учёных и предпринимателей." },
  { id: 4, title: "Старт-1 — подача заявок", date: "2026-05-10", type: "grant", deadline: "2026-05-10", description: "Коммерциализация разработок. Первая стадия." },
  { id: 5, title: "Акселератор ОмГАУ", date: "2026-04-15", type: "competition", description: "12-недельная программа для агротех стартапов." },
  { id: 6, title: "Международная конференция AgriTech", date: "2026-06-05", type: "event", description: "Конференция по цифровизации сельского хозяйства." },
];

const GRANTS: GrantItem[] = [
  { id: 1, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 1 000 000 ₽", deadline: "2026-03-15", year: 2026, active: true, description: "Программа «У.М.Н.И.К.» направлена на поддержку молодых учёных и специалистов в сфере инноваций.", requirements: ["Возраст 18–30 лет", "Гражданство РФ", "Научная новизна разработки", "Коммерческий потенциал"] },
  { id: 2, title: "Студенческий стартап", fund: "Фонд содействия инновациям", amount: "1 000 000 ₽", deadline: "2026-04-01", year: 2026, active: true, description: "Грант для студентов вузов на реализацию технологических стартапов.", requirements: ["Статус студента", "Проект в сфере технологий", "Бизнес-план", "Команда от 2 человек"] },
  { id: 3, title: "Старт-1", fund: "Фонд содействия инновациям", amount: "до 4 000 000 ₽", deadline: "2026-05-10", year: 2026, active: true, description: "Первая стадия программы «Старт» — создание инновационного продукта.", requirements: ["Юридическое лицо", "ИТ или наукоёмкое производство", "Наличие НТЗ", "Соисполнитель — вуз/НИИ"] },
  { id: 4, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 500 000 ₽", deadline: "2024-12-01", year: 2024, active: false, description: "Архивный грант 2024 года.", requirements: ["Возраст 18–30 лет", "Гражданство РФ"] },
  { id: 5, title: "Бизнес-старт", fund: "Фонд содействия инновациям", amount: "до 6 000 000 ₽", deadline: "2025-06-01", year: 2025, active: false, description: "Программа поддержки малого инновационного бизнеса.", requirements: ["МСП статус", "Инновационный продукт", "Сбыт от 300 тыс."] },
];

const TEAM: TeamMember[] = [
  { name: "Рыжова Ирина Сергеевна", role: "Начальник управления", email: "is.ryzhova@omgau.org", phone: "+7 (3812) 65-10-88", photo: "https://ui-avatars.com/api/?name=Рыжова+Ирина&background=1a6b5a&color=fff&size=128&bold=true", isHead: true },
  { name: "Соколова Мария Петровна", role: "Специалист по грантам", email: "mp.sokolova@omgau.org", phone: "+7 (3812) 65-10-89", photo: "https://ui-avatars.com/api/?name=Соколова+Мария&background=2e8b6e&color=fff&size=128" },
  { name: "Петров Алексей Николаевич", role: "Специалист по предпринимательству", email: "an.petrov@omgau.org", phone: "+7 (3812) 65-10-90", photo: "https://ui-avatars.com/api/?name=Петров+Алексей&background=c49a2a&color=fff&size=128" },
  { name: "Кузнецова Елена Ивановна", role: "Координатор акселерационных программ", email: "ei.kuznetsova@omgau.org", photo: "https://ui-avatars.com/api/?name=Кузнецова+Елена&background=2e8b6e&color=fff&size=128" },
  { name: "Тимофеев Дмитрий Васильевич", role: "Менеджер по партнёрствам", email: "dv.timofeev@omgau.org", photo: "https://ui-avatars.com/api/?name=Тимофеев+Дмитрий&background=1a6b5a&color=fff&size=128" },
];

const NEWS = [
  { id: 1, date: "18 февраля 2026", title: "Открыт приём заявок на программу УМНИК-2026", tag: "Гранты", text: "Фонд содействия инновациям объявил о начале приёма заявок по программе «У.М.Н.И.К.-2026». Приглашаем студентов и молодых учёных до 30 лет подать заявки." },
  { id: 2, date: "12 февраля 2026", title: "Студенты ОмГАУ выиграли 3 гранта «Студенческий стартап»", tag: "Победы", text: "По итогам конкурса «Студенческий стартап» 2025 года три проекта нашего университета получили финансирование по 1 млн рублей каждый." },
  { id: 3, date: "5 февраля 2026", title: "Запуск нового акселератора AgriTech 2026", tag: "Мероприятия", text: "Управление инноваций запускает 12-недельную акселерационную программу для стартапов в сфере агротехнологий." },
  { id: 4, date: "28 января 2026", title: "Подписано соглашение о сотрудничестве с IT-компаниями", tag: "Партнёрство", text: "В рамках форума «Инновации 2026» подписаны соглашения о сотрудничестве с ведущими региональными IT-компаниями." },
  { id: 5, date: "20 января 2026", title: "Итоги работы за 2025 год", tag: "Отчёт", text: "Управление подвело итоги деятельности: 47 поданных заявок, 18 победителей, общая сумма грантов — 24,5 млн рублей." },
];

const VICTORIES = [
  { id: 1, title: "УМНИК-2025", fund: "ФСИ", amount: "1 000 000 ₽", year: 2025, type: "УМНИК", winner: "Никитина А.С.", project: "Цифровая система мониторинга посевов" },
  { id: 2, title: "Студенческий стартап-2025", fund: "ФСИ", amount: "3 000 000 ₽", year: 2025, type: "Студенческий стартап", winner: "Команда AgriBot", project: "Автономный робот для сбора урожая" },
  { id: 3, title: "Старт-1-2024", fund: "ФСИ", amount: "4 000 000 ₽", year: 2024, type: "Старт-1", winner: "ООО АгроТех", project: "ИИ-диагностика заболеваний растений" },
  { id: 4, title: "УМНИК-2024", fund: "ФСИ", amount: "1 000 000 ₽", year: 2024, type: "УМНИК", winner: "Громов П.И.", project: "Биодеградируемые упаковочные материалы" },
  { id: 5, title: "Бизнес-старт-2023", fund: "ФСИ", amount: "5 000 000 ₽", year: 2023, type: "Бизнес-старт", winner: "ООО ЭкоАгро", project: "Органические удобрения нового поколения" },
];

const PARTNERS = [
  { name: "Фонд содействия инновациям", logo: "🏛️", type: "Грантовый фонд" },
  { name: "Правительство Омской области", logo: "🏢", type: "Государственный орган" },
  { name: "Омский технопарк", logo: "🔬", type: "Технопарк" },
  { name: "Сколково", logo: "💡", type: "Инновационный центр" },
  { name: "РФФИ", logo: "📚", type: "Научный фонд" },
  { name: "ТПП Омской области", logo: "🤝", type: "Бизнес-объединение" },
];

// ─── Nav Buttons (Home + Back) ────────────────────────────────────────────────
function NavButtons({ onHome, onBack }: { onHome: () => void; onBack: () => void }) {
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
function Breadcrumb({ items, onNavigate }: { items: { label: string; section?: Section }[]; onNavigate: (s: Section) => void }) {
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

const typeLabel = (t: EventType) => ({ competition: "Конкурс", grant: "Грант", event: "Мероприятие" }[t]);
const typeBadgeColor = (t: EventType) => ({ competition: "bg-blue-100 text-blue-700", grant: "bg-teal-100 text-teal-700", event: "bg-amber-100 text-amber-700" }[t]);

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [prevSection, setPrevSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [questionOpen, setQuestionOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionSent, setQuestionSent] = useState(false);
  const [calendarFilter, setCalendarFilter] = useState<EventType | "all">("all");
  const [selectedGrant, setSelectedGrant] = useState<GrantItem | null>(null);
  const [grantYearFilter, setGrantYearFilter] = useState<number | "all">("all");
  const [victoriesFilter, setVictoriesFilter] = useState<string>("all");
  const [studentsTab, setStudentsTab] = useState<"competitions" | "grants" | "accelerators" | "stipends" | "science">("competitions");

  const navigate = (s: Section) => {
    setPrevSection(section);
    setSection(s);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => navigate(prevSection);
  const goHome = () => navigate("home");

  const handleLogin = () => {
    if (loginForm.email === "is.ryzhova@omgau.org" && loginForm.password === "инновации2026") {
      setIsLoggedIn(true); setLoginError(""); navigate("home");
    } else { setLoginError("Неверный email или пароль"); }
  };

  const handleQuestion = () => { if (!isLoggedIn) { navigate("login"); return; } setQuestionOpen(true); };
  const sendQuestion = () => {
    if (questionText.trim()) { setQuestionSent(true); setQuestionText(""); setTimeout(() => { setQuestionSent(false); setQuestionOpen(false); }, 3000); }
  };

  const navItems = [
    { label: "О нас", section: "about" as Section, icon: "Info" },
    { label: "Новости", section: "news" as Section, icon: "Newspaper" },
    { label: "Победы", section: "victories" as Section, icon: "Trophy" },
    { label: "Студентам", section: "students" as Section, icon: "GraduationCap" },
    { label: "Бизнес", section: "business" as Section, icon: "Briefcase" },
    { label: "Наука", section: "science" as Section, icon: "FlaskConical" },
    { label: "Команда", section: "team" as Section, icon: "Users" },
    { label: "Ссылки", section: "links" as Section, icon: "Link" },
    { label: "Инфографика", section: "infographics" as Section, icon: "BarChart3" },
    { label: "Анкета", section: "survey" as Section, icon: "ClipboardList" },
    { label: "Контакты", section: "contacts" as Section, icon: "Phone" },
    { label: "Партнёры", section: "partners" as Section, icon: "Handshake" },
  ];

  const filteredEvents = EVENTS.filter(e => calendarFilter === "all" || e.type === calendarFilter);
  const filteredVictories = VICTORIES.filter(v => victoriesFilter === "all" || v.type === victoriesFilter);
  const activeGrants = GRANTS.filter(g => g.active);
  const archiveGrants = GRANTS.filter(g => !g.active && (grantYearFilter === "all" || g.year === grantYearFilter));

  // ── Header ───────────────────────────────────────────────────────────────────
  const Header = () => (
    <header className="bg-teal-dark text-white shadow-lg sticky top-0 z-50">
      <div className="border-b border-white/10 py-1 px-4 md:px-8 flex items-center justify-between text-xs text-white/50">
        <span>ФГБОУ ВО ОмГАУ им. П.А. Столыпина</span>
        <span>omgau.org</span>
      </div>
      <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <button onClick={goHome} className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon name="Lightbulb" size={18} className="text-deep" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-merriweather font-bold text-sm leading-tight">Управление инноваций</div>
            <div className="text-xs text-white/60">и предпринимательства</div>
          </div>
        </button>

        <nav className="hidden xl:flex items-center gap-0.5 flex-wrap">
          {navItems.slice(0, 7).map(item => (
            <button key={item.section} onClick={() => navigate(item.section)}
              className={`px-2.5 py-1.5 rounded text-xs transition-all ${section === item.section ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("calendar")}
            className="hidden md:flex items-center gap-1.5 border border-white/30 text-white/80 hover:text-white hover:border-white/60 px-2.5 py-1.5 rounded text-xs transition-colors">
            <Icon name="Calendar" size={13} />Календарь
          </button>
          <button onClick={handleQuestion}
            className="hidden sm:flex items-center gap-1.5 bg-gold text-deep px-3 py-1.5 rounded text-xs font-semibold hover:bg-gold/90 transition-colors">
            <Icon name="MessageCircleQuestion" size={13} />Задать вопрос
          </button>
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
          {navItems.map(item => (
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

  // ── Question Dialog ───────────────────────────────────────────────────────────
  const QuestionDialog = () => (
    questionOpen ? (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setQuestionOpen(false)}>
        <div className="bg-card rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-merriweather font-bold text-lg text-deep">Задать вопрос</h3>
            <button onClick={() => setQuestionOpen(false)} className="text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>
          </div>
          {questionSent ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle" size={28} className="text-primary" />
              </div>
              <p className="font-medium text-deep">Вопрос отправлен!</p>
              <p className="text-sm text-muted-foreground mt-1">Ответ придёт на почту is.ryzhova@omgau.org</p>
            </div>
          ) : (
            <>
              <textarea value={questionText} onChange={e => setQuestionText(e.target.value)}
                placeholder="Введите ваш вопрос..."
                className="w-full border border-border rounded-lg p-3 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
              <button onClick={sendQuestion} disabled={!questionText.trim()}
                className="mt-3 w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-teal-light transition-colors disabled:opacity-40">
                Отправить
              </button>
            </>
          )}
        </div>
      </div>
    ) : null
  );

  // ── HOME ──────────────────────────────────────────────────────────────────────
  const HomeSection = () => (
    <div>
      <section className="bg-gradient-to-br from-teal-dark via-teal to-teal-light text-white py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-10 right-16 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-xs mb-6">
            <Icon name="Lightbulb" size={12} className="text-gold" />
            ФГБОУ ВО ОмГАУ им. П.А. Столыпина
          </div>
          <h1 className="font-merriweather font-black text-3xl md:text-5xl leading-tight mb-4">
            Управление инноваций<br />
            <span className="text-gold">и предпринимательства</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-2xl">
            Конкурсы, гранты, мероприятия и программы акселерации — всё в одном месте для студентов, учёных и бизнес-партнёров.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("students")} className="bg-gold text-deep px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors flex items-center gap-2 text-sm">
              <Icon name="GraduationCap" size={16} />Студентам
            </button>
            <button onClick={() => navigate("calendar")} className="bg-white/15 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/25 transition-colors flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={16} />Календарь событий
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "47", label: "Заявок подано в 2025", icon: "FileText" },
            { value: "18", label: "Победителей конкурсов", icon: "Trophy" },
            { value: "24,5 млн", label: "Грантовое финансирование", icon: "Banknote" },
            { value: "5", label: "Акселерационных программ", icon: "Rocket" },
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
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-merriweather font-bold text-2xl text-deep mb-8">Разделы портала</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { section: "about" as Section, icon: "Info", title: "О нас", desc: "Цели, задачи, структура" },
            { section: "news" as Section, icon: "Newspaper", title: "Новости", desc: "Актуальные события" },
            { section: "victories" as Section, icon: "Trophy", title: "Победы", desc: "Наши достижения" },
            { section: "students" as Section, icon: "GraduationCap", title: "Студентам", desc: "Гранты, конкурсы, стипендии" },
            { section: "business" as Section, icon: "Briefcase", title: "Бизнес", desc: "Каталоги и бюллетени" },
            { section: "science" as Section, icon: "FlaskConical", title: "Наука", desc: "Популяризация науки" },
            { section: "team" as Section, icon: "Users", title: "Команда", desc: "Руководство и сотрудники" },
            { section: "calendar" as Section, icon: "Calendar", title: "Календарь", desc: "События и дедлайны" },
            { section: "infographics" as Section, icon: "BarChart3", title: "Инфографика", desc: "Визуальные данные" },
            { section: "survey" as Section, icon: "ClipboardList", title: "Анкетирование", desc: "Опросы и формы" },
            { section: "partners" as Section, icon: "Handshake", title: "Партнёры", desc: "Наши партнёры" },
            { section: "contacts" as Section, icon: "Phone", title: "Контакты", desc: "Как с нами связаться" },
          ].map(card => (
            <button key={card.section} onClick={() => navigate(card.section)}
              className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group hover-scale">
              <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                <Icon name={card.icon} size={17} className="text-primary group-hover:text-white" />
              </div>
              <div className="font-semibold text-sm text-deep">{card.title}</div>
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
            {NEWS.slice(0, 3).map(n => (
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

  // ── ABOUT ─────────────────────────────────────────────────────────────────────
  const AboutSection = () => (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">О нас</h1>
      <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-100 rounded-xl p-6 mb-8">
        <p className="text-base text-foreground leading-relaxed">Управление инноваций и предпринимательства ФГБОУ ВО ОмГАУ им. П.А. Столыпина обеспечивает комплексное сопровождение инновационной деятельности университета, поддерживает молодых учёных, студентов-предпринимателей и развивает партнёрство с бизнес-сообществом.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { icon: "Target", title: "Цели управления", items: ["Развитие инновационной экосистемы", "Коммерциализация научных разработок", "Поддержка студенческого предпринимательства", "Привлечение грантового финансирования", "Укрепление связей с партнёрами"] },
          { icon: "ListTodo", title: "Основные задачи", items: ["Сопровождение грантовых заявок", "Организация конкурсов и мероприятий", "Работа с ФСИ и другими фондами", "Ведение реестра инновационных проектов", "Развитие студенческих стартапов"] },
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
      <h2 className="font-merriweather font-bold text-xl text-deep mb-4">Структура управления</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="bg-teal-dark text-white px-5 py-3 font-semibold text-sm">Организационная структура</div>
        <div className="p-5 space-y-3">
          {[
            { role: "Начальник управления", name: "Рыжова И.С.", email: "is.ryzhova@omgau.org", indent: false },
            { role: "Отдел грантовой деятельности", name: "2 специалиста", email: "", indent: true },
            { role: "Отдел акселерации и стартапов", name: "1 специалист", email: "", indent: true },
            { role: "Отдел партнёрских программ", name: "1 менеджер", email: "", indent: true },
          ].map((row, i) => (
            <div key={i} className={`flex items-center gap-3 ${row.indent ? "pl-6 border-l-2 border-teal-100" : ""}`}>
              <Icon name={i === 0 ? "Crown" : "ChevronRight"} size={13} className="text-primary flex-shrink-0" />
              <span className="font-medium text-sm text-deep">{row.role}</span>
              <span className="text-sm text-muted-foreground">— {row.name}</span>
              {row.email && <a href={`mailto:${row.email}`} className="text-xs text-primary ml-auto hover:underline">{row.email}</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── NEWS ──────────────────────────────────────────────────────────────────────
  const NewsSection = () => (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Новости</h1>
      <div className="space-y-4">
        {NEWS.map(n => (
          <article key={n.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs bg-teal-50 text-primary px-2.5 py-1 rounded-full font-medium">{n.tag}</span>
              <span className="text-xs text-muted-foreground">{n.date}</span>
            </div>
            <h2 className="font-merriweather font-bold text-lg text-deep mb-2">{n.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{n.text}</p>
          </article>
        ))}
      </div>
    </div>
  );

  // ── VICTORIES ─────────────────────────────────────────────────────────────────
  const VictoriesSection = () => {
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
  };

  // ── STUDENTS ──────────────────────────────────────────────────────────────────
  const StudentsSection = () => {
    const tabs = [
      { key: "competitions" as const, label: "Конкурсы", icon: "Medal" },
      { key: "grants" as const, label: "Гранты", icon: "Banknote" },
      { key: "accelerators" as const, label: "Акселераторы", icon: "Rocket" },
      { key: "stipends" as const, label: "Стипендии", icon: "BookOpen" },
      { key: "science" as const, label: "Научные мероприятия", icon: "FlaskConical" },
    ];
    const competitions = [
      { title: "Студенческий стартап", org: "ФСИ", deadline: "01.04.2026", amount: "1 млн ₽", desc: "Грант для студентов вузов на технологические проекты.", url: "https://fasie.ru" },
      { title: "УМНИК", org: "ФСИ", deadline: "15.03.2026", amount: "до 1 млн ₽", desc: "Поддержка молодых учёных и инноваторов до 30 лет.", url: "https://fasie.ru/programs/umnik/" },
      { title: "Цифровой прорыв", org: "АНО «Россия — страна возможностей»", deadline: "01.05.2026", amount: "до 500 тыс ₽", desc: "Хакатон для IT-специалистов и разработчиков.", url: "https://i.digitalproryv.ru" },
      { title: "Я — профессионал", org: "Яндекс / НИУ ВШЭ", deadline: "01.03.2026", amount: "стажировка + 200 тыс ₽", desc: "Многопрофильная олимпиада для студентов.", url: "https://yandex.ru/profi" },
    ];
    const accelerators = [
      { title: "Акселератор ОмГАУ AgriTech", duration: "12 недель", format: "Очно", desc: "Для агротех стартапов: менторство, финансирование, выход на рынок." },
      { title: "ФРИИ Акселератор", duration: "10 недель", format: "Онлайн/Офлайн", desc: "Топ акселератор для технологических стартапов в России." },
      { title: "Сколково Акселератор", duration: "6 месяцев", format: "Москва + онлайн", desc: "Для стартапов с инновационными технологиями." },
    ];
    const stipends = [
      { title: "Стипендия Президента РФ", amount: "22 800 ₽/мес", req: "Достижения в науке и спорте" },
      { title: "Стипендия Правительства РФ", amount: "14 400 ₽/мес", req: "Приоритетные специальности" },
      { title: "Стипендия им. П.А. Столыпина", amount: "5 000 ₽/мес", req: "Студенты ОмГАУ, 1-е место рейтинга" },
    ];
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <NavButtons onHome={goHome} onBack={goBack} />
        <h1 className="font-merriweather font-bold text-3xl text-deep mb-6">Студентам</h1>
        <div className="flex gap-2 flex-wrap mb-8 border-b border-border pb-4">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setStudentsTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${studentsTab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
              <Icon name={t.icon} size={14} />{t.label}
            </button>
          ))}
        </div>

        {studentsTab === "competitions" && (
          <div className="grid md:grid-cols-2 gap-4">
            {competitions.map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0"><Icon name="Medal" size={17} className="text-blue-600" /></div>
                  <div><h3 className="font-semibold text-deep text-sm">{c.title}</h3><p className="text-xs text-muted-foreground">{c.org}</p></div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{c.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs"><span className="text-muted-foreground">до </span><span className="font-medium text-deep">{c.deadline}</span><span className="ml-2 font-semibold text-gold-dark">{c.amount}</span></div>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-teal-light transition-colors flex items-center gap-1">
                    Подробнее <Icon name="ExternalLink" size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {studentsTab === "grants" && (
          <div className="space-y-4">
            <h3 className="font-merriweather font-bold text-deep">Актуальные гранты</h3>
            {activeGrants.map(g => (
              <div key={g.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => { setSelectedGrant(g); navigate("grant-detail"); }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-merriweather font-bold text-deep">{g.title}</h4>
                    <p className="text-sm text-muted-foreground">{g.fund}</p>
                    <p className="text-sm mt-1.5">{g.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-primary">{g.amount}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">до {g.deadline.split("-").reverse().join(".")}</div>
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Активный</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary"><span>Подробнее</span><Icon name="ArrowRight" size={11} /></div>
              </div>
            ))}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="Archive" size={17} className="text-muted-foreground" />Архив грантов</h3>
              <div className="flex gap-2 flex-wrap mb-3">
                {(["all", 2025, 2024, 2023] as const).map(y => (
                  <button key={y} onClick={() => setGrantYearFilter(y)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${grantYearFilter === y ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
                    {y === "all" ? "Все годы" : y}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {archiveGrants.map(g => (
                  <div key={g.id} className="flex items-center gap-3 bg-muted rounded-lg px-4 py-2.5 text-sm">
                    <Icon name="Archive" size={13} className="text-muted-foreground flex-shrink-0" />
                    <span className="flex-1 font-medium text-deep">{g.title}</span>
                    <span className="text-muted-foreground text-xs hidden sm:block">{g.fund}</span>
                    <span className="text-muted-foreground text-xs">{g.amount}</span>
                    <span className="text-muted-foreground text-xs">{g.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {studentsTab === "accelerators" && (
          <div className="grid md:grid-cols-3 gap-4">
            {accelerators.map((a, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center mb-3"><Icon name="Rocket" size={17} className="text-amber-600" /></div>
                <h3 className="font-semibold text-deep mb-1 text-sm">{a.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{a.desc}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Icon name="Clock" size={11} />{a.duration}</div>
                  <div className="flex items-center gap-1.5"><Icon name="MapPin" size={11} />{a.format}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {studentsTab === "stipends" && (
          <div className="space-y-3">
            {stipends.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0"><Icon name="BookOpen" size={17} className="text-primary" /></div>
                <div className="flex-1"><h3 className="font-semibold text-deep text-sm">{s.title}</h3><p className="text-xs text-muted-foreground">{s.req}</p></div>
                <div className="font-bold text-primary text-sm">{s.amount}</div>
              </div>
            ))}
          </div>
        )}

        {studentsTab === "science" && (
          <div className="space-y-3">
            {EVENTS.filter(e => e.type === "event").map(e => (
              <div key={e.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div><h3 className="font-semibold text-deep text-sm">{e.title}</h3><p className="text-sm text-muted-foreground mt-1">{e.description}</p></div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">{e.date.split("-").reverse().join(".")}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── GRANT DETAIL ──────────────────────────────────────────────────────────────
  const GrantDetailSection = () => {
    if (!selectedGrant) return null;
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <NavButtons onHome={goHome} onBack={goBack} />
        <Breadcrumb items={[{ label: "Главная", section: "home" }, { label: "Студентам", section: "students" }, { label: selectedGrant.title }]} onNavigate={navigate} />
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-teal-dark text-white px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-merriweather font-black text-2xl">{selectedGrant.title}</h1>
                <p className="text-white/70 mt-1">{selectedGrant.fund}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedGrant.active ? "bg-green-400/20 text-green-200" : "bg-white/10 text-white/60"}`}>
                {selectedGrant.active ? "Активный" : "Архив"}
              </span>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "Banknote", label: "Размер гранта", value: selectedGrant.amount },
                { icon: "Calendar", label: "Срок подачи", value: selectedGrant.deadline.split("-").reverse().join(".") },
                { icon: "Building", label: "Фонд", value: selectedGrant.fund },
              ].map((item, i) => (
                <div key={i} className="bg-muted rounded-lg p-3 text-center">
                  <Icon name={item.icon} size={17} className="text-primary mx-auto mb-1" />
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="font-semibold text-xs text-deep mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-merriweather font-bold text-deep mb-2">Описание</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedGrant.description}</p>
            </div>
            <div>
              <h3 className="font-merriweather font-bold text-deep mb-3">Требования к участникам</h3>
              <ul className="space-y-2">
                {selectedGrant.requirements.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm"><Icon name="CheckCircle" size={13} className="text-primary flex-shrink-0" />{r}</li>
                ))}
              </ul>
            </div>
            {selectedGrant.active && (
              <button onClick={handleQuestion}
                className="w-full bg-gold text-deep py-3 rounded-xl font-semibold hover:bg-gold/90 transition-colors flex items-center justify-center gap-2">
                <Icon name="MessageCircleQuestion" size={17} />Задать вопрос по гранту
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── CALENDAR ──────────────────────────────────────────────────────────────────
  const CalendarSection = () => (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-6">Интерактивный календарь событий</h1>
      <div className="flex gap-2 flex-wrap mb-6">
        {([["all", "Все события"], ["competition", "Конкурсы"], ["grant", "Гранты"], ["event", "Мероприятия"]] as const).map(([val, label]) => (
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

  // ── BUSINESS ──────────────────────────────────────────────────────────────────
  const BusinessSection = () => (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Бизнес</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: "BookOpen", title: "Каталог инновационных разработок", desc: "Реестр технологий и разработок ОмГАУ, доступных для трансфера бизнесу.", items: ["Агробиотехнологии", "Цифровые решения", "Экотехнологии"] },
          { icon: "Zap", title: "Бизнес-буллиты", desc: "Краткие описания наиболее перспективных технологий и возможностей для инвестиций.", items: ["Условия лицензирования", "Экономический эффект", "Контакты разработчиков"] },
          { icon: "FileBarChart", title: "Информационно-аналитический бюллетень", desc: "Ежеквартальный аналитический обзор инновационной деятельности университета.", items: ["Статистика по грантам", "Обзор технологий", "Партнёрские новости"] },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-br from-teal-50 to-white p-5 border-b border-border">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center mb-3"><Icon name={item.icon} size={18} className="text-white" /></div>
              <h3 className="font-merriweather font-bold text-deep text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
            <div className="p-4">
              <ul className="space-y-1.5">
                {item.items.map((li, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="CheckCircle" size={11} className="text-primary flex-shrink-0" />{li}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── SCIENCE ───────────────────────────────────────────────────────────────────
  const ScienceSection = () => (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Популяризация науки</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { icon: "Microscope", title: "Научные кружки и клубы", desc: "Объединения студентов по научным интересам: агробиотехнологии, цифровое земледелие, экология." },
          { icon: "Tv", title: "Лекции и вебинары", desc: "Открытые лекции ведущих учёных и предпринимателей для студентов и широкой публики." },
          { icon: "Newspaper", title: "Научные публикации", desc: "Помощь в подготовке статей в рецензируемых изданиях, включая ВАК и Scopus." },
          { icon: "Award", title: "Олимпиады и конкурсы", desc: "Организация и участие в региональных и федеральных научных соревнованиях." },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center mb-3"><Icon name={item.icon} size={17} className="text-primary" /></div>
            <h3 className="font-merriweather font-bold text-deep mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── TEAM ──────────────────────────────────────────────────────────────────────
  const TeamSection = () => (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Команда</h1>
      <div className="mb-8">
        {TEAM.filter(m => m.isHead).map(m => (
          <div key={m.name} className="bg-gradient-to-r from-teal-dark to-teal text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img src={m.photo} alt={m.name} className="w-24 h-24 rounded-full ring-4 ring-white/30 flex-shrink-0" />
            <div>
              <div className="text-xs text-white/60 mb-1">Руководитель управления</div>
              <h2 className="font-merriweather font-black text-xl">{m.name}</h2>
              <p className="text-white/80 text-sm mt-1">{m.role}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-3 text-sm">
                <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"><Icon name="Mail" size={13} />{m.email}</a>
                {m.phone && <span className="flex items-center gap-1.5 text-white/80"><Icon name="Phone" size={13} />{m.phone}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3 className="font-merriweather font-bold text-xl text-deep mb-4">Сотрудники</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {TEAM.filter(m => !m.isHead).map(m => (
          <div key={m.name} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
            <img src={m.photo} alt={m.name} className="w-12 h-12 rounded-full flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-deep">{m.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
              <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-xs text-primary mt-1.5 hover:underline"><Icon name="Mail" size={11} />{m.email}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── LINKS ─────────────────────────────────────────────────────────────────────
  const LinksSection = () => (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Полезные ссылки</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { cat: "Гранты и финансирование", links: [
            { title: "Фонд содействия инновациям", url: "https://fasie.ru", desc: "УМНИК, Старт, Бизнес-старт" },
            { title: "Российский научный фонд", url: "https://rscf.ru", desc: "Гранты для исследовательских коллективов" },
            { title: "РФФИ", url: "https://rfbr.ru", desc: "Фундаментальные исследования" },
          ]},
          { cat: "Государственные порталы", links: [
            { title: "Госуслуги", url: "https://gosuslugi.ru", desc: "Государственные услуги онлайн" },
            { title: "Сколково", url: "https://sk.ru", desc: "Инновационный центр" },
            { title: "Invest.ru", url: "https://invest.ru", desc: "Инвестиционный портал России" },
          ]},
        ].map((cat, ci) => (
          <div key={ci} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b border-border"><h3 className="font-semibold text-sm text-deep">{cat.cat}</h3></div>
            <div className="p-3 space-y-1">
              {cat.links.map((link, li) => (
                <a key={li} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Icon name="ExternalLink" size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <div><div className="text-sm font-medium text-deep">{link.title}</div><div className="text-xs text-muted-foreground">{link.desc}</div></div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── INFOGRAPHICS ──────────────────────────────────────────────────────────────
  const InfographicsSection = () => (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Инфографика</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="GitBranch" size={17} className="text-primary" />Процедура подачи заявки</h3>
          <div className="space-y-3">
            {["Регистрация на платформе фонда", "Подготовка документации", "Подача заявки онлайн", "Экспертная оценка проекта", "Объявление результатов", "Заключение договора"].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                <div className="flex-1 text-sm">{step}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="BarChart3" size={17} className="text-primary" />Размеры грантов по программам</h3>
          <div className="space-y-3">
            {[
              { name: "Бизнес-старт", amount: 6, color: "bg-teal" },
              { name: "Старт-2", amount: 5, color: "bg-teal-light" },
              { name: "Старт-1", amount: 4, color: "bg-blue-400" },
              { name: "УМНИК", amount: 1, color: "bg-gold" },
              { name: "Студ. стартап", amount: 1, color: "bg-amber-400" },
            ].map((g, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-deep">{g.name}</span>
                  <span className="text-muted-foreground">до {g.amount} млн ₽</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${g.color} rounded-full`} style={{ width: `${(g.amount / 6) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="Users" size={17} className="text-primary" />Структура коллектива</h3>
          <div className="space-y-2">
            {[
              { role: "Научный руководитель", req: "Д.н. или К.н., публикации", required: true },
              { role: "Исполнитель (1–2 чел.)", req: "Студент/аспирант/сотрудник", required: true },
              { role: "Со-исполнитель", req: "По усмотрению", required: false },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 bg-muted rounded-lg">
                <Icon name={row.required ? "CheckCircle" : "Circle"} size={13} className={`mt-0.5 ${row.required ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <div className="font-medium text-sm text-deep">{row.role}</div>
                  <div className="text-xs text-muted-foreground">{row.req}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${row.required ? "bg-green-100 text-green-700" : "bg-muted-foreground/10 text-muted-foreground"}`}>
                  {row.required ? "Обязательно" : "Опционально"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="Clock" size={17} className="text-primary" />Периодичность конкурсов</h3>
          <div className="space-y-2">
            {[
              { prog: "УМНИК", period: "2 раза в год", months: "Март, Сентябрь" },
              { prog: "Студ. стартап", period: "1 раз в год", months: "Январь–Апрель" },
              { prog: "Старт-1/2", period: "1 раз в год", months: "Апрель–Июнь" },
              { prog: "Бизнес-старт", period: "1 раз в год", months: "Сентябрь–Ноябрь" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-muted rounded-lg text-sm">
                <Icon name="Repeat" size={12} className="text-primary flex-shrink-0" />
                <span className="font-medium text-deep w-28 flex-shrink-0">{row.prog}</span>
                <span className="text-muted-foreground text-xs">{row.period} · {row.months}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── SURVEY ────────────────────────────────────────────────────────────────────
  const SurveySection = () => {
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
              { k: "role", l: "Ваша роль", opts: ["Студент", "Аспирант", "Преподаватель / учёный", "Бизнес-партнёр", "Другое"] },
              { k: "topic", l: "Интересующее направление", opts: ["Гранты и конкурсы", "Акселерационные программы", "Научные мероприятия", "Бизнес-партнёрство", "Другое"] },
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
  };

  // ── CONTACTS ──────────────────────────────────────────────────────────────────
  const ContactsSection = () => (
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

  // ── PARTNERS ──────────────────────────────────────────────────────────────────
  const PartnersSection = () => (
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

  // ── LOGIN ─────────────────────────────────────────────────────────────────────
  const LoginSection = () => (
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
            <input type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} placeholder="is.ryzhova@omgau.org"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
          </div>
          <div>
            <label className="text-xs font-medium text-deep mb-1 block">Пароль</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
          </div>
          {loginError && <p className="text-xs text-red-500 flex items-center gap-1"><Icon name="AlertCircle" size={11} />{loginError}</p>}
          <button onClick={handleLogin} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-teal-light transition-colors">Войти</button>
        </div>
      </div>
    </div>
  );

  // ── Footer ────────────────────────────────────────────────────────────────────
  const Footer = () => (
    <footer className="bg-deep text-white/70 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3"><Icon name="Lightbulb" size={16} className="text-gold" /><span className="font-merriweather font-bold text-white text-sm">Управление инноваций</span></div>
            <p className="text-xs leading-relaxed">ФГБОУ ВО ОмГАУ им. П.А. Столыпина<br />644008, г. Омск, Институтская площадь, 1</p>
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-3">Разделы</div>
            <div className="grid grid-cols-2 gap-1">
              {navItems.map(item => (
                <button key={item.section} onClick={() => navigate(item.section)} className="flex items-center gap-1.5 text-xs hover:text-white transition-colors story-link text-left">{item.label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-3">Контакты</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><Icon name="Mail" size={12} />is.ryzhova@omgau.org</div>
              <div className="flex items-center gap-2"><Icon name="Phone" size={12} />+7 (3812) 65-10-88</div>
              <div className="flex items-center gap-2"><Icon name="Globe" size={12} />omgau.org</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>© 2026 Управление инноваций и предпринимательства ОмГАУ</span>
          <button onClick={handleQuestion} className="flex items-center gap-1.5 text-gold hover:text-gold/80 transition-colors">
            <Icon name="MessageCircleQuestion" size={12} />Задать вопрос
          </button>
        </div>
      </div>
    </footer>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────────
  const render = () => {
    switch (section) {
      case "home": return <HomeSection />;
      case "about": return <AboutSection />;
      case "news": return <NewsSection />;
      case "victories": return <VictoriesSection />;
      case "students": return <StudentsSection />;
      case "grant-detail": return <GrantDetailSection />;
      case "calendar": return <CalendarSection />;
      case "business": return <BusinessSection />;
      case "science": return <ScienceSection />;
      case "team": return <TeamSection />;
      case "links": return <LinksSection />;
      case "infographics": return <InfographicsSection />;
      case "survey": return <SurveySection />;
      case "contacts": return <ContactsSection />;
      case "partners": return <PartnersSection />;
      case "login": return <LoginSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-ibm">
      <Header />
      <main className="flex-1 animate-fade-in">{render()}</main>
      <Footer />
      <QuestionDialog />
    </div>
  );
}
