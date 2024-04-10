import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useAppSelector } from "@/lib/hooks/useApp";
import { selectFilter } from "@/redux/characters/charactersSelectors";

type TCharacterProps = {
  name: string;
};

function CharacterName({ name }: TCharacterProps) {
  const filter = useAppSelector(selectFilter);

  const filterRegex = new RegExp(filter, "i");
  const isMatch = filterRegex.test(name);

  if (isMatch) {
    const originalFilter = name.match(filterRegex);
    const characterNameWithBoldSpan = name.replace(
      filterRegex,
      `<span style="font-weight: bold;">${originalFilter}</span>`
    );

    return (
      <p className="filtered-character-info-title">
        {ReactHtmlParser(characterNameWithBoldSpan)}
      </p>
    );
  } else {
    return <p className="filtered-character-info-title">{name}</p>;
  }
}

export default CharacterName;
