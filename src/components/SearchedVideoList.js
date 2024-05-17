import React, {useState, useEffect} from 'react';
import './SearchedVideoList.css';
import './Homepage.css';
import {Link} from 'react-router-dom';

export default function SearchedVideoList(){
    const [search, setSearch] = useState(localStorage.getItem('searchedVideo'));
    const [showVideo, setShowVideo] = useState('');

    useEffect(() => {
        apiFetch(localStorage.getItem('searchedVideo'));
    }, []);

    function handleEnterkeyPress(e){
        if((e.key).toLowerCase() === 'enter')
        {
            if(search.length < 1)
            {
                e.preventDefault()
                alert('Search bar must contain what to search for');
            }
            else{
                e.preventDefault();
                localStorage.setItem('searchedVideo', search);
                apiFetch(search);
            }
        }
    }

    async function apiFetch(videoName){
        await fetch(process.env.REACT_APP_API_URL + videoName + process.env.REACT_APP_API_KEY)
        .then(response => response.json())
        .then(data => {
            const videos = data.items.map((item) => {                    
                return(
                    <div className='video-container' key={item.id.videoId} >
                        <Link to={`/play-video/${item.id.videoId}`} className='video-anchor'>
                            <div className='thumbnail-container'>
                                <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className='thumbnail'/>
                            </div>
                            <div className='info-container'>
                                <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className='channel-logo'/>
                                <div className='info-container2'>
                                    <h3>{item.snippet.title}</h3>
                                    <p>{item.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            });
            setShowVideo(videos)
        })
        .catch((error) => {console.error('error with code', error)})
    }

    return(
        <div className='video-list'>
            <div className='header'>
                <form className='search-form'>
                    <input className='input' type='text' placeholder='Search Videos' value={search} onKeyDown={handleEnterkeyPress} onChange={(e) => setSearch(e.target.value)}/>
                    <button disabled={search.length === 0} className='search-button' type='submit' onClick={(e) => {e.preventDefault(); localStorage.setItem('searchedVideo', search); apiFetch(search);}}><img src='https://webst-images.s3.eu-north-1.amazonaws.com/white-search-icon.png' alt='search button'/></button>
                </form>
            </div>

            <main className='major'>
                <div className='major-section'>
                    {showVideo}
                </div>
            </main>
            <div className='ads'>Developed by Richard</div>
        </div>
    )
}