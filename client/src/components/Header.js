import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (<li><a href="/auth/google">Sign in with Google</a></li>);
            default:
                return [
                    <li key="2"><Payments/></li>,
                    <li key="1" style = {{ margin: '0px 10px'}}>Credits: {this.props.auth.credits}</li>,
                <li key="3"><a href="/api/logout">Sign out</a></li>
                ];
            }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/survey' : '/'} className="brand-logo">Feedback</Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);