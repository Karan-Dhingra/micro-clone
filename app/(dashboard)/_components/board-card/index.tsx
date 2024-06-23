"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Overlay from './overlay'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import Footer from './footer'
import { Skeleton } from '@/components/ui/skeleton'
import Actions from '@/components/actions'
import { MoreVertical } from 'lucide-react'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

type Props = {
    id: string
    title: string
    imageUrl: string
    authorId: string
    authorName: string
    createdAt: number
    orgId: string
    isFavoraite: boolean
}

const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavoraite
}: Props) => {
  const { userId } = useAuth();
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(api.board.favorite);
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(api.board.unfavorite);

  const authorLabel = userId === authorId ? "You" : authorName
  const createAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true
  })

  const toggleFavorite = (e: any) => {
    e?.preventDefault();
    if(isFavoraite) {
        onUnfavorite({id})
          .catch(() => toast.error("Failed to unfavoarite"))
    }else {
        onFavorite({id})
          .catch(() => toast.error("Failed to favoarite"))
    }
  }

  return (
    <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50">
                <Image
                    src={imageUrl}
                    alt="doodle"
                    fill
                    className='object-fit'
                />
                <Overlay />
                <Actions
                    id={id}
                    title={title}
                    side='right'
                >
                    <button
                        className='absolute top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity outline-none px-3 py-2'
                    >
                        <MoreVertical className='text-white opacity-75 hover:opacity-100 transition-opacity' />
                    </button>
                </Actions>
            </div>

            <Footer
                isFavoraite={isFavoraite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createAtLabel}
                onClick={toggleFavorite}
                disabled={pendingFavorite || pendingUnfavorite}
            />
        </div>
    </Link>
  )
}

export default BoardCard

BoardCard.Skelton = function BoardCardSkelton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className='h-full w-full' />
        </div>
    )
}