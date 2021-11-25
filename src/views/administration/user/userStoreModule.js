import axios from '@axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  namespaced: true,
  state: {
    roles: [],
  },
  getters: {
    getRoles(state) {
      return state.roles
    },
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
  },
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(buildServiceUrl('/user'), { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      console.log(id)
      return new Promise((resolve, reject) => {
        axios
          .get(buildServiceUrl(`/user/${id}`))
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      axios
        .post(buildServiceUrl('/user'), userData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    updateUser(ctx, { id, data }) {
      console.log(id)
      console.log(data)
      const email = new Promise((resolve, reject) => {
        axios
          .patch(buildServiceUrl(`/user/email/${id}`), { email: data.email })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
      const role = new Promise((resolve, reject) => {
        axios
          .patch(buildServiceUrl(`/user/role/${id}`), { role: data.role.id })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
      const plan = new Promise((resolve, reject) => {
        axios
          .patch(buildServiceUrl(`/user/plan/${id}`), { plan: data.plan })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
      if (data.email !== '' || data.email !== undefined) {
        Promise.resolve(email)
      }
      if (data.plan !== '' || data.plan !== undefined) {
        Promise.resolve(role)
      }
      if (data.plan !== '' || data.plan !== undefined) {
        Promise.resolve(plan)
      }
    },
    deleteUser(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(buildServiceUrl(`/user/${id}`))
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchRoles(ctx) {
      axios.get(buildServiceUrl('/role'), { params: { page: 1, limit: 10 } })
        .then(response => ctx.commit('setRoles', response.data.items.map(e => ({ label: e.name, value: e.id }))))
        .catch(error => console.log(error))
    },
  },
}
