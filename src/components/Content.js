// Content.js

import React, {Component} from 'react';
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from 'react-modal';
import _ from 'lodash';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root');
export default class Content extends Component {

 constructor(props) {
    super(props);
        this.state = {
            data: [],
            userdetails:[],
            company:[],
            address:[],
            modalIsOpen: false, 
            pagenumber: 1,
            currentPage: 1,
            completePagePost:1,
            error: null,
            isLoaded: false,
           

    }
    this.apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  changeCurrentPagecomplete = numPage => {
    this.setState({ currentPage: numPage });

  };
   changeCurrentPageincomplete = numPage => {
    this.setState({ completePagePost: numPage });
  };
    componentDidMount() {

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(
   
        (result) => {
       
          var partition = _.partition(result, obj => obj.completed);
         
          this.setState({
            isLoaded: true,
            data: partition,
          })

        })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        })
      }
      )
  }


   handleChangeCheckbox = (id,title) => {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(resp => {
             this.setState({modalIsOpen: true,
                   title:title,userdetails:resp.data,company:resp.data.company,address:resp.data.address});
      });              
  }


    render(){
       const { error, isLoaded, data } = this.state;
      
        if (error) {
            return <div>Error in loading</div>
        } else if (!isLoaded) {
            return <div>Loading ...</div>
        } else {
        const data1 = data[1];
       
        const count1=(this.state.currentPage - 1) * 10;
        
        const count2=(this.state.completePagePost - 1) * 10;
        const incompleteData = data1.slice(count1).slice(0, 10);
    
        const data2 = data[0];
        const completeData = data2.slice(count2).slice(0, 10);
  
        
        return (
    <div className="content-wrapper">
        <Modal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
 
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
         
          <div><h3>{this.state.title}</h3></div>
              <fieldset>                
               Name: {this.state.userdetails.name}<br/>
               Email: {this.state.userdetails.email}<br/>
               Phone: {this.state.userdetails.phone}<br/>
               Address: {this.state.address.street},{this.state.address.suite},{this.state.address.city},{this.state.address.zipcode}<br/>
               Website: {this.state.userdetails.website}<br/>             
               Company: {this.state.company.name}         
               </fieldset>
           <button id="modbutton" onClick={this.closeModal}>close</button>
        
        </Modal>             
         <div id="mainId">
            
            <div className="task">
            <h3>Incomplete Task</h3>
              <ol start={count1 + 1} className="item">
                {
                   incompleteData.map((post) => (
                    
                
                 <li key={post.id} align="start">
                    <div>
                      <span>{}</span>

                      <input type="checkbox" disabled={true} />
                      <span onClick={() => this.handleChangeCheckbox(post.id,post.title)} className="title">{post.title}</span>
                      <span className="body">{ post.spreading}</span>
                    </div>

                  </li>
                    )
                   )
                }
              </ol>
            <Pagination
              currentPage={this.state.currentPage}
              totalSize={data1.length}

              totalPages={10}
              changeCurrentPage={this.changeCurrentPagecomplete}
            />
            <h4>current page:{this.state.currentPage}</h4>
              </div>
    <div className="task">
            <h3>Completed Task</h3>
              <ol start={count2 + 1} className="item">
                {
                   completeData.map((post) => (
                    
             

                 <li key={post.id} align="start">
                  
                    <div>
                      <span>{}</span>

                      <input type="checkbox" defaultChecked={post.completed} disabled={true} />
                      <span onClick={() => this.handleChangeCheckbox(post.id,post.title)} className="title">{post.title}</span>
                      <span className="body">{ post.spreading}</span>
                    </div>

                  </li>
                    )
                   )
                }
              </ol>
            <Pagination
              currentPage={this.state.completePagePost}
              totalSize={data2.length}

              totalPages={10}
              changeCurrentPage={this.changeCurrentPageincomplete}
            />
            <h4>current Page:{this.state.completePagePost}</h4>
              </div>
  </div>
               
            </div>
        )
    }
}
}




