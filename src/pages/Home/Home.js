import './Home.scss';
import Dropdown from '../../components/Dropdown/Dropdown.js'


function Home(props) {
    let { appState, handleRadioClick, handleChange, handleClick } = props;
    let heroData = appState.heroData;
    let opponentData = appState.opponentData;
    console.log("appstate", appState, heroData);

    return (
        <div className="selection" >
            <div className='selection__left'>
                <div className='selection__card'>
                    <img className='selection__card-image' alt='charecter' src={heroData.image} />
                    <h3>{heroData.name}</h3>
                    <ul className='selection__card-list'>
                        <li className='selection__card-item'>intelligence: {heroData.powerstats.intelligence}</li>
                        <li className='selection__card-item'>strength: {heroData.powerstats.strength}</li>
                        <li className='selection__card-item'>speed: {heroData.powerstats.speed}</li>
                        <li className='selection__card-item'>durability: {heroData.powerstats.durability}</li>
                        <li className='selection__card-item'>power: {heroData.powerstats.power}</li>
                        <li className='selection__card-item'>combat: {heroData.powerstats.combat}</li>
                    </ul>
                </div>
            </div>
            <div className='selection__middle'>
                <h1 className='selection__title'>Choose {appState.choosingOpponent ? 'Opponent' : 'Hero'}</h1>
                {!appState.choosingOpponent &&
                    <form>
                        <label>
                            <input onClick={handleRadioClick} type="radio" name="universe" value="marvel" defaultChecked className='selection__radio-button' />
                            Marvel
                        </label>
                        <label>
                            <input onClick={handleRadioClick} type="radio" name="universe" value="DC" className='selection__radio-button' />
                            DC
                        </label>
                    </form>
                }
                {!appState.choosingOpponent && <Dropdown list={appState.universe} hero={appState.heroName} handleChange={handleChange} />}
                {appState.choosingOpponent && <Dropdown list={appState.universe} opponent={appState.OpponentName} handleChange={handleChange} />}

                <button onClick={handleClick} className='selection__button action-button'>Next</button>
            </div>
            {appState.choosingOpponent &&
                <div className='selection__right'>
                    <div className='selection__card'>
                        <img className='selection__card-image' alt='charecter' src={opponentData.image} />
                        <h3>{opponentData.name}</h3>
                        <ul className='selection__card-list'>
                            <li className='selection__card-item'>intelligence: {opponentData.powerstats.intelligence}</li>
                            <li className='selection__card-item'>strength: {opponentData.powerstats.strength}</li>
                            <li className='selection__card-item'>speed: {opponentData.powerstats.speed}</li>
                            <li className='selection__card-item'>durability: {opponentData.powerstats.durability}</li>
                            <li className='selection__card-item'>power: {opponentData.powerstats.power}</li>
                            <li className='selection__card-item'>combat: {opponentData.powerstats.combat}</li>
                        </ul>
                    </div>
                </div>
            }

        </div>
    )
}


export default Home;