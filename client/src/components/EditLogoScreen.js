import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;



class EditLogoScreen extends Component {
    constructor() {
        super();
        this.state = {
            logo: {
                text: null,
                color: null,
                backgroundColor: null,
                borderColor: null,
                borderRadius: null,
                borderWidth: null,
                padding: null,
                margin: null
            },
            activated: false
        }
    }
    
    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id } }>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.activated == false) {
                        console.log("state activated")
                        this.setState({logo: {text: data.logo.text, color: data.logo.color,fontSize: data.logo.fontSize, backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor, borderRadius: data.logo.borderRadius, borderWidth: data.logo.borderWidth,
                            padding: data.logo.padding, margin: data.logo.margin}});
                        this.forceUpdate();
                    }
                    this.state.activated = true;
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`../view/`+data.logo._id)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                            backgroundColor:backgroundColor.value, borderColor:borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                             borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                text.value = data.logo.text;
                                                color.value = data.logo._id;
                                                fontSize.value = data.logo.fontSize;
                                                backgroundColor.value = data.logo.backgroundColor;
                                                borderColor.value = data.logo.borderColor;
                                                borderRadius.value = data.logo.borderRadius;
                                                borderWidth.value = data.logo.borderWidth;
                                                padding.value = data.logo.padding;
                                                margin.value = data.logo.margin;

                                            }}>
                                                <div class="row">
                                                    <div class = "col-sm-2">
                                                        <div className="form-group">
                                                            <label htmlFor="text">Text:</label>
                                                            <input required type="text" className="form-control" name="text" 
                                                                ref={node => {text = node;}} placeholder="Text" defaultValue={this.state.logo.text}
                                                                onChange = {(e) => this.setState({logo: {text: e.target.value, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                    borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                    padding: this.state.logo.padding, margin: this.state.logo.margin}}, console.log(this.state.logo))}
                                                                />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" ref={node => {color = node;}} 
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: e.target.value, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                            placeholder="Color" defaultValue={data.logo.color}/>

                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="number" className="form-control" name="fontSize" min = "0" max = "100" ref={node => {fontSize = node;}}
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: e.target.value, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                padding: this.state.logo.padding, margin: this.state.logo.margin}}, console.log(e.target.value))}
                                                             placeholder="Font Size" defaultValue={this.state.logo.fontSize} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" className="form-control" name="backgroundColor" ref={node => {backgroundColor = node;}} 
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: e.target.value,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                             placeholder="Background Color" defaultValue={data.logo.backgroundColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" ref={node => {borderColor = node;}}
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: e.target.value, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                             placeholder = "Border Color" defaultValue={data.logo.borderColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="number" className="form-control" name="borderRadius" min = "0" max ="100" ref={node => {borderRadius=node;}}
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: e.target.value, borderWidth: this.state.logo.borderWidth,
                                                                padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                             placeholder = "Border Radius" defaultValue={this.state.logo.borderRadius}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderWidth">Border Width:</label>
                                                            <input type="number" className="form-control" name="borderWidth" min = "0" max = "100" ref={node => {borderWidth=node;}}
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: e.target.value,
                                                                padding: this.state.logo.padding, margin: this.state.logo.margin}})}
                                                             placeholder = "Border Width" defaultValue={this.state.logo.borderWidth}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="Padding">Padding:</label>
                                                            <input type="number" className="form-control" name="padding" min = "0" max = "100" ref={node => {padding=node;}}
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                padding: e.target.value, margin: this.state.logo.margin}})}
                                                             placeholder = "Padding" defaultValue={this.state.logo.padding}/>

                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="Margin">Margin:</label>
                                                            <input type="number" className="form-control" name="margin" min ="0" max="100" ref={node => {margin=node;}}
                                                            onChange = {(e) => this.setState({logo: {text: this.state.logo.text, color: this.state.logo.color, fontSize: this.state.logo.fontSize, backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius, borderWidth: this.state.logo.borderWidth,
                                                                padding: this.state.logo.padding, margin: e.target.value}})}
                                                             placeholder = "Margin" defaultValue={this.state.logo.margin}/>
                                                        </div>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>

                                                    <div class = "col-sm" id="logoEdit" style={{margin: "0 auto", width: "max-content"}}>
                                                        <center style = {{color: this.state.logo.color, fontSize: this.state.logo.fontSize + "px", backgroundColor: this.state.logo.backgroundColor,
                                                                borderColor: this.state.logo.borderColor, borderRadius: this.state.logo.borderRadius +"px", borderWidth: this.state.logo.borderWidth +"px",
                                                                padding: this.state.logo.padding +"px", margin: this.state.logo.margin +"px", borderStyle: "solid", width: "max-content"}}>
                                                            {this.state.logo.text}
                                                        </center>
                                                    </div>
                                                </div>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;