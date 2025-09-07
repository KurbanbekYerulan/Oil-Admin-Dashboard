<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ i18nStore.t('dashboard.title') }}</h1>
        <p class="mt-2 text-sm text-gray-700">
          {{ i18nStore.t('dashboard.subtitle') }}
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button class="btn-primary">
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ i18nStore.t('dashboard.newOrder') }}
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ i18nStore.t('dashboard.totalRevenue') }}</p>
            <p class="text-2xl font-semibold text-gray-900">$24,780</p>
            <p class="text-sm text-success-600 flex items-center">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              +12% {{ i18nStore.t('dashboard.fromLastMonth') }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 bg-success-100 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ i18nStore.t('dashboard.totalCustomers') }}</p>
            <p class="text-2xl font-semibold text-gray-900">1,234</p>
            <p class="text-sm text-success-600 flex items-center">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              +8% {{ i18nStore.t('dashboard.fromLastMonth') }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ i18nStore.t('dashboard.totalOrders') }}</p>
            <p class="text-2xl font-semibold text-gray-900">567</p>
            <p class="text-sm text-success-600 flex items-center">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              +15% {{ i18nStore.t('dashboard.fromLastMonth') }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 bg-danger-100 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ i18nStore.t('dashboard.pendingOrders') }}</p>
            <p class="text-2xl font-semibold text-gray-900">23</p>
            <p class="text-sm text-danger-600 flex items-center">
              <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586l3.293-3.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              -5% {{ i18nStore.t('dashboard.fromLastMonth') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ i18nStore.t('dashboard.revenueOverview') }}</h3>
          <select class="input-field w-auto">
            <option>{{ i18nStore.t('dashboard.last7Days') }}</option>
            <option>{{ i18nStore.t('dashboard.last30Days') }}</option>
            <option>{{ i18nStore.t('dashboard.last3Months') }}</option>
          </select>
        </div>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>{{ i18nStore.t('dashboard.chartPlaceholder') }}</p>
            <p class="text-sm">{{ i18nStore.t('dashboard.revenueDataViz') }}</p>
          </div>
        </div>
      </div>

      <!-- Orders Chart -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ i18nStore.t('dashboard.ordersOverview') }}</h3>
          <select class="input-field w-auto">
            <option>{{ i18nStore.t('dashboard.last7Days') }}</option>
            <option>{{ i18nStore.t('dashboard.last30Days') }}</option>
            <option>{{ i18nStore.t('dashboard.last3Months') }}</option>
          </select>
        </div>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>{{ i18nStore.t('dashboard.chartPlaceholder') }}</p>
            <p class="text-sm">{{ i18nStore.t('dashboard.ordersDataViz') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Orders -->
      <div class="card lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ i18nStore.t('dashboard.recentOrders') }}</h3>
          <router-link to="/orders" class="text-sm text-primary-600 hover:text-primary-500">
            {{ i18nStore.t('dashboard.viewAll') }}
          </router-link>
        </div>
        <div class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <div class="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-primary-700">#{{ order.id }}</span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ order.customer }}</p>
                <p class="text-sm text-gray-500">{{ order.service }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">${{ order.amount }}</p>
              <span :class="getStatusClass(order.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ i18nStore.t(`dashboard.orderStatus.${order.status}`) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ i18nStore.t('dashboard.quickActions') }}</h3>
        <div class="space-y-3">
          <router-link
            to="/orders/create"
            class="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg class="h-5 w-5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ i18nStore.t('dashboard.createNewOrder') }}
          </router-link>
          
          <router-link
            to="/customers/create"
            class="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg class="h-5 w-5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            {{ i18nStore.t('dashboard.addNewCustomer') }}
          </router-link>
          
          <router-link
            to="/services/create"
            class="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg class="h-5 w-5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ i18nStore.t('dashboard.addNewService') }}
          </router-link>
          
          <router-link
            to="/schedule"
            class="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg class="h-5 w-5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ i18nStore.t('dashboard.viewSchedule') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18nStore } from '@/stores/i18n';

export default {
  name: 'Dashboard',
  setup() {
    const i18nStore = useI18nStore();
    const recentOrders = ref([
      {
        id: '001',
        customer: 'John Doe',
        service: 'Oil Change',
        amount: '45.00',
        status: 'completed'
      },
      {
        id: '002',
        customer: 'Jane Smith',
        service: 'Brake Service',
        amount: '120.00',
        status: 'inProgress'
      },
      {
        id: '003',
        customer: 'Mike Johnson',
        service: 'Tire Rotation',
        amount: '35.00',
        status: 'pending'
      },
      {
        id: '004',
        customer: 'Sarah Wilson',
        service: 'Full Inspection',
        amount: '85.00',
        status: 'completed'
      }
    ]);

    const getStatusClass = (status) => {
      switch (status) {
        case 'completed':
          return 'bg-success-100 text-success-800';
        case 'inProgress':
          return 'bg-warning-100 text-warning-800';
        case 'pending':
          return 'bg-danger-100 text-danger-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    onMounted(() => {
      // Initialize dashboard data
      console.log('Dashboard mounted');
    });

    return {
      i18nStore,
      recentOrders,
      getStatusClass
    };
  }
};
</script>
