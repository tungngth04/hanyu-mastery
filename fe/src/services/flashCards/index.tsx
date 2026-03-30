import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFlashCardById = createAsyncThunk(
  "flashcard/getAllById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.flashcard.getByDeckId(id),
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateFlashcardStatus = createAsyncThunk(
  "flashcard/updateStatus",
  async (
    payload: {
      vocabularyId: string;
      status: "new" | "mastered";
      deckId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.patch(
        apiConstant.flashcard.updateStatus(payload.vocabularyId),
        {
          status: payload.status,
          deckId: payload.deckId,
        },
      );

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const studyFlashcardDeck = createAsyncThunk(
  "flashcard/studyDeck",
  async (deckId: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.userDeckProgress.study,
        {
          deckId,
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
