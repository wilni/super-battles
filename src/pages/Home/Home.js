import './Home.scss';
import { Link } from 'react-router-dom'
import Dropdown from '../../components/Dropdown/Dropdown.js'


function Home(props) {
    let { appState, handleRadioClick, handleChange, handleClick, handleSubmit } = props;
    let heroData = appState.heroData;
    let opponentData = appState.opponentData;
    console.log("appstate", appState, heroData);

    return (
        <div className="selection" >
            <div className='selection__left'>
                <div className='selection__card'>
                    <img className='selection__card-image' alt='charecter' src={heroData.image} />
                    <h3>{heroData.name}</h3>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>Intelligence:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={heroData.powerstats.intelligence}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>strength:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={heroData.powerstats.strength}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>speed:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={heroData.powerstats.speed}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>durability:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={heroData.powerstats.durability}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>power:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={heroData.powerstats.power}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                    <p className='selection__card-item'>combat:</p>
                    <progress id="file" className='selection__card-item-progress' max="100" value={heroData.powerstats.combat}> </progress>
                    </div>

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

                <button onClick={handleClick} className='selection__button action-button'>{appState.choosingOpponent ? "Back" : "Next"}</button>
                {appState.choosingOpponent && <Link to={'/battle'}><button onClick={handleSubmit} className='selection__button action-button'>FIGHT!</button></Link>}
            </div>
            {appState.choosingOpponent &&
                <div className='selection__right'>
                    <div className='selection__card'>
                        <img className='selection__card-image' alt='charecter' src={opponentData.image} />
                        <h3>{opponentData.name}</h3>
                        <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>Intelligence:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={opponentData.powerstats.intelligence}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>strength:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={opponentData.powerstats.strength}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>speed:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={opponentData.powerstats.speed}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>durability:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={opponentData.powerstats.durability}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                        <p className='selection__card-item'>power:</p>
                        <progress id="file" className='selection__card-item-progress' max="100" value={opponentData.powerstats.power}> </progress>
                    </div>
                    <div className='selection__card-item-holder'>
                    <p className='selection__card-item'>combat:</p>
                    <progress id="file" className='selection__card-item-progress' max="100" value={opponentData.powerstats.combat}> </progress>
                    </div>
                    </div>
                </div>
            }

        </div>
    )
}


export default Home;