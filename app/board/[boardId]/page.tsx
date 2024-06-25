import React from 'react'
import Canvas from './_components/canvas'
import Room from '@/components/room'
import Loading from './_components/canvas.loading'

type Props = {
  params: {
    boardId: string
  }
}

const page = ({params}: Props) => {

  return (
    <div className='h-screen w-full'>
      <Room roomId={params.boardId} fallback={<Loading />}>
        <Canvas boardId={params.boardId} />
      </Room>
    </div>
  )
}

export default page