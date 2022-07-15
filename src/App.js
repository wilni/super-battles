import logo from './logo.svg';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.js'
import Opponent from './pages/Opponent/Opponent.js'
import Battle from './pages/Battle/Battle.js'
import Dropdown from './components/Dropdown/Dropdown.js'
import './App.scss';
const heroList = require('./data/heros.json');
const marvelHeros = heroList.filter(hero => hero.publisher === "Marvel Comics");
const dcHeros = heroList.filter(hero => hero.publisher === "DC Comics");


class App extends React.Component {

  state = {
    universe: marvelHeros,
    hero: "choose your fighter"
  }

  handleChange = (e) => {
    this.setState({
      hero: e.target.value
    })
  };

  handleClick = (e) => {
    console.log(e.target.value);
    if (e.target.value === "DC") {
      this.setState({
        universe: dcHeros
      })
    } else if (e.target.value === "marvel") {
      this.setState({
        universe: marvelHeros
      })
    }
  };

  render() {
    console.log(marvelHeros);
    return (
      <Router className='App'>
        <Switch>
          <Route path='/' exact render={(routerProps) => {
            return <Home appState={this.state} handleClick={this.handleClick} handleChange={this.handleChange} {...routerProps} />
          }} />
          <Route path='/opponent' render={(routerProps) => {
            return <Opponent appState={this.state} {...routerProps} />
          }} />
          <Route path='/batle' render={(routerProps) => {
            return <Battle appState={this.state} {...routerProps} />
          }}/>
        </Switch>
      </Router>

      // <div className = "App" >
      //     <h1 className='selection-title'>Choose hero</h1>
      //       <form>
      //         <label>
      //           <input onClick={this.handleClick} type="radio" name="universe"  value="marvel" defaultChecked className='selection__radio-button'/>
      //           Marvel
      //         </label>
      //         <label>
      //           <input onClick={this.handleClick} type="radio" name="universe"  value="DC"  className='selection__radio-button'/>
      //           DC
      //         </label>
      //       </form>
      //     <div className='selection'>
      //       <Dropdown  list={this.state.universe} hero={this.state.hero} handleChange={this.handleChange}/>
      //     </div>
      // </div>
    );
  }

}

export default App;
