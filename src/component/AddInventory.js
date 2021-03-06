import React from "react";
import { toast } from 'react-toastify';
import axios from "commons/axios";


class AddInventory extends React.Component {

    state = {
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available'
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState ({
            [name]: value
        });
    };

    submit = e => {
        e.preventDefault();
        const product = {...this.state};
        axios.post('products', product).then(res => {
            this.props.close(res.data);
            toast.success('Add Success');
        });
    };


    render() {
        return (
        <div className="inventory">
            <p className="title has-text-centered">Inventory</p>
            <form onSubmit={this.submit}>
                <div className="field">
                    <div className="control">
                    <label htmlFor="" className="label">Name</label>
                        <textarea name="name" className="textarea" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">     
                    <div className="control">
                    <label htmlFor="" className="label">Price</label>
                        <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">     
                    <div className="control">
                    <label htmlFor="" className="label">Tage</label>
                        <input type="text" className="input" name="tags" value={this.state.tags} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">  
                    <div className="control">
                    <label htmlFor="" className="label">Image</label>
                        <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                    <label htmlFor="" className="label">Status</label>
                        <div className="select is-fullwidth">
                            <select name="" id="" className="status" value={this.state.status} onChange={this.handleChange}>
                                <option value="">available</option>
                                <option value="">unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button" type="button" onClick={() => { this.props.close() }}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

export default AddInventory;