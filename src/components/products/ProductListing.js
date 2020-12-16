import React, { Component } from 'react';
import { Container,Row,Col,Card,Button } from 'react-bootstrap';
import {productList} from '../sub_parts/product_json';
import {connect} from "react-redux";

import {saveItemData} from '../../actions/product_action';

import CartButton from './CartButton';
const imgPAth = '../../assets/images/';
class ProductListing extends Component {

    componentDidMount = ()  => {
        localStorage.clear();

        this.props.saveItemData(productList);
    }

    _goAddress = () => {
        this.props.history.push('/address');
    }

  render() {
  const {productList} = this.props.productStore;
  const {storedCartData} = this.props.productStore

    return (
        <React.Fragment>
             <Container>
                <Row style={{marginTop:10}}>
                    {productList && productList.map((data)=>(
                    <Col key={data.id} style={{marginBottom:10}}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={imgPAth+data.image} />
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                            <span className="price">Price: {data.price}</span>
                            </Card.Text>
                                <CartButton data={data}/>
                        </Card.Body>
                        </Card>
                        </Col>
                        ))}
                </Row>
                <Row style={{marginTop:10}}>
                    <Col md={10}></Col>
                        <Col md={2}>
                                <Button variant="secondary" disabled={storedCartData.length == 0} onClick={this._goAddress}>Go Next</Button>    
                        </Col>
                </Row>
                </Container>
        </React.Fragment>
    );
  }
}



const mapStateToProps = state => {
  return {
    productStore: state.productStore,
  }
}

export default connect(mapStateToProps, {saveItemData})(ProductListing);