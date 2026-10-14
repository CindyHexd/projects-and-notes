export type ConceptViewId = "math" | "chinglish" | "graphic";

export interface ConceptView {
  id: ConceptViewId;
  label: string;
  body: string;
}

export interface Concept {
  slug: string;
  title: string;
  /** Optional short hint on the index list */
  blurb?: string;
  views: ConceptView[];
}

/** Shared view labels — keep order stable across concepts. */
export const VIEW_ORDER: ConceptViewId[] = ["math", "chinglish", "graphic"];

export const VIEW_LABELS: Record<ConceptViewId, string> = {
  math: "Mathematical definition",
  chinglish: "Chinglish",
  graphic: "Graphic",
};

/** Short tab chrome — full names stay in VIEW_LABELS / aria. */
export const VIEW_SHORT_LABELS: Record<ConceptViewId, string> = {
  math: "Math",
  chinglish: "Chinglish",
  graphic: "Graphic",
};

/**
 * Add new concepts here. Each gets a page at
 * /linear-algebra/<slug>/ via getStaticPaths.
 * For math views, put copyable LaTeX source in `body`.
 */
export const concepts: Concept[] = [
  {
    slug: "linear",
    title: "Linear",
    blurb: "Linearity: scale and add without surprises.",
    views: [
      {
        id: "math",
        label: VIEW_LABELS.math,
        body: `Let $V$ and $W$ be vector spaces over a field $F$. A map $T\\colon V\\to W$ is linear if for all $u,v\\in V$ and all $\\alpha,\\beta\\in F$,
\\[
T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v).
\\]
Equivalently, $T(u+v)=T(u)+T(v)$ and $T(\\alpha u)=\\alpha T(u)$.`,
      },
      {
        id: "chinglish",
        label: VIEW_LABELS.chinglish,
        body: `一个 map / transformation 是 linear 的，当且仅当它同时满足：

1. Homogeneity（齐次性）：f(c · v) = c · f(v) — 把 vector 乘上 scalar c，输出也乘同一个 c。
2. Additivity（可加性）：f(u + v) = f(u) + f(v) — 先加再 map，等于先 map 再加。

合在一起就是：f(au + bv) = a f(u) + b f(v)。有 constant term / bias 的就不叫 linear（那是 affine）。`,
      },
      {
        id: "graphic",
        label: VIEW_LABELS.graphic,
        body: ``

      },
    ],
  },
  {
    slug: "matrix",
    title: "Matrix",
    blurb: "A grid of numbers that encodes a linear map.",
    views: [
      {
        id: "math",
        label: VIEW_LABELS.math,
        body: `An $m\\times n$ matrix over a field $F$ is an array $A=(a_{ij})$ with $a_{ij}\\in F$, $1\\le i\\le m$, $1\\le j\\le n$.

It defines a linear map $T_A\\colon F^n\\to F^m$ by $T_A(x)=Ax$ (column vectors). Conversely, every linear map between finite-dimensional spaces has a matrix representation once bases are chosen.`,
      },
      {
        id: "chinglish",
        label: VIEW_LABELS.chinglish,
        body: `一个 matrix 是按 rows 和 columns 排好的 numbers。一个 m × n matrix 有 m 行、n 列。

Matrix-vector multiplication A x 是把 x 的 components 按 A 的 columns 做 linear combination。所以每个 matrix 可以看成某个 linear map（在选定 basis 之后）的“身份证”。

Matrix multiplication AB 对应的是 composition：先做 B 再做 A。`,
      },
      {
        id: "graphic",
        label: VIEW_LABELS.graphic,
        body: ``
      },
    ],
  },
];

export function getConcept(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getSortedViews(concept: Concept): ConceptView[] {
  const byId = new Map(concept.views.map((v) => [v.id, v]));
  return VIEW_ORDER.map((id) => byId.get(id)).filter(
    (v): v is ConceptView => v != null,
  );
}
