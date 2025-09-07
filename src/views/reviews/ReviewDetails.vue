<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Review Details</h2>
            <p class="mt-1 text-sm text-gray-600">View review information</p>
          </div>
          <router-link
            to="/reviews"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to List
          </router-link>
        </div>
      </div>
      
      <div class="px-6 py-12 text-center">
        <h3 class="text-sm font-medium text-gray-900">Review Details</h3>
        <p class="mt-1 text-sm text-gray-500">Review details functionality coming soon.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewDetails'
};
</script>
