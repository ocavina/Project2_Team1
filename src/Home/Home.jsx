import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";


export default function Home(){
    const [search, setSearch] = useState("Search");
    const Navigate = useNavigate();
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [toughness, setToughness] = useState(0);
    const [power, setPower] = useState(0);
    const [manaCost, setManaCost] = useState(0)
    const [filterURL, setFilterURL] = useState("");
    const [whiteFilter, setWhiteFilter] = useState(false);


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


    useEffect(() => {
        setLoading(true)
        console.log("fetching?")
        fetch('https://api.scryfall.com/cards/random')
            .then(res => {
                if(res.status == 404){
                    
                }else(
                    res = res.json()
                )
                return res
            })
            .then(fetchData => {setData(fetchData)})
            setLoading(false)
    }, [])

    useEffect(() => {
        filter.power = document.getElementById("power").value
    }, [document.getElementById("power")])

    if(data){
        console.log(data.image_uris.normal)
    }

    if(loading){
        return <h1>Loading...</h1>
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
            url.push("mv%3D" + manaCost)
        }
        if(toughness != 0){
            url.push("Toughness" + toughness)
        }
        if(power.value != 0){
            url.push("pow%3D" + power.value)
        }
        console.log(url)
        console.log(document.getElementById("power"))
    }

    return(
        <>  
            {/* filter Nav */}
            <nav>
                <input type="checkbox" id="check"/>
                <label htmlFor="check" class="checkbtn">Filter</label>
                <div className='filter w3-animate-right'>
                    <div className='mana'>
                        <div>
                            <label>Mana Cost</label>
                        </div>
                        <div className='manaCost'>
                            <label>{filter.manaCost}+</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="9" 
                                step="1"
                                value={manaCost} 
                                onChange={(x) => console.log("manaCostRange")} 
                            />
                        </div>
                    </div>
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
                    <div className='power'>
                        <div>
                            <label>Power</label>
                        </div>
                        <div>
                            <label>{filter.power}+</label>
                            <input 
                                id = "power"
                                type="range" 
                                defaultValue={0}
                                min="0" max="9" 
                                step="1" 
                            />
                        </div>
                    </div>
                    <div className='toughness'>
                        <div>
                            <label>Toughness</label>
                        </div>
                        <div>
                            <label>{filter.toughness}+</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="9" 
                                step="1" 
                                onChange={(e) => setToughness(9)} 
                            />
                        </div>
                    </div>
                    <div className='submit'>
                        <button onClick={() => filters()}>Submit</button>
                    </div>
                </div>
            </nav>


            <div className="container">
                <input 
                    type="text" 
                    placeholder={search} 
                    onInput={e => setSearch(e.target.value)} 
                    onKeyDown={enterKeySearch} 
                />
                <button onClick={() => Navigate('/search/' + search)}> Search </button>
            </div>
        </>
        
    )
}