import CharacterName from "./CharacterName";
import { CharacterPicked } from "@/types/character";
import Image from "next/image";

type TCharacterProps = {
  isLast: boolean;
  character: CharacterPicked;
  focusedCharacter: CharacterPicked | null;
  selectCharacter: (character: CharacterPicked) => void;
  checked: boolean;
};

function Character({
  isLast,
  character,
  selectCharacter,
  checked,
}: TCharacterProps) {
  return (
    <div
      onClick={() => selectCharacter(character)}
      className="filtered-character-container"
      style={{
        borderBottom: isLast ? "none" : "1px solid #94A3B8",
      }}
    >
      <input
        className="filtered-character-input"
        name="select-character"
        type="checkbox"
        onChange={() => {}}
        checked={checked}
      />
      <Image
        className="filtered-character-image"
        src={character.image}
        alt="character-img"
        width={36}
        height={36}
      />
      <div className="filtered-character-info-container">
        <CharacterName name={character.name} />
        <p className="filtered-character-info-episode">
          {`${character.episode.length} `}
          {character.episode.length == 1 ? "Episode" : "Episodes"}
        </p>
      </div>
    </div>
  );
}

export default Character;
