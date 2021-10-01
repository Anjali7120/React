import React from 'react';
import { connect } from 'react-redux'
import { addToCart} from '../Actions/action'
import '../index.css';
const Main = (props)=>{

//function to handle onclick event when an item added to cart
    let handleClick = (id)=>{
        props.addToCart(id); 
    }
    return (
        <div>
            {
                props.items.map((item) => {
                    return (
                        <div className="card" key={item.id}>
                            
                            <img src={item.img_url} alt=""></img><br></br>
                            <div className="card-price row center">
                                <h4>{item.name}</h4>
                                <div>
                                <h5 className="orgprice">{item.original_price?<>$</>:<></>}{item.original_price}</h5>
                                <h5 className="price">${item.final_price}<br></br></h5>
                                </div>
                            </div>

                            <p className="card-desc">  {item.description}<br></br></p>
                            
                            <button onClick={()=>{handleClick(item.id)}}>Add To Cart</button>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
  //used for dispatching actions to the store
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)