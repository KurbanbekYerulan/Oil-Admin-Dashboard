<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ i18nStore.t('countries.detailsTitle') }}</h2>
            <p class="mt-1 text-sm text-gray-600">{{ i18nStore.t('countries.detailsSubtitle') }}</p>
          </div>
          <div class="flex items-center space-x-3">
            <router-link
              :to="`/countries/${country?.id}/edit`"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {{ i18nStore.t('common.edit') }}
            </router-link>
            <router-link
              to="/countries"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {{ i18nStore.t('common.back') }}
            </router-link>
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

      <!-- Country Details -->
      <div v-else-if="country" class="px-6 py-6">
        <div class="grid grid-cols-1 gap-6">
          <!-- Country Code -->
          <div class="bg-gray-50 rounded-lg p-4">
            <dt class="text-sm font-medium text-gray-500">{{ i18nStore.t('countries.code') }}</dt>
            <dd class="mt-1">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {{ country.code }}
              </span>
            </dd>
          </div>

          <!-- Country Name -->
          <div class="bg-gray-50 rounded-lg p-4">
            <dt class="text-sm font-medium text-gray-500">{{ i18nStore.t('countries.name') }}</dt>
            <dd class="mt-1 text-lg text-gray-900">{{ country.name || '-' }}</dd>
          </div>

          <!-- Metadata -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <dt class="text-sm font-medium text-gray-500">{{ i18nStore.t('countries.createdAt') }}</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ formatDate(country.created_at) }}
              </dd>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <dt class="text-sm font-medium text-gray-500">{{ i18nStore.t('countries.updatedAt') }}</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ formatDate(country.updated_at) }}
              </dd>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex items-center justify-between">
          <button
            @click="deleteCountry"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-danger-600 hover:bg-danger-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ i18nStore.t('common.delete') }}
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="px-6 py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ i18nStore.t('countries.notFound') }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ i18nStore.t('countries.notFoundDescription') }}</p>
        <div class="mt-6">
          <router-link
            to="/countries"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {{ i18nStore.t('countries.backToList') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18nStore } from '@/stores/i18n';
import { useNotificationsStore } from '@/stores/notifications';
import { countriesAPI } from '@/services/api';

export default {
  name: 'CountryDetails',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const i18nStore = useI18nStore();
    const notificationsStore = useNotificationsStore();
    const loading = ref(true);
    const country = ref(null);

    const fetchCountry = async () => {
      try {
        loading.value = true;
        const response = await countriesAPI.getById(route.params.id);
        country.value = response.data;
      } catch (error) {
        console.error('Error fetching country:', error);
        
        // Show error notification
        notificationsStore.error(
          i18nStore.t('notifications.error.loadFailed'),
          i18nStore.t('notifications.messages.countryLoadFailed')
        );
        
        country.value = null;
      } finally {
        loading.value = false;
      }
    };

    const getCountryName = (country) => {
      return country.name || '-';
    };

    const formatDate = (dateString) => {
      if (!dateString) return '-';
      return new Date(dateString).toLocaleDateString(i18nStore.currentLanguage, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const deleteCountry = async () => {
      if (confirm(i18nStore.t('countries.confirmDelete', { name: getCountryName(country.value) }))) {
        try {
          await countriesAPI.delete(country.value.id);
          
          // Show success notification
          notificationsStore.success(
            i18nStore.t('notifications.success.deleted'),
            i18nStore.t('notifications.messages.countryDeleted')
          );
          
          router.push('/countries');
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
      fetchCountry();
    });

    return {
      i18nStore,
      country,
      loading,
      getCountryName,
      formatDate,
      deleteCountry
    };
  }
};
</script>
