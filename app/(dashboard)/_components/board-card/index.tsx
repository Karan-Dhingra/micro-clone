import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Overlay from './overlay'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import Footer from './footer'

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
  const {userId} = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName
  const createAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true
  })

  return (
    <Link href="/">
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50">
                <Image
                    src={imageUrl}
                    alt="doodle"
                    fill
                    className='object-fit'
                />
                <Overlay />
            </div>

            <Footer
                isFavoraite={isFavoraite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createAtLabel}
                onClick={() => {}}
                disabled={false}
            />
        </div>
    </Link>
  )
}

export default BoardCard