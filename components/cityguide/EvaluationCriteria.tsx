import { Icon, type IconName } from "@/components/ui/Icon";

export interface EvaluationCriterionItem {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * Grid of cards covering the criteria that actually matter when choosing an
 * HVAC company. Prop-driven so it can be reused across city guides.
 */
export function EvaluationCriteria({
  criteria,
}: {
  criteria: EvaluationCriterionItem[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {criteria.map((c) => (
        <div
          key={c.title}
          className="flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800">
            <Icon name={c.icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
            {c.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            {c.description}
          </p>
        </div>
      ))}
    </div>
  );
}
