import logo from './logo.svg';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.js'
import Opponent from './pages/Opponent/Opponent.js'
import Battle from './pages/Battle/Battle.js'
import './App.scss';
const heroList = require('./data/heros.json');
const marvelHeros = heroList.filter(hero => hero.publisher === "Marvel Comics");
const dcHeros = heroList.filter(hero => hero.publisher === "DC Comics");


class App extends React.Component {

  state = {
    universe: marvelHeros,
    heroName: null,
    heroData: {}
  }

  handleChange = (e) => {
    this.setState({
      heroName: e.target.value
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

  componentDidUpdate(prevProps,prevState){
    console.log("names from did update",prevState.heroName, this.state.heroName)
    if(prevState.heroName !== this.state.heroName){
      axios.get(`http://localhost:8080/${this.state.heroName}`)
      .then(res => {
        console.log("res from id update",res.data);
        this.setState({
          heroData: res.data,
        })
      })
    }
  }

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
    );
  }

}

export default App;
