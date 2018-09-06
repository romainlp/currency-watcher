import React from 'react'; // eslint-disable-line no-unused-vars
import Logo from '../UI/Logo/Logo'; // eslint-disable-line no-unused-vars

import './Navigation.scss';

function Navigation() {
  return (
    <div className="navigation">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Logo />
          </div>
          <div className="col-9">
            <ul>
              <li><a href="">About</a></li>
              <li><a target="_blank" className="transferwise" href="https://www.transferwise.com">Go to Transferwise</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
