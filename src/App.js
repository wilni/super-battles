import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.js'
import Battle from './pages/Battle/Battle.js'
import './App.scss';
const heroList = require('./data/heros.json');
const marvelHeros = heroList.filter(hero => hero.publisher === "Marvel Comics");
const dcHeros = heroList.filter(hero => hero.publisher === "DC Comics");


class App extends React.Component {

  state = {
    choosingOpponent: false,
    universe: marvelHeros,
    heroName: null,
    heroData: {
      id: '1',
      name: 'A-Bomb',
      powerstats: {
        intelligence: '38',
        strength: '100',
        speed: '17',
        durability: '80',
        power: '24',
        combat: '64'
      },
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/10060.jpg'
    },
    opponentName: "super pup",
    opponentData: {
      id: '1',
      name: 'super pup',
      powerstats: {
        intelligence: '100',
        strength: '100',
        speed: '100',
        durability: '100',
        power: '100',
        combat: '100'
      },
      image: 'https://images.unsplash.com/photo-1532202802379-df93d543bac3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
  }

  handleChange = (e) => {
    if(this.state.choosingOpponent){
      this.setState({
        opponentName: e.target.value
      })
    }else{
      this.setState({
        heroName: e.target.value
      })
    }

  };

  handleClick = (e) => {
    e.preventDefault();
    console.log('were in the button');
    let opponentUniverse; 
    if(this.state.universe === marvelHeros){
      opponentUniverse = dcHeros;
    }else{
      opponentUniverse = marvelHeros;
    }

    this.setState({
      choosingOpponent: !this.state.choosingOpponent,
      universe: opponentUniverse
    })
  }


  handleRadioClick = (e) => {
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

  // handleSubmit = (e) => {
  //   e.preventDefault();

  // }

  componentDidUpdate(prevProps,prevState){
    console.log("names from did update",prevState.heroName, this.state.heroName)
    if(this.state.choosingOpponent === false){
      if(prevState.heroName !== this.state.heroName){
        axios.get(`http://localhost:8080/${this.state.heroName}`)
        .then(res => {
          console.log("res from id update",res.data);
          this.setState({
            heroData: res.data,
          })
        })
      }
    }else if(this.state.choosingOpponent === true) {
      if(prevState.opponentName !== this.state.opponentName){
        axios.get(`http://localhost:8080/${this.state.opponentName}`)
        .then(res => {
          console.log("res from id update",res.data);
          this.setState({
            opponentData: res.data,
          })
        })
      }
    }

  }

  render() {
    console.log(marvelHeros);
    return (
      <Router className='App'>
        <Switch>
          <Route path='/' exact render={(routerProps) => {
            return <Home appState={this.state} handleRadioClick={this.handleRadioClick} handleClick={this.handleClick} handleChange={this.handleChange} {...routerProps} />
          }} />
          <Route path='/battle' render={(routerProps) => {
            return <Battle appState={this.state} {...routerProps} />
          }}/>
        </Switch>
      </Router>
    );
  }

}

export default App;
