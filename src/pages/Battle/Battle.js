import './Battle.scss'
import React from 'react'


class Battle extends React.Component {
  //replace with props
  hero = {
    "name": "Captain Planet",
    "img": "https://www.superherodb.com/pictures2/portraits/10/100/1285.jpg",

    "intelligence": "50",
    "strength": "88",
    "speed": "75",
    "durability": "80",
    "power": "100",
    "combat": "60"
  }

  enemy = {
    "name": "Magneto",
    "img": "https://www.superherodb.com/pictures2/portraits/10/100/12.jpg",
    "intelligence": "88",
    "strength": "80",
    "speed": "27",
    "durability": "84",
    "power": "91",
    "combat": "80"
  }

  state = {
    mode: 'attack',
    phase: 'initialize',
    hero: {
      health: 100,
      energy: 10,
      moves: 6
    },
    enemy: {
      health: 100
    },
    cards: [],

    //{color:xx, strength:xx, index: xx}
    chosenCard: null
  }

  handleActionClick = () => {
    console.log('there')

    
    let newHealth = this.state.enemy.health - this.state.chosenCard.strength;
    let newEnergy = this.state.hero.energy - this.state.chosenCard.strength;
    let newMoves = this.state.moves - 1;
    if (this.state.chosenCard.color === 'blue') {
      newEnergy += 10;
    }
    if (this.state.chosenCard.color === 'green') {
      
    }
    this.setState({ ...this.state, enemy: { ...this.state.enemy, health: newHealth } })

  }

  handleCardClick = (e) => {
    const card = e.target;
    const color = card.dataset.color;
    const index = card.dataset.index;
    const strength = card.dataset.strength
    console.log(`${color} ${index} ${strength}`);
    this.setState({ ...this.state, chosenCard: { color: color, strength: strength, index: index } })
  }

  drawInitialCards = () => {
    const cardHolder = [];
    for (let i = 0; i < 6; i++) {
      const colorChoices = { 0: 'red', 1: 'blue', 2: 'green' }
      const choice = Math.floor(Math.random() * 3);
      const color = colorChoices[choice]
      const modifierVal = ' card--' + color;

      const strengthVal = Math.floor(Math.random() * 10) + 1;

      const cardComponent = <button
        className={'card' + modifierVal}
        data-color={color}
        data-index={i}
        data-strength={strengthVal}
        onClick={this.handleCardClick}
        key={i}

      >
        {strengthVal}
      </button>
      cardHolder.push(cardComponent);
    }

    this.setState({ ...this.state, cards: cardHolder })
  }

  componentDidMount() {
    this.drawInitialCards();
  }

  render() {
    let effect =''
    let crit = ''
    if (this.state.chosenCard){
      switch (this.state.chosenCard.color) {
        case 'red':
          effect = 'Deal 1.5 times the damage'
          break;
        case 'blue':
          effect = 'Recover 10 energy after using'
          break;
        case 'green':
          effect = 'Gain another move'
        break;
      }
    }


    return (
      <div className="battlepage">

        <div className='battle-row'>
          <div className='char-container char-container--hero' >
            <h2 className="char-title char-title--hero">{this.hero.name}</h2>
            <img className="char-img char-img--hero" src={this.hero.img} />
            <div className='char-vitals'>
              <p className='char-vitals__stat char-vitals__stat--health'>Health: {this.state.hero.health}</p>
              <p className='char-vitals__stat char-vitals__stat--energy'>Energy: {this.state.hero.energy}</p>
              <p className='char-vitals__stat char-vitals__stat--moves'>Moves: {this.state.hero.moves}</p>
            </div>
          </div>

          <div className='action-panel'>
            <div className='action-desc'>
              {this.state.chosenCard && <>
                <p className='action-desc__info-bullet'>DEALS {this.state.chosenCard.strength} {this.state.mode} AND COSTS {this.state.chosenCard.strength} ENERGY</p>
                
                <p className='action-desc__info-bullet'>Effect: {effect}</p>
                </>
              }
            </div>
            <button className='action-button' onClick={this.handleActionClick}>ATTACK!</button>

          </div>


          <div className='char-container char-container--enemy' >
            <h2 className="char-title char-title--enemy">{this.enemy.name}</h2>
            <img className="char-img char-img--enemy" src={this.enemy.img} />
            <div className='char-vitals'>
              <p className='char-vitals__stat char-vitals__stat--health'>Health: {this.state.enemy.health}</p>
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