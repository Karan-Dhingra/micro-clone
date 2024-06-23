"use client";

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts';

type Props = {}

const SearchInput = (props: Props) => {
  const router = useRouter();
  const [debounceValue, setValue] = useDebounceValue("", 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/",
      query: {
        search: debounceValue
      }
    }, {skipEmptyString: true, skipNull: true});

    router.push(url);
  }, [debounceValue, router])

  return (
    <div className='w-full relative'>
      <Search
        className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4'
      />
      <Input
        className='w-full max-w-[516px] pl-9 outline-none focus:outline-none'
        placeholder='search boards...'
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchInput