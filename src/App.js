import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewCmp from './NewComponent/NewComponent';

class App extends Component {
  state = {
    person : [
      { id:'001', name : 'Niranjan', age : '20'},
      { id:'002', name : 'Vishnu', age : '21'},
      { id:'003', name : 'Priya', age : '22'}
    ],
    buttonState : false
  }

  // switchNameHandler = (newName) => {
  //   //console.log('Clicked from handler!!!');
  //   this.setState({
  //     person : [
  //       {name : newName, age : '299'},
  //       {name : 'Usha', age : '210'},
  //       {name : 'Priya', age : '2299'}
  //     ]
  //   })
  // }

  deleteHandler = (index) => {
    // Copying state properly, updating it immutatably
    // let person = this.state.person; --> Wrong way
    // alternatvie ES5 way
    // const person = this.state.person.slice();
    const person = [...this.state.person];
    person.splice(index, 1);
    this.setState({
      person: person
    })
  }

  twoWayDataBindingHandler = (event) => {
    this.setState({
      person : [
        {name : 'Niranjan', age : '299'},
        {name : event.target.value, age : '210'},
        {name : 'Priya', age : '2299'}
      ]
    })
  }

  toggleContent = () => {
    this.setState({
      buttonState: !this.state.buttonState
    });
  }

  updateNameHandler = (event, id) => {
    let person = [...this.state.person];
    let singlePerson = person.find((elem) => elem.id === id);
    if(singlePerson) {
      singlePerson.name = event.target.value;
      this.setState({
        person : person
      });
    }
    
    /**
     * Using index, if its sent via params...
     * 
     * let singlePerson = {
     *      ...this.state.person[index] 
     * }
     * 
     * person.name = event.target.value;
     * this.setState({
     *      person[index] = person;
     * })
     */
  }

  render() {
    const buttonStyles = {
      margin : '2px',
      backgroundColor: '#eee',
      border: '2px solid #eee',
      color: 'Black',
      padding: '10px 20px',
      textAlign: 'center',
      fontSize: '16px',
      cursor: 'pointer'
    }

    let person = null;

    if (this.state.buttonState) {
      person = (
        <div>
          {this.state.person.map((person, index) => {
            return <NewCmp className='App-cmp' 
                      click={this.deleteHandler.bind(this, index)} 
                      name={person.name} 
                      age={person.age}
                      key={person.id}
                      changer={(event) => this.updateNameHandler(event, person.id)}/>
          })}
        </div>
      );
    }

    return (
      //Using arrow function as below in that onCLick could be inefficient.
      <div className="App">
        <h1>Hello I am a react App!</h1>
        <button style={buttonStyles} onClick={this.toggleContent.bind(this)}>Toggle Content</button>
        {person}       
      </div>
    );

    //The above JSX code gets converted into the code below!

    // return React.createElement('div', {'className' : 'App'}, 
    //         React.createElement('h1', {'className' : 'App-header'},'Hello, I\'m a react App!'));
  }
}

export default App;

/**
 * Having this code is JSX in the return also works, this is basically javascript in of jsx
 * 
 * {
          this.state.buttonState ? 
          <div>
              <NewCmp className='App-cmp' name={this.state.person[0].name} age={this.state.person[0].age}/>
              <NewCmp className='App-cmp' name={this.state.person[1].name} 
                    age={this.state.person[1].age} 
                    click={this.switchNameHandler.bind(this, 'VPVPVPVPVP')}
                    changer={this.twoWayDataBindingHandler}> 
                      This is My Hobbie YOYOYOYOYOY!!!!!
              </NewCmp>
              <NewCmp className='App-cmp' name={this.state.person[2].name} age={this.state.person[2].age}/>
          </div>
          : null
        }
 * 
 * 
 */