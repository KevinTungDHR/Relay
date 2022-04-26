import React from 'react';

class ChatClient extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='client-container'>
        <div className='client-grid'>
          <nav className='client-top-nav'>

          </nav>
          <div className='c-workspace-layout'>
            <section className='c-workspace-sidebar'>

            </section>
            <div className='client-primary-view'>

            </div>
          </div>

          <section className='c-workspace-profile'>

          </section>
        </div>
      </div>
    )
  }
}

export default ChatClient;