import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import styles from './accountButton.module.scss';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className={styles.btnLogIn} onClick={loginWithRedirect}>
      Log In
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className={styles.btnLogOut}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className={styles.btnSignUp}
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Sign Up
    </button>
  );
};

// Stosiu dodał
// interface Props {
//   danger?: boolean;
//   onClick: () => void;
// }

// const Button: React.FC<Props> = (props) => {
//   const classes = cx('btn', 'btn-block', props.danger ? 'btn-danger' : 'btn-primary');

//   return <button className={classes} onClick={props.onClick}>
//     {props.children}
//   </button>
// }

// <Button>Log In</Button>
