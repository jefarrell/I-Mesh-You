import React from 'react'
const Modal = require('boron/DropModal');

const modalStyle = {
    width: '80%'
};

const Popup = React.createClass({
    
    getInitialState: function(){
        return {
            test: null
        }
    },

	 showModal: function(){
        this.refs.modal.show();
    },

    hideModal: function(){
        this.refs.modal.hide();
    },

    submitData: function() {
        console.log("submitting");
    },

    callback: function(event){
        console.log(event);
    },

    render: function() {
        return (
            <div>
                <button onClick={this.showModal} className={"btn btn-lg"}>Add Your Mesh!</button>
                <Modal ref="modal" modalStyle={modalStyle}>
                    <form id={"modalForm"}>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <input
                                    type="text"
                                    className={"form-control"}
                                    placeholder={"KickStarter Order # (a3kf2l2FDW)"}>
                                </input>
                            </div>
                            <div className={"col-md-4"}>
                                <input
                                    type="text"
                                    className={"form-control"}
                                    placeholder={"Name (Jane Doe)"}>
                                </input>
                            </div>
                            <div className={"col-md-4"}>
                                 <input
                                    type="text"
                                    className={"form-control"}
                                    placeholder={"Twitter (JaneDoe23)"}>
                                </input>                           
                            </div>
                        </div> 

                        <div className={"form-group"}>
                            <label type="text">Primary Location of Your Mesh *</label>
                            <input 
                                type="text"
                                className={"form-control"}
                                placeholder={"ex: 81 willoughby Street, Brooklyn, NY"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Potential Other Location</label>
                            <input 
                                type="text"
                                className={"form-control"}
                                placeholder={"ex: 29 champs elysée paris"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Potential Other Location</label>
                            <input 
                                type="text"
                                className={"form-control"}
                                placeholder={"ex: Hay St & Barrack St, Perth WA 6000, Australia"}>
                            </input>
                        </div>                                                
                    </form>
                    <button onClick={this.submitData} className={"btn btn-warning"} id={"saveBtn"}>Save Information!</button>
                    <button onClick={this.hideModal} className={"btn btn-secondary"} id={"cancelBtn"}>Cancel</button>
                </Modal>
            </div>
        );
    }
});

export default Popup;