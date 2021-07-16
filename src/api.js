import axios from "axios";

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
      key: 'AIzaSyAgThrH29OiZhi_2QlA77MBiWt4hF6lUfQ' ,
   },
})
export default request