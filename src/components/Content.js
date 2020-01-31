// Content.js

import React, {Component} from 'react';
import axios from "axios";
import Popup from "reactjs-popup";
import Modal from 'react-modal';


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
       modalIsOpen: false
    }
    this.apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    //this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

 // openModal() {
 //    this.setState({modalIsOpen: true});
 //  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        
        // Set state with result
        //
        this.setState({data:res.data});

      });
  }


   handleChangeCheckbox = (id,title) => {

      var con =  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(resp => {
          console.log(resp.data.address)
             this.setState({modalIsOpen: true,
                   title:title,userdetails:resp.data,company:resp.data.company,address:resp.data.address});
      });
         //console.log(con)
           
                
  }


    render(){
       
        return (
            <div className="content-wrapper">
        <Modal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
 
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
         
          <div><legend>{this.state.title}</legend></div>
                <fieldset>
                
                Name: {this.state.userdetails.name}<br/>
               Email: {this.state.userdetails.email}<br/>
               Phone: {this.state.userdetails.phone}<br/>
               Address: {this.state.address.street},{this.state.address.suite},{this.state.address.city},{this.state.address.zipcode}<br/>
               Website: {this.state.userdetails.website}<br/>             
               Company: {this.state.company.name}<br/>             
               
                </fieldset>
           <button id="modbutton" onClick={this.closeModal}>close</button>
        
        </Modal>             
         <div id="mainId">
            
            <div id="incompleted">
            <h3>Incomplete Task</h3>
              <ol type="1" id="incompleted-tasks">
                {
                  this.state.data.map((item, index) => 
                        { if (!item.completed) {
                                
                                var title = item.title.toLowerCase()
                                .split(' ')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ');
                                return <li key={item.id}  ><label><input type="checkbox" onChange={() => this.handleChangeCheckbox(item.id,title)}/>{title} </label></li>

                          }
                      }
                    )
                }
              </ol>

              </div>
           <div id="completed"> 
           <h3>Completed Task</h3>
              <ol type="1" id="completed-tasks">
                {
                  this.state.data.map((item, index) => 
                        { if (item.completed) {
                                var title = item.title.toLowerCase()
                                .split(' ')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ');
                                return <li key={item.id} ><label><input type="checkbox"  onChange={() => this.handleChangeCheckbox(item.id,title)} checked/>{title} </label></li>

                          }
                      }
                    )
                }
              </ol>
              </div>
  </div>
               
            </div>
        )
    }
}




