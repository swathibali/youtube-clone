import axios from "axios";

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
      key: 'AIzaSyDrlJgrnHBjE8YFdbtb_rh6siT4poNBjlw' ,
   },
})
export default request