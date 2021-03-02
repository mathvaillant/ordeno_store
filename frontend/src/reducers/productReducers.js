/* a reducer takes an initialState and an action
 The action reducer dispatch an action (object) that has a type 
 and might also contain a payload(data) */

import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

// @Handling the state of the products list (initialState, action)
export const productListReducer = (state = { products: [] }, action) => {
  // to evaluate the type of the action object use switch

  // productListReducer has 3 types of actions:
  // #1 Requesting the list of products
  // #2 if requesting the list of products is successful
  // #3 if it fails
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
