"use client";

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!
const convex = new ConvexReactClient(convexUrl);

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

export const ConvexClientProvider = ({ children, } : ConvexClientProviderProps) => {
    return (
    <ClerkProvider>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
           {children}
        </ConvexProviderWithClerk>
    </ClerkProvider>
    )
}