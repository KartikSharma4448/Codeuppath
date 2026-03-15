import { Activity, Award, BarChart3, BookOpen, CheckCircle2, Lightbulb, Rocket, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();

  const quickLinks = [
    { label: "Browse Hackathons", href: "/hackathons", icon: Award, detail: "Find and join upcoming hackathons" },
    { label: "Learning Resources", href: "/learning-resources", icon: BookOpen, detail: "Curated courses and guides" },
    { label: "AI Roadmap", href: "/ai-roadmap", icon: Rocket, detail: "Build your personalized learning path" },
    { label: "Community Blog", href: "/blog", icon: Users, detail: "Read stories from the community" },
  ];

  const tips = [
    "Complete your first hackathon to build real-world experience.",
    "Explore learning resources to strengthen your tech skills.",
    "Use the AI roadmap to plan your next 4 weeks of learning.",
  ];

  return (
    <PageShell
      badge="Live member dashboard"
      title="Welcome back"
      subtitle={user?.fullName || user?.email || ""}
      description="Explore hackathons, learning resources, and your personalized AI roadmap — all in one place."
      metrics={[
        { label: "Account", value: "Active" },
        { label: "Email", value: user?.email ?? "—" },
        { label: "Provider", value: user?.provider ?? "—" },
      ]}
      ctaHref="#dashboard-content"
      ctaLabel="View Dashboard"
    >
      <section id="dashboard-content" className="border-y border-white/5 bg-black/20 px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl space-y-10">

          <div className="rounded-[1.75rem] border border-white/10 glass-panel p-5 sm:p-8">
            <div className="flex items-center gap-3 text-cyan-400">
              <Activity className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.35em]">Account info</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Name</p>
                <p className="mt-3 text-white">{user?.fullName || "—"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Email</p>
                <p className="mt-3 text-white">{user?.email || "—"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Login via</p>
                <p className="mt-3 capitalize text-white">{user?.provider || "—"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 glass-panel p-5 sm:p-8">
            <div className="flex items-center gap-3 text-cyan-400">
              <BarChart3 className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.35em]">Quick access</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-400/40 hover:bg-white/10">
                    <Icon className="h-6 w-6 text-cyan-400" />
                    <p className="mt-4 font-semibold text-white">{item.label}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 glass-panel p-5 sm:p-8">
            <div className="flex items-center gap-3 text-cyan-400">
              <Lightbulb className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.35em]">Getting started tips</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {tips.map((tip) => (
                <div key={tip} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-cyan-400" />
                  {tip}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
