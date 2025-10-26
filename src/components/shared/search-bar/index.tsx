/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { onFilterName } from "@/redux/slices/app-slice";
import Iconify from "../iconify";

interface SearchInputProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onFilterName(""));
  }, []);

  return (
    <div className="w-full md:max-w-[320px] md:min-w-[362px] flex items-center border border-light-gray rounded-lg px-4 py-3">
      <Iconify icon="proicons:search" className="text-secondary-text-gray " />
      <input
        type="text"
        placeholder={placeholder}
        className="ml-2 text-md w-full bg-transparent border-none outline-none !text-secondary-text-gray"
        onChange={(e) => dispatch(onFilterName(e.target.value))}
      />
    </div>
  );
};

export default SearchInput;
