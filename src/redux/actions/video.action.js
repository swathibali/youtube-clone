import request from "../../api"
import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../actionTypes"

export const getPopularVideos = () => async (dispatch, getState) => {
    try {
       dispatch({
          type: HOME_VIDEOS_REQUEST,
       })
       const { data } = await request('/videos', {
          params: {
             part: 'snippet,contentDetails,statistics',
             chart: 'mostPopular',
             regionCode: 'IN',
             maxResults: 20,
             pageToken: getState().homeVideos.nextPageToken,
          },
       })
       console.log('data',data);
       dispatch({
          type: HOME_VIDEOS_SUCCESS,
          payload: {
             videos: data.items,
             nextPageToken: data.nextPageToken,
             category: 'All',
          },
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: HOME_VIDEOS_FAIL,
          payload: error.message,
       })
    }
 }