import './Home.scss';
import Dropdown from '../../components/Dropdown/Dropdown.js'


function Home(props) {
    let {appState, handleClick, handleChange} = props;
    console.log("appstate", appState);

    return (
        <div className="App" >
            <h1 className='selection-title'>Choose hero</h1>
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
            <div className='selection'>
                <Dropdown list={appState.universe} hero={appState.hero} handleChange={handleChange} />
            </div>
        </div>
    )
}


export default Home;