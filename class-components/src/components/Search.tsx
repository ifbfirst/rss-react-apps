import { Component, ReactNode } from 'react';
import Input from './Input';
import Button from './Button';

class Search extends Component {
  render(): ReactNode {
    return (
      <div className="search">
        <Input />
        <Button />
      </div>
    );
  }
}

export default Search;
