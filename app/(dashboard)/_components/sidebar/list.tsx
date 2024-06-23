"use client";

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import Item from "./item";

type Props = {};

const List = (props: Props) => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className='flex flex-col gap-3'>
      {userMemberships?.data?.map((mem) => (
        <Item
          key={mem.organization.id}
          name={mem.organization.name}
          id={mem.organization.id}
          imageUrl={mem.organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export default List;
