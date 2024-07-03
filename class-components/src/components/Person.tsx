import { Component, ReactNode } from 'react';

class Person extends Component {
  name: string;
  height: string;
  mass: string;
  constructor(name: string, height: string, mass: string) {
    super(props);
    this.name = name;
    this.height = height;
    this.mass = mass;
  }

  render(): ReactNode {
    return (
      
      <div className="person">
        <div className="person__name">`${this.name}` </div>
        <div className="person__height">`${this.name}` </div>
        <div className="person__mass">`${this.mass}` </div>
      </div>
    );
  }
}

export default Person;
