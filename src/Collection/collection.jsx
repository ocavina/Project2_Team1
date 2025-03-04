import {useContext} from 'react';
import detailsContext from '../assets/detailsContext';


export default function collection(){
    const {collection} = useContext(collectionContext);

    if (collection.length === 0) {
        return(
            <>
                <h1>You have no current favorites</h1>
            </>
        )
    }

    return(
        <>
            <h1>Collection page</h1>
            {
                <>

                </>
            }





        </>
    )
}