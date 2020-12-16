import React, { Component } from 'react';
import {connect} from "react-redux";
import UpdateQuantity from './UpdateQuantity';
import DeleteItems from "./DeleteItems";
import SweetAlert from "react-bootstrap-sweetalert";
const imgPAth = '../../assets/images/';

class Cart extends Component {
  constructor(props){
    super(props);
      this.state = {
          isSuccess:false,
      };
  }

  hideAlert = () => {
    this.setState({ isSuccess: false });
  }

  _purchaseOrder = () => {
    this.setState({ isSuccess: true });
  }

  render() {
  const {storeAddress} = this.props.productStore;
  const {storedCartData} = this.props.productStore;

    return (
      <React.Fragment>
        <div className="container">
              <div className="row align-items-start">
                <div className="col-md-8">
                {this.state.isSuccess && 
                  <SweetAlert
                    type="success"
                    style={{ display: "block" }}
                    title="Spark Digital"
                    allowEscape={false}
                    onConfirm={this.hideAlert}
                    onCancel={this.hideAlert}
                    confirmBtnBsStyle="info" >
                     Your Order is purchased! Thank you.
                  </SweetAlert> }
                  
                  {storedCartData && storedCartData.length > 0 && storedCartData.map((cart)=>(
                    <div className="card cart_card" style={{height:150}} key={cart.id}>
                   <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <img src={imgPAth+cart.image} className="img-fluid product_img" alt="..." />
                    </div>
                    <div className="col-md-6">
                        <div className="product-heading">
                          <h6>{cart.name}</h6>
                        </div>
                        <div className="remove-icon">
                        <span>
                          <DeleteItems cart={cart} />
                        </span>
                        </div>
                    </div>
                    <div className="col-md-3">
                      <UpdateQuantity cart={cart} />
                  
                      <div className="price-box">
                        <span className="price-amount">Rs. {cart.subtotal}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                 </div>
                 ))}

                 {storedCartData.length == 0  && <span>No Records</span>} 
                </div>
                <div className="col-md-4">
                  <div className="card cart_card">
                   <div className="card-body">
                     <div className="address_parent">
                       <h6>Address:</h6>
                          {storeAddress.address1}, {storeAddress.address2}, <br />
                          {storeAddress.country},{storeAddress.state}, {storeAddress.city}
                     </div>
                      <h5 style={{padding:'20px 0px'}}>Total Amount is:</h5>
                      <h6 style={{paddingBottom:'20px'}}>{localStorage.getItem('cartTolAmt')}</h6>
                      <button type="button" className="btn btn-primary w-100" onClick={this._purchaseOrder}>Checkout</button>
                    </div>
                  </div>
            </div>
          </div>
          </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    productStore: state.productStore,
  }
}

export default connect(mapStateToProps, {})(Cart);
