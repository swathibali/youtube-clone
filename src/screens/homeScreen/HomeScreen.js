import React from 'react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video'
import { getPopularVideos } from '../../redux/actions/video.action'

const HomeScreen = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPopularVideos())
    },[dispatch])

    const {videos}= useSelector(state => state.homeVideos)
    return (
        <div>
            <Container />
            <CategoriesBar/>
            <Row>
                {
                    videos.map((video)=>(
                        <Col lg={3} md={4}>
                        <Video video={video} key ={video.id}/>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default HomeScreen
