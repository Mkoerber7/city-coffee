import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../ducks/reducer";

class Shop extends Component {
  componentDidMount(props) {
    this.props.getProducts();
    console.log(props)
  }
    render() {
      let productList;
      if(this.props.products.length !== undefined && this.props.products.length !== 0) {
        productList = this.props.products.map((curr, index) => {
        return (<Link to = {`/product/${index}`} key = {index}> <div className='products-container' key = {index}>
        <h2 className="prod-names">{curr.name}</h2>
        <img id = 'product-img' src={require(`../assets/${curr.img_url}`)} alt="product images"/>
        <div>{curr.price}</div>
        </div></Link>)
        })
      } 
        return (
          <div className="shop-container">
            <h1 className="shop-title">Propane and Propane Accessories</h1>
            <div className="container-container">
              {productList}
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getProducts })(Shop);