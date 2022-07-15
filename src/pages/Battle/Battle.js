import './Battle.scss'
import React from 'react'

import { uid } from 'uid'


class Battle extends React.Component {
  //replace with props
  // hero = {
  //   "name": "Captain Planet",
  //   "img": "https://www.superherodb.com/pictures2/portraits/10/100/1285.jpg",

  //   "intelligence": "50",
  //   "strength": "88",
  //   "speed": "75",
  //   "durability": "80",
  //   "power": "100",
  //   "combat": "60"
  // }

  // enemy = {
  //   "name": "Magneto",
  //   "img": "https://www.superherodb.com/pictures2/portraits/10/100/12.jpg",
  //   "intelligence": "88",
  //   "strength": "80",
  //   "speed": "27",
  //   "durability": "84",
  //   "power": "91",
  //   "combat": "80"
  // }

  colorChoices = ['red', 'blue', 'green']
  initialEnemyDmgChoice = this.colorChoices[Math.floor(Math.random() * 3)];

  state = {
    mode: 'attack',
    phase: 'initialize',
    winner: '',
    hero: {
      health: 100,
      energy: 10,
      moves: 6,
      img: this.props.appState.heroData.image,
      name: this.props.appState.heroData.name,
      def: 0
    },
    enemy: {
      health: 100,
      nextDmg: 20,
      nextType: this.initialEnemyDmgChoice,
      img: this.props.appState.opponentData.image,
      name: this.props.appState.opponentData.name
    },
    cards: [],

    //{color:xx, strength:xx, index: xx}
    chosenCard: null
  }

  componentDidMount() {
    this.drawInitialCards();
  }

  componentDidUpdate(prevPops, prevState) {
    //Enemy logic
    if (this.state.winner) return;
    if (this.state.hero.health <= 0){
      this.setState({
        ...this.state,
        winner: this.state.enemy.name
      })
    }
    else if (this.state.enemy.health <= 0){
      this.setState({
        ...this.state,
        winner: this.state.hero.name
      })
    }
    else if (this.state.mode === 'defend') {
      this.startNewRound(prevState.enemy.nextDmg);
    }
  }

  startNewRound(heroDmg = 0) {
    const newMode = this.state.mode === 'attack' ? 'defend' : 'attack';

    const newDefense = newMode === 'attack' ? 0 : this.state.hero.def
    let dmg = heroDmg - this.state.hero.def;
    if (dmg < 0) dmg = 0;
    const newHero = {
      ...this.state.hero,
      health: this.state.hero.health - dmg,
      energy: 10,
      moves: 6,
      def: newDefense
    }

    const nextColor = this.colorChoices[Math.floor(Math.random() * 3)];

    const newEnemy = {
      ...this.state.enemy,
      health: this.state.enemy.health,
      nextDmg: Math.floor(Math.random() * 50) + 1,
      nextType: nextColor
    }

    let cardHolder = [...this.state.cards];
    if (newMode === 'attack') {
      cardHolder = []
      for (let i = 0; i < 6; i++) {
        cardHolder.push(this.drawRandomCard(uid()));
      }
    }

    this.setState({ ...this.state, hero: newHero, enemy: newEnemy, mode: newMode, cards: cardHolder })
  }

  handleActionClick = (e) => {
    const ele = e.target;

    if (ele.dataset.info === 'end') {
      this.startNewRound();
      return;
    }
    if (!this.state.chosenCard) {
      return
    }
    if (this.state.hero.moves === 0) {
      return;
    }
    else if (this.state.hero.energy < this.state.chosenCard.strength) {
      return;
    }

    let newEnemyHealth = this.state.enemy.health;
    let newHeroDef = this.state.hero.def;

    if (ele.dataset.info === 'defend') {
      let strength = this.state.chosenCard.strength;
      if (this.state.chosenCard.color === 'red') {
        strength = Math.ceil(strength * 1.5);
      }
      newHeroDef += parseInt(strength);
    }
    if (ele.dataset.info === 'attack') {
      let strength = this.state.chosenCard.strength;
      if (this.state.chosenCard.color === 'red') {
        strength = Math.ceil(strength * 1.5);
      }
      newEnemyHealth = this.state.enemy.health - strength;
    }

    let newEnergy = this.state.hero.energy - this.state.chosenCard.strength;
    let newMoves = this.state.hero.moves - 1;

    if (this.state.chosenCard.color === 'blue') {
      newEnergy += 10;
    }

    let newCards = [...this.state.cards];

    //remove used up card
    let targetIndex = -1;
    let targetId = this.state.chosenCard.index;
    for (let i = 0; i < newCards.length; i++) {
      let card = newCards[i];
      if (card.key == targetId) {
        targetIndex = i;
      }
    }

    if (this.state.chosenCard.color === 'green') {
      for (let i = 0; i < 3; i++) {
        newCards.push(this.drawRandomCard(uid()))
      }
    }

    if (targetIndex === -1) console.error('couldnt find card to remove')

    newCards.splice(targetIndex, 1);

    this.setState({
      ...this.state,
      hero: { ...this.state.hero, energy: newEnergy, moves: newMoves, def: newHeroDef },
      enemy: { ...this.state.enemy, health: newEnemyHealth },
      cards: newCards, chosenCard: null
    })

  }

