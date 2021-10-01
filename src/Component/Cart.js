import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { removeItem,addQuantity,subtractQuantity} from '../Actions/action'

const Cart = (props)=>{
    let totalDiscount=0;
    let Total=0;
    let deliveryFee=0;
    let TC=0;
    if(props.total!==0)
    {
        deliveryFee=5;
        TC=2;
        Total=props.total+deliveryFee+TC;
    }
    else
    {
        Total=0;
    }
    //to remove the item completely
    let handleRemove = (id)=>{
        props.removeItem(id);
    }
    //to add the quantity
    let handleAddQuantity = (id)=>{
        props.addQuantity(id);
    }
    //to substruct from the quantity
    let handleSubtractQuantity = (id)=>{
        props.subtractQuantity(id);
    }
    
    return(
        <div>
        <Link to="/"> Back to home</Link>
        <div className="container">
            <div className="divide">
                <h1>Order Summary (items : {props.count})</h1>
                <hr></hr>
                <table className="table1">
                    <thead > 
                        <tr className="thead1">
                        <th>S.No</th>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <td colSpan="4"><hr></hr></td>
                    {   props.items.map((item,i) => {
                            return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                    <div className="add-remove">
                                        
                                    <Link to="/cart"><button className="btn pink remove" onClick={()=>{handleAddQuantity(item.id)}}>+</button></Link>
                                    {item.quantity}
                                    <Link to="/cart"><button className="btn pink remove" onClick={()=>{handleSubtractQuantity(item.id)}}>-</button></Link>
                                
                                    </div>
                                    </td>
                                    <td>
                                    <button onClick={()=>{handleRemove(item.id)}}>Remove</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 

                <div>
                    <hr>
                    </hr>
                    <Link to="/"> + Add more items</Link>
        
                </div>
            </div>
            <div className="divide">
                <h2>Price Details</h2>
                <hr></hr>
                {props.items.map((item) => {
                    let v=item.final_price*item.quantity;
                    //console.log(" hbhb",item.original_price);
                    if(item.original_price!=null)
                     {totalDiscount +=item.quantity*(item.original_price-item.final_price);}
                        return (
                            <div className="row block center">
                                <div className="row">
                                {item.quantity}  X  ${item.final_price}.00
                                </div>
                                <div className="row">${v}.00</div>
                            </div>

                                                        
                        )
                    })
                    
                }
                <hr></hr>
                <div className="row block center">
                    <div className="row">Total savings</div>
                    <div className="row txtcol" >-${totalDiscount}.00</div>
                </div>
                
                <div className="row block center">
                    <div className="row">Delivery Fee</div>
                    <div className="row">${deliveryFee}.00</div>
                </div>
                
                <div className="row block center">
                    <div className="row">Taxes and Charges</div>
                    <div className="row">${TC}.00</div>
                </div>
                <hr></hr>
                <div className="row block center">
                    <div className="row"><b>To Pay</b></div>
                    <div className="row"><b>${Total}.00</b></div>
                </div>
                <button className="btn1">Place Order</button>
                
            </div>
        </div>
        </div>
        
    )
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        total: state.total,
        count:state.totalQuantity
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)