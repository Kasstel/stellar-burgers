import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, RootState } from '../../../services/store';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const profilePath = user ? '/profile' : '/login';
  const location = useLocation(); // получаем объект location
  const currentPath = location.pathname; // текущий путь
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={`${styles.link} ${
              currentPath === '/' ? styles.link_active : ''
            }`}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>

          <Link
            to='/feed'
            className={`${styles.link} ${
              currentPath.startsWith('/feed') ? styles.link_active : ''
            }`}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>

        <div className={styles.link_position_last}>
          <Link
            to={profilePath}
            className={`${styles.link} ${
              currentPath.startsWith('/profile') ||
              currentPath === '/login' ||
              currentPath === '/register' ||
              currentPath === '/forgot-password' ||
              currentPath === '/reset-password'
                ? styles.link_active
                : ''
            }`}
          >
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {user?.name || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
