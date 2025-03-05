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
    var num = 0
    

    //fixes the mess that is the url into readable format for the user
    var searchStringer = window.location.pathname.slice(8).split("+")
    function searchString(string){
        var result = []

        
        if(string[0][1] !== "%" && string[0].slice(0,3) !== "cmc" && string[0].slice(0,3) !== "pow" && string[0].slice(0,3) !== "tou"){
            if(string[0].includes("%20")){
                return (string[0].replaceAll("%20", " "))
            }

            // while(string[0].includes("%20")){
            //     string[0].replace("%20", " ")
            // }
            
            return string
        }

        for(let i of string){
            if(i[0] == "c" && i[1] == "%"){
                result.push(i.slice(4).charAt(0).toUpperCase() + i.slice(5) + " mana")
            }
            if(i[0] == "c" && i[1] == "m"){
                if(i.includes("%3E")){
                    result.push("converted mana Cost of " + i.slice(6))
                }else(
                    result.push("Converted mana Cost of " + i.slice(4))
                )
            }
            if(i[0] == "p"){
                result.push("Power of " + i.slice(6))
            }
            if(i[0] == "t"){
                result.push("Toughness of " + i.slice(6))
            }
        }
        return result.join(", ")
    }
    searchStringer = searchString(searchStringer)
    

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


    function error(){
        return(
            <>
            </>
        )
    }
    

    if(data){
        if(data.data){
            num = data.total_cards
            for(let i of data.data){
                
                if(i.image_uris){
                    
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
            <h2>Loading...</h2>
        )
    }

    return(
        <>
              <Link to = {`/collection`}><button>My Collection</button></Link>
            <h2>Card Search Page</h2>
            <p>You searched for {searchStringer}:</p>
            <p>Showing {num} results</p>
            <div className="card-container">
                {cardData.map((item) => (
                    <div className='card-image' key={item.id}>
                        <Link to={`/cardInfo/${item.id}`}>
                            <button>
                                <img  src={item.imgL} id="smallPicture" onMouseOver={(e) => {e.currentTarget.src=item.imgL; e.currentTarget.id="bigPicture" }} onMouseLeave={(e) => {e.currentTarget.src=item.img; e.currentTarget.id="smallPicture" }} onClick = {() => setDetails(item)}/>
                            </button>
                        </Link>
                    </div>              
            ))}
            </div>
            {cardData.length == 0 ? <><h2>Your Search Did not match any results</h2> <Link to={"/"}><button>Back to search</button></Link> </>: <></>}
        </>
    )
}