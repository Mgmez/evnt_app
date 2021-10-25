/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
// import appsAndPages from './apps-and-pages'
// import others from './others'
// import chartsAndMaps from './charts-and-maps'
// import uiElements from './ui-elements'
// import formAndTable from './forms-and-table'
import admin from './routes/administration'
import client from './routes/client'
import provider from './routes/provider'

// eslint-disable-next-line import/no-mutable-exports
const Menu = () => {
  const provPattern = '(P|p)ro.*'
  const adminPattern = '(A|a)dm.*'
  const clientPattern = '(C|c).*'
  const { role } = JSON.parse(localStorage.getItem('userData')).data[0]
  if (role.match(adminPattern)) {
    return [...admin]
  }
  if (role.match(provPattern)) {
    return [...provider]
  }
  if (role.match(clientPattern)) {
    return [...client]
  }
  return []
}
export default Menu
// Array of sections
// export default [...admin, ...client] // ...appsAndPages, ...uiElements, ...formAndTable, ...chartsAndMaps, ...others]
