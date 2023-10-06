import { axios } from './api';

export const searchOrder = (params) => {
  return axios.get('/orders/search', { params })
    .then((res) => res.data)
}

export const getOrder = (id) => {
  return axios.get(`/orders/${id}`)
    .then((res) => res.data)
}
