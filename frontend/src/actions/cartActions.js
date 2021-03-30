import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cartTypes'

// GetState allow us to get the entire state of the store
export const addToCart = (id, amount) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      amount,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}