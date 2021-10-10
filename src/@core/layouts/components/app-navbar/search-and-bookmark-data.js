/* eslint-disable */
// prettier-ignore
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'

const getCategories = async () =>{

  try {
    const res = await axios.get(buildServiceUrl(`/category?page=${1}&limit=${100}`))
    const routes = []
  
    for (let idx = 0; idx < res.data.items.length; idx++) {
      const element = res.data.items[idx];
      let route = {}
      route.title = element.name
      route.route = {
        name : `subcategory-list`,
        params: { id: element.id, name: element.name },
      }
      route.icon = element.image_url
      route.isBookmarked = false
      routes.push(route)
    }
    return routes
  }
  catch(err){
    console.log(err)
  } 

  /*return [
    { title: 'Access Control', route: { name: 'access-control' }, icon: 'ShieldIcon', isBookmarked: false },
    { title: 'Account Settings', route: { name: 'pages-account-setting' }, icon: 'SettingsIcon', isBookmarked: false },
  ]*/
}

const getSubCategories = async() =>{
  
  try {
    const res = await axios.get(buildServiceUrl(`/sub-category?page=${1}&limit=${100}`))
  
    console.log('object sub cats');
    console.log(res.data.items)
    const routes = []
  
    for (let idx = 0; idx < res.data.items.length; idx++) {
      const element = res.data.items[idx];
      let route = {}
      route.title = element.name
      route.route = {
        name : `provider-list`,
        params: { id: element.id, name: element.name },
      }
      route.icon = element.image_url
      route.isBookmarked = false
      routes.push(route)
    }
    return routes
  }
  catch(err){
    console.log(err)
  } 
  /*return [
    {
      file_name: "Joe's CV",
      from: 'Stacy Watson',
      icon: require('@/assets/images/icons/doc.png'),
      size: '1.7 mb',
      route: { name: 'access-control' },
    },
  ]*/
}

const getProviders = async() =>{
  
  try {
    const res = await axios.get(buildServiceUrl(`/provider?page=${1}&limit=${100}`))
    const routes = []
  
    for (let idx = 0; idx < res.data.items.length; idx++) {
      const element = res.data.items[idx];
      let route = {}
      route.title = element.name
      route.route = {
        name : `provider-profile`,
        params: { id: element.id },
      }
      route.icon = element.logo_url
      route.isBookmarked = false
      route.email = element.user.email
      routes.push(route)
    }
    return routes
  }
  catch(err){
    console.log(err)
  } 
  /*return [
    {
      file_name: "Joe's CV",
      from: 'Stacy Watson',
      icon: require('@/assets/images/icons/doc.png'),
      size: '1.7 mb',
      route: { name: 'access-control' },
    },
  ]*/
}

export default {
  categorias: {
    key: 'title',
    data: getCategories(),
  },
  subcategorias: {
    key: 'title',
    data: getSubCategories(),
  },
  proveedores: {
    key: 'title',
    data: getProviders()
  },
}
/* eslint-enable */
