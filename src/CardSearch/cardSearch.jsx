import { useState, useEffect, useContext } from 'react'
import "./cardSearch.css"
import { Link } from "react-router-dom";
import detailsContext from '../assets/detailsContext';

export default function cardSearch(){
    const [query, setQuery] = useState(window.location.pathname.slice(8))
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const {setDetails} = useContext(detailsContext)
    var cardData = [];
    
    

    useEffect(() => {
        setLoading(true)
        fetch('https://api.scryfall.com/cards/search?q=' + query)
        .then(res => {
            if(res.status == 404){
                error()
            }else(
                res = res.json()
            )
            return res
        })
        .then(fetchData => {setData(fetchData) || setLoading(false)})
        
        
    }, [query])


    if(data){
        if(data.data){
            for(let i of data.data){
                // console.log(i.image_uris)
                if(i.image_uris){
                    // console.log(i.image_uris.normal)
                    cardData.push({
                    name: i.name,
                    mana_cost: i.mana_cost,
                    type: i.type_line,
                    price: i.prices.usd,
                    abilities: i.oracle_text,
                    flavor_text: i.flavor_text,
                    power_toughness: `${i.power}/${i.toughness}`,
                    set_name: i.set_name,
                    rarity: i.rarity,
                    id: i.id,
                    img: i.image_uris.small,
                    imgL: i.image_uris.normal,
                    altPrints: i.prints_search_uri
                    })
                }
            }
        }
    }

    
    

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    return(
        <>
            <h2>Card Search Page</h2>
            <p>You searched for {query}:</p>
            <div className="card-container">
                {cardData.map((item) => (
                    <div className='card-image' key={item.id}>
                        <Link to={`/cardInfo/${item.id}`}>
                            <button>
                                <img  src={item.img} id="smallPicture" onMouseOver={(e) => {e.currentTarget.src=item.imgL; e.currentTarget.id="bigPicture" }} onMouseLeave={(e) => {e.currentTarget.src=item.img; e.currentTarget.id="smallPicture" }} onClick = {() => setDetails(item)}/>
                            </button>
                        </Link>
                    </div>              
            ))}
            </div>
            {cardData.length == 0 ? <h1>Your Search Did not match any results</h1>: <></>}
        </>
    )
}