import React from 'react'

type Props = {
  params: {
    boardId: string
  }
}

const page = ({params}: Props) => {
  return (
    <div>{params.boardId}</div>
  )
}

export default page