import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddCategoryView from '../views/Category/AddCategoryView.vue'
import CategoryView from '../views/Category/CategoryView.vue'
import EditCategory from '../views/Category/EditCategory.vue'
import ListProduct from '../views/Category/ListProduct.vue'
import AddProduct from '@/views/Product/AddProduct.vue'
import Product from '@/views/Product/ProductView.vue'
import EditProduct from '@/views/Product/EditProduct.vue'
import ProductDeyail from '@/views/Product/ProductDetail.vue'
import WishList from '@/views/Product/WishList.vue'
import AdminView from '@/views/AdminView.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import Cart from '@/views/CartView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin/category/add',
    name: 'AddCategoryView',
    component: AddCategoryView
  },
  {
    path: '/admin/category/',
    name: 'CategoryView',
    component: CategoryView
  },
  {
    path: '/admin/category/:id',
    name: 'EditCategory',
    component: EditCategory
  },
  {
    path: "/admin/product/add",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/admin/product",
    name: "AdminProduct",
    component: Product
  },
  {
    path: "/admin/product/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/admin",
    name: "AdminView",
    component: AdminView,
  },
  {
    path : '/product/show/:id',
    name : 'ProductDeyail',
    component: ProductDeyail
  },
  {
    path : '/category/show/:id',
    name : 'ListProduct',
    component: ListProduct
  },
  {
    path : '/signup',
    name : 'SignUp',
    component: SignUp
  },
  {
    path : '/signin',
    name : 'SignIn',
    component: SignIn
  },
  {
    path : '/wishlist',
    name : 'WishList',
    component: WishList
  },
  {
    path : '/cart',
    name : 'Cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
