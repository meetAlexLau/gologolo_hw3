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

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
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
                                                            <input type="text" className="form-control" name="text"
                                                            onChange = {
                                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                                    backgroundColor:backgroundColor.value, borderColor:borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                                     borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } })
                                                                }
                                                            ref={node => {text = node;}
                                                            } placeholder="Text" defaultValue={data.logo.text} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" ref={node => {
                                                                color = node;
                                                            }} placeholder="Color" defaultValue={data.logo.color} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="number" className="form-control" name="fontSize" min = "0" max = "100" ref={node => {
                                                                fontSize = node;
                                                            }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="BackgroundColor" defaultValue={data.logo.backgroundColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                borderColor = node;
                                                            }} placeholder = "Border Color" defaultValue={data.logo.borderColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="number" className="form-control" name="borderRadius" min = "0" max ="100" ref={node => {
                                                                borderRadius=node;
                                                            }} placeholder = "Border Radius" defaultValue={data.logo.borderRadius}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderWidth">Border Width:</label>
                                                            <input type="number" className="form-control" name="borderWidth" min = "0" max = "100" ref={node => {
                                                                borderWidth=node;
                                                            }} placeholder = "Border Width" defaultValue={data.logo.borderWidth}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="Padding">Padding:</label>
                                                            <input type="number" className="form-control" name="padding" min = "0" max = "100" ref={node => {
                                                                padding=node;
                                                            }} placeholder = "Padding" defaultValue={data.logo.padding}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="Margin">Margin:</label>
                                                            <input type="number" className="form-control" name="margin" min ="0" max="100" ref={node => {
                                                                margin=node;
                                                            }} placeholder = "Margin" defaultValue={data.logo.margin}/>
                                                        </div>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>

                                                    <div class = "col-sm">
                                                        <center style = {{color: data.logo.color, fontSize: data.logo.fontSize, backgroundColor: data.logo.backgroundColor,
                                                                borderColor: data.logo.borderColor, borderRadius: data.logo.borderRadius, borderWidth: data.logo.borderWidth,
                                                                padding: data.logo.padding, margin: data.logo.margin, borderStyle: "solid"}}>
                                                            {data.logo.text}
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