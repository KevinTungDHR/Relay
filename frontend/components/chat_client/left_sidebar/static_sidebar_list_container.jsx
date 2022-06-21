import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import StaticSidebarList from './static_sidebar_list';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    fullPath: pathname,
    url: url
  }
}


export default withRouter(connect(mapState, null)(StaticSidebarList));