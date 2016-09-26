import React from 'react'
import ReactDOM from 'react-dom'
import {TwitterButton, EmailButton, RedditButton, LinkedInButton, FacebookButton} from 'react-social'

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
        $('body').append('<div id="coverFix"></div>');
    },



    hideModal: function(){
        this.setState({type:'info', message:''})
        this.refs.modal.hide();
        $('#coverFix').remove();
    },


    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({type:'info', message:'Sending..'}, this.submitData);
    },

    submitData: function() {
        
        const formData = {
            name: ReactDOM.findDOMNode(this.refs.name).value,
            twitter: ReactDOM.findDOMNode(this.refs.twitter).value,
            site: ReactDOM.findDOMNode(this.refs.site).value,
            bio: ReactDOM.findDOMNode(this.refs.bio).value,
            loc1: ReactDOM.findDOMNode(this.refs.loc1).value,
            loc2: ReactDOM.findDOMNode(this.refs.loc2).value,
            loc3: ReactDOM.findDOMNode(this.refs.loc3).value
       };

       var self = this;

       // Check for null
        if (formData.loc1 == '' ) {
            this.setState({type: 'danger', message: 'Primary/Home location is required.  Please try again!'});
            $('#KON ,#loc1').removeClass('reqd').addClass('has-error');
       } 
       // Validate number
       else if (formData.bio.length > 140) {
           this.setState({type: 'danger', message: 'Bio is greater than 140 chars.  Please try again!'})
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
                    self.setState({type:'success', message:'Thanks for registering your node(s)!'})
                },
                error: function(err) {
                    self.setState({type: 'danger', message: 'Something went wrong - please double check Information'})
                }
            });
        }
    },

    render: function() {


        if (this.state.type === 'info' && this.state.message === '') {
            var msg = 'Welcome ot this part';

            var status = 
                <div id="modal-landing">
                    <h4> We're here!!!!!! </h4>
                </div>
        }

        if(this.state.type === 'success' && this.state.message) {

            var classString = 'alert alert-' + this.state.type;
            var msg = "I just started a mesh network with GoTenna! Join me: "
            var url = "https://kickstarter.com"
            var fbid = "355164067922975"
            var status = 
                <div id="status" className={classString} ref="status">
                    <h4>{this.state.message}</h4>
                    <div> Invite others to join our mesh network by sharing on social media:</div>
                    <a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2FgoTennaInc&amp;src=sdkpreparse">
                        <i className={"fa fa-facebook fa-2x"} aria-hidden="true"></i>                    
                    </a>
                    <TwitterButton 
                        message={msg}
                        url={url}
                        element="a" className="">
                        <i className={"fa fa-twitter-square fa-2x"} aria-hidden="true"/>
                    </TwitterButton>
                    <EmailButton 
                        title="Share via E-Mail"
                        message={msg}
                        url={url}
                        element="a" className="">
                        <i className={"fa fa-envelope fa-2x"} aria-hidden="true"/>
                    </EmailButton>
                    <LinkedInButton
                        message={msg}
                        url={url}
                        element="a" className="">
                        <i className="fa fa-linkedin fa-2x" aria-hidden="true"/>
                    </LinkedInButton>
                </div>; 

        } else if (this.state.type && this.state.message) {

            var classString = 'alert alert-' + this.state.type;
            var status = <div id="status" className={classString} ref="status">
                    {this.state.message}
                </div>;
        }


        return (
            <div>
                <button onClick={this.showModal} className={"btn btn-lg"} id="addBtn">Register Your Node!</button>
                <Modal ref="modal" modalStyle={modalStyle}>
                    {status}
                    <form id={"modalForm"}>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <input
                                    type="text"
                                    ref="name"
                                    className={"form-control"}
                                    placeholder={"Name (Jane Doe)"}>
                                </input>
                            </div>
                            <div className={"col-md-4"}>
                                <div className={"input-group"}>
                                    <span className={"input-group-addon"}><i className={"fa fa-at"} aria-hidden="true"></i></span>
                                    <input
                                        type="text"
                                        ref="twitter"
                                        className={"form-control"}
                                        placeholder={"Twitter (JaneDoe23"}>
                                    </input>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <input
                                    type="text"
                                    ref="site"
                                    className={"form-control"}
                                    placeholder={"Personal site"}>
                                </input>                           
                            </div>
                        </div> 
                         <div className={"form-group"}>
                            <label type="text">Short Bio</label>
                            <input 
                                type="text"
                                ref="bio"
                                className={"form-control"}
                                placeholder={"140 characters"}>
                            </input>
                        </div>                       
                        <div className={"form-group reqd"} id="loc1">
                            <label type="text">Primary/Home Location *</label>
                            <input 
                                type="text"
                                ref="loc1"
                                id="loc1"
                                className={"form-control"}
                                placeholder={"Street address, intersection, landmark or city"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Other Location #1</label>
                            <input 
                                type="text"
                                ref="loc2"
                                className={"form-control"}
                                placeholder={"Street address, intersection, landmark or city"}>
                            </input>
                        </div>
                        <div className={"form-group"}>
                            <label type="text">Other Location #2</label>
                            <input 
                                type="text"
                                ref="loc3"
                                className={"form-control"}
                                placeholder={"Street address, intersection, landmark or city"}>
                            </input>
                        </div>                                                
                    </form>
                    
                    <a className={"btn btn-warning"} id={"saveBtn"} onClick={this.handleSubmit} >
                        <i className={"fa fa-map-marker fa-lg"}></i>  Add to Map! </a>

                    <a className={"btn btn-danger btn-secondary"} id={"cancelBtn"} onMouseUp={this.hideModal} onClick={this.props.updater}>Close</a>
                </Modal>
            </div>
        );
    }
});

export default Popup;