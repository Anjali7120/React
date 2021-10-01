import React from 'react';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { connect } from 'react-redux'
import { addToCart} from '../Actions/action'
import { Link } from 'react-router-dom';
import '../index.css';
const Navbar = (props)=>{
    
  
    return(
        <header className="row block center">
            
            <div className="row">
            <img  src='https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_logo.svg' alt="" ></img>
            <Link to='/'>
                <h3>Happay</h3>
            </Link>    
            </div>
            <div className="row">
            <Link to="/cart">
            <Badge color="secondary" badgeContent={props.items} >
                <ShoppingCartIcon />{" "}
            </Badge>
            </Link>
            </div>
            
        </header>
    )
}


const mapStateToProps = (state)=>{
    return {
      items: state.totalQuantity
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
