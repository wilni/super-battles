import './Home.scss';
import Dropdown from '../../components/Dropdown/Dropdown.js'


function Home(props) {
    let {appState, handleClick, handleChange, showHero} = props;
    console.log("appstate", appState);

    return (
        <div className="selection" >
            <div className='selection__left'>

            </div>
            <div className='selection__middle'>
            <h1 className='selection__title'>Choose hero</h1>
            <form>
                <label>
                    <input onClick={handleClick} type="radio" name="universe" value="marvel" defaultChecked className='selection__radio-button' />
                    Marvel
                </label>
                <label>
                    <input onClick={handleClick} type="radio" name="universe" value="DC" className='selection__radio-button' />
                    DC
                </label>
            </form>
                <Dropdown list={appState.universe}  hero={appState.heroName} handleChange={handleChange} />
                <button onClick={props.showHero} className='selection__button action-button'>Next</button>
            </div>
            <div className='selection__right'>

            </div>
        </div>
    )
}


export default Home;