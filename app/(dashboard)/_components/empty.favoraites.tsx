import Image from 'next/image'
import React from 'react'

type Props = {}

const EmptyFavoraites = (props: Props) => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <Image
            src="/empty-favoraites.svg"
            alt="Empty"
            height={140}
            width={140}
        />

        <h2 className="text-2xl font-semibold mt-6">No favoraite board!</h2>
        <p className="text-muted-foreground text-sm mt-2">
            Try favoraiting a board
        </p>
    </div>
  )
}

export default EmptyFavoraites