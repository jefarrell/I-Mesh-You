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
                                <a href="https://www.kickstarter.com/projects/gotenna/gotenna-mesh-off-grid-people-powered-connectivity" target="_blank">
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
            

            var url = "https://www.kickstarter.com/projects/gotenna/gotenna-mesh-off-grid-people-powered-connectivity"
            var tweet = "I registered as a node on the @goTenna Mesh map! Find it at imeshyou.com & join our mesh at is.gd/gotennamesh #imeshyou"
            var emailSubj = "Join my mesh network!"
            var status = 
                <div id="status" className={classString} ref="status">
                    <h4>{this.state.message}</h4>
                    <div> Invite others to join our mesh network by sharing on social media:</div>
                    <a className={"fb-xfbml-parse-ignore modalShare"} target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.kickstarter.com%2Fprojects%2Fgotenna%2F257342308&t=">
                        <i className={"fa fa-facebook fa-3x"} aria-hidden="true"></i>                    
                    </a>
                    <TwitterButton 
                        message={tweet}
                        url=""
                        element="a" className="modalShare">
                        <i className={"fa fa-twitter fa-3x"} aria-hidden="true"/>
                    </TwitterButton>
                    <LinkedInButton
                        message={emailSubj}
                        url={url}
                        element="a" className="modalShare">
                        <i className="fa fa-linkedin fa-3x" aria-hidden="true"/>
                    </LinkedInButton>
                    <a href="mailto:?subject=Join%20my%20mesh%20network!&body=I%20just%20registered%20as%20a%20node%20on%20the%20goTenna%20Mesh%20network%20map.%20Find%20it%20at%20imeshyou.com%20%26%20join%20the%20network%20by%20getting%20your%20own%20goTenna%20Mesh%20devices%20at%20is.gd%2Fgotennamesh.%0A%0AgoTenna%20Mesh%20is%20the%20first%20100%25%20off-grid%2C%20totally%20mobile%2C%20long-range%2C%20consumer-ready%20mesh%20network.%20You%20pair%20a%20goTenna%20Mesh%20device%20to%20your%20existing%20smartphone%20and%20it%20enables%20you%20to%20send%20texts%20%26%20locations%20on%20offline%20maps%20to%20other%20users%20up%20to%20several%20miles%2Fkilometers%20away%2C%20even%20if%20you%20don%E2%80%99t%20have%20service.%20%0A%0AgoTenna%20Mesh%20can%20automatically%20and%20privately%20relay%20your%20messages%20through%20other%20users%E2%80%99%20devices%20to%20reach%20recipients%20who%20are%20out%20of%20point-to-point%20range.%20This%20is%20a%20network%20that%20gets%20stronger%20the%20more%20people%20join%20it!%0A%0AThis%20is%20the%20future%20of%20people-powered%20connectivity%2C%20and%20it%E2%80%99s%20great%20for%20all%20outdoor%20adventures%2C%20crowded%20events%2C%20travel%20abroad%2C%20and%20unplanned%20emergencies.%20%0A%0AJoin%20me%20in%20creating%20this%20mesh%20network%3A%20is.gd%2Fgotennamesh" target="_blank" title="Send email"><i className={"fa fa-envelope fa-3x"} aria-hidden="true"></i><span className={"sr-only"}>Send email</span></a>
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

                        <div className={"row"} id="textblock">
                            <p><span className={"bld"}>Please enter your location(s) as precisely as possible.</span> 
                            The exact address will never be shown, just the general location within a mile. <br /> 
                            The more precisely you enter the locations, <span className={"bldita"}>the more accurately we can place your node(s) on the map.</span>
                            </p>
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