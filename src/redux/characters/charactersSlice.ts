import { createSlice } from "@reduxjs/toolkit";
import { getCharactersByInputAsync } from "./services";
import { CharacterPicked } from "@/types/character";
import { ErrorType, UIErrorMessage } from "@/types/error";
import { Status } from "@/types/status";

interface CharactersState {
  filter: string;
  filteredCharacters: Array<CharacterPicked>;
  selectedCharacters: Array<CharacterPicked>;
  focusedCharacter: CharacterPicked | null;
  status: Status;
  modal: true | false;
  error: string;
}

const initialState: CharactersState = {
  filter: "",
  modal: true,
  filteredCharacters: [],
  selectedCharacters: [],
  focusedCharacter: null,
  status: Status.NoAction,
  error: "",
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      const newFilter = action.payload;
      state.filter = newFilter;
    },
    changeFocusedCharacter: (state, action) => {
      const character = action.payload;

      state.focusedCharacter = character;
    },
    toggleModal: (state, action) => {
      if (state.filteredCharacters.length > 0) {
        state.modal = !state.modal;
      }
    },
    selectCharacter(state, action) {
      const character = action.payload;
      const isExist = state.selectedCharacters.some(
        (c) => c.id == character.id
      );
      if (!isExist) state.selectedCharacters.push(character);
    },
    deSelectCharacter(state, action) {
      const character = action.payload;
      const index = state.selectedCharacters.findIndex(
        (c) => c.id == character.id
      );

      state.selectedCharacters = state.selectedCharacters.filter(
        (c) => c.id != character.id
      );

      // set focused character after deselecting
      state.focusedCharacter =
        state.selectedCharacters[index] ??
        state.selectedCharacters[index - 1] ??
        state.selectedCharacters[index + 1];
    },
    toggleCharacter: (state, action) => {
      const character = action.payload;

      const isExist = state.selectedCharacters.some(
        (c) => c.id == character.id
      );

      if (isExist) {
        state.selectedCharacters = state.selectedCharacters.filter(
          (c) => c.id != character.id
        );
      } else {
        state.selectedCharacters.push(character);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersByInputAsync.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getCharactersByInputAsync.fulfilled, (state, action) => {
        state.status = Status.Completed;
        if (state.modal == false) state.modal = true;

        const selectedCharactersToAdd = state.selectedCharacters.filter(
          (c) => !action.payload.some((_c: CharacterPicked) => _c.id === c.id)
        );

        state.filteredCharacters = selectedCharactersToAdd.concat(
          action.payload
        );
      })
      .addCase(getCharactersByInputAsync.rejected, (state, action) => {
        state.status = Status.Failed;

        if (action.payload?.error.name == ErrorType.NotFound) {
          state.error = UIErrorMessage.NotFound;
          state.filteredCharacters = [];
        } else if (
          action.payload?.error.name == ErrorType.InternalServerError
        ) {
          state.error = UIErrorMessage.InternalServerError;
        } else if (action.error.name == ErrorType.AbortError) {
          state.status = Status.NoAction;
          state.error = UIErrorMessage.Empty;
        }
      });
  },
});

export const {
  changeFocusedCharacter,
  changeFilter,
  toggleCharacter,
  selectCharacter,
  deSelectCharacter,
  toggleModal,
} = charactersSlice.actions;

export default charactersSlice.reducer;
