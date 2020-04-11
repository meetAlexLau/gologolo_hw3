import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {
    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h3>Recent Work</h3>

                                {data.logos.sort((a,b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>
                                            <button type="button" class="btn btn-outline-dark"
                                            style = {{fontSize: "20px"}}>
                                            {logo.text}
                                            </button></Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    GoLogoLo<br />
                                    Logo Maker
                                </div>
                                <div>
                                    <Link id="add_logo_button" to="/create">
                                        <button type="button" class="btn btn-outline-primary"
                                        style= {{fontSize: "36px"}}>
                                        Add Logo
                                        </button></Link>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
