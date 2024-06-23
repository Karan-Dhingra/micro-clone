import Image from 'next/image'

export default function Loading() {
    return(
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <Image
                src="/loader.gif"
                alt="logo"
                width={250}
                height={250}
                className='animate-pulse duration-700'
            />
        </div>
    )
}