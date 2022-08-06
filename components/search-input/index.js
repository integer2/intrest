import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Button } from '../button';
import Router from 'next/router';
import API from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);
  const listRef = useRef();
  const handleSearch = async (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await API().get(`/user/search`, {
        params: {
          query,
        },
      });
      setList(result.data.result);
      setShowList(true);
    } catch (error) {}
  };

  useEffect(() => {
    // hidden show list when click outside
    const handleClickOutside = (e) => {
      if (listRef.current.contains(e.target)) {
        return;
      }
      setShowList(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [listRef]);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[713px] flex gap-7 relative"
      ref={listRef}
    >
      <div className="relative flex items-center gap-6 px-5 py-2 border rounded-md max-w-[573px] flex-1 bg-white">
        <label htmlFor="search">
          <SearchIcon className="h-5 w-5" />
        </label>
        <input
          autoComplete="off"
          type="search"
          placeholder="Search..."
          id="search"
          className="focus:outline-none w-full flex-1 bg-transparent"
          onChange={handleSearch}
        />
      </div>
      <Button isPrimary type={'submit'} isLarge>
        Search
      </Button>
      {showList && (
        <div className="bg-white absolute top-full mt-2 border rounded-md w-full p-5 shadow-md">
          <div>
            {list.length > 0 && (
              <div className="space-y-5">
                {list.map((user, index) => {
                  return (
                    <Link key={index} href={`/user/${user.username}`}>
                      <a className="flex gap-5 items-center cursor-pointer">
                        <div className="h-10 w-10 relative rounded-full overflow-clip">
                          <Image
                            layout="fill"
                            alt="user"
                            src={user.img_url}
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <div className="text font-semibold">{user.name}</div>
                          <div className="text-sm">{user.username}</div>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
            {list.length === 0 && (
              <div className="text-center">
                <p className="text-gray-600">No result found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchInput;
