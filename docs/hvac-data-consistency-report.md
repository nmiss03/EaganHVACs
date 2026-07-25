# HVAC Reference-Data Consolidation Report

**Date:** July 2026
**Scope:** Every hardcoded HVAC cost, lifespan, efficiency, rebate, and
performance figure in the repository.

## What changed

All factual HVAC figures now live in a single canonical module,
**`lib/hvac-data.ts`**, and every calculator, article, comparison table, and
component reads from it (importing the constant, or interpolating it into prose
via the shared formatters). No factual value is typed into more than one place.

- **Machine-consumed constants** (values that feed a calculation or a structured
  table) import the constant directly.
- **Prose figures** are rendered with the module's formatters
  (`usd`, `usdRange`, `yearsRange`, `afuePlus`, `longDate`) so the number itself
  is never retyped inside a string literal.

## Inconsistencies found and how each was resolved

| # | Figure | What was inconsistent | Resolution |
|---|--------|-----------------------|------------|
| 1 | **High-efficiency furnace AFUE threshold** | Described as **95%+ AFUE** in 9 places and **96%+ AFUE** in 5 places for the *same* "high-efficiency furnace" concept (calculators, articles, buyer's kit, city guides, dataset, FAQ). | Canonical **95%+ AFUE** (`FURNACE_AFUE.highEfficiency = 95`). Chosen because it is the most frequent value, matches the utility rebate–qualifying threshold, and is inclusive of 96–98% units. All "96%+" high-efficiency/threshold references normalized to 95%+. |
| 2 | **Central-AC typical lifespan** | `RepairReplaceCalculator` hardcoded a single **15-year** AC lifespan for its replace threshold, while `LifespanCalculator` used a **12–17-year** range. | Canonical **AC lifespan 12–17** (`LIFESPANS.ac`). RepairReplace now derives its threshold from the range's **high end (17)** — the same "well-maintained expected life" the Lifespan tool uses. Furnace was already consistent (20 = high end of 15–20), so its behavior is unchanged. The two tools no longer disagree about AC lifespan. |
| 3 | **Furnace tier table (internal)** | Within the furnace-replacement article, the cost table's "High efficiency" row said **90–96%** while the same article's key takeaway and callout said **96%+**. | High-efficiency row and both prose mentions set to canonical **95%+**. (The distinct *premium/modulating* tier legitimately remains **96–98%+**.) |
| 4 | **Installed system cost ranges** | Retyped independently in ≥6 files (CostEstimator, QuoteAnalyzer, tool-content snapshot + prose, buyer's-kit price sheet, article tables/takeaways/prose, locations page). Equal today, but each an independent drift risk. | Single `COST_RANGES` source: furnace `$4,000–$9,000`, AC `$4,500–$9,500`, furnace+AC `$8,000–$16,500`, cold-climate heat pump `$8,000–$18,000`. |
| 5 | **Equipment lifespans** | Defined in `LifespanCalculator` and restated in RepairReplace, FAQ, city guides, service/location content, and site FAQ. | Single `LIFESPANS` source (furnace 15–20, AC 12–17, heat pump 12–15, boiler 20–30, water heater 8–12). |
| 6 | **Federal 25C credit facts** | Historical caps (30% / **$600** furnace-AC / **$2,000** heat pump) and the **Dec 31 2025** expiration retyped in ~10 places. | Single `FEDERAL_25C` object plus `FEDERAL_25C_EXPIRATION_LABEL` / `FEDERAL_25C_EXPIRATION_YEAR`. |
| 7 | **"$5,000 rule" threshold** | Hardcoded `5000` in RepairReplace and retyped as "$5,000" in tool-content prose. | Single `REPAIR_REPLACE_RULE_USD = 5000`. |
| 8 | **Smart-thermostat savings** | "8%" stated in 3 places (service content ×2, FAQ). | Single `SMART_THERMOSTAT_SAVINGS_PCT = 8`. |
| 9 | **Typical furnace repair range** | "$150–$600" stated in 3 article passages. | Single `FURNACE_REPAIR_RANGE = [150, 600]`. |
| 10 | **AC SEER2 tiers** | Tiers (standard ~14–15, mid 16–17, high 18+) and the "16+ SEER2" above-standard threshold appeared in the AC article and the cost guide. | Single `AC_SEER2` source; the article table and the cost-guide line now share it. |

### Additional accuracy fix
`CostEstimator`'s result panel previously stated high-efficiency systems qualify
for "utility rebates **and federal tax credits**." Because the federal 25C
credit expired Dec 31 2025, this line was corrected to reference **Minnesota
utility rebates** only — consistent with the rest of the site.

## Canonical values (current)

- **Cost ranges** — furnace `$4,000–$9,000` · AC `$4,500–$9,500` · furnace+AC `$8,000–$16,500` · heat pump `$8,000–$18,000` (Twin Cities, installed, before rebates)
- **Lifespans (yrs)** — furnace `15–20` · AC `12–17` · heat pump `12–15` · boiler `20–30` · water heater `8–12`
- **Furnace AFUE** — standard `80%` · high-efficiency `95%+`
- **AC SEER2** — standard `14–15` · mid `16–17` · high `18+` (above-standard threshold `16`)
- **Repair-vs-replace rule** — `$5,000` (age × repair cost)
- **Federal 25C (expired)** — `30%` of cost · cap `$600` furnace/AC · cap `$2,000` heat pump · expired `December 31, 2025`
- **Furnace repair** — `$150–$600`
- **Smart-thermostat savings** — `8%`

## Reviewed and intentionally left in place

These already satisfy "one value, one place" (each appears exactly once) or are
not authoritative data points. They were verified against the canonical values
and left as-is:

- **Single-location granular figures** — individual repair line-items (capacitor
  `$150–$400`, compressor `$1,500–$3,000`, etc.), the furnace/AC tier
  *sub-ranges* (`$4,000–$6,000`, `$4,500–$6,500`, …), the `$200` smart-thermostat
  tagline, and the labor-warranty span (`90 days–10 years`).
- **Utility rebate dollar bands** (`$100–$500`, `$500–$2,000+`, `$25–$75`) — kept
  as "verify at source" per the standing rebate-integrity policy; never presented
  as guaranteed amounts.
- **The "about a third of a new system" repair heuristic** — a verbal fraction
  in 3 prose spots, verified mutually consistent, kept as natural language rather
  than a numeric constant.
- **Illustrative "example result" values** in the Hero and Featured Tools
  (`e.g. $6,400–$9,200`) — labeled examples, verified to fall inside the
  canonical ranges.
- **Worked-example scenario values** in tool-content (e.g. `18 × $900 = $16,200`)
  — narrative examples, not reference data.
- **Minnesota climate figures** (`-20°F`, `95°F`) — weather context, not
  equipment specifications.

## How to change a value going forward

Edit the constant in `lib/hvac-data.ts`. It propagates to every calculator,
article, table, and component automatically. Do not reintroduce a literal figure
anywhere else.
