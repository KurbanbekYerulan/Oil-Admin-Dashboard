<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Banners</h2>
            <p class="mt-1 text-sm text-gray-600">Manage advertising banners (visible to ACC customers)</p>
          </div>
          <router-link
            to="/banners/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Banner
          </router-link>
        </div>
      </div>
      
      <div class="px-6 py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h18M3 12h18M3 19h18" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Banners Management</h3>
        <p class="mt-1 text-sm text-gray-500">Banner management functionality coming soon.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerList'
};
</script>


