import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NavButtons, Breadcrumb } from "./LayoutComponents";
import { Section, GrantItem, GRANTS, TEAM, EVENTS, PARTNERS } from "./types";

// ─── Shared props ─────────────────────────────────────────────────────────────
interface NavProps { navigate: (s: Section) => void; goHome: () => void; goBack: () => void; }

// ─── StudentsSection ──────────────────────────────────────────────────────────
interface StudentsSectionProps extends NavProps {
  studentsTab: "competitions" | "grants" | "accelerators" | "stipends" | "science";
  setStudentsTab: (v: "competitions" | "grants" | "accelerators" | "stipends" | "science") => void;
  activeGrants: GrantItem[];
  archiveGrants: GrantItem[];
  grantYearFilter: number | "all";
  setGrantYearFilter: (v: number | "all") => void;
  setSelectedGrant: (g: GrantItem) => void;
}

export function StudentsSection({ navigate, goHome, goBack, studentsTab, setStudentsTab, activeGrants, archiveGrants, grantYearFilter, setGrantYearFilter, setSelectedGrant }: StudentsSectionProps) {
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
}

// ─── GrantDetailSection ───────────────────────────────────────────────────────
interface GrantDetailSectionProps extends NavProps {
  selectedGrant: GrantItem | null;
  handleQuestion: () => void;
}

export function GrantDetailSection({ navigate, goHome, goBack, selectedGrant, handleQuestion }: GrantDetailSectionProps) {
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
}

// ─── ScienceSection ───────────────────────────────────────────────────────────
export function ScienceSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Популяризация науки</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: "BookOpen", title: "Каталог инновационных разработок", desc: "Реестр технологий и разработок ОмГАУ, доступных для трансфера бизнесу.", items: ["Агробиотехнологии", "Цифровые решения", "Экотехнологии"] },
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
}

// ─── LinksSection ─────────────────────────────────────────────────────────────
export function LinksSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Полезные ссылки</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { cat: "Гранты и финансирование", links: [
            { title: "Фонд содействия инновациям", url: "https://fasie.ru", desc: "УМНИК, Старт, Бизнес-старт" },
            { title: "Российский научный фонд", url: "https://rscf.ru", desc: "Гранты для исследовательских коллективов" },
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
}

// ─── InfographicsDetailSection ────────────────────────────────────────────────
export function InfographicsDetailSection({ goHome, goBack }: NavProps) {
  const directions = [
    "Н1. Цифровые технологии",
    "Н2. Медицина и технологии здоровьесбережения",
    "Н3. Новые материалы и химические технологии",
    "Н4. Новые приборы и интеллектуальные производственные технологии",
    "Н5. Биотехнологии",
    "Н6. Ресурсосберегающая энергетика",
    "Н7. Креативные индустрии",
  ];
  const obligations = [
    "создано юридическое лицо, где доля грантополучателя в уставном капитале составляет более 51% и он является генеральным директором",
    "разработан бизнес-план инновационного проекта",
    "разработан сайт стартап-проекта",
  ];
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-2xl text-deep mb-8">Студенческий стартап</h1>
      <div className="space-y-5">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Icon name="Users" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div><span className="font-semibold text-deep text-sm">Для кого: </span><span className="text-sm text-foreground">Обучающиеся по образовательным программам высшего образования, имеющим аккредитацию Рособрнадзора России</span></div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="ClipboardList" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div><span className="font-semibold text-deep text-sm">Требования: </span><span className="text-sm text-foreground">физические лица, обучающиеся по образовательным программам высшего образования, имеющим аккредитацию Федеральной службы по надзору в сфере образования и науки, не имеющие действующих договоров с Фондом и не получавшие ранее грант по программе «Студенческий стартап».</span></div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="Banknote" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div><span className="font-semibold text-deep text-sm">Размер гранта: </span><span className="text-sm text-foreground">1 млн рублей</span></div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="Clock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div><span className="font-semibold text-deep text-sm">Срок выполнения: </span><span className="text-sm text-foreground">12 месяцев (1 этап — 1 месяц, 2 этап — 11 месяцев)</span></div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="Repeat" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div><span className="font-semibold text-deep text-sm">Периодичность: </span><span className="text-sm text-foreground">ежегодно</span></div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-3 flex items-center gap-2"><Icon name="LayoutList" size={16} className="text-primary" />Направления программы</h3>
          <ul className="space-y-2">
            {directions.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <Icon name="ChevronRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />{d}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-3 flex items-center gap-2"><Icon name="CheckCircle" size={16} className="text-primary" />Обязательства</h3>
          <ul className="space-y-2">
            {obligations.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <Icon name="ChevronRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />{o}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <a href="https://fasie.ru/studstartup/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            Подробности на сайте фонда <Icon name="ExternalLink" size={14} />
          </a>
          <img src="https://cdn.poehali.dev/projects/6e3c044a-dc10-4697-ac5a-b4bdac9a79c2/bucket/21192d04-d765-4f2d-9c4d-22e2744c4f26.png" alt="QR-код" className="w-16 h-16 rounded-lg border border-border" />
        </div>
      </div>
    </div>
  );
}

// ─── InfographicsSection ──────────────────────────────────────────────────────
export function InfographicsSection({ goHome, goBack, navigate }: NavProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Инфографика</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="BarChart3" size={17} className="text-primary" />Размеры финансирования конкурсов</h3>
          <div className="space-y-3">
            {[
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
          <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="Clock" size={17} className="text-primary" />Периодичность конкурсов</h3>
          <div className="space-y-2">
            {[
              { prog: "УМНИК", period: "2 раза в год", months: "Март, Сентябрь" },
              { prog: "Студ. стартап", period: "1 раз в год", months: "Январь–Апрель" },
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
}

// ─── SurveySection ────────────────────────────────────────────────────────────
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
}

// ─── ContactsSection ──────────────────────────────────────────────────────────
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

// ─── PartnersSection ──────────────────────────────────────────────────────────
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

// ─── LoginSection ─────────────────────────────────────────────────────────────
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