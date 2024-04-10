import { CharacterPicked } from "@/types/character";
import { toggleCharacter } from "@/redux/characters/charactersSlice";
import {
  selectError,
  selectFocusedCharacter,
  selectStatus,
} from "@/redux/characters/charactersSelectors";
import { Status } from "@/types/status";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useApp";
import Character from "./Character";
import useMemoizedFilteredCharacters from "@/lib/hooks/characters/useMemoizedFilteredCharacters";
import useMemoizedSelectedCharacters from "@/lib/hooks/characters/useMemoizedSelectedCharacters";
import { useNavigation } from "@/context/navigationContext";

function FilteredCharacters() {
  const dispatch = useAppDispatch();

  const { modalRef } = useNavigation();
  const error = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);

  const [memoizedFilteredCharacters] = useMemoizedFilteredCharacters();
  const [memoizedSelectedCharacters] = useMemoizedSelectedCharacters();

  const focusedCharacter = useAppSelector(selectFocusedCharacter);

  if (status == Status.Loading)
    return <div className="filtered-characters-content-status">Loading...</div>;

  if (status == Status.Failed)
    return <div className="filtered-characters-content-status">{error}</div>;

  return (
    <div ref={modalRef} className="filtered-characters-container">
      {memoizedFilteredCharacters.map(
        (character: CharacterPicked, i: number) => (
          <Character
            key={i}
            isLast={i + 1 == memoizedFilteredCharacters.length}
            character={character}
            focusedCharacter={focusedCharacter}
            checked={memoizedSelectedCharacters.some(
              (s) => s.id == character.id
            )}
            selectCharacter={(character: CharacterPicked) =>
              dispatch(toggleCharacter(character))
            }
          />
        )
      )}
    </div>
  );
}

export default FilteredCharacters;
