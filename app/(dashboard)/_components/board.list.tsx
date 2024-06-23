"use client";
import React from 'react'
import EmptySearch from './empty.search';
import EmptyFavoraites from './empty.favoraites';
import EmptyBoard from './empty.board';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import BoardCard from './board-card';
import NewBoardButton from './board-card/new.board.button';

type Props = {
    orgId: string
    query: {
        search?: string
        favoraites?: string
    }
}

const BoardList = ({orgId, query}: Props) => {
  const data = useQuery(api.boards.get, {
    orgId,
    ...query
  });

  if(data === undefined) {
    return(
      <div>
        <h2 className='text-3xl'>
          {query.favoraites ? 'Favoraite Boards' : 'Team Boards'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          {!query.search && <NewBoardButton orgId={orgId} disabled />}
          <BoardCard.Skelton />
          <BoardCard.Skelton />
          <BoardCard.Skelton />
          <BoardCard.Skelton />
        </div>
      </div>
    )
  }

  if(!data?.length && query.search) {
    return <EmptySearch />
  }

  if(!data?.length && query.favoraites) {
    return <EmptyFavoraites />
  }


  if(!data?.length) {
    return <EmptyBoard />
  }

  return (
    <div>
        <h2 className='text-3xl'>
          {query.favoraites ? 'Favoraite Boards' : 'Team Boards'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          {!query.search && <NewBoardButton
            orgId={orgId}
            disabled={false}
          />}
          {data?.map((board) => (
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.title}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavoraite={board.isFavorite}
            />
          ))}
        </div>
    </div>
  )
}

export default BoardList