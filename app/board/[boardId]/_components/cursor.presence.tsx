"use client";

import { useOthersConnectionIds } from '@liveblocks/react/suspense';
import { memo } from 'react';
import Cursor from './cursor';

type Props = {}

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return <>
    {ids.map((connectionId) => (
        <Cursor
            key={connectionId}
            connectionId={connectionId}
        />
    ))}
  </>
}

const CursorPresence = memo((props: Props) => {
  return (
    <>
        <Cursors />
    </>
  )
})

export default CursorPresence

CursorPresence.displayName = "CursorPresence"