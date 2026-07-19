import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sun,
  Moon,
  Workflow,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Users,
  Laptop,
  Building2,
  Lock,
  UserCog,
  ClipboardList,
  Bell,
  Timer,
  GitBranch,
  Database,
  FileCheck2,
  Rocket,
  Menu,
  X,
  Check,
  Minus,
  Mail,
  Phone,
  Building,
  ChevronDown,
  CircleDot,
  Activity,
  TrendingUp,
  Cpu,
  Zap,
  KeyRound,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: LandingPage,
});

// ---------- Utility hooks ----------

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefers =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : !!prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const nd = !d;
      document.documentElement.classList.toggle("dark", nd);
      localStorage.setItem("theme", nd ? "dark" : "light");
      return nd;
    });
  };
  return { dark, toggle };
}

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

// ---------- Small primitives ----------

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

// ---------- Navigation ----------

const NAV = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#lifecycle", label: "Lifecycle" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#stakeholders", label: "Roles" },
  { href: "#faq", label: "FAQ" },
];

function Navbar({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${
            scrolled ? "glass-strong shadow-card" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero shadow-glow">
              <Workflow className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight">FlowHire</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition hover:text-foreground"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-lg gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 sm:inline-flex"
            >
              Request Demo
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="mt-2 rounded-2xl glass-strong p-3 lg:hidden">
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg gradient-hero px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                Request Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ---------- Hero ----------

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-violet/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1.5 text-xs font-medium text-foreground">
              <span className="grid h-4 w-4 place-items-center rounded-full gradient-hero">
                <Sparkles className="h-2.5 w-2.5 text-primary-foreground" />
              </span>
              Powered by ServiceNow · Flow Designer
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Automated Employee <br className="hidden sm:block" />
              <span className="text-gradient">Onboarding & Offboarding</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Digitize, automate, and optimize the complete employee lifecycle on ServiceNow.
              Improve HR efficiency, automate approvals, streamline departmental collaboration,
              and enforce secure role-based operations end to end.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-xl gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
              >
                Request Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                Explore Features
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Role-based ACL
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-brand" /> SLA monitored
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-brand" /> Real-time analytics
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-brand" /> Audit ready
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400}>
          <div className="mt-16">
            <HeroDashboard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroDashboard() {
  const trend = [
    { m: "Jan", on: 24, off: 8 },
    { m: "Feb", on: 32, off: 12 },
    { m: "Mar", on: 41, off: 10 },
    { m: "Apr", on: 38, off: 14 },
    { m: "May", on: 52, off: 16 },
    { m: "Jun", on: 60, off: 18 },
    { m: "Jul", on: 71, off: 22 },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl gradient-hero opacity-20 blur-2xl" />
      <div className="rounded-3xl glass-strong p-3 sm:p-5">
        <div className="mb-3 flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-chart-5/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
          <span className="ml-3 text-xs text-muted-foreground">
            flowhire.servicenow · Lifecycle Dashboard
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Total Employees" value="2,847" trend="+12%" />
          <StatTile label="Active Requests" value="184" trend="+4%" />
          <StatTile label="SLA Compliance" value="98.6%" trend="+2.1%" />
          <StatTile label="Pending Approvals" value="23" trend="-8%" />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="col-span-1 rounded-2xl border border-border bg-card p-4 lg:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Lifecycle Trend</div>
                <div className="text-xs text-muted-foreground">Onboarding vs Offboarding</div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-1" /> Onboarding
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-2" /> Offboarding
                </span>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="on"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="off"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-sm font-semibold">Today's Pipeline</div>
            <div className="mt-3 space-y-3">
              {[
                { l: "HR Verification", v: 92, c: "var(--color-chart-1)" },
                { l: "IT Provisioning", v: 78, c: "var(--color-chart-2)" },
                { l: "Facilities Setup", v: 64, c: "var(--color-chart-3)" },
                { l: "Security Access", v: 88, c: "var(--color-chart-4)" },
              ].map((r) => (
                <div key={r.l}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{r.l}</span>
                    <span className="font-semibold">{r.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.v}%`, background: r.c }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, trend }: { label: string; value: string; trend: string }) {
  const up = trend.startsWith("+");
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className="text-xl font-bold sm:text-2xl">{value}</div>
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
            up
              ? "bg-chart-4/15 text-chart-4"
              : "bg-destructive/15 text-destructive"
          }`}
        >
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      </div>
    </div>
  );
}

// ---------- Trust bar ----------

function TrustBar() {
  const items = [
    "ServiceNow",
    "Flow Designer",
    "Service Catalog",
    "Business Rules",
    "ACL Security",
    "SLA Engine",
  ];
  return (
    <section className="border-y border-border bg-secondary/30 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="text-foreground/60">Built on</span>
          {items.map((i) => (
            <span key={i} className="opacity-80 transition hover:text-foreground hover:opacity-100">
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- About / Objectives ----------

const OBJECTIVES = [
  {
    icon: Workflow,
    title: "Streamline Employee Lifecycle",
    desc: "Digital onboarding, automated offboarding, and consistent standardized workflows that eliminate manual work.",
    bullets: ["Digital onboarding", "Automated offboarding", "Reduced manual work", "Standardized workflows"],
  },
  {
    icon: UserCog,
    title: "Enhance HR & Manager Efficiency",
    desc: "A self-service Service Catalog with automated approvals, task assignment, and lifecycle tracking.",
    bullets: ["Self-service catalog", "Automated approvals", "Auto task assignment", "Lifecycle tracking"],
  },
  {
    icon: ShieldCheck,
    title: "Secure Role-Based Access",
    desc: "ACL-driven access ensuring HR, IT, Facilities, Security, and Managers only see what they should.",
    bullets: ["HR & Manager scoped", "IT & Facilities", "Security controls", "Compliance-ready"],
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decision Making",
    desc: "Interactive dashboards and reports to monitor KPIs, spot bottlenecks, and continuously improve operations.",
    bullets: ["SLA adherence", "Completion rates", "Pending approvals", "Department performance"],
  },
  {
    icon: FileCheck2,
    title: "Compliance & Sustainability",
    desc: "Audit trails, digital documentation, automated approvals, and paperless workflows built in.",
    bullets: ["Audit trails", "Digital docs", "Access revocation", "Paperless workflow"],
  },
  {
    icon: Cpu,
    title: "Extensible Platform",
    desc: "Business rules, dynamic variables, and integrations extend the platform to fit any organization.",
    bullets: ["Business rules", "Dynamic forms", "Email integration", "Custom workflows"],
  },
];

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader
              center={false}
              eyebrow="About the System"
              title="One platform for the entire employee lifecycle"
              subtitle="The Employee Onboarding & Offboarding System automates every stage of the employee journey on ServiceNow — digitizing requests, approvals, task assignment, and departmental collaboration."
            />
          </div>
          <div className="rounded-3xl glass p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-4">
              {[
                { k: "Departments", v: "5+" },
                { k: "Workflow Steps", v: "18" },
                { k: "SLA Rules", v: "24" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-3xl font-extrabold text-gradient">{s.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.k}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              HR, Managers, IT, Facilities, and Security teams work together through automated
              workflows — improving employee experience and organizational productivity.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((o, i) => (
            <Reveal key={o.title} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-hero shadow-glow transition group-hover:scale-110">
                  <o.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-brand" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Lifecycle timeline ----------

const LIFECYCLE = [
  "Employee hired",
  "HR submits onboarding request",
  "Manager approval",
  "Flow Designer automation",
  "IT account creation",
  "Email provisioning",
  "Laptop allocation",
  "Facilities workspace",
  "Security access",
  "Employee joins",
  "Lifecycle tracking",
  "Resignation",
  "Offboarding request",
  "Approval workflow",
  "Asset return",
  "Account deactivation",
  "Access revocation",
  "Completion report",
];

function Lifecycle() {
  return (
    <section id="lifecycle" className="relative gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Complete Lifecycle"
          title="From offer letter to exit — automated end to end"
          subtitle="Every step is orchestrated by Flow Designer, tracked with SLAs, and visible to the right stakeholders."
        />
        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block">
            <div className="mx-8 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {LIFECYCLE.map((step, i) => (
              <Reveal key={step} delay={i * 40}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg gradient-hero text-[11px] font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                    <CircleDot className="h-4 w-4 text-brand animate-pulse-glow" />
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-snug">{step}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- ServiceNow features ----------

const FEATURES = [
  {
    icon: ClipboardList,
    title: "Service Catalog",
    desc: "Self-service portal with employee onboarding, offboarding, and lifecycle request items.",
    tags: ["Onboarding Request", "Offboarding Request", "Self-service"],
  },
  {
    icon: GitBranch,
    title: "Flow Designer",
    desc: "Trigger approvals, assign departmental tasks, send notifications, and escalate delays.",
    tags: ["Approvals", "Task routing", "Escalations"],
  },
  {
    icon: Sparkles,
    title: "Dynamic Variables",
    desc: "Forms adapt to employee type, department, designation, location, and employment category.",
    tags: ["Conditional forms", "Reusable UI", "Smart defaults"],
  },
  {
    icon: Timer,
    title: "SLA Management",
    desc: "Response time, resolution time, breached SLAs, and pending queues in one view.",
    tags: ["Response SLA", "Resolution SLA", "Breach alerts"],
  },
  {
    icon: BarChart3,
    title: "Reporting & Dashboards",
    desc: "Interactive analytics for onboarding trends, SLA compliance, and workload distribution.",
    tags: ["Trends", "Compliance", "Workload"],
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Automated email and in-platform notifications keep every stakeholder aligned.",
    tags: ["Email", "In-app", "Escalations"],
  },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="ServiceNow Features"
          title="Every capability you need — natively on ServiceNow"
          subtitle="Purpose-built modules that work together to power the entire employee lifecycle."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand/20" />
                <div className="relative">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-hero shadow-glow">
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-secondary/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Stakeholders ----------

const STAKEHOLDERS = [
  {
    icon: Users,
    role: "HR",
    tint: "from-chart-1/20 to-chart-1/5",
    items: ["Employee records", "Document verification", "Request initiation", "Lifecycle management"],
  },
  {
    icon: UserCog,
    role: "Managers",
    tint: "from-chart-2/20 to-chart-2/5",
    items: ["Approvals", "Team assignment", "Employee verification"],
  },
  {
    icon: Laptop,
    role: "IT Team",
    tint: "from-chart-3/20 to-chart-3/5",
    items: ["Laptop provisioning", "Email account", "VPN access", "Software install"],
  },
  {
    icon: Building2,
    role: "Facilities",
    tint: "from-chart-4/20 to-chart-4/5",
    items: ["Desk allocation", "Access card", "Workspace prep"],
  },
  {
    icon: ShieldCheck,
    role: "Security",
    tint: "from-chart-5/20 to-chart-5/5",
    items: ["Building access", "Badge management", "Access revocation", "Compliance"],
  },
];

function Stakeholders() {
  return (
    <section id="stakeholders" className="gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Stakeholders"
          title="Every team, aligned on one workflow"
          subtitle="From HR to Security — everyone gets the right tasks, at the right time, with the right visibility."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STAKEHOLDERS.map((s, i) => (
            <Reveal key={s.role} delay={i * 60}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div
                  className={`absolute inset-0 -z-0 bg-gradient-to-br opacity-70 ${s.tint}`}
                />
                <div className="relative">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl gradient-hero shadow-glow">
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{s.role}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-brand" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Role-based ACL matrix ----------

const ROLES = [
  { role: "HR", records: "Employee Records", perms: ["Create", "Read", "Update"] },
  { role: "Manager", records: "Approvals", perms: ["Read", "Approve"] },
  { role: "IT", records: "IT Tasks", perms: ["Read", "Update"] },
  { role: "Facilities", records: "Workspace Tasks", perms: ["Read", "Update"] },
  { role: "Security", records: "Access Tasks", perms: ["Read", "Update"] },
  { role: "Admin", records: "Full Access", perms: ["Create", "Read", "Update", "Delete"] },
];
const PERM_COLS = ["Create", "Read", "Update", "Approve", "Delete"];

function AccessMatrix() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Role-Based ACL"
          title="Security by design — enforced at the record level"
          subtitle="Every stakeholder sees only what they need. Access Control Lists enforce confidentiality without slowing anyone down."
        />
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl border border-border glass">
            <div className="flex items-center justify-between gap-2 border-b border-border p-4">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero shadow-glow">
                  <Lock className="h-4 w-4 text-primary-foreground animate-pulse-glow" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Access Control Matrix</div>
                  <div className="text-xs text-muted-foreground">
                    Live enforcement across all tables & workflows
                  </div>
                </div>
              </div>
              <span className="hidden rounded-full bg-chart-4/15 px-2.5 py-1 text-xs font-semibold text-chart-4 sm:inline-flex">
                <ShieldCheck className="mr-1 h-3.5 w-3.5" /> ACL Active
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Accessible Records</th>
                    {PERM_COLS.map((p) => (
                      <th key={p} className="px-4 py-3 text-center font-semibold">
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map((r) => (
                    <tr
                      key={r.role}
                      className="border-b border-border/60 transition hover:bg-secondary/40"
                    >
                      <td className="px-4 py-3 font-semibold">{r.role}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.records}</td>
                      {PERM_COLS.map((p) => (
                        <td key={p} className="px-4 py-3 text-center">
                          {r.perms.includes(p) ? (
                            <Check className="mx-auto h-4 w-4 text-chart-4" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Workflow automation diagram ----------

const FLOW = [
  { icon: ClipboardList, label: "Service Catalog Request" },
  { icon: ShieldCheck, label: "Approval Engine" },
  { icon: GitBranch, label: "Flow Designer" },
  { icon: Users, label: "Department Task Generation" },
  { icon: Bell, label: "Notifications" },
  { icon: Timer, label: "SLA Tracking" },
  { icon: FileCheck2, label: "Completion" },
];

function WorkflowSection() {
  return (
    <section className="gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Workflow Automation"
          title="Flow Designer orchestrates every step"
          subtitle="Requests flow through approvals, tasks, notifications, and SLA tracking — with full visibility."
        />
        <Reveal>
          <div className="mt-14 rounded-3xl glass p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
              {FLOW.map((f, i) => (
                <div key={f.label} className="relative flex items-center gap-4 lg:block">
                  <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-hero shadow-glow">
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                    {i < FLOW.length - 1 && (
                      <span className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center lg:flex">
                        <ArrowRight className="h-4 w-4 text-brand animate-pulse-glow" />
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex-1 text-left lg:text-center">
                    <div className="text-sm font-semibold">{f.label}</div>
                    <div className="text-xs text-muted-foreground">Step {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Project scope / roadmap ----------

const PHASES = [
  { icon: ClipboardList, title: "Catalog Creation", items: ["Employee Onboarding", "Employee Offboarding"] },
  { icon: Database, title: "Database Design", items: ["Tables", "Variables", "Relationships"] },
  { icon: GitBranch, title: "Flow Designer", items: ["Automated workflows", "Notifications", "Task creation"] },
  { icon: ShieldCheck, title: "Role-Based Security", items: ["ACL implementation", "User roles", "Permissions"] },
  { icon: Timer, title: "SLA Configuration", items: ["Response SLA", "Resolution SLA", "Escalations"] },
  { icon: Activity, title: "Testing", items: ["Unit Testing", "UAT", "Bug Fixing"] },
  { icon: Rocket, title: "Deployment", items: ["Production rollout", "Training", "Documentation", "Go Live"] },
];

function Roadmap() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Project Scope"
          title="A structured roadmap from catalog to go-live"
          subtitle="Seven phases designed for enterprise ServiceNow deployments."
        />
        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-7">
            {PHASES.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl gradient-hero shadow-glow">
                      <p.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-bold text-brand">Phase {i + 1}</span>
                  </div>
                  <div className="text-sm font-bold">{p.title}</div>
                  <ul className="mt-2 space-y-1">
                    {p.items.map((it) => (
                      <li key={it} className="text-xs text-muted-foreground">
                        · {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Benefits / stats ----------

const STATS = [
  { v: 95, s: "%", l: "Reduction in Manual Work" },
  { v: 80, s: "%", l: "Faster Employee Onboarding" },
  { v: 100, s: "%", l: "Digital Workflow" },
  { v: 90, s: "%", l: "Improved SLA Compliance" },
  { v: 85, s: "%", l: "Manager Productivity Increase" },
  { v: 99, s: "%", l: "Secure Role-Based Access" },
];

function Benefits() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Benefits"
          title="Real outcomes — measured, not marketed"
          subtitle="Enterprises using automated ServiceNow onboarding see immediate, quantifiable gains."
        />
        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s, i) => (
            <StatCard key={s.l} target={s.v} suffix={s.s} label={s.l} inView={inView} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  target,
  suffix,
  label,
  inView,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const value = useCounter(target, inView, 1500 + delay);
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-glow"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand/20" />
      <div className="relative">
        <div className="flex items-baseline gap-1">
          <div className="text-5xl font-extrabold text-gradient tabular-nums sm:text-6xl">
            {value}
          </div>
          <div className="text-2xl font-extrabold text-gradient">{suffix}</div>
        </div>
        <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

// ---------- Dashboard preview ----------

function DashboardPreview() {
  const dept = [
    { name: "HR", value: 34 },
    { name: "IT", value: 45 },
    { name: "Facilities", value: 22 },
    { name: "Security", value: 18 },
    { name: "Finance", value: 12 },
  ];
  const status = [
    { name: "Completed", value: 62 },
    { name: "In progress", value: 24 },
    { name: "Pending", value: 14 },
  ];
  const COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
  ];

  return (
    <section id="dashboard" className="gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Dashboard Preview"
          title="Analytics that leaders actually use"
          subtitle="Real-time insights across employees, requests, SLAs, and department performance."
        />
        <Reveal>
          <div className="mt-14 rounded-3xl glass-strong p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <StatTile label="Total Employees" value="2,847" trend="+12%" />
              <StatTile label="Active Requests" value="184" trend="+4%" />
              <StatTile label="Completed Onboarding" value="1,204" trend="+18%" />
              <StatTile label="Completed Offboarding" value="386" trend="+6%" />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Department Performance</div>
                    <div className="text-xs text-muted-foreground">
                      Requests handled this month
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">Monthly</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dept}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          background: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {dept.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm font-semibold">Lifecycle Status</div>
                <div className="text-xs text-muted-foreground">Distribution across all cases</div>
                <div className="mt-2 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={status}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={80}
                        paddingAngle={4}
                      >
                        {status.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-1.5">
                  {status.map((s, i) => (
                    <div key={s.name} className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: COLORS[i] }}
                        />
                        {s.name}
                      </span>
                      <span className="font-semibold">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { l: "SLA Performance", v: 98, c: "var(--color-chart-4)" },
                { l: "Task Completion", v: 92, c: "var(--color-chart-1)" },
                { l: "Pending Approvals", v: 12, c: "var(--color-chart-5)" },
              ].map((r) => (
                <div key={r.l} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{r.l}</div>
                    <div className="text-lg font-extrabold" style={{ color: r.c }}>
                      {r.v}%
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.v}%`, background: r.c }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Technologies ----------

const TECH = [
  { icon: Workflow, name: "ServiceNow" },
  { icon: GitBranch, name: "Flow Designer" },
  { icon: ClipboardList, name: "Service Catalog" },
  { icon: ShieldCheck, name: "ACL" },
  { icon: Timer, name: "SLA" },
  { icon: BarChart3, name: "Reporting" },
  { icon: Activity, name: "Dashboards" },
  { icon: Bell, name: "Notifications" },
  { icon: Zap, name: "Business Rules" },
  { icon: Mail, name: "Email Integration" },
];

function Technologies() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Technologies"
          title="A native ServiceNow stack"
          subtitle="Built entirely on ServiceNow's platform primitives — no shadow tools required."
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {TECH.map((t, i) => (
            <Reveal key={t.name} delay={i * 40}>
              <div className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-glow">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-hero shadow-glow transition group-hover:scale-110">
                  <t.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 truncate text-sm font-semibold">{t.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Comparison ----------

function Compare() {
  const trad = [
    "Manual paperwork",
    "Slow approvals",
    "Poor visibility",
    "High errors",
    "No analytics",
  ];
  const auto = [
    "Automated workflows",
    "Digital requests",
    "Real-time tracking",
    "SLA monitoring",
    "Secure role-based access",
    "Analytics dashboard",
    "Faster onboarding",
    "Compliance ready",
  ];
  return (
    <section className="gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Why Choose This Solution"
          title="Traditional process vs. automated ServiceNow"
          subtitle="Two very different worlds — measured across efficiency, security, and experience."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-8">
              <div className="mb-2 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                Before
              </div>
              <h3 className="text-2xl font-bold">Traditional Process</h3>
              <ul className="mt-6 space-y-3">
                {trad.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-destructive/15 text-destructive">
                      <X className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border p-8 gradient-hero text-primary-foreground shadow-glow">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                After
              </div>
              <h3 className="text-2xl font-bold">Automated ServiceNow Solution</h3>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {auto.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-white/20">
                      <Check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonials ----------

const TESTIMONIALS = [
  {
    name: "Priya S.",
    role: "HR Manager, Global Tech Co.",
    quote: "The automation reduced onboarding time by over 70%. New hires are productive on day one.",
  },
  {
    name: "Marcus L.",
    role: "IT Administrator, FinCorp",
    quote:
      "Task assignments are fully automated, eliminating manual coordination between IT and HR.",
  },
  {
    name: "Amelia R.",
    role: "Operations Manager, HealthPlus",
    quote:
      "Role-based access keeps every department secure while improving cross-team efficiency.",
  },
];

function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by teams that ship faster"
          subtitle="Enterprises across industries rely on our ServiceNow onboarding automation."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="relative h-full rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="absolute right-6 top-6 text-6xl leading-none text-brand/20">"</div>
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full gradient-hero text-sm font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------

const FAQS = [
  {
    q: "How does onboarding automation work?",
    a: "HR raises a request from the Service Catalog. Flow Designer routes approvals, generates department tasks for IT, Facilities, and Security, and tracks completion — all from a single record.",
  },
  {
    q: "How are approvals managed?",
    a: "Approvals are driven by dynamic rules. Managers approve inline via email or the portal, and escalations trigger automatically when SLAs are at risk.",
  },
  {
    q: "Can multiple departments collaborate?",
    a: "Yes. Each department gets scoped tasks, notifications, and dashboards while contributing to a single unified lifecycle record.",
  },
  {
    q: "How is security maintained?",
    a: "Role-based ACLs enforce access at the record and field level. Every action is logged for audit and compliance.",
  },
  {
    q: "What reports are available?",
    a: "Onboarding and offboarding trends, SLA compliance, department workload, task completion, pending approvals, and more — all interactive.",
  },
  {
    q: "How are SLAs monitored?",
    a: "SLA definitions cover response and resolution times. Breach alerts, escalations, and dashboards keep everyone accountable.",
  },
  {
    q: "Can workflows be customized?",
    a: "Absolutely. Flow Designer, business rules, and dynamic variables let you tailor every workflow to your organization.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="gradient-soft py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader
          eyebrow="FAQ"
          title="Everything you need to know"
          subtitle="Answers to the questions HR, IT, and Security leaders ask most."
        />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border bg-card transition"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold sm:text-base">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader
              center={false}
              eyebrow="Contact"
              title="Request a demo tailored to your organization"
              subtitle="Tell us about your team and we'll put together a walkthrough of the lifecycle you care about."
            />
            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "hello@flowhire.io" },
                { icon: Phone, label: "+1 (555) 010-2048" },
                { icon: KeyRound, label: "Enterprise SSO available" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card">
                    <c.icon className="h-4 w-4 text-brand" />
                  </div>
                  <span className="text-sm text-foreground/85">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl glass-strong p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" id="name" placeholder="Alex Morgan" required />
              <Field label="Company" id="company" placeholder="Acme Corp" required icon={Building} />
              <Field
                label="Business Email"
                id="email"
                type="email"
                placeholder="alex@acme.com"
                required
                icon={Mail}
              />
              <Field label="Phone" id="phone" type="tel" placeholder="+1 555 010 2048" icon={Phone} />
              <div className="sm:col-span-2">
                <label
                  htmlFor="dept"
                  className="mb-1.5 block text-xs font-semibold text-foreground/80"
                >
                  Department
                </label>
                <select
                  id="dept"
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                >
                  <option>HR</option>
                  <option>IT</option>
                  <option>Operations</option>
                  <option>Facilities</option>
                  <option>Security</option>
                  <option>Executive</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="msg"
                  className="mb-1.5 block text-xs font-semibold text-foreground/80"
                >
                  Message
                </label>
                <textarea
                  id="msg"
                  rows={4}
                  placeholder="Tell us about your onboarding challenges..."
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              {sent ? "Thanks — we'll be in touch" : "Request a Demo"}
              {!sent && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              We'll respond within one business day.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required,
  icon: Icon,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-foreground/80">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-input bg-card py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 ${
            Icon ? "pl-9 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
}

// ---------- Footer ----------

function Footer() {
  const cols = [
    { title: "Product", links: ["About", "Features", "Workflows", "Dashboards", "Security"] },
    { title: "Company", links: ["Contact", "Careers", "Partners"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "DPA"] },
  ];
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero shadow-glow">
                <Workflow className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-base font-bold">FlowHire</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Automated employee onboarding & offboarding built on ServiceNow. Faster hires,
              cleaner exits, and complete audit-ready visibility.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FlowHire. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built on ServiceNow · Enterprise-ready · SOC-friendly practices
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------- Page ----------

function LandingPage() {
  const { dark, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Lifecycle />
        <Features />
        <Stakeholders />
        <AccessMatrix />
        <WorkflowSection />
        <Roadmap />
        <Benefits />
        <DashboardPreview />
        <Technologies />
        <Compare />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
