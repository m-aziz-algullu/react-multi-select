import { useAppDispatch, useAppSelector } from "@/lib/hooks/useApp";
import {
  selectFocusedCharacter,
  selectModal,
} from "@/redux/characters/charactersSelectors";

import SelectedCharacters from "./SelectedCharacters";
import FilteredCharacters from "./FilteredCharacters";
import useMemoizedFilteredCharacters from "@/lib/hooks/characters/useMemoizedFilteredCharacters";
import useMemoizedSelectedCharacters from "@/lib/hooks/characters/useMemoizedSelectedCharacters";
import { useEffect, useRef } from "react";
import NavigationController from "@/controller/navigation-controller";
import { useNavigation } from "@/context/navigationContext";
import { CharacterPicked } from "@/types/character";
import {
  changeFocusedCharacter,
  deSelectCharacter,
  selectCharacter,
} from "@/redux/characters/charactersSlice";

function MultiSelect() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  const navigationControllerRef = useRef<NavigationController>();

  const { selectedCharactersContainerRef, modalRef } = useNavigation();
  const [memoizedFilteredCharacters] = useMemoizedFilteredCharacters();
  const [memoizedSelectedCharacters] = useMemoizedSelectedCharacters();
  const focusedCharacter = useAppSelector(selectFocusedCharacter);

  function dispatchFocusedCharacter(character: CharacterPicked) {
    dispatch(changeFocusedCharacter(character));
  }
  function dispatchSelectCharacter(character: CharacterPicked) {
    dispatch(selectCharacter(character));
  }
  function dispatchDeSelectCharacter(character: CharacterPicked) {
    dispatch(deSelectCharacter(character));
  }

  useEffect(() => {
    navigationControllerRef.current = new NavigationController(
      dispatchFocusedCharacter,
      dispatchSelectCharacter,
      dispatchDeSelectCharacter
    );
    navigationControllerRef.current.start();

    return () => {
      navigationControllerRef.current!.end();
    };
  }, []);

  useEffect(() => {
    if (modalRef.current && navigationControllerRef.current) {
      navigationControllerRef.current.setModalRef(modalRef);
    }
  }, [modalRef]);

  useEffect(() => {
    if (
      selectedCharactersContainerRef.current &&
      navigationControllerRef.current
    ) {
      navigationControllerRef.current.setSelectedCharactersContainerRef(
        selectedCharactersContainerRef
      );
    }
  }, [selectedCharactersContainerRef]);

  useEffect(() => {
    if (navigationControllerRef.current) {
      navigationControllerRef.current.setFilteredCharacters(
        memoizedFilteredCharacters
      );
    }
  }, [memoizedFilteredCharacters]);

  useEffect(() => {
    if (navigationControllerRef.current) {
      navigationControllerRef.current.setSelectedCharacters(
        memoizedSelectedCharacters
      );
    }
  }, [memoizedSelectedCharacters]);

  useEffect(() => {
    if (navigationControllerRef.current) {
      navigationControllerRef.current.setFocusedCharacter(
        focusedCharacter as CharacterPicked
      );
    }
  }, [focusedCharacter]);

  return (
    <>
      <SelectedCharacters />
      {modal && <FilteredCharacters />}
    </>
  );
}

export default MultiSelect;
