import Icon from "@/components/ui/icon";
import { NavButtons } from "./LayoutComponents";
import { Section } from "./types";

interface NavProps { navigate: (s: Section) => void; goHome: () => void; goBack: () => void; }

export function ScienceSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Инновации</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: "BookOpen", title: "Каталог инновационных разработок", desc: "Реестр технологий и разработок Омского ГАУ, доступных для трансфера бизнесу.", items: ["Агробиотехнологии", "Цифровые решения", "Экотехнологии"] },
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

export function InfographicsSection({ goHome, goBack }: NavProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <NavButtons onHome={goHome} onBack={goBack} />
      <h1 className="font-merriweather font-bold text-3xl text-deep mb-8">Инфографика</h1>
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-merriweather font-bold text-deep mb-5 flex items-center gap-2"><Icon name="TrendingUp" size={17} className="text-primary" />Количество заявок и побед</h3>
        {(() => {
          const data = [
            { year: "2025", submitted: 34, won: 5 },
            { year: "2026", submitted: 36, won: 0 },
          ];
          const maxSubmitted = Math.max(...data.map(d => d.submitted));
          return (
            <div className="space-y-5">
              {data.map((d, i) => (
                <div key={i}>
                  <div className="text-sm font-semibold text-deep mb-2">{d.year} год</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground flex items-center gap-1"><Icon name="FileText" size={11} className="text-primary" />Подано заявок</span>
                        <span className="font-medium text-deep">{d.submitted} ед.</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(d.submitted / maxSubmitted) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground flex items-center gap-1"><Icon name="Trophy" size={11} className="text-gold" />Выиграно конкурсов</span>
                        <span className="font-medium text-deep">{d.won} чел.</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full transition-all" style={{ width: d.won > 0 ? `${(d.won / maxSubmitted) * 100}%` : "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t border-border text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" />Подано заявок</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gold inline-block" />Выиграно конкурсов</span>
              </div>
            </div>
          );
        })()}
      </div>
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