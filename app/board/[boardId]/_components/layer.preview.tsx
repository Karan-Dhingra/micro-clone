import { LayerType } from '@/types/canvas'
import { useStorage } from '@liveblocks/react/suspense'
import React, { memo } from 'react'
import Rectangle from './_rectangle'

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
    case LayerType.Rectangle:
        return (
            <Rectangle
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