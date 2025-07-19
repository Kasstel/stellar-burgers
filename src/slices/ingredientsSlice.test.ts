import reducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const ingredientsMock: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 3,
    calories: 100,
    price: 50,
    image: 'url',
    image_mobile: 'url',
    image_large: 'url'
  },
  {
    _id: '2',
    name: 'Мясо',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 3,
    calories: 100,
    price: 50,
    image: 'url',
    image_mobile: 'url',
    image_large: 'url'
  },
  {
    _id: '3',
    name: 'Соус',
    type: 'sauce',
    proteins: 10,
    fat: 5,
    carbohydrates: 3,
    calories: 100,
    price: 50,
    image: 'url',
    image_mobile: 'url',
    image_large: 'url'
  }
];

describe('ingredientsSlice', () => {
  it('pending → isLoading = true', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled → данные загружаются', () => {
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(ingredientsMock, '', undefined)
    );
    expect(state.items).toEqual(ingredientsMock);
    expect(state.isLoading).toBe(false);
  });

  it('rejected → ошибка сохраняется', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(null, '', undefined, 'Ошибка')
    );
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});
