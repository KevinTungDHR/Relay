import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import SplashPage from './content/splash_page';
class MainSite extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Header />
        {/* sidebar that conditionally renders */}
          <Switch>
            <Route path='/' component={SplashPage}/>
          </Switch>
        <Footer />
      </div>
    )
  }
}
export default MainSite;