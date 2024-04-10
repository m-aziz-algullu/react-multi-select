import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../useApp";
import { CharacterPicked } from "@/types/character";
import { selectSelectedCharacters } from "@/redux/characters/charactersSelectors";

const useMemoizedSelectedCharacters = () => {
  const memoized = useMemo(() => {
    return createSelector(
      [selectSelectedCharacters],
      (selectedCharacters: CharacterPicked[]) => selectedCharacters
    );
  }, []);

  const memoizedSelectedCharacters = useAppSelector((state) =>
    memoized({ characters: state.characters })
  );

  return [memoizedSelectedCharacters] as const;
};

export default useMemoizedSelectedCharacters;
