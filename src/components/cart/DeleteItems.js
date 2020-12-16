import React, { Component } from 'react';
import { Fragment } from 'react';
import {connect} from "react-redux";
import {storeCartData} from '../../actions/product_action';
var myCart = require("../sub_parts/cart_function");

class DeleteItems extends Component {
    
    componentDidMount() {
        let cart = this.props.cart;
        this.setState({quantity:cart.quantity,items:cart})
    }

    _deleteItem = (id) => {
        let that = this;
        myCart.removeProduct(id, function(err,result){
            if (result.success) {
                var myArr = result.myArr;
                    that.props.storeCartData(myArr);
            }
        });
    }

  render() {
    const {cart} = this.props;
    return (
        <Fragment>
                <i className="fa fa-trash" onClick={() => this._deleteItem(cart.id)}></i>Remove
        </Fragment>
    );
  }
}

export default connect(null, {storeCartData})(DeleteItems);