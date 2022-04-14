import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/Logo.png';
import AuthNav from '../../auth-nav';
import { SignupButton } from '../../buttons/accountButton/accountButtons';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  const [navBar, setNavbar] = useState(false);
  const { isAuthenticated } = useAuth0();

  // return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  // const changeBackground = () => {
  //   if (window.scrollY >= 80) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  // useEffect(() => {
  //   changeBackground();
  //   window.addEventListener('scroll', changeBackground);
  // });

  return (
    <header>
      <div className={styles.HeaderContainer}>
        <div className={styles.HeaderLogo}>
          <NavLink to='/'>
            <img src={logo} alt='logo' />
            <span>PIXEL</span>
          </NavLink>
        </div>
        <nav className={styles.HeaderNav}>
          {isAuthenticated && (
            <>
              <NavLink to='/profile'>Profile</NavLink>
              <NavLink to='/albums'>Albums</NavLink>
            </>
          )}
          {/* <NavLink to='/profile'>Profile</NavLink>
          <NavLink to='/albums'>Albums</NavLink> */}
          <AuthNav />
          {!isAuthenticated && <SignupButton />}
        </nav>
      </div>
    </header>
  );
};
