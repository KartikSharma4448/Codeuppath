import { FormEvent, useMemo, useState } from "react";
import { Bot, Route, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AiRoadmap() {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [generated, setGenerated] = useState(false);

  const roadmap = useMemo(
    () => [
      `Week 1-2: Strengthen fundamentals aligned with your goal — ${goal || "your chosen goal"}.`,
      `Week 3-4: Complete one free or affordable certificate matching your ${experience || "current"} experience level.`,
      `Week 5-6: Build one project and apply to 2 hackathons relevant to your ${skills || "skills"}.`,
      `Week 7+: Keep improving through blog updates, feedback loops, and AI-based roadmap adjustments.`,
    ],
    [experience, goal, skills],
  );

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGenerated(true);
  };

  return (
    <PageShell
      badge="CodeUpPath AI roadmap builder"
      title="CodeUpPath"
      subtitle="AI learning roadmap"
      description="Generate a personalized learning roadmap based on your goals, current experience, and skills. Get a practical step-by-step path to accelerate your tech career."
      metrics={[
        { label: "AI", value: "Assist" },
        { label: "Mode", value: "Custom" },
        { label: "Roadmap", value: "4 weeks" },
      ]}
      ctaHref="#ai-content"
      ctaLabel="Build Roadmap"
    >
      <section id="ai-content" className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 glass-panel p-8">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Bot className="h-7 w-7 text-cyan-400" />
            </div>
            <h2 className="text-3xl text-white">Generate easy roadmap</h2>
            <form onSubmit={handleGenerate} className="mt-8 space-y-5">
              <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Your goal: AI engineer, frontend job, hackathon win..." className="h-12 rounded-xl border-white/10 bg-white/5 text-white" />
              <Input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience level: beginner, intermediate..." className="h-12 rounded-xl border-white/10 bg-white/5 text-white" />
              <Textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Your current skills: React, Python, ML..." className="min-h-[140px] rounded-xl border-white/10 bg-white/5 text-white" />
              <button type="submit" className="rounded-xl bg-cyan-500 px-6 py-3 font-display font-semibold text-slate-950 transition-all hover:bg-cyan-400">
                Generate Roadmap
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0B101E] p-8">
            <div className="flex items-center gap-3 text-cyan-400">
              <Route className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.35em]">AI output</p>
            </div>
            {generated ? (
              <div className="mt-8 space-y-4">
                {roadmap.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-muted-foreground">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.25em]">Ready</span>
                </div>
                <p className="mt-4">Enter your goal and experience level above, then click Generate Roadmap to get your personalized path.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
