import axios from '@axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  namespaced: true,
  state: {
    roles: [],
  },
  getters: {
    getUsers(state) {
      return state.roles
    },
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
  },
  actions: {
    fetchCustomers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(buildServiceUrl('/customer'), { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCustomer(ctx, { id }) {
      console.log(id)
      return new Promise((resolve, reject) => {
        axios
          .get(buildServiceUrl(`/customer/${id}`))
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCustomer(ctx, customerData) {
      axios
        .post(buildServiceUrl('/customer'), customerData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    updateCustomer(ctx, { id, data }) {
      const payload = data
      console.log(id)
      console.log(data)
      const update = new Promise((resolve, reject) => {
        delete payload.user
        axios
          .patch(buildServiceUrl(`/customer/${id}`), payload)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
      Promise.resolve(update)
    },
    deleteCustomer(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(buildServiceUrl(`/customer/${id}`))
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchRoles(ctx) {
      axios.get(buildServiceUrl('/user'), { params: { page: 1, limit: 10 } })
        .then(response => ctx.commit('setRoles', response.data.items.map(e => ({ label: e.email, value: e.id }))))
        .catch(error => console.log(error))
    },
  },
}
