import React from 'react'
import './_sidebar.scss'

import {
   MdSubscriptions,
   MdExitToApp,
   MdThumbUp,
   MdHistory,
   MdLibraryBooks,
   MdHome,
   MdSentimentDissatisfied,
} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { log_out } from '../../redux/actions/auth.action'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
   const dispatch = useDispatch()
   const logOutHandler = () => {
      dispatch(log_out())
   }
   let pathname = useLocation().pathname

   return (
      <nav
         className={sidebar ? 'sidebar open' : 'sidebar'}
         onClick={() => handleToggleSidebar(false)}>
         <Link to='/'  className={`${pathname === '/' ? 'link-active' : ''}`}>
            <li>
               <MdHome size={23} />
               <span>Home</span>
            </li>
         </Link>
         <Link to='/feed/subscriptions' className={`${pathname === '/feed/subscriptions' ? 'link-active' : ''}`}>
            <li>
               <MdSubscriptions size={23} />
               <span>Subscriptions</span>
            </li>
         </Link>
         <Link to='/videos/liked'  className={`${pathname === '/videos/liked' ? 'link-active' : ''}`}>
            <li>
               <MdThumbUp size={23} />
               <span>Liked Video</span>
            </li>
         </Link>

         <li>
            <MdHistory size={23} />
            <span>History</span>
         </li>

         <li>
            <MdLibraryBooks size={23} />
            <span>Library</span>
         </li>
         <li>
            <MdSentimentDissatisfied size={23} />
            <span>I don't Know</span>
         </li>

         <hr />

         <li onClick={logOutHandler}>
            <MdExitToApp size={23} />
            <span>Log Out</span>
         </li>

         <hr />
      </nav>
   )
}

export default Sidebar
