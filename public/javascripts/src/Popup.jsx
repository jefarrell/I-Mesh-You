import React from 'react'
import ReactDOM from 'react-dom'
import Map from './Map.jsx'
const Modal = require('boron/DropModal');

const modalStyle = {
    width: '80%'
};

const Popup = React.createClass({
    
    getInitialState: function(){
        return {
            type: 'info',
            message: ''
        }
    },

	 showModal: function(){
        this.refs.modal.show();
    },

    hideModal: function(){
        this.setState({type:'info', message:''})
        this.refs.modal.hide();
    },

    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({type:'info', message:'Sending..'}, this.submitData);
    },

    submitData: function() {
        
        const formData = {
            KON: ReactDOM.findDOMNode(this.refs.KON).value,
            name: ReactDOM.findDOMNode(this.refs.name).value,
            twitter: ReactDOM.findDOMNode(this.refs.twitter).value,
            loc1: ReactDOM.findDOMNode(this.refs.loc1).value,
            loc2: ReactDOM.findDOMNode(this.refs.loc2).value,
            loc3: ReactDOM.findDOMNode(this.refs.loc3).value
       };

       var self = this;
       // Check for null
        if (formData.KON == '' || formData.loc1 == '' ) {
            console.log(ReactDOM.findDOMNode(this.refs.KON))
            this.setState({type: 'danger', message: 'Missing Required Fields - Try again please'});
            $('#KON ,#loc1').removeClass('reqd').addClass('has-error');
       } 
       // Validate number
       else if (formData.KON === "hello") {
           this.setState({type: 'danger', message: 'Invalid Order Number!'})
       } 
       // All good, post
       else {

            $('#KON ,#loc1').removeClass('has-error').addClass('reqd');

            $.ajax({
                url: "/addData",
                type: "POST",
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function(msg) {
                    self.setState({type:'success', message:'Thanks for Submitting!'})
                },
                error: function(err) {
                    self.setState({type: 'danger', message: 'Something went wrong - please double check Information'})
                }
            });
        }
    },

    callback: function(event) {
        console.log(event);
    },

    render: function() {
        // Build bigger component for success

        if(this.state.type === 'success' && this.state.message) {

            var classString = 'alert alert-' + this.state.type;
            var status = 
                <div id="status" className={classString} ref="status">
                    <h4>{this.state.message}</h4>
                    <div> Please share on social media!</div>
                </div>; 

        } else if (this.state.type && this.state.message) {

            var classString = 'alert alert-' + this.state.type;
            var status = <div id="status" className={classString} ref="status">
                    {this.state.message}
                </div>;
        }


        return (
            <div>
                <button onClick={this.showModal} className={"btn btn-lg"}>Add Your Mesh!</button>
                <Modal ref="modal" modalStyle={modalStyle}>
                    {status}
                    <form id={"modalForm"}>
                        <div className={"row"}>
                            <div className={"col-md-4 reqd"} id="KON">
                                <input
                                    type="text"
                                    ref="KON"
                                    className={"form-control"}
                                    placeholder={"KickStarter Order # (a3kf2l2FDW)"} required>
                                </input>
                            </div>
                            <div className={"col-md-4"}>
                                <input
                                    type="text"
                                    ref="name"
                                    className={"form-control"}
                                    placeholder={"Name (Jane Doe)"}>
                                </input>
                            </div>
                            <div className={"col-md-4"}>
                                <input
                                    type="text"
                                    ref="twitter"
                                    className={"form-control"}
                                    placeholder={"Twitter (JaneDoe23)"}>
                                </input>                           
                            </div>
                        </div> 

                        <div className={"form-group reqd"} id="loc1">
                            <label type="text">Primary Location of Your Mesh</label>
                            <input 
                                type="text"
                                ref="loc1"
                                id="loc1"
                                className={"form-control"}
                                placeholder={"ex: 81 willoughby Street, Brooklyn, NY"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Potential Other Location</label>
                            <input 
                                type="text"
                                ref="loc2"
                                className={"form-control"}
                                placeholder={"ex: 29 champs elysée paris"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Potential Other Location</label>
                            <input 
                                type="text"
                                ref="loc3"
                                className={"form-control"}
                                placeholder={"ex: Hay St & Barrack St, Perth WA 6000, Australia"}>
                            </input>
                        </div>                                                
                    </form>
                    
                    <a className={"btn btn-warning"} id={"saveBtn"} onClick={this.submitData}>
                        <i className={"fa fa-map-marker fa-lg"}></i>  Add to Map! </a>

                    <a className={"btn btn-danger btn-secondary"} id={"cancelBtn"} onClick={this.hideModal}>
                        <i className={"fa fa-trash-o fa-lg"}></i>  Cancel</a>
                </Modal>
            </div>
        );
    }
});
//<button onClick={this.submitData} className={"btn btn-warning"} id={"saveBtn"}>Add to Map!</button>
//<button onClick={this.hideModal} className={"btn btn-secondary"} id={"cancelBtn"}>Close</button>
export default Popup;