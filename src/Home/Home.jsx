import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home(){
    const [search, setSearch] = useState("Search");
    const Navigate = useNavigate()

    return(
        <>
            <input type="text"  placeholder={search} onInput={e => setSearch(e.target.value)}/>
            {/* <h1>{search}</h1> */}
            <button onClick={() => Navigate('/search/' + search,)}> Search </button>
        </>
    )
}