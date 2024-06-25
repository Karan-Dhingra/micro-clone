"use client";

import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from 'react';

type Props = {
    children: React.ReactNode,
    roomId: string,
    fallback: NonNullable<ReactNode> | null
}

const LIVEBLOCKS_PUBLIC_KEY = "pk_dev_74Ajzvh5-MV6pROloyFxn_kSj0TRaFTLtlt0jacPgs5kh1SMNEN4VIcwUbnrH3BU"

const Room = ({
    children,
    roomId,
    fallback
}: Props) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <RoomProvider id={roomId} initialPresence={{}}>
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    </LiveblocksProvider>
  )
}

export default Room