import request from '../../api'
import {
   CHANNEL_DETAILS_FAIL,
   CHANNEL_DETAILS_REQUEST,
   CHANNEL_DETAILS_SUCCESS,
   SET_SUBSCRIPTION_STATUS,
   SUBSCRIPTION_ADD_FAIL,
   SUBSCRIPTION_ADD_REQUEST,
   SUBSCRIPTION_ADD_SUCCESS,
   SUBSCRIPTION_REMOVE_FAIL,
   SUBSCRIPTION_REMOVE_REQUEST,
   SUBSCRIPTION_REMOVE_SUCCESS,
} from '../actionType'

export const getChannelDetails = id => async dispatch => {
   try {
      dispatch({
         type: CHANNEL_DETAILS_REQUEST,
      })

      const { data } = await request('/channels', {
         params: {
            part: 'snippet,statistics,contentDetails',
            id,
         },
      })
      dispatch({
         type: CHANNEL_DETAILS_SUCCESS,
         payload: data.items[0],
      })
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: CHANNEL_DETAILS_FAIL,
         payload: error.response.data,
      })
   }
}

export const checkSubscriptionStatus = id => async (dispatch, getState) => {
   try {
      const { data } = await request('/subscriptions', {
         params: {
            part: 'snippet',
            forChannelId: id,
            mine: true,
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      dispatch({
         type: SET_SUBSCRIPTION_STATUS,
         payload: data.items.length !== 0,
      })
      console.log(data)
   } catch (error) {
      console.log(error.response.data)
   }
}

export const addSubscription = id => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUBSCRIPTION_ADD_REQUEST,
      })
      var resource = {
         snippet: {
             resourceId: {
                 kind: 'youtube#channel',
                 channelId: id
             }
         }
     };
      await request.post('/subscriptions', resource,{
         params: {
            part: 'snippet',
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      dispatch({
         type: SUBSCRIPTION_ADD_SUCCESS,

      })
      setTimeout(()=>{
         dispatch(checkSubscriptionStatus(id))
      },1000)
      
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: SUBSCRIPTION_ADD_FAIL,
 
      })
   }
}
export const deleteSubscription = id => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUBSCRIPTION_REMOVE_REQUEST,
      })
   
      const res= await request('/subscriptions',{
         params: {
            forChannelId: 'id',
            mine: 'true',
            part: 'snippet,contentDetails'
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      })
      console.log(res,'data');
      // await request.delete('/subscriptions',{
      //    params: {
      //      id:id
      //    },
      //    headers: {
      //       Authorization: `Bearer ${getState().auth.accessToken}`,
      //    },
      // })
      dispatch({
         type: SUBSCRIPTION_REMOVE_SUCCESS,

      })
      setTimeout(()=>{
         dispatch(checkSubscriptionStatus(id))
      },1000)
      
   } catch (error) {
      console.log(error.response.data)
      dispatch({
         type: SUBSCRIPTION_REMOVE_FAIL,
 
      })
   }
}