import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import VideoHorizontal from '../components/videoHorizontal/VideoHorizontal'
import { getLikedVideos } from '../redux/actions/videos.action'



const LikedVideosScreen = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getLikedVideos())
   }, [dispatch])

   const { loading, videos } = useSelector(state => state.likedVideos)

   return (
      <Container fluid>
         {!loading ? (
            videos?.map(video => (
               <VideoHorizontal video={video} key={video.id} likeScreen />
            ))
         ) : (
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
               <Skeleton width='100%' height='160px' count={20} />
            </SkeletonTheme>
         )}
      </Container>
   )
}

export default LikedVideosScreen
