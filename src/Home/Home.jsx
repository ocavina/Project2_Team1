import { createElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";
import {Link} from 'react-router-dom';


export default function Home(){
    const [search, setSearch] = useState("");
    const Navigate = useNavigate();
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [toughness, setToughness] = useState(0);
    const [power, setPower] = useState(0);
    const [manaCost, setManaCost] = useState(0)
    const [filterURL, setFilterURL] = useState("");
    const [count, setCount] = useState(0);
    const [cardData, setCardData] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch('https://api.scryfall.com/cards/random?format=image')
        .then(res => {
            if(res.status == 404){
                error()
            }
            return res
        })
        .then(fetchData => {setData(fetchData) || counter()})
        
        
    }, [count])


    function counter(){
        var temp = count
        temp ++
        console.log(temp)
        if(temp !== 10){
            setCount(temp)
            // https://cards.scryfall.io/large/front/c/a/cac912bb-f18a-4501-a5c0-aed8cb0a9e43.jpg?1561758087
            setCardData([...cardData, {url: data.url, id: data.url.slice(42, 78)}])
        }else{
            setLoading(false)
        }
    }


    var filter = {
        manaCost: manaCost,
        manaColor: {red: false, white: false, blue: false, black: false, green: false},
        power: power,
        toughness: toughness
    }

    const enterKeySearch = (event) => {
        if (event.key === 'Enter') {
            Navigate('/search/' + search);
        }
    }

    function handleChange(color){
        filter.manaColor[`${color}`] = !filter.manaColor[`${color}`]
    }



    if(loading){
        return (
                <>  
                    <h1 className='loader'>Loading...</h1>
                </>
        )
    }

    function filters(){
        console.log(filter)
        var url = []
        var power = document.getElementById("power")
        
        if(document.getElementById("manaBlack").checked){
            url.push("c%3Ablack")
        }
        if(document.getElementById("manaWhite").checked){
            url.push("c%3Awhite")
        }
        if(document.getElementById("manaBlue").checked){
            url.push("c%3Ablue")
        }
        if(document.getElementById("manaGreen").checked){
            url.push("c%3Agreen")
        }
        if(document.getElementById("manaRed").checked){
            url.push("c%3Ared")
        }
        if(manaCost != 0 && manaCost >= url.length){
            if(manaCost == 9){
                url.push("cmc>" + manaCost)
            }else(
                url.push("cmc=" + manaCost)
            )
        }
        if(toughness != 0){
            url.push("tou%3D" + toughness)
        }
        if(power.value != 0){
            url.push("pow%3D" + power.value)
        }
        url = url.join("+")
        
        if(url.length > 0) {
            Navigate('/search/' + url ) 
        }
        
    }

    return(  
        <>
              <Link to = {`/collection`}><button>My Collection</button></Link>
        {/* search bar + search button */}
        <div className="search-section">
                <input 
                    type="text" 
                    spellCheck= "true"
                    placeholder={search} 
                    onInput={e => setSearch(e.target.value)} 
                    onKeyDown={enterKeySearch} 
                />
                <button onClick={() => {if(search.length > 0){Navigate('/search/' + search)}} }> Search </button>
        </div>
                {/* click to show filter options */}
                <input type="checkbox" id="check" hidden="true"/>
                <label htmlFor="check" class="checkbtn"><h2>Filter</h2></label>
                <div className='filter w3-animate-right'>
                    {/* mana */}
                    <div className='mana'>
                        <div>
                            <label>Mana Cost</label>
                        </div>
                        <div className='manaCost'>
                            <label>{filter.manaCost}</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="9" 
                                step="1"
                                value={manaCost}
                                onInput={e => setManaCost(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* power */}
                    <div className='power'>
                        <div>
                            <label>Power</label>
                        </div>
                        <div>
                            <label>{filter.power}</label>
                            <input 
                                id = "power"
                                type="range" 
                                defaultValue={0}
                                min="0" max="9" 
                                step="1" 
                                onInput={e => setPower(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* toughness */}
                    <div className='toughness'>
                        <div>
                            <label>Toughness</label>
                        </div>
                        <div>
                            <label>{filter.toughness}</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="9" 
                                step="1"
                                id = "toughness"
                                value={toughness}
                                onInput={e => setToughness(e.target.value)} 
                            />
                        </div>
                    </div>
                    {/* color */}
                    <div className='color'>
                        <div>
                            <label>Color Type</label>
                        </div>
                        <div className='colorType'>
                            <label htmlFor="manaWhite">White</label>
                            <input 
                                type="checkbox" 
                                id="manaWhite"  
                            />
                            <label htmlFor="manaRed">Red</label>
                            <input 
                                type="checkbox" 
                                id="manaRed" 
                                onChange={handleChange("red")} 
                            />
                            <label htmlFor="manaBlue">Blue</label>
                            <input 
                                type="checkbox" 
                                id="manaBlue" 
                                onChange={handleChange("blue")} 
                            />
                            <label htmlFor="manaBlack">Black</label>
                            <input 
                                type="checkbox" 
                                id="manaBlack" 
                                onChange={handleChange("black")} 
                            />
                            <label htmlFor="manaGreen">Green</label>
                            <input 
                                type="checkbox" 
                                id="manaGreen" 
                                onChange={handleChange("green")} 
                            />
                        </div>
                    </div>
                    {/* submit button */}
                    <div className='submit'>
                        <button onClick={() => filters()}>Submit</button>
                    </div>
                </div>

                <div id="cardCar" className='cardCar'>
                    <div className='carousel'>
                        <div className='figure'>
                            {cardData.map((item) => (
                                <span><img id="smallPicture" src={item.url} onClick={() => Navigate("/cardInfo/" + item.id) } /> </span>    
                                // onClick={() => Navigate("/cardInfo/:id", item.id) }       
                            ))}
                        </div>
                    </div>
                    <div aria-hidden="true" className='carousel'>
                        <div className='figure'>
                            {cardData.map((item) => (
                                <span><img id="smallPicture" src={item.url} onClick={() => Navigate("/cardInfo/" + item.id) } /> </span>           
                            ))}
                        </div>
                    </div>
                    <div aria-hidden="true" className='carousel'>
                        <div className='figure'>
                            {cardData.map((item) => (
                                <span><img id="smallPicture" src={item.url} onClick={() => Navigate("/cardInfo/" + item.id) } /> </span>           
                            ))}
                        </div>
                    </div>
                </div>



            
        </>
        
    )
} 