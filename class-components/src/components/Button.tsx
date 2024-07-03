import { Component, ReactNode } from 'react';

class Button extends Component {
  constructor(props: object) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render(): ReactNode {
    return (
      <button className="search__button" onClick={this.handleClick}>
        search
      </button>
    );
  }

  handleClick() {
    alert('gg');
  }
}

export default Button;
