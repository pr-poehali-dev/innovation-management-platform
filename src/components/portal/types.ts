// ─── Types ────────────────────────────────────────────────────────────────────
export type Section =
  | "home" | "about" | "news" | "victories" | "students"
  | "science" | "links" | "infographics" | "survey" | "contacts"
  | "partners" | "login" | "calendar" | "grant-detail" | "news-detail" | "infographics-detail";

export type EventType = "competition" | "grant" | "event";

export interface CalendarEvent {
  id: number; title: string; date: string; type: EventType; deadline?: string; description: string;
}
export interface NewsItem {
  id: number; date: string; title: string; tag: string; text: string; fullText?: string; link?: string; image?: string; images?: string[];
}
export interface TeamMember {
  name: string; role: string; email: string; phone?: string; photo: string; isHead?: boolean;
}
export interface GrantItem {
  id: number; title: string; fund: string; amount: string; deadline: string;
  year: number; description: string; requirements: string[]; active: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
export const EVENTS: CalendarEvent[] = [
  { id: 1, title: "УМНИК — приём заявок", date: "2026-03-15", type: "grant", deadline: "2026-03-15", description: "Программа поддержки молодых учёных до 30 лет. Грант до 1 млн руб." },
  { id: 2, title: "Студенческий стартап — 2026", date: "2026-04-01", type: "competition", deadline: "2026-04-01", description: "Конкурс проектов среди студентов вузов РФ. Грант 1 млн руб." },
  { id: 4, title: "Старт-1 — подача заявок", date: "2026-05-10", type: "grant", deadline: "2026-05-10", description: "Коммерциализация разработок. Первая стадия." },
];

export const GRANTS: GrantItem[] = [
  { id: 1, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 1 000 000 ₽", deadline: "2026-03-15", year: 2026, active: true, description: "Программа «У.М.Н.И.К.» направлена на поддержку молодых учёных и специалистов в сфере инноваций.", requirements: ["Возраст 18–30 лет", "Гражданство РФ", "Научная новизна разработки", "Коммерческий потенциал"] },
  { id: 2, title: "Студенческий стартап", fund: "Фонд содействия инновациям", amount: "1 000 000 ₽", deadline: "2026-04-01", year: 2026, active: true, description: "Грант для студентов вузов на реализацию технологических стартапов.", requirements: ["Статус студента", "Проект в сфере технологий", "Бизнес-план", "Команда от 2 человек"] },
  { id: 3, title: "Старт-1", fund: "Фонд содействия инновациям", amount: "до 4 000 000 ₽", deadline: "2026-05-10", year: 2026, active: true, description: "Первая стадия программы «Старт» — создание инновационного продукта.", requirements: ["Юридическое лицо", "ИТ или наукоёмкое производство", "Наличие НТЗ", "Соисполнитель — вуз/НИИ"] },
  { id: 4, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 500 000 ₽", deadline: "2024-12-01", year: 2024, active: false, description: "Архивный грант 2024 года.", requirements: ["Возраст 18–30 лет", "Гражданство РФ"] },
  { id: 5, title: "Бизнес-старт", fund: "Фонд содействия инновациям", amount: "до 6 000 000 ₽", deadline: "2025-06-01", year: 2025, active: false, description: "Программа поддержки малого инновационного бизнеса.", requirements: ["МСП статус", "Инновационный продукт", "Сбыт от 300 тыс."] },
];

export const TEAM: TeamMember[] = [
  { name: "Косенчук Ольга Витальевна", role: "Начальник управления", email: "ov.kosenchuk@omgau.org", phone: "+7 (3812) 65-10-88", photo: "https://ui-avatars.com/api/?name=Косенчук+Ольга&background=1a6b5a&color=fff&size=128&bold=true", isHead: true },
  { name: "Соколова Мария Петровна", role: "Специалист по грантам", email: "mp.sokolova@omgau.org", phone: "+7 (3812) 65-10-89", photo: "https://ui-avatars.com/api/?name=Соколова+Мария&background=2e8b6e&color=fff&size=128" },
  { name: "Петров Алексей Николаевич", role: "Специалист по предпринимательству", email: "an.petrov@omgau.org", phone: "+7 (3812) 65-10-90", photo: "https://ui-avatars.com/api/?name=Петров+Алексей&background=c49a2a&color=fff&size=128" },
  { name: "Кузнецова Елена Ивановна", role: "Координатор акселерационных программ", email: "ei.kuznetsova@omgau.org", photo: "https://ui-avatars.com/api/?name=Кузнецова+Елена&background=2e8b6e&color=fff&size=128" },
  { name: "Тимофеев Дмитрий Васильевич", role: "Менеджер по партнёрствам", email: "dv.timofeev@omgau.org", photo: "https://ui-avatars.com/api/?name=Тимофеев+Дмитрий&background=1a6b5a&color=fff&size=128" },
];

export const NEWS: NewsItem[] = [
  {
    id: 6, date: "31 марта 2026", title: "Открыт приём заявок на «Студенческий стартап»", tag: "Гранты",
    text: "Фонд содействия инновациям открывает прием заявок на грант «Студенческий стартап» в размере 1 млн рублей на развитие собственного проекта.",
    fullText: `⚡️ Уважаемые студенты, магистранты и аспиранты!\n\nФонд содействия инновациям открывает прием заявок на грант «Студенческий стартап» в размере 1 млн рублей на развитие собственного проекта.\n\n⚡️ Седьмая очередь приема заявок проходит с 09.02.2026 по 18.03.2026\n\nПобедителями в этом году станут 2250 проектов со всей России. К участию приглашаются обучающиеся бакалавриата, специалитета, магистратуры и аспирантуры, в том числе иностранные студенты.\n\nНаправления проектов:\n• цифровые технологии;\n• медицина и здоровье;\n• новые материалы и химические технологии;\n• новые приборы и производственные технологии;\n• биотехнологии;\n• ресурсосберегающая энергетика;\n• креативные индустрии.\n\nУправление инноваций и предпринимательства Омского ГАУ готово стать вашим проводником на пути получения гранта.`,
    link: "https://www.fasie.ru/programs/programma-studstartup/#uslovia",
    image: "https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/4fec1063-176f-4800-86c4-7ae6de468d52.png",
    images: ["https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/a59b304e-1903-486c-8d36-f2e45489df6c.png"],
  },
  { id: 1, date: "18 февраля 2026", title: "Открыт приём заявок на программу УМНИК-2026", tag: "Гранты", text: "Фонд содействия инновациям объявил о начале приёма заявок по программе «У.М.Н.И.К.-2026». Приглашаем студентов и молодых учёных до 30 лет подать заявки." },
  { id: 2, date: "12 февраля 2026", title: "Студенты ОмГАУ выиграли 3 гранта «Студенческий стартап»", tag: "Победы", text: "По итогам конкурса «Студенческий стартап» 2025 года три проекта нашего университета получили финансирование по 1 млн рублей каждый." },
  { id: 3, date: "5 февраля 2026", title: "Запуск нового акселератора AgriTech 2026", tag: "Мероприятия", text: "Управление инноваций запускает 12-недельную акселерационную программу для стартапов в сфере агротехнологий." },
  { id: 4, date: "28 января 2026", title: "Подписано соглашение о сотрудничестве с IT-компаниями", tag: "Партнёрство", text: "В рамках форума «Инновации 2026» подписаны соглашения о сотрудничестве с ведущими региональными IT-компаниями." },
  { id: 5, date: "20 января 2026", title: "Итоги работы за 2025 год", tag: "Отчёт", text: "Управление подвело итоги деятельности: 47 поданных заявок, 18 победителей, общая сумма грантов — 24,5 млн рублей." },
];

export const VICTORIES = [
  { id: 1, title: "УМНИК-2025", fund: "ФСИ", amount: "1 000 000 ₽", year: 2025, type: "УМНИК", winner: "Никитина А.С.", project: "Цифровая система мониторинга посевов" },
  { id: 2, title: "Студенческий стартап-2025", fund: "ФСИ", amount: "3 000 000 ₽", year: 2025, type: "Студенческий стартап", winner: "Команда AgriBot", project: "Автономный робот для сбора урожая" },
  { id: 3, title: "Старт-1-2024", fund: "ФСИ", amount: "4 000 000 ₽", year: 2024, type: "Старт-1", winner: "ООО АгроТех", project: "ИИ-диагностика заболеваний растений" },
  { id: 4, title: "УМНИК-2024", fund: "ФСИ", amount: "1 000 000 ₽", year: 2024, type: "УМНИК", winner: "Громов П.И.", project: "Биодеградируемые упаковочные материалы" },
  { id: 5, title: "Бизнес-старт-2023", fund: "ФСИ", amount: "5 000 000 ₽", year: 2023, type: "Бизнес-старт", winner: "ООО ЭкоАгро", project: "Органические удобрения нового поколения" },
];

export const PARTNERS = [
  { name: "Фонд содействия инновациям", logo: "🏛️", type: "Грантовый фонд" },
  { name: "Правительство Омской области", logo: "🏢", type: "Государственный орган" },
  { name: "Омский технопарк", logo: "🔬", type: "Технопарк" },
  { name: "Сколково", logo: "💡", type: "Инновационный центр" },
  { name: "РФФИ", logo: "📚", type: "Научный фонд" },
  { name: "ТПП Омской области", logo: "🤝", type: "Бизнес-объединение" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
export const typeLabel = (t: EventType) => ({ competition: "Конкурс", grant: "Грант", event: "Мероприятие" }[t]);
export const typeBadgeColor = (t: EventType) => ({ competition: "bg-blue-100 text-blue-700", grant: "bg-teal-100 text-teal-700", event: "bg-amber-100 text-amber-700" }[t]);

// ─── Shared UI helpers ────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "О нас", section: "about" as Section, icon: "Info" },
  { label: "Новости", section: "news" as Section, icon: "Newspaper" },
  { label: "Победители", section: "victories" as Section, icon: "Trophy" },
  { label: "Студентам", section: "students" as Section, icon: "GraduationCap" },
  { label: "Наука", section: "science" as Section, icon: "FlaskConical" },
  { label: "Ссылки", section: "links" as Section, icon: "Link" },
  { label: "Инфографика", section: "infographics" as Section, icon: "BarChart3" },
  { label: "Анкета", section: "survey" as Section, icon: "ClipboardList" },
  { label: "Контакты", section: "contacts" as Section, icon: "Phone" },
  { label: "Партнёры", section: "partners" as Section, icon: "Handshake" },
];