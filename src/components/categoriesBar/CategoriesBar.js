import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/video.action'
import './_categoriesBar.scss'


const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Bengali Songs',
    'Coding',
    'Cricket',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Poor Coder',
    'Shwetabh',
 ]
 
const CategoriesBar = () => {
    const dispatch = useDispatch()

    const [activeElement, setActiveElement]=useState('All')

    const handleClick = (value) =>{
        setActiveElement(value)
        if (value === 'All') {
            dispatch(getPopularVideos())
        } else {
            dispatch(getVideosByCategory(value))
        }
    }
    

    return (
        <div className="categoriesBar">
            {
                keywords.map((value,index) => 
                <span 
                    key ={index}
                    onClick ={() =>handleClick(value)}
                    className={activeElement === value ? 'active' : ''}>{value}
                </span>)
            }
        </div>
    )
}

export default CategoriesBar
