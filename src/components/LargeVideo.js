import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'


export default function LargeVideo()
{
    const {videoId} = useParams()

    return(
        <div className='large-video'>
            <ReactPlayer
            width={'100%'}
            height={'100vh'}
            playing={true}
            controls
            url= {`https://www.youtube.com/watch?v=${videoId}`}
            />
        </div>
        
    )
}