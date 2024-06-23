"use client";

import { useOrganization, UserButton } from '@clerk/nextjs';
import EmptyOrg from './_components/empty.org';
import BoardList from './_components/board.list';
import Loading from './loading';

type props = {
  searchParams: {
    search?: string
    favoraites?: string
  }
}

export default function DashboardPage({searchParams}: props) {
  const {organization, isLoaded} = useOrganization();

  if(!isLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <div className='flex flex-col gap-y-4 flex-1 h-[calc(100%-80px)] w-full p-6'>
      {!organization 
        ? <EmptyOrg />
        : <BoardList
            orgId={organization.id}
            query={searchParams}
        />
      }
    </div>
  );
}
