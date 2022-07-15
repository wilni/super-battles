import './Dropdown.scss';

function Dropdown(props){
    let {list, hero, handleChange} = props;
    return (
        <select className='dropdown' defaultValue={hero} onChange={handleChange}>
            {list.map(hero => {
               return <option  key={hero.id} value={hero.name}>{hero.name}</option>
            })}
        </select>
    )
}



export default Dropdown;