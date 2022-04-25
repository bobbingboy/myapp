import React from "react";
import { toast } from 'react-toastify';
import axios from "commons/axios";


class EditInventory extends React.Component {

    state = {
        id: '',
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available'
    }

    componentDidMount() {
        const {id, name, price, tags, image, status} = this.props.product;
        this.setState({
            id,
            name,
            price,
            tags, 
            image,
            status
        })
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
        axios.put(`products/${this.state.id}`, product).then(res => {
            this.props.close(res.data);
            toast.success('Edit Success');
        });
    };

    onDelete = () => {
        axios.delete(`products/${this.state.id}`).then(res => {
            this.props.deleteProduct(this.state.id);
            this.props.close();
            toast.success('Delete Success');
        });
    }


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
                        <button className="button is-danger" type="button" onClick={this.onDelete}>Delete</button>
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

export default EditInventory;