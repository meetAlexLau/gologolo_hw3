import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();
        this.state = {
            logo: {
                text: null,
                color: "#000000",
                backgroundColor: "#ffffff",
                borderColor: "#000000",
                borderRadius: null,
                borderWidth: null,
                padding: null,
                margin: null
            },
            activated: false
        }
    }
    render() {
        let text, color, fontSize,backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        if(this.state.activated == false) {
            this.setState({logo: {text: "Logo Name", fontSize: 16, color: "#000000", backgroundColor: "#ffffff", borderColor: "#000000",
                            borderRadius: 0, borderWidth: 0, padding: 0, margin: 0}});
            this.state.activated = true;
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                        backgroundColor:backgroundColor.value, borderColor:borderColor.value, borderRadius: parseInt(borderRadius.value),
                                        borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    padding.value = "";
                                    margin.value = "";                                    
                                }}>
                                    <div class="row">
                                        <div class = "col-sm-2">
                                            <div className="form-group">
                                                <label htmlFor="text">Text:</label>
                                                <input type="text" className="form-control" name="text" ref={node => {
                                                    text = node;
                                                }} placeholder="Text" 
                                                onChange = {(e) => this.setState({logo: {text: e.target.value, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}}, console.log(this.state.logo))}
                                                    defaultValue = {this.state.logo.text}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color" 
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: e.target.value, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}})}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <input type="number" className="form-control" name="fontSize" min="1" max="100" ref={node => {
                                                    fontSize = node;
                                                }} placeholder="Font Size" 
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: e.target.value, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}}, console.log(e.target.value))}
                                                    defaultValue = {this.state.logo.fontSize}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="backgroundColor">Background Color:</label>
                                                <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                    backgroundColor = node;
                                                }} placeholder="BackgroundColor"
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: e.target.value,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                    defaultValue = {this.state.logo.backgroundColor}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderColor">Border Color:</label>
                                                <input type="color" className="form-control" name="borderColor" ref={node => {
                                                    borderColor = node;
                                                }} placeholder = "Border Color"
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: e.target.value, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                    defaultValue = {this.state.logo.borderColor}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <input type="number" className="form-control" name="borderRadius" min="0" max="100" ref={node => {
                                                    borderRadius=node;
                                                }} placeholder = "Border Radius"
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: e.target.value, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                    defaultValue = "0"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderWidth">Border Width:</label>
                                                <input type="number" className="form-control" name="borderWidth" min="0" max="100" ref={node => {
                                                    borderWidth=node;
                                                }} placeholder = "Border Width"
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: e.target.value,
                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                    defaultValue = "0"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Padding">Padding:</label>
                                                <input type="number" className="form-control" name="padding" min="0" max="100" ref={node => {
                                                    padding=node;
                                                }} placeholder = "Padding"
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: e.target.value, margin: this.state.logo.margin}})}
                                                    defaultValue ="0"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Margin">Margin:</label>
                                                <input type="number" className="form-control" name="margin" min="0" max="100" ref={node => {
                                                    margin=node;
                                                }} placeholder = "Margin"
                                                onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                    padding: this.state.logo.padding, margin: e.target.value}})}
                                                    defaultValue = "0"/>
                                            </div>
                                            <div class = "col-sm">
                                                <center>
                                                </center>
                                            </div>
                                        </div>
                                        <div class = "col-sm" id="logoEdit" style={{margin: "0 auto", width: "max-content"}}>
                                            <center style = {{color: this.state.logo.color, fontSize: this.state.logo.fontSize + "px", backgroundColor: this.state.logo.backgroundColor,
                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius +"px", borderWidth: this.state.logo.borderWidth +"px",
                                                    padding: this.state.logo.padding +"px", margin: this.state.logo.margin +"px", borderStyle: "solid", width: "max-content"}}>
                                                {this.state.logo.text}
                                            </center>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;