import {
   CHANNEL_DETAILS_FAIL,
   CHANNEL_VIDEOS_REQUEST,
   CHANNEL_VIDEOS_SUCCESS,
   DISLIKE_FAIL,
   DISLIKE_REQUEST,
   DISLIKE_SUCCESS,
   HOME_VIDEOS_FAIL,
   HOME_VIDEOS_REQUEST,
   HOME_VIDEOS_SUCCESS,
   LIKED_VIDEOS_FAIL,
   LIKED_VIDEOS_REQUEST,
   LIKED_VIDEOS_SUCCESS,
   LIKE_FAIL,
   LIKE_REQUEST,
   LIKE_SUCCESS,
   RELATED_VIDEO_FAIL,
   RELATED_VIDEO_REQUEST,
   RELATED_VIDEO_SUCCESS,
   SEARCHED_VIDEO_FAIL,
   SEARCHED_VIDEO_REQUEST,
   SEARCHED_VIDEO_SUCCESS,
   SELECTED_VIDEO_FAIL,
   SELECTED_VIDEO_REQUEST,
   SELECTED_VIDEO_SUCCESS,
   SUBSCRIPTIONS_CHANNEL_FAIL,
   SUBSCRIPTIONS_CHANNEL_REQUEST,
   SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from '../actionType'

import request from '../../api'

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

export const getVideosByCategory = keyword => async (dispatch, getState) => {
   try {
      dispatch({
         type: HOME_VIDEOS_REQUEST,
      })
      const { data } = await request('/search', {
         params: {
            part: 'snippet',

            maxResults: 20,
            pageToken: getState().homeVideos.nextPageToken,
            q: keyword,
            type: 'video',
         },
      })

      dispatch({
         type: HOME_VIDEOS_SUCCESS,
         payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: keyword,
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

export const getVideoById = id => async (dispatch,getState) => {
   try {
      dispatch({
         type: SELECTED_VIDEO_REQUEST,
      })

      const { data } = await request('/videos', {
         params: {
            part: 'snippet,statistics',
            id: id,
         },
      })
      const rating = dispatch(getRating())
      dispatch({
         type: SELECTED_VIDEO_SUCCESS,
         payload: {...data.items[0],rating},
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: SELECTED_VIDEO_FAIL,
         payload: error.message,
      })
   }
}

export const getRating= (id) => async(dispatch,getState) =>{
   try{
      const res = await request('/videos/getRating',{
         params: {
            id:id,
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         }
      })
      const { rating } = res.data.items[0];
      return rating
   }catch(err){
      console.log(err);
   }
}
export const getRelatedVideos = id => async dispatch => {
   try {
      dispatch({
         type: RELATED_VIDEO_REQUEST,
      })

      const { data } = await request('/search', {
         params: {
            part: 'snippet',
            relatedToVideoId: id,
            maxResults: 15,
            type: 'video',
         },
      })
      dispatch({
         type: RELATED_VIDEO_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data.message)
      dispatch({
         type: RELATED_VIDEO_FAIL,
         payload: error.response.data.message,
      })
   }
}

export const getVideosBySearch = keyword => async dispatch => {
   try {
      dispatch({
         type: SEARCHED_VIDEO_REQUEST,
      })
      const { data } = await request('/search', {
         params: {
            part: 'snippet',

            maxResults: 20,
            q: keyword,
            type: 'video,channel',
         },
      })

      dispatch({
         type: SEARCHED_VIDEO_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: SEARCHED_VIDEO_FAIL,
         payload: error.message,
      })
   }
}

export const getSubscribedChannels = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_REQUEST,
      })
      const { data } = await request('/subscriptions', {
         params: {
            part: 'snippet,contentDetails',

            mine: true,
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_FAIL,
         payload: error.response.data,
      })
   }
}

export const getVideosByChannel = id => async dispatch => {
   try {
      dispatch({
         type: CHANNEL_VIDEOS_REQUEST,
      })

      // 1. get upload playlist id
      const {
         data: { items },
      } = await request('/channels', {
         params: {
            part: 'contentDetails',
            id: id,
         },
      })
      const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
      // 2. get the videos using the id
      const { data } = await request('/playlistItems', {
         params: {
            part: 'snippet,contentDetails',
            playlistId: uploadPlaylistId,
            maxResults: 50,
         },
      })

      dispatch({
         type: CHANNEL_VIDEOS_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data.message)
      dispatch({
         type: CHANNEL_DETAILS_FAIL,
         payload: error.response.data,
      })
   }
}

export const getLikedVideos = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: LIKED_VIDEOS_REQUEST,
      })
      const {
         data,
      } = await request('/videos', {
         params: {
            part: 'snippet,statistics',
            myRating:'like'
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      

      dispatch({
         type: LIKED_VIDEOS_SUCCESS,
         payload: data.items,
      })
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: LIKED_VIDEOS_FAIL,
         payload: error.response.data,
      })
   }
}

//POST https://www.googleapis.com/youtube/v3/videos/rate?id=b_bJQgZdjzo&rating=like&oauth_token={YOUR_accessTOken}

export const addLikeToVideo = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: LIKE_REQUEST,
      })
      await request.post('/videos/rate',{
         params:{
            id,
            rating:'like'
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      

      dispatch({
         type: LIKE_SUCCESS,
      })
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: LIKE_FAIL,
      })
   }
}

export const disLikeToVideo = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: DISLIKE_REQUEST,
      })
      await request.post('/videos/rate',{
         params:{
            id,
            rating:'dislike'
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      

      dispatch({
         type: DISLIKE_SUCCESS,
      })
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: DISLIKE_FAIL,
      })
   }
}