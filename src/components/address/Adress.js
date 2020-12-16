import React, { Component,useState } from 'react';
import { Container,Row,Form,Button,Col } from 'react-bootstrap';
import {storeAddress} from '../../actions/product_action';
import {connect} from "react-redux";

 const Adress = (props) => {

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const _goToNext = () => {
    const address = {
      address1:address1,
      address2:address2,
      country:country,
      state:state,
      city:city,

    }
    props.storeAddress(address);
    props.history.push('/cart');
  }

  const enabled = address1 && address2 && country && state && city !== '';
  
    return (
        <React.Fragment>
           <Container>
                <Row style={{marginTop:10}}>
                  <Col md={7}>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control type="text" placeholder="Address line 1" onChange={e => setAddress1(e.target.value)}/>
                  </Col>

                  <Col md={7}>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control type="text" placeholder="Address line 2" onChange={e => setAddress2(e.target.value)}/>
                  </Col>

                  <Col md={7}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" onChange={e => setCountry(e.target.value)}/>
                  </Col>

                  <Col md={7}>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" onChange={e => setState(e.target.value)}/>
                  </Col>

                  <Col md={7}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" onChange={e => setCity(e.target.value)}/>
                  </Col>

            </Row>
            <Row style={{marginTop:10}}>
                <Button variant="primary" onClick={_goToNext} disabled={!enabled} className="AddressSubmitBtn">
                  Submit
                </Button>
            </Row>
            </Container>
        </React.Fragment>
    );
}
export default connect(null, {storeAddress})(Adress);