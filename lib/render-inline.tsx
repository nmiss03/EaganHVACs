import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Minimal, safe inline renderer for article prose.
 *
 * Parses ONLY internal markdown-style links of the form `[text](/path)` —
 * the href must begin with "/". Anything else (external URLs, other markdown
 * syntax) is left as plain text, so untrusted-looking content can never emit
 * an off-site link or arbitrary markup. Returns React nodes with the site's
 * standard inline-link styling.
 */

const LINK_STYLE =
  "font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600";

// [text](/internal-path) — href restricted to internal absolute paths.
const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  INLINE_LINK.lastIndex = 0;
  while ((match = INLINE_LINK.exec(text)) !== null) {
    const full = match[0];
    const label = match[1] ?? "";
    const href = match[2] ?? "/";
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`t${key++}`}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }
    nodes.push(
      <Link key={`l${key++}`} href={href} className={LINK_STYLE}>
        {label}
      </Link>
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex === 0) return text;
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t${key++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}
