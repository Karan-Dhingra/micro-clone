import { LayerType } from '@/types/canvas'
import { useStorage } from '@liveblocks/react/suspense'
import React, { memo } from 'react'
import Rectangle from './_rectangle'
import Ellipse from './_ellipse'
import { Text } from './_text'
import { Note } from './_note'
import { Path } from './_point'
import { colorToCSS } from '@/lib/utils'

type Props = {
    id: string
    onLayerPointDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor: string
}

const LayerPreview = memo(({
    id,
    onLayerPointDown,
    selectionColor
}: Props) => {
  const layer = useStorage(root => root.layers.get(id))

  if(!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Path:
        return (
            <Path
                x={layer.x}
                y={layer.y}
                fill={layer.fill ? colorToCSS(layer?.fill) : "#000"}
                points={layer.points}
                onPointerDown={(e) => onLayerPointDown(e, id)}
                stroke={selectionColor}
            />
        )
    case LayerType.Rectangle:
        return (
            <Rectangle
                id={id}
                onPointerDown={onLayerPointDown}
                layer={layer}
                selectionColor={selectionColor}
            />
        )
    case LayerType.Ellipse:
        return (
            <Ellipse
                id={id}
                onPointerDown={onLayerPointDown}
                layer={layer}
                selectionColor={selectionColor}
            />
        )
    case LayerType.Text:
        return (
            <Text
                id={id}
                onPointerDown={onLayerPointDown}
                layer={layer}
                selectionColor={selectionColor}
            />
        )
    case LayerType.Note:
        return (
            <Note
                id={id}
                onPointerDown={onLayerPointDown}
                layer={layer}
                selectionColor={selectionColor}
            />
        )
    
    default:
        // console.log("Unknown")
  }

  return (
    <div>LayerPreview</div>
  )
});

export default LayerPreview

LayerPreview.displayName = "LayerPreview"