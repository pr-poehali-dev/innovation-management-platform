import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NavButtons, Breadcrumb } from "./LayoutComponents";
import { Section, GrantItem, COMPETITIONS, ACCELERATORS, STIPENDS, SCIENCE_EVENTS } from "./types";

interface NavProps { navigate: (s: Section) => void; goHome: () => void; goBack: () => void; }

function GrantsTab({ activeGrants, archiveGrants, grantYearFilter, setGrantYearFilter, setSelectedGrant, navigate }: {
  activeGrants: GrantItem[]; archiveGrants: GrantItem[]; grantYearFilter: number | "all";
  setGrantYearFilter: (v: number | "all") => void; setSelectedGrant: (g: GrantItem) => void;
  navigate: (s: Section) => void;
}) {
  const [archiveProgram, setArchiveProgram] = useState<"УМНИК" | "Студенческий стартап">("УМНИК");
  const archiveYears = [...new Set(archiveGrants.filter(g => g.title === archiveProgram).map(g => g.year))].sort((a, b) => b - a);
  const selectedYear = archiveYears.includes(grantYearFilter as number) ? grantYearFilter : archiveYears[0];
  const filteredArchive = archiveGrants
    .filter(g => g.title === archiveProgram)
    .filter(g => selectedYear === "all" || g.year === selectedYear);

  return (
    <div className="space-y-4">
      <h3 className="font-merriweather font-bold text-deep">Актуальные темы заявок</h3>
      {activeGrants.map(g => (
        <div key={g.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => { setSelectedGrant(g); navigate("grant-detail"); }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-merriweather font-bold text-deep">{g.title}</h4>
              <p className="text-sm text-muted-foreground">{g.fund}</p>
              <p className="text-sm mt-1.5">{g.description}</p>
              {g.topics && g.topics.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {g.topics.map((t, i) => (
                    <div key={i} className="bg-muted rounded-lg px-3 py-2">
                      <p className="text-xs font-medium text-deep">{t.topic}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Icon name="User" size={10} />{t.supervisor}</p>
                    </div>
                  ))}
                </div>
              )}
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
        <h3 className="font-merriweather font-bold text-deep mb-4 flex items-center gap-2"><Icon name="Archive" size={17} className="text-muted-foreground" />Архив тем заявок</h3>
        <div className="flex gap-2 flex-wrap mb-3">
          {(["УМНИК", "Студенческий стартап"] as const).map(p => (
            <button key={p} onClick={() => setArchiveProgram(p)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${archiveProgram === p ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {archiveYears.map(y => (
            <button key={y} onClick={() => setGrantYearFilter(y)}
              className={`px-3 py-1 rounded text-xs transition-colors ${grantYearFilter === y ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
              {y}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filteredArchive.map(g => (
            <div key={g.id} className="bg-muted rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Archive" size={13} className="text-muted-foreground flex-shrink-0" />
                <span className="font-semibold text-deep text-sm">{g.title}</span>
                <span className="text-muted-foreground text-xs ml-auto">{g.year} · {g.amount}</span>
              </div>
              {g.topics && g.topics.length > 0 && (
                <div className="space-y-1 pl-5">
                  {g.topics.map((t, i) => (
                    <div key={i} className="text-xs">
                      <span className="text-deep">{t.topic}</span>
                      <span className="text-muted-foreground ml-2">— {t.supervisor}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {filteredArchive.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Нет записей за выбранный период</p>
          )}
        </div>
      </div>
    </div>
  );
}

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
    { key: "grants" as const, label: "Темы заявок", icon: "Banknote" },
    { key: "accelerators" as const, label: "Акселераторы", icon: "Rocket" },
    { key: "stipends" as const, label: "Стипендии", icon: "BookOpen" },
    { key: "science" as const, label: "Научные мероприятия", icon: "FlaskConical" },
  ];
  const competitions = [...COMPETITIONS].sort((a, b) => {
    const toDate = (d: string) => { const [day, mon, year] = d.split("."); return new Date(+year, +mon - 1, +day).getTime(); };
    return toDate(a.deadline) - toDate(b.deadline);
  });
  const accelerators = ACCELERATORS;
  const stipends = STIPENDS;

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
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-teal-light transition-colors flex items-center gap-1">
                    Подробнее <Icon name="ExternalLink" size={10} />
                  </a>
                )}
                <button onClick={handleQuestion} className="text-xs bg-gold text-deep px-3 py-1.5 rounded-lg hover:bg-gold/80 transition-colors flex items-center gap-1 font-medium">
                  <Icon name="MessageCircleQuestion" size={10} />Задать вопрос
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {studentsTab === "grants" && (
        <GrantsTab activeGrants={activeGrants} archiveGrants={archiveGrants} grantYearFilter={grantYearFilter} setGrantYearFilter={setGrantYearFilter} setSelectedGrant={setSelectedGrant} navigate={navigate} />
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
          {SCIENCE_EVENTS.map((e, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
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
          {selectedGrant.topics && selectedGrant.topics.length > 0 && (
            <div>
              <h3 className="font-merriweather font-bold text-deep mb-3">Темы заявок</h3>
              <div className="space-y-2">
                {selectedGrant.topics.map((t, i) => (
                  <div key={i} className="bg-muted rounded-lg px-4 py-3">
                    <p className="text-sm font-medium text-deep">{i + 1}. {t.topic}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5"><Icon name="User" size={11} />Руководитель: {t.supervisor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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