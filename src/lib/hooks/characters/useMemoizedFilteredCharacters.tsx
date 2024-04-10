import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../useApp";
import { CharacterPicked } from "@/types/character";
import { selectFilteredCharacters } from "@/redux/characters/charactersSelectors";

const useMemoizedFilteredCharacters = () => {
  const memoized = useMemo(() => {
    return createSelector(
      [selectFilteredCharacters],
      (filteredCharacters: CharacterPicked[]) => filteredCharacters
    );
  }, []);

  const memoizedFilteredCharacters = useAppSelector((state) =>
    memoized({ characters: state.characters })
  );

  return [memoizedFilteredCharacters] as const;
};

export default useMemoizedFilteredCharacters;
