import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import './_app.scss'


const Layout = ({ children }) =>{

  const [sidebar, toggleSidebar]=useState(false)

  const handleToggleSidebar =() => toggleSidebar(value => !value)

  return (
    <>
      <Header handleToggleSidebar = {handleToggleSidebar}/>
      <div className="app__container">
        <Sidebar 
          sidebar = { sidebar} 
          handleToggleSidebar = {handleToggleSidebar}
        />
        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </>
  );
}
function App() {

  const {accessToken , loading} = useSelector(state => state.auth)

  const history = useHistory()

  useEffect(()=>{
    if(!loading && !accessToken){
      history.push('/auth')
    }

  },[accessToken,loading,history])
  return (
      <Switch>
        <Route path='/' exact>
            <Layout>
               <HomeScreen />
            </Layout>
         </Route>

         <Route path='/auth' exact>
            <LoginScreen />
         </Route>

         <Route path='/search' exact>
            <Layout>
               <h1>Hi Search results</h1>
            </Layout>
         </Route>
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
  );
}

export default App;
