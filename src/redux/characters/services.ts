import { ErrorType } from "@/types/error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeFocusedCharacter } from "./charactersSlice";

export const getCharactersByInputAsync = createAsyncThunk.withTypes<{
  rejectValue: { error: { name: string } };
}>()(
  "characters/getCharactersByInputAsync",
  async (filter: string, thunkAPI) => {
    const response = await fetch(`/api/characters`, {
      method: "POST",
      body: JSON.stringify({ filter }),
      signal: thunkAPI.signal,
    });

    if (response.status == 200) {
      const { characters } = await response.json();

      // thunkAPI.dispatch(changeFocusedCharacter(characters[0]));

      return characters;
    } else if (response.status == 404) {
      return thunkAPI.rejectWithValue({
        error: { name: ErrorType.NotFound },
      });
    } else {
      return thunkAPI.rejectWithValue({
        error: {
          name: ErrorType.InternalServerError,
        },
      });
    }
  }
);
