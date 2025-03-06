import {useContext, useEffect, useState, useLocalStorage} from 'react';
import {Link} from 'react-router-dom';
import detailsContext from '../assets/detailsContext';
import collectionContext from '../assets/collectionContext';
import { useNavigate } from 'react-router-dom';
import "./collection.css";



export default function collection(){
    const {collection, setCollection} = useContext(collectionContext);
    const {setDetails} = useContext(detailsContext);
    const navigate = useNavigate();
    const [showingRemove, setShowingRemove] = useState(null)
    const [showRemoveAllWarning, setShowRemoveAllWarning] = useState(false)
    const [collectionCost, setCollectionCost] = useState()
    const [done, setDone] = useState(false);
    // const [combinedCollection, setCombinedCollection] = useState()
    // const items = (localStorage.getItem('lcollection'))
    var cPrice = 0.00;

    

    // console.log(collection, "collection")
    

    
    // useEffect(() => {
      
    //   console.log(collection)
    //   // localStorage.setItem("lcollection", collection)
    //   if(items !== collection){
    //     setCollection([...collection, JSON.stringify(items)])
        
    //   }
    // }, []);

    // useEffect(() => {
    //   localStorage.setItem("lcollection", collection)
    // }, [collection])

    console.log(collection)

    // console.log(itemspt2)

    

    

    // for(let i of localStorage.getItem('colleciton')){
    //   console.log(i)
    // }

    

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
      if(i.price !== undefined || parseFloat(i.price) !== NaN){
        cPrice = parseFloat(cPrice) + (parseFloat(i.price))
      }
    }

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
        <p>Total Collection Value: {collectionCost}</p>
        <button onClick={() => removeAllFromCollection()}>Remove All</button>
        {showRemoveAllWarning && (
        <div className = "remove-all-confirmation"><p>Are You Sure You Want to Remove All?</p>
        <button onClick = {yesRemoveAll}>Yes</button>
        <button onClick = {noDontRemoveAll}>No</button>
        </div>)}
        <button onClick={backButton}>Back</button>
        <div className="collection-container">
            {collection.map((item, index) => (
            <div className="favorite-card" key={item} onMouseOver = {() => setShowingRemove(index)} onMouseOut = {() => setShowingRemove(null)}>
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