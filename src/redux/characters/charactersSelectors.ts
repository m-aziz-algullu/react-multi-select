import { RootState } from "../store";

const selectSelectedCharacters = (state: RootState) =>
  state.characters.selectedCharacters;
const selectFilteredCharacters = (state: RootState) =>
  state.characters.filteredCharacters;

const selectFocusedCharacter = (state: RootState) =>
  state.characters.focusedCharacter;
const selectFilter = (state: RootState) => state.characters.filter;
const selectStatus = (state: RootState) => state.characters.status;
const selectModal = (state: RootState) => state.characters.modal;
const selectError = (state: RootState) => state.characters.error;

export {
  selectSelectedCharacters,
  selectFilteredCharacters,
  selectFilter,
  selectStatus,
  selectError,
  selectModal,
  selectFocusedCharacter,
};
