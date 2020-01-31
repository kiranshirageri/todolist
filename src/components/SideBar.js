// SideBar.js

import React, {Component} from 'react';

export default class SideBar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="img/react.svg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Kiran</p>
                           
                        </div>
                    </div>
      
        
                </section>
            </aside> 
        )
    }
}