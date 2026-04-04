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
export interface GrantTopic {
  topic: string; supervisor: string;
}
export interface GrantItem {
  id: number; title: string; fund: string; amount: string; deadline: string;
  year: number; description: string; requirements: string[]; active: boolean;
  topics?: GrantTopic[];
}

// ─── Students data (single source of truth for calendar) ──────────────────────
export interface CompetitionItem {
  title: string; org: string; deadline: string; amount: string; desc: string; url: string;
}
export interface AcceleratorItem {
  title: string; duration: string; format: string; desc: string; startDate?: string; url?: string;
}
export interface StipendItem {
  title: string; amount: string; req: string; deadline?: string;
}
export interface ScienceEventItem {
  title: string; date: string; description: string;
}

export const COMPETITIONS: CompetitionItem[] = [
  { title: "Конкурс инновационных идей", org: "ФГБОУ ВО Омский ГАУ", deadline: "01.02.2026", amount: "", desc: "Конкурс инновационных идей среди студентов и молодых учёных университета.", url: "" },
  { title: "Студенческий стартап", org: "ФСИ", deadline: "01.04.2026", amount: "1 млн ₽", desc: "Грант для студентов вузов на технологические проекты.", url: "https://drive.google.com/file/d/1w4hbPcyOEBgJlZyMZ3guBbLbJmcPzhB0/view?usp=sharing" },
  { title: "УМНИК", org: "ФСИ", deadline: "15.03.2026", amount: "до 1 млн ₽", desc: "Поддержка молодых учёных и инноваторов до 30 лет.", url: "https://drive.google.com/file/d/1DeP_OPp72TP4fYXnWhDFtxqRSg3M2Rdt/view?usp=sharing" },

];

export const ACCELERATORS: AcceleratorItem[] = [
  { title: "Агентство стратегических инициатив (АСИ)", duration: "Различные программы", format: "Онлайн/Офлайн", desc: "Поддержка инновационных проектов и стартапов на федеральном уровне.", url: "https://asi.ru/" },
];

export const STIPENDS: StipendItem[] = [
  { title: "Стипендия Президента РФ", amount: "22 800 ₽/мес", req: "Достижения в науке и спорте", deadline: "01.10.2026" },
  { title: "Стипендия Правительства РФ", amount: "14 400 ₽/мес", req: "Приоритетные специальности", deadline: "01.11.2026" },
];

export const SCIENCE_EVENTS: ScienceEventItem[] = [];

