import './App.css';
import {useState, useEffect} from 'react';


function App() {
    const [showForm, setShowForm] = useState(false);
    const [showVideo, setShowVideo] = useState(<div className='video-loading'><h2>Please wait while we fetch you videos...</h2><h3>Kindly note that we fetch data from the Youtube API</h3></div>)
    const [search, setSearch] = useState('')

    useEffect(() => {
        defaultView()
    }, [])

    function displayForm()
    {
        setShowForm(!showForm);
    }

    function handleDisplayAndDefaultview(){
        if(search === '')
        {
            displayForm()
        }
        else
        {
            displayForm()
            defaultView()
        }
    }

    function handleEnterkeyPress(e)
    {
        if((e.key).toLowerCase() === 'enter')
        {
            if(search.length < 1)
            {
                e.preventDefault()
                alert('Search bar must contain what to search for')
            }
            else{
                e.preventDefault()
                apiFetch()
            }
            // e.preventDefault()
            // apiFetch()
        }
    }
    
    async function defaultView()
    {
        await fetch(process.env.REACT_APP_API_URL + '' + process.env.REACT_APP_API_KEY)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const defaultVideo = data.items.map((item) => {
                return(
                    <div className='video-container' key={item.id.videoId}>
                        <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`} className='video-anchor'>
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
                        </a>
                    </div>
                )
            })
            setShowVideo(defaultVideo)
        })
        .catch((error) => {console.error('error with your code', error)})
    }

    async function apiFetch()
    {
        await fetch(process.env.REACT_APP_API_URL + search + process.env.REACT_APP_API_KEY)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const videos = data.items.map((item) => {
                return(
                    <div className='video-container' key={item.id.videoId}>
                        <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`} className='video-anchor'>
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
                        </a>
                    </div>
                )
            })
            setShowVideo(videos)
        })
        .catch((error) => {console.error('error with code', error)})
    }

    return (
        <div className="App">
            <header className='header'>
                <div className='mobile-header'>
                    <div className='logo-container' style={{display: showForm ? 'none' : 'flex'}}>
                        <img src='https://webst-images.s3.eu-north-1.amazonaws.com/video-icon.png' alt='video icon' className='video-logo' />
                        <h1>Video</h1>
                        <button onClick={displayForm} className='form-on'><img src='https://webst-images.s3.eu-north-1.amazonaws.com/white-search-icon.png' alt='search icon' /></button>
                    </div>


                    <form action='' className='mobile-form' style={{display: window.innerWidth < 551 ? showForm ? 'flex' : 'none' : 'flex'}}>
                        <button className='form-off' onClick={(e) => {e.preventDefault(); handleDisplayAndDefaultview()}}><img src='https://webst-images.s3.eu-north-1.amazonaws.com/arrow-back.png' alt='back icon'/></button>
                        <button className='window-default-view' onClick={(e) => {e.preventDefault(); setSearch(''); defaultView()}} style={{visibility: search.length < 1 ? 'hidden' : 'visible'}}><img src='https://webst-images.s3.eu-north-1.amazonaws.com/white-close-icon.png' alt='cancel search icon'/></button>
                        <input type='text' placeholder='Search Videos' className='input' value={search} autoComplete='off' onKeyDown={handleEnterkeyPress} onChange={(e) => setSearch(e.target.value)}/>
                        <button disabled={search.length === 0} type='submit' onClick={(e) => {e.preventDefault();apiFetch()}} className='search-button'><img src='https://webst-images.s3.eu-north-1.amazonaws.com/white-search-icon.png' alt='search icon'></img></button>
                    </form>
                </div>
            </header>
            <main className='major'>
                <div className='major-section'>
                    {showVideo}
                </div>
            </main>
            <div className='ads'>Developed by Scope</div>
        </div>
    );
}

export default App;
