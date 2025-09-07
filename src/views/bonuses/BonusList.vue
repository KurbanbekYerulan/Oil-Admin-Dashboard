<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Bonuses</h2>
            <p class="mt-1 text-sm text-gray-600">Manage loyalty bonuses and points</p>
          </div>
          <router-link
            to="/bonuses/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Bonus Rule
          </router-link>
        </div>
      </div>
      
      <div class="px-6 py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 4c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Bonuses Management</h3>
        <p class="mt-1 text-sm text-gray-500">Bonuses management functionality coming soon.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BonusList'
};
</script>


