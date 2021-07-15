import './_video.scss'

import { AiFillEye } from 'react-icons/ai'

const Video = () => {
    return (
       <div className="video">
           <div className="video__top">
              <img 
                className = 'lazy-load-image-background'
                src="" 
                alt="video" 
             />
              <span className='video__top__duration'>05:43</span>
           </div>
           <div className="video__title">
               Create app in 5 minutes made by chintu chintu chintu chintu chintu
           </div>
           <div className="video__details">
               <span>
                   <AiFillEye />5m views •
               </span>
               <span>5 days ago</span>
           </div>
           <div className="video__channel">
               <img src="" alt="chanelimage" />
               <p>rainbow Hat Jr</p>
           </div>
       </div>
    )
    }
export default Video