  handleCardClick = (e) => {
    const card = e.target;
    const color = card.dataset.color;
    const index = card.dataset.index;
    const strength = card.dataset.strength

    this.setState({
      ...this.state,
      chosenCard: { color: color, strength: strength, index: index }
    })
  }

  drawRandomCard = (keyVal) => {
    const colorChoices = { 0: 'red', 1: 'blue', 2: 'green' }
    const choice = Math.floor(Math.random() * 3);
    const color = colorChoices[choice]
    const modifierVal = ' card--' + color;

    const strengthVal = Math.floor(Math.random() * 10) + 1;

    const cardComponent = <button
      className={'card' + modifierVal}
      data-color={color}
      data-index={keyVal}
      data-strength={strengthVal}
      onClick={this.handleCardClick}
      key={keyVal}
      id={keyVal}
    >
      {strengthVal}
    </button>
    return cardComponent;
  }

  drawInitialCards = () => {
    const cardHolder = [];
    for (let i = 0; i < 6; i++) {
      cardHolder.push(this.drawRandomCard(uid()));
    }

    this.setState({ ...this.state, cards: cardHolder })
  }

  render() {
    let effect = ''
    let crit = ''
    if (this.state.chosenCard) {
      switch (this.state.chosenCard.color) {
        case 'red':
          effect = 'Deal 1.5 times the damage'
          break;
        case 'blue':
          effect = 'Recover 10 energy after using'
          break;
        case 'green':
          effect = 'Gain 2 cards'
          break;
      }
    }

    if (this.state.winner) {
      return(
      <div className='battlepage'>
        <h1>{this.state.winner} WINS!!!!</h1>
      </div>
      )
    }
    else return (
      <div className="battlepage">

        <div className='battle-row'>
          <div className='char-container char-container--hero' >
            <h2 className="char-title char-title--hero">{this.state.hero.name}</h2>
            <img className="char-img char-img--hero" src={this.state.hero.img} />
            <div className='char-vitals'>
              <p className='char-vitals__stat char-vitals__stat--health'>Health: {this.state.hero.health}</p>
              <p className='char-vitals__stat char-vitals__stat--energy'>Energy: {this.state.hero.energy}</p>
              <p className='char-vitals__stat char-vitals__stat--moves'>Moves: {this.state.hero.moves}</p>
              <p className='char-vitals__stat'>DEFENSE: {this.state.hero.def}</p>
            </div>
          </div>

          <div className={'action-panel' + (this.state.chosenCard !== null ? (' action-panel--' + this.state.chosenCard.color) : '')}>
            <div className='action-desc'>
              {this.state.chosenCard && <>
                <p className='action-desc__info-bullet'>DEALS {this.state.chosenCard.strength} ATTACK/DEF AND COSTS {this.state.chosenCard.strength} ENERGY</p>

                <p className='action-desc__info-bullet'>Effect: {effect}</p>
              </>
              }
            </div>
            <button className='action-button' onClick={this.handleActionClick} data-info='attack'>ATTACK!</button>
            <button className='action-button' onClick={this.handleActionClick} data-info='defend'>DEFEND!</button>
            <button className='action-button' onClick={this.handleActionClick} data-info='end'>End Turn</button>

          </div>


          <div className='char-container char-container--enemy' >
            <h2 className="char-title char-title--enemy">{this.state.enemy.name}</h2>
            <img className="char-img char-img--enemy" src={this.state.enemy.img} />
            <div className='char-vitals'>
              <p className='char-vitals__stat char-vitals__stat--health'>Health: {this.state.enemy.health}
              </p>
              <p className='char-vitals__stat'>Next Attack: {this.state.enemy.nextDmg}
              </p>
            </div>
          </div>
        </div>

        <div className='cardrow'>
          {this.state.cards}
        </div>

      </div>
    )
  }
}


export default Battle;