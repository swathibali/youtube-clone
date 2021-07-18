import axios from "axios";

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
      key: 'AIzaSyD3OCBe3EhCATZBB5cEtnCAkty2G1rC4vc' ,
   },
})
export default request