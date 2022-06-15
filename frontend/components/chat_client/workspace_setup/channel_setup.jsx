import React from 'react';
import { Redirect } from 'react-router';
import { myThrottle } from '../../../util/util_functions';

class ChannelSetup extends React.Component {
  constructor(props){
    super(props);
    this.state = { leftDragging: false,
      channelName: "",
      isLoading: true }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = myThrottle(this.onDrag.bind(this), 10);
    this.endDrag = this.endDrag.bind(this)
    this.handleWindowResize = myThrottle(this.handleWindowResize.bind(this), 5)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchSignedinWorkspaces()
    const id = this.props.match.params.workspaceId

    this.props.fetchWorkspace(id)
    .then(() => this.setState({isLoading: false}))

    window.addEventListener('resize', this.handleWindowResize)
  }

  update(field){
    return (e) => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleWindowResize(e) {
    e.preventDefault();
    const view = document.querySelector(".workspace-setup-grid");
    const sidebar = document.querySelector(".workspace-setup-sidebar");
    const leftBar = document.querySelector(".setup-left-dragbar");

    const sideBarWidth = sidebar.clientWidth

    const cols = [
      sideBarWidth, 
      view.clientWidth -  sideBarWidth
    ]

    leftBar.style.left = (sideBarWidth - 4).toString() + "px"
    const newTemplate = cols.map(col => col.toString() + "px").join(" ");
    view.style.gridTemplateColumns = newTemplate;
  }

  displayCursor(cursorType){
    const view = document.querySelector(".workspace-setup-grid");
    view.style.cursor = cursorType;
  }

  startDrag(e){
    this.setState({
      [e.target.id]: true
    })

    this.displayCursor("ew-resize")
  }

  endDrag(){
    this.setState({
      leftDragging: false
    })

    this.displayCursor("auto")
  }

  onDrag(e){
    const { leftDragging } = this.state

    if (leftDragging) {
      e.preventDefault();
      const view = document.querySelector(".workspace-setup-grid");
      const sidebar = document.querySelector(".workspace-setup-sidebar");
      const leftBar = document.querySelector(".setup-left-dragbar");
      let sideBarWidth = leftDragging ? e.clientX : sidebar.clientWidth

      sideBarWidth = sideBarWidth > 600 ? 600 : sideBarWidth
      leftBar.style.left = (sideBarWidth - 4).toString() + "px"
      view.style.gridTemplateColumns = `${sideBarWidth.toString()}px auto`
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.channelName === "") {
      return;
    }

    const channel = {
      name: this.state.channelName,
      description: "",
      public: true,
    }

    this.props.createChannel(Object.assign({}, channel, { workspaceId: this.props.workspaceId }))
      .then(() => this.props.history.push(`/client/${this.props.workspaceId}`))
  }


  renderButton(){
    if(this.state.workspaceName === ""){
      return <button className='btn large-btn grey-btn-inactive'>Next</button>
    } else {
      return <input type="submit" className='btn large-btn primary-btn' value='Next'/>
    }
  }

  renderBlank(){
    return (<div className='ws-setup-header-placeholder'></div>)
  }

  render(){
    if(this.state.isLoading){
      return null;
    }

    if(Object.values(this.props.channels).length >= 1){
      return <Redirect to={`/client/${this.props.workspaceId}/`}/>
    }
    return(
      <div className="workspace-setup-container" onMouseUp={this.endDrag}>
        <div className="workspace-setup-top-nav"></div>
        <div className='workspace-setup-grid' onMouseMove={this.onDrag}>
          <div className="workspace-setup-sidebar">
            <header className='workspace-setup-sidebar-header'>
               <span className='no-wrap-ellipsis'>{this.props.currentWorkspace.name}</span>
            </header>
          </div>

          <div id="leftDragging" onMouseDown={this.startDrag} className="setup-left-dragbar"></div>
          
          <form onSubmit={this.handleSubmit} className="workspace-setup-primary-view">
            <h1>What’s your team working on right now?</h1>
            <p>This could be anything: a project, campaign, event, or the deal you’re trying to close.</p>
            <input 
              type="text" 
              placeholder='Ex: Q4 budget, autumn campaign'
              value={this.state.channelName}
              onChange={this.update('channelName')}/>
            {this.renderButton()}
          </form>
        </div>
    </div>
    )
  }
}

export default ChannelSetup;