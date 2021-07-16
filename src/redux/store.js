import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/auth.reducer'
import { homeVideosReducer } from './reducers/video.reducer'

const rootReducer = combineReducers({
    auth:authReducer,
    homeVideos:homeVideosReducer
})

const store = createStore(
        rootReducer,
        {},
        composeWithDevTools(applyMiddleware(thunk))
    )
   

export default store
