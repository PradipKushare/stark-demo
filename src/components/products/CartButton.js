import React, { Component } from 'react';
import {Button } from 'react-bootstrap';
import {connect} from "react-redux";

import {storeCartData} from '../../actions/product_action';
var myCart = require("../sub_parts/cart_function");


class CartButton extends Component {
    constructor(props){
        super(props);
        this.state = {
          btnName:'Add To Cart',
          btnClass:'primary',
        };
    }

    _saveCart = (data) => {
      let that = this;

        var addCart = {
          id: data.id,
          name: data.name,
          price: data.price,
          image: data.image,
          quantity: 1,
          subtotal: data.price * 1,
      };

      myCart.add_in_cart( data.id, addCart, 1, data.price,function(err,result) {
        var myArr = result.myArr;
          if(myArr.length > 0) {
            that.props.storeCartData(myArr);
            that.setState({btnName:'Added',btnClass:'success'})
    }
  });
}

  render() {
  const {data} = this.props;
  const {btnName,btnClass} = this.state;

    return (
        <Button variant={btnClass} onClick={(e=> this._saveCart(data))}>{btnName}</Button>             
    );
  }
}

export default connect(null, {storeCartData})(CartButton);

