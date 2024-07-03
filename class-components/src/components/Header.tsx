import { Component, ReactNode } from 'react';
import Search from './Search';

class Header extends Component {
  render(): ReactNode {
    return (
      <header className="header">
        <h1>PeopleFinders</h1>
        <Search />
      </header>
    );
  }
}

export default Header;
