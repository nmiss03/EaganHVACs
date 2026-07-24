import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Minimal, safe inline renderer for article prose.
 *
 * Parses ONLY two constructs:
 *   - internal links `[text](/path)` — the href MUST begin with "/", so
 *     content can never emit an off-site link;
 *   - bold emphasis `**text**` → <strong>.
 * Everything else is left as plain text — no arbitrary markup, no external
 * URLs. Returns React nodes with the site's standard inline styling.
 */

// Editorial inline link: regular weight (so links don't compete with **bold**
// emphasis), clearly underlined for recognition, and shifting to the accent on
// hover for affordance. Distinguishing links from emphasis improves scanability
// in dense research prose.
const LINK_STYLE =
  "text-navy-900 underline decoration-accent-500/60 decoration-2 underline-offset-[3px] transition-colors hover:text-accent-700 hover:decoration-accent-600";

// Either [text](/internal-path) or **bold**.
const TOKEN = /\[([^\]]+)\]\((\/[^)\s]*)\)|\*\*([^*]+)\*\*/g;

export function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`t${key++}`}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }
    if (match[1] && match[2]) {
      // internal link
      nodes.push(
        <Link key={`l${key++}`} href={match[2]} className={LINK_STYLE}>
          {match[1]}
        </Link>
      );
    } else if (match[3]) {
      // bold
      nodes.push(
        <strong key={`b${key++}`} className="font-bold text-navy-900">
          {match[3]}
        </strong>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) return text;
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t${key++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}
