import Image from "next/image";
import useMemoizedSelectedCharacters from "@/lib/hooks/characters/useMemoizedSelectedCharacters";
import { useAppDispatch } from "@/lib/hooks/useApp";
import {
  toggleCharacter,
  toggleModal,
} from "@/redux/characters/charactersSlice";
import { CharacterPicked } from "@/types/character";
import SearchInput from "./SearchInput";
import arrowDown from "../../../../public/images/arrow-toggle-down.svg";
import { useNavigation } from "@/context/navigationContext";

function SelectedCharacters() {
  const dispatch = useAppDispatch();
  const { selectedCharactersContainerRef } = useNavigation();

  const [memoizedSelectedCharacters] = useMemoizedSelectedCharacters();

  return (
    <div
      className="selected-characters-container"
      ref={selectedCharactersContainerRef}
    >
      {memoizedSelectedCharacters.map(
        (character: CharacterPicked, i: number) => (
          <div key={i} className="selected-character">
            {character.name}
            <button
              className="selected-character-delete-button"
              onClick={() => dispatch(toggleCharacter({ id: character.id }))}
            >
              X
            </button>
          </div>
        )
      )}

      <SearchInput />

      <div
        onClick={() => dispatch(toggleModal(null))}
        className="selected-character-down-arrow"
      >
        <Image src={arrowDown} alt="toggle" width={20} height={20} />
      </div>
    </div>
  );
}

export default SelectedCharacters;
