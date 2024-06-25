import { Loader } from 'lucide-react'
import React from 'react'
import { ToolbarSkeleton } from './toolbar'
import { ParticipantsSkelton } from './participants'
import { InfoSkeleton } from './info'

type Props = {}

const Loading = (props: Props) => {
  return (
    <main className='h-full w-full relative touch-none bg-neutral-100 flex items-center justify-center'>
        <Loader className='h-6 w-6 text-muted-foreground animate-spin' />

        <InfoSkeleton />
        <ParticipantsSkelton />
        <ToolbarSkeleton />
    </main>
  )
}

export default Loading