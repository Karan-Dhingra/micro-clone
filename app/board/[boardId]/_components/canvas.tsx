"use client"

import React, { useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory } from '@liveblocks/react/suspense'

type Props = {
    boardId: string
}

const Canvas = ({ boardId }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <div className='h-full w-full relative touch-none bg-neutral-100'>
        <Info boardId={boardId} />
        <Participants />
        <Toolbar
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          undo={history.undo}
          redo={history.redo}
          canRedo={canRedo}
          canUndo={canUndo}
        />
    </div>
  )
}

export default Canvas