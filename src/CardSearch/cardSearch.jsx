import { useState, useEffect } from 'react'

export default function cardSearch(){
    const [query, setQuery] = useState(window.location.pathname.slice(8))
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    var cardData = [];
    
    

    useEffect(() => {
        setLoading(true)
        fetch('https://api.scryfall.com/cards/search?q=' + query)
        .then(res => res.json())
        .then(fetchData => {cardData.push(fetchData); setData(cardData)})
        setLoading(false)
        setData(cardData)
    }, [query])

    useEffect(() => {
        console.log(cardData)
    }, [setData])

    
    

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    return(
        <>
            <h1>Card Search Page</h1>
            <h1>You searched for {query}</h1>
            {/* {data.map((item) => (
                <img key={item.id} src={item.image_uris.normal} />
            ))} */}
        </>
    )
}