import React from 'react'
const Modal = require('boron/DropModal');

const Popup = React.createClass({
    
    getInitialState: function(){
        test: null
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
                <button onClick={this.showModal}>Add Your Mesh</button>
                <Modal ref="modal" keyboard={this.callback}>
                    <form>
                        <div className={"form-group"}>
                            <label type="text">KickStarter Order Number</label>
                            <input
                                type="text"
                                className={"form-control"}
                                placeholder={"a3kf2l2FDW"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Primary Location</label>
                            <input 
                                type="text"
                                className={"form-control"}
                                placeholder={"Where will you mainly use your Mesh?"}>
                            </input>
                        </div>
                    </form>
                    <button onClick={this.submitData} className={"btn btn-default"} id={"saveBtn"}>Save!</button>
                    <button onClick={this.hideModal} className={"btn btn-default"} id={"closeBtn"}>Close</button>
                </Modal>
            </div>
        );
    }
});

export default Popup;