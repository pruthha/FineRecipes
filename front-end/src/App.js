import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ingredientList: [],
      ingredient: "",
      recipesToShow: []
    }

    //bindings
    this.addIngredient = this.addIngredient.bind(this);
    this.getChange = this.getChange.bind(this);
    this.getReceipes = this.getReceipes.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  //whatever the user types in get that value
  getChange(event) {
    this.setState({
      ingredient: event.target.value
    })
  }

  //add ingredient to newArray and update the state of ingredientList
  addIngredient(event) {
    event.preventDefault();
    let tempArray = this.state.ingredientList;
    tempArray.push(this.state.ingredient);
    this.setState({
      ingredientList: tempArray,
      ingredient: ""
    })
  }

  //delete the ingredient
  removeIngredient(value) {
    let newState = Array.from(this.state.ingredientList)
    newState = newState.filter((el) => {
      return el !== value
    })
    this.setState({
      ingredientList: newState,
    })
  }

  //make API call to get reciepes
  getReceipes(event) {
    let tempArray = this.state.ingredientList;
    tempArray = tempArray.join(',');

    // Make API call - test code
    const promise = axios.get('http://localhost:8080/getRecipes?q=' + tempArray);
    promise.then((result) => {
      // const myData = JSON.parse(result.data);
      console.log("success!");
      console.log(result.data);

      this.setState({
        recipesToShow: result.data
      })
    });

    promise.catch((error) => {
      console.log("ERROR :(");
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search ingredient={this.state.ingredient} addIngredient={this.addIngredient} handleChange={this.getChange} getReceipes={this.getReceipes} />
        <ListOfIngredients removeIngredient={this.removeIngredient} list={this.state.ingredientList} />
        <ListOfReceipes list={this.state.recipesToShow} />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="box">
        <h1>FineRecipes</h1>
      </div>
    );
  }
}

//input box and button
class Search extends Component {
  render() {
    return (
      <form className="search-bar" onSubmit={this.props.addIngredient}>
        <div className="input-group">
          {/*<input onChange={this.props.handleChange} value={this.props.ingredient} type="text" className="form-control" placeholder="Enter ingredients.Get Recipe....." />*/}
          <input onChange={this.props.handleChange} value={this.props.ingredient} type="text" placeholder="Enter ingredients.Get Recipe....." className="md-form" />
          <button onClick={this.props.getReceipes} type="button" className="btn purple-gradient btn-md" style={{ 'borderRadius': '25px' }}>Get Recipes!</button>
        </div>
      </form>
    )
  }
}

//displays the list of ingredients user typed in
class ListOfIngredients extends Component {
  render() {
    return (
      <ul>
        {this.props.list.map((value, i) => {
          return (
            <span className="cherry label label-success" key={value}> {value}
              <i className="fa fa-times" aria-hidden="true" onClick={() => this.props.removeIngredient(value)}> </i>
            </span>
          )
        })}
      </ul>
    )
  }
}

//displays the list of recipes based on ingredients
class ListOfReceipes extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.list.map((value, i) => {
            return (
              <div key={value.title} className="col-sm-4">
                <div className="thumbnail">
                  <a href={value.source_url} target="_blank">
                    <img src={value.image_url} alt={value.title} className='forImg' />
                    <div className="caption">
                      <p className='indie'>{value.title}</p>
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
