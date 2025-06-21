import { RootState } from '../services/store';
import { createSelector } from '@reduxjs/toolkit';

/*// Базовый селектор для получения состояния конструктора
export const getBurgerConstructor = (state: RootState) => state.constructor;

// Селектор для получения булочки
export const getBun = createSelector(
  [getBurgerConstructor],
  (burgerConstructor) => burgerConstructor.bun
);

// Селектор для получения ингредиентов
export const getIngredients = createSelector(
  [getBurgerConstructor],
  (burgerConstructor) => burgerConstructor.ingredients
);

// Селектор для подсчета количества ингредиентов
export const getIngredientsCounters = createSelector(
  [getBurgerConstructor],
  (burgerConstructor) => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};

    // Подсчитываем количество каждого ингредиента
    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) {
        counters[ingredient._id] = 0;
      }
      counters[ingredient._id]++;
    });

    // Булочка всегда считается как 2 (верх и низ)
    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }
);

// Селектор для получения общей стоимости
export const getTotalPrice = createSelector(
  [getBurgerConstructor],
  (burgerConstructor) => {
    const { bun, ingredients } = burgerConstructor;
    let total = 0;

    if (bun) {
      total += bun.price * 2;
    }

    ingredients.forEach((ingredient) => {
      total += ingredient.price;
    });

    return total;
  }
);

// Селектор для проверки, есть ли ингредиенты в конструкторе
export const getIsConstructorEmpty = createSelector(
  [getBurgerConstructor],
  (burgerConstructor) =>
    !burgerConstructor.bun && burgerConstructor.ingredients.length === 0
);
*/
