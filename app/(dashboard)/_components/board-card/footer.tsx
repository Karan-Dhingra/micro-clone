import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import React from 'react'

type Props = {
    isFavoraite: boolean
    title: string
    authorLabel: string
    createdAtLabel: string
    onClick: () => void
    disabled: boolean
}

const Footer = ({
    isFavoraite,
    title,
    authorLabel,
    createdAtLabel,
    onClick,
    disabled
}: Props) => {
  return (
    <div className='relative bg-white p-3'>
        <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>

        <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">{authorLabel}, {createdAtLabel}</p>

        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
                disabled && "cursor-not-allowed opacity-75"
            )}
        >
            <Star className={cn(
                "h-4 w-4",
                isFavoraite && "text-blue-600 fill-blue-600"
            )} />
        </button>
    </div>
  )
}

export default Footer