// ─── Helper: convert dd.mm.yyyy → yyyy-mm-dd ──────────────────────────────────
const toISODate = (d: string) => {
  const [day, month, year] = d.split(".");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// ─── EVENTS — auto-generated from all student data ────────────────────────────
export const EVENTS: CalendarEvent[] = [
  ...COMPETITIONS.filter(c => c.deadline).map((c, i) => ({
    id: 100 + i,
    title: c.title,
    date: toISODate(c.deadline),
    type: "competition" as EventType,
    deadline: toISODate(c.deadline),
    description: `${c.desc}${c.amount ? " Размер: " + c.amount : ""}`,
  })),

  ...STIPENDS.filter(s => s.deadline).map((s, i) => ({
    id: 300 + i,
    title: s.title,
    date: toISODate(s.deadline!),
    type: "grant" as EventType,
    deadline: toISODate(s.deadline!),
    description: `${s.req}. Размер: ${s.amount}.`,
  })),
  ...SCIENCE_EVENTS.map((e, i) => ({
    id: 400 + i,
    title: e.title,
    date: e.date,
    type: "event" as EventType,
    description: e.description,
  })),
];

export const GRANTS: GrantItem[] = [
  {
    id: 1, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 1 000 000 ₽", deadline: "2026-03-15", year: 2026, active: true,
    description: "Программа «У.М.Н.И.К.» направлена на поддержку молодых учёных и специалистов в сфере инноваций.",
    requirements: ["Возраст 18–30 лет", "Гражданство РФ", "Научная новизна разработки", "Коммерческий потенциал"],
    topics: [
      { topic: "Разработка системы мониторинга агрофитоценозов на основе беспилотных авиационных систем", supervisor: "Иванов Алексей Петрович" },
      { topic: "Создание биопрепарата на основе ризосферных бактерий для повышения урожайности зерновых культур", supervisor: "Смирнова Наталья Вячеславовна" },
      { topic: "Разработка интеллектуальной системы управления микроклиматом в теплицах с использованием методов машинного обучения", supervisor: "Кузнецов Дмитрий Александрович" },
      { topic: "Создание биодеградируемых упаковочных материалов из отходов переработки зерна", supervisor: "Петрова Екатерина Сергеевна" },
      { topic: "Разработка программного комплекса для автоматизации учёта и анализа агрохимических показателей почв", supervisor: "Михайлов Сергей Николаевич" },
    ],
  },
  {
    id: 2, title: "Студенческий стартап", fund: "Фонд содействия инновациям", amount: "1 000 000 ₽", deadline: "2026-04-01", year: 2026, active: true,
    description: "Грант для студентов вузов на реализацию технологических стартапов.",
    requirements: ["Статус студента", "Проект в сфере технологий", "Бизнес-план", "Команда от 2 человек"],
    topics: [
      { topic: "Мобильное приложение для дистанционного мониторинга состояния сельскохозяйственных животных", supervisor: "Волкова Ирина Михайловна" },
      { topic: "Платформа для онлайн-торговли продукцией фермерских хозяйств Омской области", supervisor: "Антонов Виктор Леонидович" },
      { topic: "Автоматизированная система полива с датчиками влажности почвы и прогнозированием погоды", supervisor: "Захарова Татьяна Олеговна" },
      { topic: "Сервис подбора оптимальных агротехнологий на основе анализа данных о почве и климате", supervisor: "Белов Андрей Юрьевич" },
      { topic: "Разработка стартапа по производству функциональных продуктов питания из нетрадиционного сырья", supervisor: "Козлова Людмила Борисовна" },
    ],
  },
  { id: 4, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 500 000 ₽", deadline: "2024-12-01", year: 2024, active: false, description: "Программа поддержки молодых инноваторов — конкурс 2024 года.", requirements: ["Возраст 18–30 лет", "Гражданство РФ"],
    topics: [
      { topic: "Разработка экологичного удобрения на основе вермикомпоста", supervisor: "Семёнов Игорь Владимирович" },
      { topic: "Цифровизация севооборота с использованием ГИС-технологий", supervisor: "Фёдорова Анна Степановна" },
    ],
  },
  { id: 5, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 500 000 ₽", deadline: "2023-11-15", year: 2023, active: false, description: "Программа поддержки молодых инноваторов — конкурс 2023 года.", requirements: ["Возраст 18–30 лет", "Гражданство РФ"],
    topics: [
      { topic: "Создание биостимулятора роста растений из торфяного сырья", supervisor: "Никитин Павел Романович" },
    ],
  },
  { id: 8, title: "УМНИК", fund: "Фонд содействия инновациям", amount: "до 500 000 ₽", deadline: "2025-03-15", year: 2025, active: false, description: "Программа поддержки молодых инноваторов — конкурс 2025 года.", requirements: ["Возраст 18–30 лет", "Гражданство РФ"],
    topics: [
      { topic: "Разработка системы точного земледелия на основе спутниковых данных и ИИ", supervisor: "Григорьев Андрей Фёдорович" },
      { topic: "Создание биопестицида для защиты зерновых культур от вредителей", supervisor: "Яковлева Марина Олеговна" },
      { topic: "Разработка мобильного лабораторного анализатора состава почвы", supervisor: "Зайцев Константин Викторович" },
    ],
  },
  { id: 6, title: "Студенческий стартап", fund: "Фонд содействия инновациям", amount: "1 000 000 ₽", deadline: "2025-04-01", year: 2025, active: false, description: "Грант для студентов — конкурс 2025 года.", requirements: ["Статус студента", "Бизнес-план"],
    topics: [
      { topic: "Агрегатор услуг агрономов-консультантов для малых фермерских хозяйств", supervisor: "Орлова Светлана Дмитриевна" },
      { topic: "Цифровая ветеринарная карта крупного рогатого скота с системой оповещений", supervisor: "Тихонов Максим Геннадьевич" },
    ],
  },
  { id: 7, title: "Студенческий стартап", fund: "Фонд содействия инновациям", amount: "1 000 000 ₽", deadline: "2024-04-01", year: 2024, active: false, description: "Грант для студентов — конкурс 2024 года.", requirements: ["Статус студента", "Бизнес-план"],
    topics: [
      { topic: "Онлайн-платформа для сбыта органической продукции напрямую от производителя", supervisor: "Суворова Елена Константиновна" },
    ],
  },
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
    id: 6, date: "31 марта 2026", title: "Открыт приём заявок на «Студенческий стартап»", tag: "Конкурс",
    text: "Фонд содействия инновациям открывает прием заявок на грант «Студенческий стартап» в размере 1 млн рублей на развитие собственного проекта.",
    fullText: `⚡️ Уважаемые студенты, магистранты и аспиранты!\n\nФонд содействия инновациям открывает прием заявок на грант «Студенческий стартап» в размере 1 млн рублей на развитие собственного проекта.\n\n⚡️ Седьмая очередь приема заявок проходит с 09.02.2026 по 18.03.2026\n\nПобедителями в этом году станут 2250 проектов со всей России. К участию приглашаются обучающиеся бакалавриата, специалитета, магистратуры и аспирантуры, в том числе иностранные студенты.\n\nНаправления проектов:\n• цифровые технологии;\n• медицина и здоровье;\n• новые материалы и химические технологии;\n• новые приборы и производственные технологии;\n• биотехнологии;\n• ресурсосберегающая энергетика;\n• креативные индустрии.\n\nУправление инноваций и предпринимательства Омского ГАУ готово стать вашим проводником на пути получения гранта.`,
    link: "https://drive.google.com/file/d/1w4hbPcyOEBgJlZyMZ3guBbLbJmcPzhB0/view",
    image: "https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/aa0a4158-8c21-48b0-88d5-fb628ef8b532.png",
    images: ["https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/9b5111eb-5540-458d-a27c-62310650dd6b.png"],
  },
  {
    id: 1, date: "18 февраля 2026", title: "Открыт приём заявок на программу УМНИК-2026", tag: "Конкурс",
    text: "Фонд содействия инновациям объявил о начале приёма заявок по программе «У.М.Н.И.К.-2026». Приглашаем студентов и молодых учёных до 30 лет подать заявки.",
    fullText: `Для кого: Инноваторы от 18 до 35 лет, являющиеся гражданами РФ, и ранее не побеждавшие в программе\n\nТребования: Согласно Положению по программе «УМНИК», все победители обязаны проходить преакселерацию в аккредитованных Фондом организациях. Основные задачи преакселерации – проработка перспектив коммерциализации результатов НИР и создание бизнес-плана проекта.\n\nРазмер поддержки: 500 тыс. рублей\n\nСрок выполнения: срок выполнения НИР – не более 12 месяцев (2 этапа по 6 месяцев)\n\nНаправления программы:\n• направление расходов – проведение НИР\n\nОжидаемые результаты:\n• подана заявка на регистрацию прав на результаты интеллектуальной деятельности, созданные в рамках выполнения НИР;\n• разработан бизнес-план инновационного проекта либо подана заявка на участие в конкурсах программ Фонда «Студенческий стартап» или «Старт»;\n• пройдена преакселерационная программа на базе организации, включённой в реестр аккредитованных Фондом преакселераторов, с целью проработки перспектив коммерческого использования результатов НИР;\n• составлена дорожная карта проекта\n\nПериодичность: ежегодно`,
    link: "https://drive.google.com/file/d/1DeP_OPp72TP4fYXnWhDFtxqRSg3M2Rdt/view?usp=drive_link",
    image: "https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/4644b309-cb40-4c65-a586-667b4be08d5d.png",
    images: ["https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/44f339c7-460e-49e6-bd5c-3b4c1873b135.png"],
  },
];

