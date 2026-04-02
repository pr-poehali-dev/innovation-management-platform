import Icon from "@/components/ui/icon";
import { NavButtons, Breadcrumb } from "./LayoutComponents";
import { Section, GrantItem, EVENTS } from "./types";

interface NavProps { navigate: (s: Section) => void; goHome: () => void; goBack: () => void; }

interface StudentsSectionProps extends NavProps {
  studentsTab: "competitions" | "grants" | "accelerators" | "stipends" | "science";
  setStudentsTab: (v: "competitions" | "grants" | "accelerators" | "stipends" | "science") => void;
  activeGrants: GrantItem[];
  archiveGrants: GrantItem[];
  grantYearFilter: number | "all";
  setGrantYearFilter: (v: number | "all") => void;
  setSelectedGrant: (g: GrantItem) => void;
  handleQuestion: () => void;
}

export function StudentsSection({ navigate, goHome, goBack, studentsTab, setStudentsTab, activeGrants, archiveGrants, grantYearFilter, setGrantYearFilter, setSelectedGrant, handleQuestion }: StudentsSectionProps) {
  const tabs = [
    { key: "competitions" as const, label: "Конкурсы", icon: "Medal" },
    { key: "grants" as const, label: "Гранты", icon: "Banknote" },
    { key: "accelerators" as const, label: "Акселераторы", icon: "Rocket" },
    { key: "stipends" as const, label: "Стипендии", icon: "BookOpen" },
    { key: "science" as const, label: "Научные мероприятия", icon: "FlaskConical" },
  ];
  const competitions = [
    { title: "Студенческий стартап", org: "ФСИ", deadline: "01.04.2026", amount: "1 млн ₽", desc: "Грант для студентов вузов на технологические проекты.", url: "https://drive.google.com/file/d/1w4hbPcyOEBgJlZyMZ3guBbLbJmcPzhB0/view?usp=sharing" },
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
              <div className="text-xs mb-3"><span className="text-muted-foreground">до </span><span className="font-medium text-deep">{c.deadline}</span><span className="ml-2 font-semibold text-gold-dark">{c.amount}</span></div>
              <div className="flex items-center gap-2">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-teal-light transition-colors flex items-center gap-1">
                  Подробнее <Icon name="ExternalLink" size={10} />
                </a>
                <button onClick={handleQuestion} className="text-xs bg-gold text-deep px-3 py-1.5 rounded-lg hover:bg-gold/80 transition-colors flex items-center gap-1 font-medium">
                  <Icon name="MessageCircleQuestion" size={10} />Задать вопрос
                </button>
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
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0"><Icon name="BookOpen" size={18} className="text-primary" /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-deep text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{s.req}</p>
              </div>
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