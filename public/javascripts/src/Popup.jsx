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
        this.setState({type:'info'});
        $('body').append('<div id="coverFix"></div>');
    },



    hideModal: function(){

        this.refs.modal.hide();
        $('#coverFix').remove();
        var target = $('#status');
        $(target).addClass('modal-landing');
        $('#saveBtn').addClass('buttonVis');
        this.setState({type: '', message:''});
    },


    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({type:'info', message:'Sending..'}, this.submitData);
    },

    submitData: function() {
        
        const formData = {
            username: ReactDOM.findDOMNode(this.refs.username).value,
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

    modalRegister: function() {
        this.setState({message: '', type:''})
        var target = $('#status');
        target.empty();
        $(target).removeClass('modal-landing');
        $('#saveBtn').removeClass('buttonVis');
    },

    render: function() {


        if (this.state.type === 'info' && this.state.message === '') {
            var classString = 'modal-landing alert alert-' + this.state.type;
            var status = 
                <div id="status" className={classString} ref="status">
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <div className={"modalblock"}>
                                 <h3>Already bought your goTenna Mesh?</h3>
                                 <h4 id="sub">If so, register as a node in this first-of-its-kind mesh network here!</h4>
                                 <button onClick={this.modalRegister} className={"btn btn-lg modalActions"} id="modalRegister">REGISTER NOW!</button>
                             </div>
                             <div className={"modalblock"}>
                                <h3>Haven't bought yours yet, but want to be part of the fun?</h3>
                                <a href="http://www.kickstarter.com" target="_blank">
                                    <button className={"btn btn-lg modalActions"} id="modalOrder">ORDER TODAY!</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        }

        if(this.state.type === 'success' && this.state.message) {
            $('#saveBtn').addClass('buttonVis');
            var classString = 'modal-success alert alert-' + this.state.type;
            var msg = "I just started a mesh network with GoTenna! Join me: "
            var url = "https://kickstarter.com"
            var status = 
                <div id="status" className={classString} ref="status">
                    <h4>{this.state.message}</h4>
                    <div> Invite others to join our mesh network by sharing on social media:</div>
                    <a className={"fb-xfbml-parse-ignore modalShare"} target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2FgoTennaInc&amp;src=sdkpreparse">
                        <i className={"fa fa-facebook fa-3x"} aria-hidden="true"></i>                    
                    </a>
                    <TwitterButton 
                        message={msg}
                        url={url}
                        element="a" className="modalShare">
                        <i className={"fa fa-twitter-square fa-3x"} aria-hidden="true"/>
                    </TwitterButton>
                    <EmailButton 
                        title="Share via E-Mail"
                        message={msg}
                        url={url}
                        element="a" className="modalShare">
                        <i className={"fa fa-envelope fa-3x"} aria-hidden="true"/>
                    </EmailButton>
                    <LinkedInButton
                        message={msg}
                        url={url}
                        element="a" className="modalShare">
                        <i className="fa fa-linkedin fa-3x" aria-hidden="true"/>
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
                                    ref="username"
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
                        <div id="buttonCont">
                            <a className={"btn btn-warning buttonVis"} id={"saveBtn"} onClick={this.handleSubmit} >
                                <i className={"fa fa-map-marker fa-lg"}></i>  Add to Map! </a>
                            <a className={"btn btn-danger btn-secondary"} id={"cancelBtn"} onMouseUp={this.hideModal} onClick={this.props.updater}>Close</a>
                        </div>                                               
                    </form>
                    

                </Modal>
            </div>
        );
    }
});

export default Popup;