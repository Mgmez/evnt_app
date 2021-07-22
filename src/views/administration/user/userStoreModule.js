import axios from '@axios'
import { buildUserServiceUrl } from '@/constants/urls'

export default {
  namespaced: true,
  state: {
    _roles: [],
  },
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(buildUserServiceUrl('/user'), { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(buildUserServiceUrl(`/user/${id}`))
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/user/users', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    async fetchRoles() {
      const { data } = await axios.get(buildUserServiceUrl('/role'), { params: { page: 1, limit: 10 } })
      console.log(data)
    },
  },
}
