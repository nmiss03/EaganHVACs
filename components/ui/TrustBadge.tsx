import { Icon, type IconName } from "@/components/ui/Icon";

interface TrustBadgeProps {
  icon: IconName;
  label: string;
}

export function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <li className="flex items-center gap-2.5 text-sm font-medium text-navy-100">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-300">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      {label}
    </li>
  );
}
