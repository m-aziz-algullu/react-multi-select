import { useEffect } from "react";

import { getCharactersByInputAsync } from "@/redux/characters/services";
import { changeFilter } from "@/redux/characters/charactersSlice";
import { selectFilter } from "@/redux/characters/charactersSelectors";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useApp";

function SearchInput() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    const promise = dispatch(getCharactersByInputAsync(filter));
    return () => promise.abort();
  }, [filter]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
    dispatch(changeFilter(e.currentTarget.value));

  return (
    <input
      autoFocus={true}
      name="search-character"
      value={filter}
      className="search-character-input"
      onChange={handleChange}
    />
  );
}

export default SearchInput;