export const VICTORIES = [
  { id: 1, title: "УМНИК-2025", fund: "ФСИ", amount: "1 000 000 ₽", year: 2025, type: "УМНИК", winner: "Никитина А.С.", project: "Цифровая система мониторинга посевов" },
  { id: 2, title: "Студенческий стартап-2025", fund: "ФСИ", amount: "3 000 000 ₽", year: 2025, type: "Студенческий стартап", winner: "Команда AgriBot", project: "Автономный робот для сбора урожая" },
  { id: 3, title: "Конкурс инновационных идей-2024", fund: "ФГБОУ ВО Омский ГАУ", amount: "", year: 2024, type: "Конкурс инновационных идей", winner: "", project: "" },
  { id: 4, title: "УМНИК-2024", fund: "ФСИ", amount: "1 000 000 ₽", year: 2024, type: "УМНИК", winner: "Громов П.И.", project: "Биодеградируемые упаковочные материалы" },
];

export const PARTNERS = [
  { name: "Фонд содействия инновациям", logo: "🏛️", type: "Грантовый фонд" },
  { name: "Правительство Омской области", logo: "🏢", type: "Государственный орган" },
  { name: "Омский технопарк", logo: "🔬", type: "Технопарк" },
  { name: "Сколково", logo: "💡", type: "Инновационный центр" },
  { name: "ТПП Омской области", logo: "🤝", type: "Бизнес-объединение" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
export const typeLabel = (t: EventType) => ({ competition: "Конкурс", grant: "Стипендия", event: "Мероприятие" }[t]);
export const typeBadgeColor = (t: EventType) => ({ competition: "bg-blue-100 text-blue-700", grant: "bg-teal-100 text-teal-700", event: "bg-amber-100 text-amber-700" }[t]);

// ─── Shared UI helpers ────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "О нас", section: "about" as Section, icon: "Info" },
  { label: "Новости", section: "news" as Section, icon: "Newspaper" },
  { label: "Конкурсы", section: "students" as Section, icon: "Medal" },
  { label: "Победители", section: "victories" as Section, icon: "Trophy" },
  { label: "Инновации", section: "science" as Section, icon: "FlaskConical" },
  { label: "Партнёры", section: "partners" as Section, icon: "Handshake" },
  { label: "Ссылки", section: "links" as Section, icon: "Link" },
  { label: "Инфографика", section: "infographics" as Section, icon: "BarChart3" },
  { label: "Анкета", section: "survey" as Section, icon: "ClipboardList" },
  { label: "Контакты", section: "contacts" as Section, icon: "Phone" },
];