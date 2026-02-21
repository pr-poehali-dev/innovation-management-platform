import { useState } from "react";

// ─── Portal components ────────────────────────────────────────────────────────
import { Section, EventType, GrantItem, GRANTS, VICTORIES, EVENTS } from "@/components/portal/types";
import { Header, Footer, QuestionDialog } from "@/components/portal/LayoutComponents";
import { HomeSection, AboutSection, NewsSection, VictoriesSection, CalendarSection } from "@/components/portal/HomeSections";
import {
  StudentsSection, GrantDetailSection, BusinessSection, ScienceSection,
  TeamSection, LinksSection, InfographicsSection, SurveySection,
  ContactsSection, PartnersSection, LoginSection,
} from "@/components/portal/ContentSections";

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

  // ─── Derived state ──────────────────────────────────────────────────────────
  const filteredEvents = EVENTS.filter(
    (e: { type: EventType }) => calendarFilter === "all" || e.type === calendarFilter
  );
  const filteredVictories = VICTORIES.filter(v => victoriesFilter === "all" || v.type === victoriesFilter);
  const activeGrants = GRANTS.filter(g => g.active);
  const archiveGrants = GRANTS.filter(g => !g.active && (grantYearFilter === "all" || g.year === grantYearFilter));

  // ─── Render ─────────────────────────────────────────────────────────────────
  const renderSection = () => {
    const navProps = { navigate, goHome, goBack };
    switch (section) {
      case "home":        return <HomeSection navigate={navigate} />;
      case "about":       return <AboutSection {...navProps} />;
      case "news":        return <NewsSection {...navProps} />;
      case "victories":   return <VictoriesSection {...navProps} victoriesFilter={victoriesFilter} setVictoriesFilter={setVictoriesFilter} filteredVictories={filteredVictories} />;
      case "calendar":    return <CalendarSection {...navProps} calendarFilter={calendarFilter} setCalendarFilter={setCalendarFilter} filteredEvents={filteredEvents} />;
      case "students":    return <StudentsSection {...navProps} studentsTab={studentsTab} setStudentsTab={setStudentsTab} activeGrants={activeGrants} archiveGrants={archiveGrants} grantYearFilter={grantYearFilter} setGrantYearFilter={setGrantYearFilter} setSelectedGrant={setSelectedGrant} />;
      case "grant-detail":return <GrantDetailSection {...navProps} selectedGrant={selectedGrant} handleQuestion={handleQuestion} />;
      case "business":    return <BusinessSection {...navProps} />;
      case "science":     return <ScienceSection {...navProps} />;
      case "team":        return <TeamSection {...navProps} />;
      case "links":       return <LinksSection {...navProps} />;
      case "infographics":return <InfographicsSection {...navProps} />;
      case "survey":      return <SurveySection {...navProps} />;
      case "contacts":    return <ContactsSection {...navProps} />;
      case "partners":    return <PartnersSection {...navProps} />;
      case "login":       return <LoginSection {...navProps} loginForm={loginForm} setLoginForm={setLoginForm} loginError={loginError} handleLogin={handleLogin} />;
      default:            return <HomeSection navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-ibm">
      <Header
        section={section}
        isLoggedIn={isLoggedIn}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setIsLoggedIn={setIsLoggedIn}
        navigate={navigate}
        handleQuestion={handleQuestion}
      />
      <main className="flex-1 animate-fade-in">{renderSection()}</main>
      <Footer navigate={navigate} handleQuestion={handleQuestion} />
      <QuestionDialog
        questionOpen={questionOpen}
        questionText={questionText}
        questionSent={questionSent}
        setQuestionOpen={setQuestionOpen}
        setQuestionText={setQuestionText}
        sendQuestion={sendQuestion}
      />
    </div>
  );
}