import { Component, ReactNode } from 'react';
import { dataHandler } from './DataHandler';
import Person from './Person';

class Button extends Component {
constructor(){
  super();
  this.handleClick = this.handleClick.bind(this);
}
 
  render(): ReactNode {
    return <button className='search__button' onClick={this.handleClick}>
      search
    </button>;
  }

  handleClick (){
dataHandler.fetchData()
.then(() => 
  {
    dataHandler.people
    .forEach((element:Person) =>{
    const person = new Person(element.name,element.height,element.mass)
   person.render()
  })

 })
  
.catch((err) => console.log(err))
  }

}

export default Button
