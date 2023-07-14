import axios from "axios";


export function fetchItems() {
  return axios.get('http://localhost:8080/cart');
}

export function addItem(item) {
  return axios.post('http://localhost:8080/cart',item);
}

export function deleteItem(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`,id);
}

export function updateItem(id,change) {
  return axios.patch(`http://localhost:8080/cart/${id}`,change);
}


