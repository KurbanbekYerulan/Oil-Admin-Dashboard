<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Employees</h2>
            <p class="mt-1 text-sm text-gray-600">Manage your organization's employees</p>
          </div>
          <router-link
            to="/employees/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Employee
          </router-link>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="px-6 py-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label for="search" class="sr-only">Search employees</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search employees..."
              />
            </div>
          </div>

          <!-- Department Filter -->
          <div>
            <select
              v-model="selectedDepartment"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <select
              v-model="selectedStatus"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Employee List</h3>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="px-6 py-12 text-center">
        <svg class="animate-spin mx-auto h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600">Loading employees...</p>
      </div>

      <!-- Employee Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img
                      :src="employee.avatar || `https://ui-avatars.com/api/?name=${employee.name}&background=random`"
                      :alt="employee.name"
                      class="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
                    <div class="text-sm text-gray-500">{{ employee.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ employee.department }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ employee.position }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    employee.status === 'active' ? 'bg-green-100 text-green-800' : 
                    employee.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ employee.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(employee.hireDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <router-link
                    :to="`/employees/${employee.id}`"
                    class="text-primary-600 hover:text-primary-900"
                  >
                    View
                  </router-link>
                  <router-link
                    :to="`/employees/${employee.id}/edit`"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </router-link>
                  <button
                    @click="deleteEmployee(employee.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredEmployees.length === 0 && !loading" class="px-6 py-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new employee.</p>
          <div class="mt-6">
            <router-link
              to="/employees/create"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Employee
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'EmployeeList',
  setup() {
    const employees = ref([]);
    const loading = ref(true);
    const searchQuery = ref('');
    const selectedDepartment = ref('');
    const selectedStatus = ref('');

    const fetchEmployees = async () => {
      try {
        // TODO: Implement API call to fetch employees
        console.log('Fetching employees...');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        employees.value = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@company.com',
            department: 'Engineering',
            position: 'Senior Developer',
            status: 'active',
            hireDate: new Date('2022-01-15'),
            avatar: null
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@company.com',
            department: 'Sales',
            position: 'Sales Manager',
            status: 'active',
            hireDate: new Date('2021-06-20'),
            avatar: null
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@company.com',
            department: 'Marketing',
            position: 'Marketing Specialist',
            status: 'on-leave',
            hireDate: new Date('2023-03-10'),
            avatar: null
          }
        ];
      } catch (error) {
        console.error('Error fetching employees:', error);
        // TODO: Show error message to user
      } finally {
        loading.value = false;
      }
    };

    const filteredEmployees = computed(() => {
      let filtered = employees.value;

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(employee =>
          employee.name.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.position.toLowerCase().includes(query)
        );
      }

      if (selectedDepartment.value) {
        filtered = filtered.filter(employee => employee.department === selectedDepartment.value);
      }

      if (selectedStatus.value) {
        filtered = filtered.filter(employee => employee.status === selectedStatus.value);
      }

      return filtered;
    });

    const deleteEmployee = async (employeeId) => {
      if (confirm('Are you sure you want to delete this employee?')) {
        try {
          // TODO: Implement API call to delete employee
          console.log('Deleting employee:', employeeId);
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Remove from local state
          employees.value = employees.value.filter(emp => emp.id !== employeeId);
        } catch (error) {
          console.error('Error deleting employee:', error);
          // TODO: Show error message to user
        }
      }
    };

    const formatDate = (date) => {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    onMounted(() => {
      fetchEmployees();
    });

    return {
      employees,
      loading,
      searchQuery,
      selectedDepartment,
      selectedStatus,
      filteredEmployees,
      deleteEmployee,
      formatDate
    };
  }
};
</script>
