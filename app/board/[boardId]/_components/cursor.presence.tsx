"use client";

import { shallow, useOthersConnectionIds, useOthersMapped } from '@liveblocks/react/suspense';
import { memo } from 'react';
import Cursor from './cursor';
import { Path } from './_path';
import { colorToCSS } from '@/lib/utils';

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

const Drafts = () => {
  const others = useOthersMapped((other) => ({
    pencilDraft: other.presence.pencilDraft,
    penColor: other.presence.penColor,
  }), shallow);

  return <>
    {others.map(([key, other]) => {
      if(other.pencilDraft) {
        return (
          <Path
            key={key}
            x={0}
            y={0}
            points={other.pencilDraft}
            fill={other.penColor ? colorToCSS(other.penColor) : "#000"}
          />
        );
      }

      return null;
    })}
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