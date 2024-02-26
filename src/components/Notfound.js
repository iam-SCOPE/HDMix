import './Notfound.css'
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Notfound()
    {
        useEffect(() => {
            document.title = '404 Not Found'
        },[])

        return(
            <div className='notfound'>
                <h1>Error 404 The requested page is not found!</h1>
                <h2>Back to <Link to='/' className='notfound-link'>Home</Link></h2>
            </div>
        )
    }