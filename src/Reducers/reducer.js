import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY } from '../Actions/constants'
import cards from '../data.json';

//intialstate for store and reducer function
const initState = {
    items: cards,    //store the carddetail json   
    addedItems:[],   // store the cardsdetail  that has been added into the cart 
    totalQuantity:0,  // store the number of item in the cart
    total: 0           // store the total price  

}

//it is a reducer function passed in createStore function in index.js file
const cartReducer= (state = initState,action)=>{
   
    //INSIDE MAIN COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
             //if it exists change the quantity of that item in addedItems
            state.addedItems.find(item=> action.id === item.id).quantity +=1;

            addedItem.quantity =state.addedItems.find(item=> item.id === action.id).quantity
             return{
                ...state, //use spread operator to create a copy of the state to preserve the previous state
                 totalQuantity: state.totalQuantity+1,
                 total: state.total + addedItem.final_price 
                  }
        }
         else{
             //if it not exist the set the addedItem quantity by 1
            addedItem.quantity = 1;
            //calculating the total
            let newtotalQuantity=state.totalQuantity+1;
            let newTotal = state.total + addedItem.final_price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem], //now store the previous addedItems and new addedItem in addedItems
                totalQuantity:newtotalQuantity,
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)// find item in addedItems that userr want to remove
        let new_items = state.addedItems.filter(item=> action.id !== item.id) //now store every card detail in new_items except the item user want to remove
        
        //removing Quantity of removed item from totalQuantity
        let newtotalQuantity=state.totalQuantity-state.addedItems.find(item=> action.id === item.id).quantity;
        //calculating the total
        let newTotal = state.total - (itemToRemove.final_price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            totalQuantity:newtotalQuantity,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        //adding quantity
        state.addedItems.find(item=> item.id === action.id).quantity+=1
          addedItem.quantity =  state.addedItems.find(item=> item.id === action.id).quantity
          let newtotalQuantity=state.totalQuantity+1;
          
          //calculating total price
          let newTotal = state.total + addedItem.final_price
          return{
              ...state,
              totalQuantity:newtotalQuantity,  
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newtotalQuantity=state.totalQuantity-1;
            let newTotal = state.total - addedItem.final_price
            return{
                ...state,
                addedItems: new_items,
                totalQuantity:newtotalQuantity,
                total: newTotal
            }
        }
        else {
            state.addedItems.find(item=> item.id === action.id).quantity -=1
            addedItem.quantity =state.addedItems.find(item=> item.id === action.id).quantity
            let newtotalQuantity=state.totalQuantity-1;
            let newTotal = state.total - addedItem.final_price
            return{
                ...state,
                totalQuantity:newtotalQuantity,
                total: newTotal
            }
        }
        
    }
  else{
    return state
    }
    
}

export default cartReducer
