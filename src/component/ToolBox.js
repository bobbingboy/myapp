import React from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

class ToolBox extends React.Component {

    state = {
        searchText: ''
        
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({
            searchText: value
        });
        this.props.search(value)
    };

    clearSearchText = () => {
        this.setState({
            searchText: ''
        });
        this.props.search('')
    };

    goCart = () => {
        console.log('HAHAHHAHAH');
        if (!global.Auth.isLogin()) {
            toast.info('Please Login First');
            return;
        }

    }

    

    render() {
        return (
            <div className="tool-box">
                <div className="logo-text">STORE</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                                type="text" 
                                className="input search-input" 
                                placeholder="Search Product"
                                value={this.state.searchText}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                <Link to="/carts" className="cart-box" onClick={this.goCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </Link>
            </div>
        );
    }
}

export default ToolBox;