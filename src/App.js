import logo from './logo.svg';
import axios from 'axios';
import React from 'react';
import './App.css';
const heroList = require('./data/heros.json');
const marvelHeros = heroList.filter(hero => hero.publisher === "Marvel Comics");
const dcHeros = heroList.filter(hero => hero.publisher === "DC Comics");


class App extends React.Component {
render() {
    return(
    <div className = "App" >

    </div>
  );
}

}

export default App;
