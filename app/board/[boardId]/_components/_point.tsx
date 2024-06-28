import getStroke from "perfect-freehand";

type props = {
    x: number
    y: number
    points: number[][]
    fill: string
    onPointerDown?: (e: React.PointerEvent) => void
    stroke?: string
}

export const Path = ({
  x,
  y,
  points,
  onPointerDown,
  stroke,
  fill
}: props) => {
    return(
        <path />
    )
}