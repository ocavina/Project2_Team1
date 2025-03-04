import detailsContext from '../assets/detailsContext';
import { useState, useContext, useEffect } from 'react';
import collectionContext from '../assets/collectionContext';
import "./cardInfo.css";

export default function cardInfo(){
    const {details} = useContext(detailsContext);
    const {collection, setCollection} = useContext(collectionContext)
    const [printsData, setPrintsData] = useState()
    const [loading, setLoading] = useState(false)
    var printImgArry = [];
    
    const addToCollection = () => {
        setCollection([...collection, details]);
    }
    
    console.log(details.altPrints)
    

    useEffect(() => {
        setLoading(true)
        fetch(details.altPrints)
        .then(res => {
            if(res.status == 404){
                error()
            }else(
                res = res.json()
            )
            return res
        })
        .then(fetchData => {setPrintsData(fetchData) || setLoading(false)})
        
        
    }, [])

    
    if(printsData){
        for(let i of printsData.data){
            printImgArry.push(i.image_uris.normal)
        }
    }

    return(
            <div className='cardInfo-container'>
                <div className="card-image">
                    <img src={details.img} id="smallPicture" />
                </div>

                <div className="card-text">
                    <h2 className = "name"> {details.name}</h2>
                    {details.price !==null && <p className = "price">Price: ${details.price} USD</p>}
                    <p className = "mana_cost">Mana Cost: {details.mana_cost}</p>
                    <p className = "type">Type: {details.type}</p>
                    {details.abilities !==undefined && <p className = "abilities">Abilities: {details.abilities}</p>}
                    <p className = "flavor_text">{details.flavor_text}</p>
                    <p className = "power_toughness">Power/Toughness: {details.power_toughness}</p>
                    <p className = "set_name">Set Name: {details.set_name}</p>
                    <p className = "rarity">Rarity: {details.rarity.charAt(0).toUpperCase(details.rarity)+ details.rarity.slice(1)}</p>
                    {printImgArry.map((item) => (
                        <div className='card-image' key={item.id}>  
                        <img  src={item} />           
                        </div>
                        ))}
                </div>
                <button onClick={addToCollection}>Favorite</button>
            </div>
    );
}