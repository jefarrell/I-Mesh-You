import React from 'react'
import ReactDOM from 'react-dom'
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
            $('#KON ,#loc1').addClass('has-error');
       } 
       // Validate number
       else if (formData.KON === "hello") {
           this.setState({type: 'danger', message: 'Invalid Order Number!'})
       } 
       // All good, post
       else {
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

    callback: function(event){
        console.log(event);
    },

    render: function() {

        if(this.state.type && this.state.message) {
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
                            <div className={"col-md-4"} id="KON">
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

                        <div className={"form-group"} id="loc1">
                            <label type="text">Primary Location of Your Mesh *</label>
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
                    <button onClick={this.submitData} className={"btn btn-warning"} id={"saveBtn"}>Save Information!</button>
                    <button onClick={this.hideModal} className={"btn btn-secondary"} id={"cancelBtn"}>Close</button>
                </Modal>
            </div>
        );
    }
});

export default Popup;