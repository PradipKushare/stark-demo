import React, { Component } from 'react';
import {connect} from "react-redux";
import {storeCartData} from '../../actions/product_action';
var myCart = require("../sub_parts/cart_function");

class UpdateQuantity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            quantity:null,
        };
    }

    componentDidMount() {
        let cart = this.props.cart;
        this.setState({quantity:cart.quantity,items:cart})
    }

    _saveInCart = (id,data,quantity,price) => {
        let that = this;
            myCart.add_in_cart(id, data, quantity, price, function (err, result) {
                var myArr = result.myArr;
                    if (myArr.length > 0) {
                        that.props.storeCartData(myArr);                    
                }
            });
    }

    decrement(price, id, quantity, data) {
        if (quantity > 1) {
                this._saveInCart(id, data, parseInt(quantity) - 1,price);
                this.setState({ quantity: parseInt(quantity) - 1 })
            }
    }

    increment(price, id, quantity, data) {
                this._saveInCart(id, data, parseInt(quantity) + 1,price);
                this.setState({ quantity: parseInt(quantity) + 1 })
    }

  render() {
    const {quantity,items} = this.state;

    return (
              <div className="quantity product-quantity">
                <span className="btn" onClick={() => this.decrement(items.price, items.id,quantity,items)}>
                        <i className="fa fa-minus"></i>
                    </span>
                     <input type="text" className="form-control qty quantity-field cart_quantity" 
                        min="1" name="qty" value={quantity}
                      />
                    <span className="btn" onClick={() => this.increment(items.price, items.id,quantity,items)}>
                    <i className="fa fa-plus">
                    </i></span>
                </div>
    );
  }
}

export default connect(null, {storeCartData})(UpdateQuantity);
