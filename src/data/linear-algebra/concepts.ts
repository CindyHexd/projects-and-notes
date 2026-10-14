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

function mathView(body: string): ConceptView {
  return { id: "math", label: VIEW_LABELS.math, body };
}

/** Graphic placeholder — omitted from tabs until filled in. */
function graphicBlank(): ConceptView {
  return { id: "graphic", label: VIEW_LABELS.graphic, body: "" };
}

function concept(
  slug: string,
  title: string,
  math: string,
  blurb?: string,
  extraViews: ConceptView[] = [],
): Concept {
  return {
    slug,
    title,
    blurb,
    views: [mathView(math), ...extraViews, graphicBlank()],
  };
}

/**
 * Add new concepts here. Each gets a page at
 * /linear-algebra/<slug>/ via getStaticPaths.
 * For math views, put copyable LaTeX source in `body`.
 * Leave graphic `body` empty to hide that tab for now.
 */
export const concepts: Concept[] = [
  concept(
    "inverse",
    "inverse",
    `Let $A$ be an $n\\times n$ matrix over a field $F$. $A$ is invertible if there exists $B$ with
\\[
AB=BA=I_n.
\\]
Such a $B$ is unique and written $A^{-1}$. Equivalently, $A$ is invertible iff $\\det(A)\\ne 0$ iff $\\operatorname{rank}(A)=n$.`,
  ),
  concept(
    "det-adj",
    "det, adj",
    `For an $n\\times n$ matrix $A$, the adjugate $\\operatorname{adj}(A)$ is the transpose of the cofactor matrix. The fundamental identity is
\\[
A\\,\\operatorname{adj}(A)=\\operatorname{adj}(A)\\,A=\\det(A)\\,I_n.
\\]
If $\\det(A)\\ne 0$, then $A^{-1}=\\dfrac{1}{\\det(A)}\\operatorname{adj}(A)$.`,
  ),
  concept(
    "linear",
    "linear",
    `Let $V$ and $W$ be vector spaces over a field $F$. A map $T\\colon V\\to W$ is linear if for all $u,v\\in V$ and all $\\alpha,\\beta\\in F$,
\\[
T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v).
\\]
Equivalently, $T(u+v)=T(u)+T(v)$ and $T(\\alpha u)=\\alpha T(u)$.`,
    "",
    [
      {
        id: "chinglish",
        label: VIEW_LABELS.chinglish,
        body: `一个 map / transformation 是 linear 的，当且仅当它同时满足：

1. Homogeneity（齐次性）：f(c · v) = c · f(v) — 把 vector 乘上 scalar c，输出也乘同一个 c。
2. Additivity（可加性）：f(u + v) = f(u) + f(v) — 先加再 map，等于先 map 再加。

合在一起就是：f(au + bv) = a f(u) + b f(v)。有 constant term / bias 的就不叫 linear（那是 affine）。`,
      },
    ],
  ),
  concept(
    "standard-basis",
    "standard basis",
    `In $F^n$, the standard basis is $\\{e_1,\\ldots,e_n\\}$ where $e_i$ has a $1$ in position $i$ and $0$ elsewhere. Every $x=(x_1,\\ldots,x_n)^T$ uniquely expands as
\\[
x=x_1 e_1+\\cdots+x_n e_n.
\\]`,
  ),
  concept(
    "elementary-row-operation",
    "elementary row operation",
    `An elementary row operation on a matrix is one of:
\\[
\\begin{align*}
(R_i)&\\leftrightarrow(R_j),\\\\
(R_i)&\\leftarrow c(R_i)\\quad(c\\ne 0),\\\\
(R_i)&\\leftarrow(R_i)+c(R_j)\\quad(i\\ne j).
\\end{align*}
\\]
Each is realized by left-multiplication by an elementary matrix.`,
  ),
  concept(
    "ref",
    "REF",
    `A matrix is in row echelon form (REF) if (i) all zero rows lie below all nonzero rows; (ii) the leading entry (pivot) of each nonzero row is $1$ and lies strictly to the right of the pivot above; (iii) all entries below a pivot are $0$.`,
  ),
  concept(
    "rref",
    "RREF",
    `A matrix is in reduced row echelon form (RREF) if it is in REF and, additionally, every pivot is the only nonzero entry in its column (entries above pivots are also $0$).`,
  ),
  concept(
    "rank",
    "rank",
    `The rank of a matrix $A$, written $\\operatorname{rank}(A)$, is the dimension of its column space (equivalently, of its row space). It equals the number of pivots in any REF/RREF of $A$.`,
  ),
  concept(
    "symmetric",
    "symmetric",
    `A square matrix $A$ is symmetric if $A^T=A$, i.e. $a_{ij}=a_{ji}$ for all $i,j$. Over $\\mathbb{R}$, symmetric matrices are orthogonally diagonalizable.`,
  ),
  concept(
    "e-and-u",
    "E&U",
    "",

  ),
  concept(
    "characteristic-polynomial",
    "characteristic polynomial",
    `The characteristic polynomial of an $n\\times n$ matrix $A$ is
\\[
p_A(t)=\\det(tI-A)
\\]
(or $\\det(A-tI)$, depending on convention). The roots of $p_A$ are the eigenvalues of $A$.`,
  ),
  concept(
    "adjugate",
    "adjugate",
    `The adjugate (classical adjoint) of an $n\\times n$ matrix $A$ is
\\[
\\operatorname{adj}(A)=C^T,
\\]
where $C=(C_{ij})$ is the cofactor matrix, $C_{ij}=(-1)^{i+j}\\det(A_{ij})$, and $A_{ij}$ deletes row $i$ and column $j$.`,
  ),
  concept(
    "diagonalizable",
    "diagonizable",
    `An $n\\times n$ matrix $A$ is diagonalizable if there exists invertible $P$ and diagonal $D$ with
\\[
A=PDP^{-1}.
\\]
Equivalently, $A$ has a basis of eigenvectors (the columns of $P$).`,
  ),
  concept(
    "cofactor",
    "cofactor",
    `For an $n\\times n$ matrix $A$, the $(i,j)$-cofactor is
\\[
C_{ij}=(-1)^{i+j}\\det(A_{ij}),
\\]
where $A_{ij}$ is $A$ with row $i$ and column $j$ removed. Cofactor expansion: $\\det(A)=\\sum_j a_{ij}C_{ij}$ along any fixed row $i$.`,
  ),
  concept(
    "orthogonal",
    "orthogonal",
    `Vectors $u,v$ in an inner product space are orthogonal if $\\langle u,v\\rangle=0$. A set is orthogonal if every pair of distinct vectors is orthogonal, and orthonormal if additionally each has norm $1$.

A real square matrix $Q$ is orthogonal if $Q^TQ=I$ (columns form an orthonormal basis).`,
  ),
  concept(
    "subspace",
    "subspace",
    `A subset $W\\subseteq V$ of a vector space $V$ over $F$ is a subspace if $0\\in W$ and $W$ is closed under addition and scalar multiplication: for all $u,v\\in W$ and $\\alpha\\in F$,
\\[
u+v\\in W,\\qquad \\alpha u\\in W.
\\]`,
  ),
  concept(
    "null-space",
    "null space",
    `For a linear map $T\\colon V\\to W$ (or matrix $A$), the null space (kernel) is
\\[
\\operatorname{Nul}(T)=\\{v\\in V: T(v)=0\\}
\\]
(equivalently $\\operatorname{Nul}(A)=\\{x: Ax=0\\}$). It is a subspace of $V$.`,
  ),
  concept(
    "image-space",
    "image space",
    `For a linear map $T\\colon V\\to W$ (or matrix $A$), the image (range / column space) is
\\[
\\operatorname{Im}(T)=\\{T(v): v\\in V\\}
\\]
(equivalently $\\operatorname{Col}(A)=\\{Ax: x\\in F^n\\}$). It is a subspace of $W$.`,
  ),
  concept(
    "basis",
    "basis",
    `A basis of a vector space $V$ is a linearly independent spanning set. If $\\mathcal{B}=\\{v_1,\\ldots,v_n\\}$ is a basis, every $v\\in V$ has unique coordinates $c_1,\\ldots,c_n$ with
\\[
v=c_1 v_1+\\cdots+c_n v_n.
\\]
All bases of $V$ have the same size, $\\dim V$.`,
  ),
  concept(
    "matrix",
    "matrix",
    `An $m\\times n$ matrix over a field $F$ is an array $A=(a_{ij})$ with $a_{ij}\\in F$, $1\\le i\\le m$, $1\\le j\\le n$.

It defines a linear map $T_A\\colon F^n\\to F^m$ by $T_A(x)=Ax$ (column vectors). Conversely, every linear map between finite-dimensional spaces has a matrix representation once bases are chosen.`,
    "",
    [
      {
        id: "chinglish",
        label: VIEW_LABELS.chinglish,
        body: `一个 matrix 是按 rows 和 columns 排好的 numbers。一个 m × n matrix 有 m 行、n 列。

Matrix-vector multiplication A x 是把 x 的 components 按 A 的 columns 做 linear combination。所以每个 matrix 可以看成某个 linear map（在选定 basis 之后）的“身份证”。

Matrix multiplication AB 对应的是 composition：先做 B 再做 A。`,
      },
    ],
  ),
];

export function getConcept(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getSortedViews(concept: Concept): ConceptView[] {
  const byId = new Map(concept.views.map((v) => [v.id, v]));
  return VIEW_ORDER.map((id) => byId.get(id)).filter(
    (v): v is ConceptView => v != null && v.body.trim() !== "",
  );
}
