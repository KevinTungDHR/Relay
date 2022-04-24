import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './header/header';
import Footer from './footer';
import SideNavMenu from './side_navigation_menu'
import SplashPage from './content/splash_page';
import FeaturesPage from './content/features/features_page';
import SolutionsPage from './content/solutions/solutions_page';
import EnterprisePage from './content/enterprise/enterprise_page';
import ResourcesPage from './content/resources/resources_page';
import PricingPage from './content/pricing/pricing_page';

class MainSite extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      matches: window.matchMedia("(min-width: 1085px)").matches,
      sideNavVisible: false
    }

    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  componentDidMount(){
    const sizeHandler = e => this.setState({matches: e.matches })
    window.matchMedia("(min-width: 1085px)").addEventListener('change', sizeHandler)
  }

  componentDidUpdate(prevProps){
    if (prevProps.location.pathname !== this.props.location.pathname){
      this.toggleSideNav()
    }
  }

  toggleSideNav(e){
    this.setState((state) => {
      return {sideNavVisible: !state.sideNavVisible }
    })
  }

  render(){
    return(
      <div className='grid-container main-site'>
        <Header toggleSideNav={this.toggleSideNav} />
          {!this.state.matches && 
            <SideNavMenu 
              sideNavVisible={this.state.sideNavVisible}
              toggleSideNav={this.toggleSideNav}
              />}


          <Switch>
            <Route path='/features' component={FeaturesPage}/>
            <Route path='/solutions' component={SolutionsPage}/>
            <Route path='/enterprise' component={EnterprisePage}/>
            <Route path='/resources' component={ResourcesPage}/>
            <Route path='/pricing' component={PricingPage}/>
            <Route path='/' component={SplashPage}/>
          </Switch>

        <Footer />
      </div>
    )
  }
}
export default MainSite;