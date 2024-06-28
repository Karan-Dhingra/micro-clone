import { colorToCSS } from '@/lib/utils'
import { EllipseLayer } from '@/types/canvas'
import React from 'react'

type Props = {
    id: string
    layer: EllipseLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

const Ellipse = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: Props) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
        className='drop-shadow-md'
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            transform: `translateX(${x}px) translateY(${y}px)`
        }}
        cx={layer.width / 2}
        cy={layer.height / 2}
        rx={layer.width / 2}
        ry={layer.height / 2}
        strokeWidth={1}
        fill={fill ? colorToCSS(fill) : "#000"}
        stroke={selectionColor || 'transparent'}
    />
  )
}

export default Ellipse