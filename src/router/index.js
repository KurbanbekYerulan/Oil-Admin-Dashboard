import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresGuest: true }
  },

  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Dashboard' }
      },
      // {
      //   path: 'acc',
      //   name: 'ACC Management',
      //   component: () => import('@/views/acc/ACCList.vue'),
      //   meta: { title: 'ACC Management' }
      // },
      // {
      //   path: 'acc/create',
      //   name: 'Create ACC',
      //   component: () => import('@/views/acc/ACCCreate.vue'),
      //   meta: { title: 'Create ACC' }
      // },
      // {
      //   path: 'acc/:id',
      //   name: 'ACC Details',
      //   component: () => import('@/views/acc/ACCDetails.vue'),
      //   meta: { title: 'ACC Details' }
      // },
      // {
      //   path: 'acc/:id/edit',
      //   name: 'Edit ACC',
      //   component: () => import('@/views/acc/ACCEdit.vue'),
      //   meta: { title: 'Edit ACC' }
      // },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/employees/EmployeeList.vue'),
        meta: { title: 'Employees' }
      },
      {
        path: 'employees/create',
        name: 'Create Employee',
        component: () => import('@/views/employees/EmployeeCreate.vue'),
        meta: { title: 'Create Employee' }
      },
      {
        path: 'employees/:id',
        name: 'Employee Details',
        component: () => import('@/views/employees/EmployeeDetails.vue'),
        meta: { title: 'Employee Details' }
      },
      {
        path: 'employees/:id/edit',
        name: 'Edit Employee',
        component: () => import('@/views/employees/EmployeeEdit.vue'),
        meta: { title: 'Edit Employee' }
      },
      {
        path: 'branches',
        name: 'Branches',
        component: () => import('@/views/branches/BranchList.vue'),
        meta: { title: 'Branches' }
      },
      {
        path: 'branches/create',
        name: 'Create Branch',
        component: () => import('@/views/branches/BranchCreate.vue'),
        meta: { title: 'Create Branch' }
      },
      {
        path: 'branches/:id',
        name: 'Branch Details',
        component: () => import('@/views/branches/BranchDetails.vue'),
        meta: { title: 'Branch Details' }
      },
      {
        path: 'branches/:id/edit',
        name: 'Edit Branch',
        component: () => import('@/views/branches/BranchEdit.vue'),
        meta: { title: 'Edit Branch' }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/services/ServiceList.vue'),
        meta: { title: 'Services' }
      },
      {
        path: 'services/create',
        name: 'Create Service',
        component: () => import('@/views/services/ServiceCreate.vue'),
        meta: { title: 'Create Service' }
      },
      {
        path: 'services/:id',
        name: 'Service Details',
        component: () => import('@/views/services/ServiceDetails.vue'),
        meta: { title: 'Service Details' }
      },
      {
        path: 'services/:id/edit',
        name: 'Edit Service',
        component: () => import('@/views/services/ServiceEdit.vue'),
        meta: { title: 'Edit Service' }
      },
      {
        path: 'countries',
        name: 'Countries',
        component: () => import('@/views/countries/CountryList.vue'),
        meta: { title: 'Countries' }
      },
      {
        path: 'countries/create',
        name: 'Create Country',
        component: () => import('@/views/countries/CountryCreate.vue'),
        meta: { title: 'Create Country' }
      },
      {
        path: 'countries/:id',
        name: 'Country Details',
        component: () => import('@/views/countries/CountryDetails.vue'),
        meta: { title: 'Country Details' }
      },
      {
        path: 'countries/:id/edit',
        name: 'Edit Country',
        component: () => import('@/views/countries/CountryEdit.vue'),
        meta: { title: 'Edit Country' }
      },
      // {
      //   path: 'products',
      //   name: 'Products',
      //   component: () => import('@/views/products/ProductList.vue'),
      //   meta: { title: 'Products' }
      // },
      // {
      //   path: 'products/create',
      //   name: 'Create Product',
      //   component: () => import('@/views/products/ProductCreate.vue'),
      //   meta: { title: 'Create Product' }
      // },
      // {
      //   path: 'products/:id',
      //   name: 'Product Details',
      //   component: () => import('@/views/products/ProductDetails.vue'),
      //   meta: { title: 'Product Details' }
      // },
      // {
      //   path: 'products/:id/edit',
      //   name: 'Edit Product',
      //   component: () => import('@/views/products/ProductEdit.vue'),
      //   meta: { title: 'Edit Product' }
      // },
      // {
      //   path: 'customers',
      //   name: 'Customers',
      //   component: () => import('@/views/customers/CustomerList.vue'),
      //   meta: { title: 'Customers' }
      // },
      // {
      //   path: 'customers/create',
      //   name: 'Create Customer',
      //   component: () => import('@/views/customers/CustomerCreate.vue'),
      //   meta: { title: 'Create Customer' }
      // },
      // {
      //   path: 'customers/:id',
      //   name: 'Customer Details',
      //   component: () => import('@/views/customers/CustomerDetails.vue'),
      //   meta: { title: 'Customer Details' }
      // },
      // {
      //   path: 'customers/:id/edit',
      //   name: 'Edit Customer',
      //   component: () => import('@/views/customers/CustomerEdit.vue'),
      //   meta: { title: 'Edit Customer' }
      // },
      // {
      //   path: 'customers/:id/history',
      //   name: 'Customer History',
      //   component: () => import('@/views/customers/CustomerHistory.vue'),
      //   meta: { title: 'Customer History' }
      // },
      // {
      //   path: 'orders',
      //   name: 'Orders',
      //   component: () => import('@/views/orders/OrderList.vue'),
      //   meta: { title: 'Orders' }
      // },
      // {
      //   path: 'orders/create',
      //   name: 'Create Order',
      //   component: () => import('@/views/orders/OrderCreate.vue'),
      //   meta: { title: 'Create Order' }
      // },
      // {
      //   path: 'orders/history',
      //   name: 'Order History',
      //   component: () => import('@/views/orders/OrderHistory.vue'),
      //   meta: { title: 'Order History' }
      // },
      {
        path: 'orders/:id',
        name: 'Order Details',
        component: () => import('@/views/orders/OrderDetails.vue'),
        meta: { title: 'Order Details' }
      },
      {
        path: 'orders/:id/edit',
        name: 'Edit Order',
        component: () => import('@/views/orders/OrderEdit.vue'),
        meta: { title: 'Edit Order' }
      },
      // {
      //   path: 'reviews',
      //   name: 'Reviews',
      //   component: () => import('@/views/reviews/ReviewList.vue'),
      //   meta: { title: 'Reviews' }
      // },
      // {
      //   path: 'reviews/:id',
      //   name: 'Review Details',
      //   component: () => import('@/views/reviews/ReviewDetails.vue'),
      //   meta: { title: 'Review Details' }
      // },
      // {
      //   path: 'promotions',
      //   name: 'Promotions',
      //   component: () => import('@/views/promotions/PromotionList.vue'),
      //   meta: { title: 'Promotions' }
      // },
      // {
      //   path: 'promotions/create',
      //   name: 'Create Promotion',
      //   component: () => import('@/views/promotions/PromotionCreate.vue'),
      //   meta: { title: 'Create Promotion' }
      // },
      // {
      //   path: 'promotions/:id',
      //   name: 'Promotion Details',
      //   component: () => import('@/views/promotions/PromotionDetails.vue'),
      //   meta: { title: 'Promotion Details' }
      // },
      // {
      //   path: 'promotions/:id/edit',
      //   name: 'Edit Promotion',
      //   component: () => import('@/views/promotions/PromotionEdit.vue'),
      //   meta: { title: 'Edit Promotion' }
      // },
      // {
      //   path: 'banners',
      //   name: 'Banners',
      //   component: () => import('@/views/banners/BannerList.vue'),
      //   meta: { title: 'Banners' }
      // },
      // {
      //   path: 'banners/create',
      //   name: 'Create Banner',
      //   component: () => import('@/views/banners/BannerCreate.vue'),
      //   meta: { title: 'Create Banner' }
      // },
      // {
      //   path: 'banners/:id',
      //   name: 'Banner Details',
      //   component: () => import('@/views/banners/BannerDetails.vue'),
      //   meta: { title: 'Banner Details' }
      // },
      // {
      //   path: 'banners/:id/edit',
      //   name: 'Edit Banner',
      //   component: () => import('@/views/banners/BannerEdit.vue'),
      //   meta: { title: 'Edit Banner' }
      // },
      // {
      //   path: 'posts',
      //   name: 'Posts',
      //   component: () => import('@/views/posts/PostList.vue'),
      //   meta: { title: 'Posts' }
      // },
      // {
      //   path: 'posts/create',
      //   name: 'Create Post',
      //   component: () => import('@/views/posts/PostCreate.vue'),
      //   meta: { title: 'Create Post' }
      // },
      // {
      //   path: 'posts/:id',
      //   name: 'Post Details',
      //   component: () => import('@/views/posts/PostDetails.vue'),
      //   meta: { title: 'Post Details' }
      // },
      // {
      //   path: 'posts/:id/edit',
      //   name: 'Edit Post',
      //   component: () => import('@/views/posts/PostEdit.vue'),
      //   meta: { title: 'Edit Post' }
      // },
      // {
      //   path: 'discounts',
      //   name: 'Discounts',
      //   component: () => import('@/views/discounts/DiscountList.vue'),
      //   meta: { title: 'Discounts' }
      // },
      // {
      //   path: 'discounts/create',
      //   name: 'Create Discount',
      //   component: () => import('@/views/discounts/DiscountCreate.vue'),
      //   meta: { title: 'Create Discount' }
      // },
      // {
      //   path: 'discounts/:id',
      //   name: 'Discount Details',
      //   component: () => import('@/views/discounts/DiscountDetails.vue'),
      //   meta: { title: 'Discount Details' }
      // },
      // {
      //   path: 'discounts/:id/edit',
      //   name: 'Edit Discount',
      //   component: () => import('@/views/discounts/DiscountEdit.vue'),
      //   meta: { title: 'Edit Discount' }
      // },
      // {
      //   path: 'bonuses',
      //   name: 'Bonuses',
      //   component: () => import('@/views/bonuses/BonusList.vue'),
      //   meta: { title: 'Bonuses' }
      // },
      // {
      //   path: 'bonuses/create',
      //   name: 'Create Bonus Rule',
      //   component: () => import('@/views/bonuses/BonusCreate.vue'),
      //   meta: { title: 'Create Bonus Rule' }
      // },
      // {
      //   path: 'bonuses/:id',
      //   name: 'Bonus Rule Details',
      //   component: () => import('@/views/bonuses/BonusDetails.vue'),
      //   meta: { title: 'Bonus Rule Details' }
      // },
      // {
      //   path: 'bonuses/:id/edit',
      //   name: 'Edit Bonus Rule',
      //   component: () => import('@/views/bonuses/BonusEdit.vue'),
      //   meta: { title: 'Edit Bonus Rule' }
      // },
      // {
      //   path: 'schedule',
      //   name: 'Schedule',
      //   component: () => import('@/views/schedule/Schedule.vue'),
      //   meta: { title: 'Schedule' }
      // },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: { title: 'Profile' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Oil Admin Dashboard`;
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    return;
  }
  
  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard');
    return;
  }
  
  next();
});

export default router;
