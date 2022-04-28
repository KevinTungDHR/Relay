import React from 'react';

class WorkspaceSetup extends React.Component {
  constructor(props){
    super(props);
    this.state = { leftDragging: false,
      workspaceName: "" }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.endDrag = this.endDrag.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentDidMount(){
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
    const primaryView = document.querySelector(".workspace-setup-primary-view");

    const sideBarWidth = sidebar.clientWidth
    const rightsideWidth = primaryView.clientWidth
    console.log(rightsideWidth)

    const cols = [
      sideBarWidth, 
      3, 
      view.clientWidth - 3 - sideBarWidth
    ]

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

      const sideBarWidth = leftDragging ? e.clientX : sidebar.clientWidth

      const cols = [
        sideBarWidth, 
        3,
        view.clientWidth - 3 - sideBarWidth
      ]

      const newTemplate = cols.map(col => col.toString() + "px").join(" ");
      view.style.gridTemplateColumns = newTemplate;
    }
  }

  renderButton(){
    if(this.state.workspaceName === ""){
      return <button className='btn large-btn grey-btn-inactive'>Next</button>
    } else {
      return <button className='btn large-btn primary-btn'>Next</button>
    }

  }

  renderBlank(){
    return (<div className='ws-setup-header-placeholder'></div>)
  }
  render(){
    return(
      <div onMouseUp={this.endDrag}>
        <div className='workspace-setup-grid' onMouseMove={this.onDrag}>
          <div className="workspace-setup-top-nav"></div>
          <div className="workspace-setup-sidebar">
            <header className='workspace-setup-sidebar-header'>
              {this.state.workspaceName === "" ? this.renderBlank() :
               <span className='no-wrap-ellipsis'>{this.state.workspaceName}</span>}
            </header>
          </div>
          <div id="leftDragging" onMouseDown={this.startDrag} className="setup-left-dragbar"></div>
          <div className="workspace-setup-primary-view">
            <h1>What’s the name of your company or team?</h1>
            <p>This will be the name of your Relay workspace — choose something that your team will recognize.</p>
            <input 
              type="text" 
              placeholder='Ex: Acme Marketing or Acme Co'
              value={this.state.workspaceName}
              onChange={this.update('workspaceName')}/>
            {this.renderButton()}
          </div>
        </div>
    </div>
    )
  }
}

export default WorkspaceSetup;