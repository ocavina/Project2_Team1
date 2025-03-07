import detailsContext from '../assets/detailsContext';
import { useState, useContext, useEffect } from 'react';
import collectionContext from '../assets/collectionContext';
import { useLocalStorage } from "@uidotdev/usehooks";
import "./cardInfo.css";
import { useNavigate, Link } from 'react-router-dom';


export default function cardInfo(){
    const {details} = useContext(detailsContext);
    const {collection, setCollection} = useContext(collectionContext)
    const [printsData, setPrintsData] = useState()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [mainImg, setMainImg] = useState()
    const [mainPrice, setMainPrice] = useState()
    const [mainSet, setMainSet] = useState()
    const [mainId, setMainId] = useState()
    const [flavor, setFlavor] = useState("")
    const [power, setPower] = useState()
    const [type, setType] = useState()
    const [manaCost, setManaCost] = useState()
    const [alt, setAlt] = useState()
    const [done, setDone] = useState(false)
    const navigate = useNavigate();
    const [showCardAddedMessage, setShowCardAddedMessage] = useState(false)
    var printImgArry = [];
    var printPriceArry = [];
    var cardData = [];


    const [lStorage, savelStorage] = useLocalStorage('lstorage', []);

    useEffect(() => {
        setCollection(lStorage)
    }, [])

    useEffect(() => {
        savelStorage(collection)
    }, [collection]);


    function clearLocalStorage(){
        console.log(lStorage)
        localStorage.clear('lstorage')
        console.log(lStorage, "should be empty")
    }

    
    
    function addToCollection(){
        for(let i of cardData){
            if(i.id == mainId){
                setCollection([...collection, i])
                console.log(collection)
            }
            setShowCardAddedMessage(true);
            setTimeout(() => {
                setShowCardAddedMessage(false)
            }, 3000)
        }
        ;
    }

    
    const backButton = () => {
        navigate(-1);
    }
    
    useEffect(() => {
        setLoading(true)
        fetch('https://api.scryfall.com/cards/'+ window.location.pathname.slice(10))
        .then(res => {
            if(res.status == 404){
                error()
            }else(
                res = res.json()
            )
            return res
        })
        .then(fetchData => firstcard(fetchData))
        
        
    }, [])

    function firstcard(i){
        console.log(i)
        var cardObj = {}
        if(i.image_uris){
            printImgArry.push(i.image_uris.normal)
            cardObj.img = i.image_uris.normal
            setMainImg(i.image_uris.normal)
        }
        if(i.prices){
            cardObj.price = i.prices.usd   
            setMainPrice(i.prices.usd)
        }
        if(i.set_name){
            cardObj.set = i.set_name
            setMainSet(i.set_name)
        }
        if(i.name){
            setName(i.name)
            setMainId(i.id)
            cardObj.name = i.name
            cardObj.id = i.id
        }
        if(i.flavor_text){
            cardObj.flavor_text = i.flavor_text
            setFlavor(i.flavor)
        }
        if(i.power){
            var string = i.power.toString() + " / " + i.toughness.toString()
            console.log(string)
            setPower(string)
        }
        if(i.type_line){
            setType(i.type_line)
        }
        if(i.mana_cost){
            setManaCost(i.mana_cost)
        }
        if(i.prints_search_uri){
            console.log(i.prints_search_uri)
            cardObj.altPrints = i.prints_search_uri
            setAlt(i.prints_search_uri)
        }
            
        cardData.push(cardObj)
        setDone(true)
    }


    useEffect(() => {
        setLoading(true)
        fetch(alt)
        .then(res => {
            if(res.status == 404){
                error()
            }else(
                res = res.json()
            )
            return res
        })
        .then(fetchData => {setPrintsData(fetchData) || setLoading(false)})
        
        
    }, [done])

    
    if(printsData){
        
        for(let i of printsData.data){
            var cardObj = {}
            if(i.image_uris){
                printImgArry.push(i.image_uris.normal)
                cardObj.img = i.image_uris.normal
            }
            if(i.prices){
                cardObj.price = i.prices.usd   
            }
            if(i.set_name){
                cardObj.set = i.set_name
            }
            if(i.name){
                cardObj.name = i.name
                cardObj.id = i.id
            }
            
            cardData.push(cardObj)
        }
    }

    

    
    return(
        <>
              <Link to = {`/collection`}><button>My Collection</button></Link>
            <div className='cardInfo-container'>
                <img src={mainImg} id="mainPicture" />

                <div className="card-text">
                    <h2 className = "name">{name}</h2>
                    <p className = "price">Price: {mainPrice ? "$" + mainPrice + "USD" : "No Price Data"} </p>
                    <p className = "mana_cost">Mana Cost: {manaCost}</p>
                    <p className = "type">Type: {type}</p>
                    {details.abilities !==undefined && <p className = "abilities">Abilities: {details.abilities}</p>}
                    <p className = "flavor_text">{flavor}</p>
                    <p className = "power_toughness">Power/Toughness: {power ? power : "N/A"}</p>
                    <p className = "set_name">Set Name: {mainSet}</p>
                    {/* <p className = "rarity">Rarity: {details.rarity.charAt(0).toUpperCase(details.rarity)+ details.rarity.slice(1)}</p> */}
                </div>

                <button onClick={() => addToCollection()}>Add</button>
                {showCardAddedMessage && (
                    <div className = "card-added-message">Card Added to Collection</div>)}
                <button onClick={backButton}>Back</button>

                
            </div>
            <div className="card-card">
                    {cardData.map((item) => (
                        <div className='individual-card' key={item.id}>
                            <img  src={item.img} id="smallPictures" onClick={e => {setMainImg(item.img); setMainPrice(item.price); setMainSet(item.set); setMainId(item.id)}}/>
                            <p>{cardData.price}</p>         
                        </div>
                    ))}
            </div>
        </>
    );
}