import React from 'react';
import axios from 'commons/axios';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ToolBox from 'component/ToolBox';
import Product from 'component/Product';
import Panel from 'component/Panel';
import AddInventory from 'component/AddInventory';

class Products extends React.Component {

      state = {
        products : [],
        sourceProducts: [],
        cartNum: 0
      };

      componentDidMount() {      
        axios.get('products')
        .then( response => {
          this.setState({
            products: response.data,
            sourceProducts: response.data
          });
        });
        this.updateCartNum();
      }

    //   search
      search = text => {
        console.log(text);
        // 1.Get New Array
        let _products = [...this.state.sourceProducts]

        // 2. Filter New Array
        _products = _products.filter(p => {
            // name: Abcd text: ab ===> ['Ab']
            // 若傳入的text為空 text: '' ===> ['', '', '', '']
            const matchArray = p.name.match(new RegExp(text, 'gi')) 
            return matchArray !== null
        })
        // 3. Set State
        this.setState({
            products: _products
        })
    };

    toAdd = () => {
        Panel.open({
            component: AddInventory,
            callback: data => {
                if (data) {
                    this.add(data);
                }
            }
        });
    };

    add = product => {
        const _products = [...this.state.products]
        _products.push(product)
        const _sProducts = [...this.state.sourceProducts]
        _sProducts.push(product)

        this.setState({
            products: _products,
            sourceProducts: _sProducts
        })
    }

    update = product => {
        const _products = [...this.state.products]
        const _index = _products.findIndex(p => p.id === product.id);
        _products.splice(_index, 1, product);
        const _sProducts = [...this.state.sourceProducts]
        const _sIndex = _products.findIndex(p => p.id === product.id);
        _sProducts.splice(_sIndex, 1, product);

        this.setState({
            products: _products,
            sourceProducts: _sProducts
        })
    }

    delete = id => {
        const _products = this.state.products.filter(p => p.id !== id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    }

    updateCartNum = async () => {
        const cartNum = await this.initCartNum();
        this.setState({
            cartNum: cartNum
        });
    };

    initCartNum = async () => {
        const res = await axios.get('carts')
        const carts = res.data || []
        const cartNum = carts
        .map(cart => cart.mount) //取得商品數量的陣列
        .reduce((a, value) => a + value, 0)
        return cartNum
    }

    render() {
        return (
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum}/>
                <div className='products'>
                    <div className="columns is-multiline is-desktop">
                        <TransitionGroup component={null}>
                            {
                            this.state.products.map(p => {
                                return (
                                    <CSSTransition classNames='product-fade' timeout={{enter: 300, exit: 300}} key={p.id}>
                                        <div className="column is-3" key={p.id}>
                                            <Product 
                                                product={p} 
                                                update={this.update} 
                                                delete={this.delete}
                                                updateCartNum={this.updateCartNum}
                                            />
                                        </div>
                                    </CSSTransition>
                                );
                            })
                            }
                        </TransitionGroup>                          
                    </div>
                    <button className="button is-primary add-btn" onClick={this.toAdd}>Add</button>
                </div>
            </div>
            
        )
    }
}

export default Products;