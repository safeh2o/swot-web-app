import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { userSelectors } from '../../reducers/user';

export default function NavTools() {
  const isLoggedIn = useSelector(userSelectors.isLoggedIn);

  return (
    <>
      {(!isLoggedIn && (
        <Button href="https://www.safeh2o.app/" target="_blank">
          About
        </Button>
      )) || (
        <Button to="/pages/faq" component={NavLink}>
          FAQ
        </Button>
      )}
      <Button to="/blog" component={NavLink}>
        News
      </Button>
      <Button to="/contact" component={NavLink}>
        Contact<span>{(!isLoggedIn && '/Signup') || '/Support'}</span>
      </Button>
    </>
  );
}
