<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ i18nStore.t('countries.title') }}</h2>
            <p class="mt-1 text-sm text-gray-600">{{ i18nStore.t('countries.subtitle') }}</p>
          </div>
          <router-link
            to="/countries/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ i18nStore.t('countries.addCountry') }}
          </router-link>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="i18nStore.t('countries.searchPlaceholder')"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="px-6 py-12 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ i18nStore.t('common.loading') }}
        </div>
      </div>

      <!-- Countries Table -->
      <div v-else-if="countries.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ i18nStore.t('countries.name') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ i18nStore.t('countries.code') }}
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ i18nStore.t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="country in filteredCountries" :key="country.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ country.name || '-' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="country.code" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {{ country.code }}
                </span>
                <span v-else class="text-sm text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <router-link
                    :to="`/countries/${country.id}`"
                    class="text-primary-600 hover:text-primary-900"
                    :title="i18nStore.t('common.view')"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </router-link>
                  <router-link
                    :to="`/countries/${country.id}/edit`"
                    class="text-warning-600 hover:text-warning-900"
                    :title="i18nStore.t('common.edit')"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>
                  <button
                    @click="deleteCountry(country)"
                    class="text-danger-600 hover:text-danger-900"
                    :title="i18nStore.t('common.delete')"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="px-6 py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ i18nStore.t('countries.noCountries') }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ i18nStore.t('countries.noCountriesDescription') }}</p>
        <div class="mt-6">
          <router-link
            to="/countries/create"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ i18nStore.t('countries.addFirstCountry') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useNotificationsStore } from '@/stores/notifications';
import { countriesAPI } from '@/services/api';

export default {
  name: 'CountryList',
  setup() {
    const i18nStore = useI18nStore();
    const notificationsStore = useNotificationsStore();
    const countries = ref([]);
    const loading = ref(true);
    const searchQuery = ref('');

    const filteredCountries = computed(() => {
      if (!searchQuery.value) {
        return countries.value;
      }
      
      const query = searchQuery.value.toLowerCase();
      return countries.value.filter(country => 
        (country.name && country.name.toLowerCase().includes(query)) ||
        (country.code && country.code.toLowerCase().includes(query))
      );
    });

    const getCountryName = (country) => {
      return country.name || '-';
    };

    const fetchCountries = async () => {
      try {
        loading.value = true;
        const response = await countriesAPI.getAll();
        countries.value = response.data;
      } catch (error) {
        console.error('Error fetching countries:', error);
        
        // Show error notification
        notificationsStore.error(
          i18nStore.t('notifications.error.loadFailed'),
          i18nStore.t('notifications.messages.countryLoadFailed')
        );
      } finally {
        loading.value = false;
      }
    };

    const deleteCountry = async (country) => {
      if (confirm(i18nStore.t('countries.confirmDelete', { name: getCountryName(country) }))) {
        try {
          await countriesAPI.delete(country.id);
          
          // Show success notification
          notificationsStore.success(
            i18nStore.t('notifications.success.deleted'),
            i18nStore.t('notifications.messages.countryDeleted')
          );
          
          await fetchCountries(); // Refresh the list
        } catch (error) {
          console.error('Error deleting country:', error);
          
          // Show error notification
          notificationsStore.error(
            i18nStore.t('notifications.error.deleteFailed'),
            i18nStore.t('notifications.messages.countryDeleteFailed')
          );
        }
      }
    };

    onMounted(() => {
      fetchCountries();
    });

    return {
      i18nStore,
      countries,
      loading,
      searchQuery,
      filteredCountries,
      getCountryName,
      deleteCountry
    };
  }
};
</script>
