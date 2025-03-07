import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import detailsContext from '../assets/detailsContext';
import collectionContext from '../assets/collectionContext';
import { useNavigate } from 'react-router-dom';
import "./collection.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import cardSearch from '../CardSearch/cardSearch';



export default function collection(){
    const {collection, setCollection} = useContext(collectionContext);
    const {setDetails} = useContext(detailsContext);
    const navigate = useNavigate();
    const [showingRemove, setShowingRemove] = useState(null)
    const [showRemoveAllWarning, setShowRemoveAllWarning] = useState(false)
    const [collectionCost, setCollectionCost] = useState()
    const [done, setDone] = useState(false);
    var cPrice = 0.00;


    const [lStorage, savelStorage] = useLocalStorage('lstorage', []);
    
    useEffect(() => {
        setCollection(lStorage)
    }, [])

    useEffect(() => {
        savelStorage(collection)
    }, [collection]);

    console.log(collection)


    

    const mouseOverCard = () => {
        setShowingRemove(true);
    }

    const mouseAwayFromCard = () => {
        setShowingRemove(false);
    }

    
    const backButton = () => {
        navigate(-1);
    }

    for(let i of collection){
      if(i.price !== undefined && !isNaN(parseFloat(i.price))){
        cPrice = parseFloat(cPrice) + (parseFloat(i.price))
      }
    }

    console.log(typeof NaN)

    useEffect(() =>{
    const formattedPrice = cPrice
    if (cPrice.toString().includes('.')) {
        const [wholeNum, decimalNum] = cPrice.toString().split('.')

    if (decimalNum.length > 2) {
      setCollectionCost(Math.floor(cPrice * 100) / 100)
        }
    } 
    setCollectionCost(formattedPrice.toFixed(2))
    }, [cPrice])

    
    const removeAllFromCollection = () => {
        setShowRemoveAllWarning(true);
        // const updatedCollection = [];
        // setCollection(updatedCollection);
    }
    
    const yesRemoveAll = () => {
        const updatedCollection = [];
        setCollection(updatedCollection);
        setShowRemoveAllWarning(false);
        clearLocalStorage()
    }

    const noDontRemoveAll = () => {
        setShowRemoveAllWarning(false);
    }
    
    const removeFromCollection = (indexToRemove) => {
        const updatedCollection = [...collection];
        updatedCollection.splice(indexToRemove, 1);        
        setCollection(updatedCollection);
    }

    if (collection.length === 0) {
        return(
            <>
                <h2>Your Collection is Empty</h2>
                <button onClick={backButton}>Back</button>
            </>
        )
    }

    return(
      <div>
        <h2>Collection Page</h2>
        <p>Total Collection Value: {isNaN(collectionCost) ? "unavailalbe" : collectionCost}</p>
        <button onClick={() => removeAllFromCollection()}>Remove All</button>
        {showRemoveAllWarning && (
        <div className = "remove-all-confirmation">Are You Sure You Want to Remove All?
            <div className = 'remove-all-buttons'>
                <button onClick = {yesRemoveAll}>Yes</button>
                <button onClick = {noDontRemoveAll}>No</button>
            </div>
        </div>)}
        <button onClick={backButton}>Back</button>
        <div className="collection-container">
            {collection.map((item, index) => (
            <div className="favorite-card" key={item.id} onMouseOver = {() => setShowingRemove(index)} onMouseOut = {() => setShowingRemove(null)}>
                <Link to={`/cardInfo/${item.id}`} onClick={() => setDetails(item)}>
                <img src={item.img} alt={item.name} />
                <p>{(item.price)}</p>
                </Link>
                {showingRemove === index && (<button onClick={() => removeFromCollection(index)}>Remove</button>
            )}
            </div> 
            ))}
        </div>
      </div>
    )
}