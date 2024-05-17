import './App.css';
import HomePage from './components/Homepage';
import LargeVideo from './components/LargeVideo';
import Notfound from './components/Notfound'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchedVideoList from './components/SearchedVideoList';


function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route exact path='/' element={<HomePage/>} />
                    <Route exact path='/searchedvideo' element={<SearchedVideoList/>} />
                    <Route exact path='/play-video/:videoId' element={<LargeVideo/>} />
                    <Route path='*' element={<Notfound/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
