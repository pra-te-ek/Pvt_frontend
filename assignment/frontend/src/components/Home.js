
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function Home (){
    // const location=useLocation()
    const navigate=useNavigate()
    return (
        useEffect(() => {
            // Call navigate inside the effect callback
            navigate('/form');
        }))
        
        // <div className="homepage">

        //     <h1>Hello {location.state.id} and welcome to the home</h1>

        // </div>
}

export default Home