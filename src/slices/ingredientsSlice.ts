import { getIngredientsApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector(state) {
      return state.items;
    },
    selectBuns(state) {
      return state.items.filter((item) => item.type === 'bun');
    },
    selectMains(state) {
      return state.items.filter((item) => item.type === 'main');
    },
    selectSauces(state) {
      return state.items.filter((item) => item.type === 'sauce');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const { ingredientsSelector, selectBuns, selectMains, selectSauces } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
