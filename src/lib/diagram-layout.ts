import type {
  ArchitectureDiagram,
  DiagramBoundary,
  DiagramEdge,
  DiagramNode,
} from '../types/content';

/**
 * Calcula la geometria de un diagrama de arquitectura a partir de una grilla
 * (col/row). Es una funcion pura: el componente solo pinta lo que devuelve,
 * asi que el layout se puede probar sin renderizar SVG.
 *
 * - horizontal: el flujo va de izquierda a derecha (escritorio).
 * - vertical: la grilla se transpone y el flujo va de arriba a abajo (movil).
 */

export type DiagramOrientation = 'horizontal' | 'vertical';

export interface LayoutMetrics {
  readonly nodeWidth: number;
  readonly nodeHeight: number;
  /** Separacion entre etapas del flujo (eje principal). */
  readonly stageGap: number;
  /** Separacion entre nodos de la misma etapa (eje secundario). */
  readonly laneGap: number;
  readonly padding: number;
  readonly boundaryInset: number;
}

export interface PositionedNode extends DiagramNode {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface PositionedEdge extends DiagramEdge {
  readonly path: string;
  readonly labelX: number;
  readonly labelY: number;
}

export interface PositionedBoundary extends DiagramBoundary {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface DiagramLayout {
  readonly width: number;
  readonly height: number;
  readonly nodes: readonly PositionedNode[];
  readonly edges: readonly PositionedEdge[];
  readonly boundaries: readonly PositionedBoundary[];
}

export const METRICS: Record<DiagramOrientation, LayoutMetrics> = {
  horizontal: { nodeWidth: 150, nodeHeight: 60, stageGap: 48, laneGap: 30, padding: 28, boundaryInset: 12 },
  vertical: { nodeWidth: 140, nodeHeight: 60, stageGap: 40, laneGap: 16, padding: 28, boundaryInset: 10 },
};

const BOUNDARY_LABEL_SPACE = 14;

function positionNode(node: DiagramNode, orientation: DiagramOrientation, m: LayoutMetrics): PositionedNode {
  const stage = node.col;
  const lane = node.row;
  const along = m.padding + stage * ((orientation === 'horizontal' ? m.nodeWidth : m.nodeHeight) + m.stageGap);
  const across = m.padding + lane * ((orientation === 'horizontal' ? m.nodeHeight : m.nodeWidth) + m.laneGap);
  return orientation === 'horizontal'
    ? { ...node, x: along, y: across, width: m.nodeWidth, height: m.nodeHeight }
    : { ...node, x: across, y: along + BOUNDARY_LABEL_SPACE, width: m.nodeWidth, height: m.nodeHeight };
}

const overlaps = (a0: number, a1: number, b0: number, b1: number): boolean => a0 < b1 && b0 < a1;

function horizontalElbow(edge: DiagramEdge, s: PositionedNode, t: PositionedNode): PositionedEdge {
  const rightward = t.x >= s.x;
  const fromX = rightward ? s.x + s.width : s.x;
  const toX = rightward ? t.x : t.x + t.width;
  const fromY = s.y + s.height / 2;
  const toY = t.y + t.height / 2;
  const midX = (fromX + toX) / 2;
  return { ...edge, path: `M ${fromX} ${fromY} H ${midX} V ${toY} H ${toX}`, labelX: midX, labelY: Math.min(fromY, toY) - 8 };
}

function verticalElbow(edge: DiagramEdge, s: PositionedNode, t: PositionedNode): PositionedEdge {
  const downward = t.y >= s.y;
  const fromY = downward ? s.y + s.height : s.y;
  const toY = downward ? t.y : t.y + t.height;
  const fromX = s.x + s.width / 2;
  const toX = t.x + t.width / 2;
  const midY = (fromY + toY) / 2;
  return { ...edge, path: `M ${fromX} ${fromY} V ${midY} H ${toX} V ${toY}`, labelX: Math.max(fromX, toX) + 8, labelY: midY - 4 };
}

/** Elige el conector por geometria: si las cajas comparten franja, linea recta; si no, codo segun orientacion. */
function routeEdge(edge: DiagramEdge, s: PositionedNode, t: PositionedNode, orientation: DiagramOrientation): PositionedEdge {
  if (overlaps(s.y, s.y + s.height, t.y, t.y + t.height)) return horizontalElbow(edge, s, t);
  if (overlaps(s.x, s.x + s.width, t.x, t.x + t.width)) return verticalElbow(edge, s, t);
  return orientation === 'horizontal' ? horizontalElbow(edge, s, t) : verticalElbow(edge, s, t);
}

function wrapBoundary(
  boundary: DiagramBoundary,
  byId: ReadonlyMap<string, PositionedNode>,
  inset: number,
): PositionedBoundary {
  const members = boundary.nodeIds
    .map((id) => byId.get(id))
    .filter((node): node is PositionedNode => node !== undefined);
  const left = Math.min(...members.map((n) => n.x)) - inset;
  const top = Math.min(...members.map((n) => n.y)) - inset - BOUNDARY_LABEL_SPACE;
  const right = Math.max(...members.map((n) => n.x + n.width)) + inset;
  const bottom = Math.max(...members.map((n) => n.y + n.height)) + inset;
  return { ...boundary, x: left, y: top, width: right - left, height: bottom - top };
}

export function layoutDiagram(diagram: ArchitectureDiagram, orientation: DiagramOrientation): DiagramLayout {
  const m = METRICS[orientation];
  const nodes = diagram.nodes.map((node) => positionNode(node, orientation, m));
  const byId = new Map(nodes.map((node) => [node.id, node]));

  const edges = diagram.edges.flatMap((edge) => {
    const source = byId.get(edge.from);
    const target = byId.get(edge.to);
    return source && target ? [routeEdge(edge, source, target, orientation)] : [];
  });

  const boundaries = (diagram.boundaries ?? []).map((b) => wrapBoundary(b, byId, m.boundaryInset));

  const right = Math.max(...nodes.map((n) => n.x + n.width), ...boundaries.map((b) => b.x + b.width));
  const bottom = Math.max(...nodes.map((n) => n.y + n.height), ...boundaries.map((b) => b.y + b.height));
  return { width: right + m.padding, height: bottom + m.padding, nodes, edges, boundaries };
}
