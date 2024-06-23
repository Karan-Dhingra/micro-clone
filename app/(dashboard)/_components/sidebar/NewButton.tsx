import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'
import Hint from '../hint'

type Props = {}

const NewButton = (props: Props) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className="aspect-square">
                <Hint label='Create organization' side='right' align='start' sideOffset={10}>
                    <button className='bg-white/25 h-full w-full flex items-center justify-center rounded'>
                        <Plus className='text-white' />
                    </button>
                </Hint>
            </div>
        </DialogTrigger>
        <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
            <CreateOrganization />
        </DialogContent>
    </Dialog>
  )
}

export default NewButton