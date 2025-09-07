<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">ACC Details</h2>
            <p class="mt-1 text-sm text-gray-600">View ACC record information</p>
          </div>
          <div class="flex space-x-3">
            <router-link
              :to="`/acc/${accId}/edit`"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </router-link>
            <router-link
              to="/acc"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </router-link>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="px-6 py-12 text-center">
        <svg class="animate-spin mx-auto h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600">Loading ACC details...</p>
      </div>

      <!-- ACC Details -->
      <div v-else-if="acc" class="px-6 py-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">ACC Name</label>
              <p class="mt-1 text-sm text-gray-900">{{ acc.name }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">ACC Code</label>
              <p class="mt-1 text-sm text-gray-900">{{ acc.code }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <span class="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ acc.type }}
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span 
                :class="[
                  'mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  acc.status === 'active' ? 'bg-green-100 text-green-800' : 
                  acc.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ acc.status }}
              </span>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Contact Information</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact Person</label>
              <p class="mt-1 text-sm text-gray-900">{{ acc.contactPerson || 'Not specified' }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <p class="mt-1 text-sm text-gray-900">{{ acc.phone || 'Not specified' }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="mt-1 text-sm text-gray-900">{{ acc.email || 'Not specified' }}</p>
            </div>
          </div>

          <!-- Address -->
          <div class="md:col-span-2">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Address</h3>
            <p class="mt-1 text-sm text-gray-900">{{ acc.address || 'No address provided' }}</p>
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Description</h3>
            <p class="mt-1 text-sm text-gray-900">{{ acc.description || 'No description provided' }}</p>
          </div>

          <!-- Additional Information -->
          <div class="md:col-span-2">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Additional Information</h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Created At</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(acc.createdAt) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Updated At</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(acc.updatedAt) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">ID</label>
                <p class="mt-1 text-sm text-gray-900 font-mono">{{ acc.id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="px-6 py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">ACC not found</h3>
        <p class="mt-1 text-sm text-gray-500">The ACC you're looking for doesn't exist or has been removed.</p>
        <div class="mt-6">
          <router-link
            to="/acc"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go back to ACC list
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ACCDetails',
  setup() {
    const route = useRoute();
    const accId = route.params.id;
    const acc = ref(null);
    const loading = ref(true);

    const fetchACCDetails = async () => {
      try {
        // TODO: Implement API call to fetch ACC details
        console.log('Fetching ACC details for ID:', accId);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        acc.value = {
          id: accId,
          name: 'Sample ACC Corporation',
          code: 'ACC001',
          type: 'corporate',
          status: 'active',
          contactPerson: 'John Doe',
          phone: '+1 (555) 123-4567',
          email: 'john.doe@sampleacc.com',
          address: '123 Business Street, Suite 100, City, State 12345',
          description: 'A leading corporation in the oil industry with multiple branches and services.',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20')
        };
      } catch (error) {
        console.error('Error fetching ACC details:', error);
        // TODO: Show error message to user
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (date) => {
      if (!date) return 'Not available';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    onMounted(() => {
      fetchACCDetails();
    });

    return {
      accId,
      acc,
      loading,
      formatDate
    };
  }
};
</script>
