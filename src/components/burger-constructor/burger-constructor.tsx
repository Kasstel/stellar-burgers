import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  clearSelectedOrder,
  orderBurgerAsync,
  orderModalSelector,
  orderRequestSelector
} from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../slices/authSlice';

export const constructorIngredients = (state: RootState) =>
  state.burgerConstructor;

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(constructorIngredients);

  const user = useSelector(userSelector);
  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(orderModalSelector);

  const onOrderClick = () => {
    if (!user) {
      dispatch(clearSelectedOrder());
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurgerAsync(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(clearSelectedOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
