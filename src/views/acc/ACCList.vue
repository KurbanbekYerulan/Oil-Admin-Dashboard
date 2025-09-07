<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">ACC Management</h1>
        <p class="mt-2 text-sm text-gray-700">
          Manage your car service centers and replacement points.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <router-link to="/acc/create" class="btn-primary">
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New ACC
        </router-link>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search ACCs..."
            class="input-field mt-1"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select v-model="statusFilter" class="input-field mt-1">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <select v-model="typeFilter" class="input-field mt-1">
            <option value="">All Types</option>
            <option value="psrp">PSRP</option>
            <option value="asc">ASC</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ACC List -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACC Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="acc in filteredACCs" :key="acc.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span class="text-sm font-medium text-primary-700">{{ acc.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ acc.name }}</div>
                    <div class="text-sm text-gray-500">{{ acc.contact }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ acc.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ acc.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(acc.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ acc.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <router-link
                    :to="`/acc/${acc.id}`"
                    class="text-primary-600 hover:text-primary-900"
                  >
                    View
                  </router-link>
                  <router-link
                    :to="`/acc/${acc.id}/edit`"
                    class="text-warning-600 hover:text-warning-900"
                  >
                    Edit
                  </router-link>
                  <button
                    @click="deleteACC(acc.id)"
                    class="text-danger-600 hover:text-danger-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'ACCList',
  setup() {
    const searchQuery = ref('');
    const statusFilter = ref('');
    const typeFilter = ref('');

    // Mock data - replace with API call
    const accs = ref([
      {
        id: 1,
        name: 'Downtown Auto Service',
        type: 'PSRP',
        location: 'Downtown, City',
        status: 'active',
        contact: 'John Smith'
      },
      {
        id: 2,
        name: 'Westside Car Care',
        type: 'ASC',
        location: 'Westside, City',
        status: 'active',
        contact: 'Jane Doe'
      },
      {
        id: 3,
        name: 'Express Oil Change',
        type: 'Private',
        location: 'North District',
        status: 'inactive',
        contact: 'Mike Johnson'
      }
    ]);

    const filteredACCs = computed(() => {
      return accs.value.filter(acc => {
        const matchesSearch = acc.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            acc.contact.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = !statusFilter.value || acc.status === statusFilter.value;
        const matchesType = !typeFilter.value || acc.type === typeFilter.value;
        
        return matchesSearch && matchesStatus && matchesType;
      });
    });

    const getStatusClass = (status) => {
      return status === 'active' 
        ? 'bg-success-100 text-success-800' 
        : 'bg-danger-100 text-danger-800';
    };

    const deleteACC = (id) => {
      if (confirm('Are you sure you want to delete this ACC?')) {
        accs.value = accs.value.filter(acc => acc.id !== id);
      }
    };

    return {
      searchQuery,
      statusFilter,
      typeFilter,
      accs,
      filteredACCs,
      getStatusClass,
      deleteACC
    };
  }
};
</script>
