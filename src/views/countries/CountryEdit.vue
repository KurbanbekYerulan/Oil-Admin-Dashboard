<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ i18nStore.t('countries.editTitle') }}</h2>
            <p class="mt-1 text-sm text-gray-600">{{ i18nStore.t('countries.editSubtitle') }}</p>
          </div>
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

      <!-- Loading State -->
      <div v-if="loading && !country" class="px-6 py-12 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ i18nStore.t('common.loading') }}
        </div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="submitForm" class="px-6 py-6">
        <div class="grid grid-cols-1 gap-6">
          <!-- Country Code -->
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700">
              {{ i18nStore.t('countries.code') }}
            </label>
            <div class="mt-1">
              <input
                id="code"
                v-model="form.code"
                type="text"
                class="input-field"
                :class="{ 'border-danger-300': errors.code }"
                :placeholder="i18nStore.t('countries.codePlaceholder')"
              />
              <p v-if="errors.code" class="mt-1 text-sm text-danger-600">{{ errors.code }}</p>
            </div>
          </div>

          <!-- Country Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              {{ i18nStore.t('countries.name') }} <span class="text-danger-500">*</span>
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input-field"
                :class="{ 'border-danger-300': errors.name }"
                :placeholder="i18nStore.t('countries.namePlaceholder')"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-danger-600">{{ errors.name }}</p>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="mt-8 flex items-center justify-end space-x-3">
          <router-link
            to="/countries"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {{ i18nStore.t('common.cancel') }}
          </router-link>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? i18nStore.t('common.updating') : i18nStore.t('common.update') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18nStore } from '@/stores/i18n';
import { useNotificationsStore } from '@/stores/notifications';
import { countriesAPI } from '@/services/api';

export default {
  name: 'CountryEdit',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const i18nStore = useI18nStore();
    const notificationsStore = useNotificationsStore();
    const loading = ref(false);
    const country = ref(null);
    
    const form = reactive({
      code: '',
      name: ''
    });

    const errors = reactive({
      code: '',
      name: ''
    });

    const fetchCountry = async () => {
      try {
        loading.value = true;
        const response = await countriesAPI.getById(route.params.id);
        country.value = response.data;
        
        // Populate form with existing data
        form.code = country.value.code || '';
        form.name = country.value.name || '';
      } catch (error) {
        console.error('Error fetching country:', error);
        
        // Show error notification
        notificationsStore.error(
          i18nStore.t('notifications.error.loadFailed'),
          i18nStore.t('notifications.messages.countryLoadFailed')
        );
        
        router.push('/countries');
      } finally {
        loading.value = false;
      }
    };

    const validateForm = () => {
      // Clear previous errors
      Object.keys(errors).forEach(key => {
        errors[key] = '';
      });

      let isValid = true;

      // Validate name (required)
      if (!form.name.trim()) {
        errors.name = i18nStore.t('countries.errors.nameRequired');
        isValid = false;
      }

      return isValid;
    };

    const submitForm = async () => {
      if (!validateForm()) {
        return;
      }

      try {
        loading.value = true;
        const response = await countriesAPI.update(route.params.id, form);
        
        // Show success notification
        notificationsStore.success(
          i18nStore.t('notifications.success.updated'),
          i18nStore.t('notifications.messages.countryUpdated')
        );
        
        router.push('/countries');
      } catch (error) {
        console.error('Error updating country:', error);
        
        // Show error notification
        notificationsStore.error(
          i18nStore.t('notifications.error.updateFailed'),
          i18nStore.t('notifications.messages.countryUpdateFailed')
        );
        
        // Handle validation errors from server
        if (error.response?.data?.errors) {
          const serverErrors = error.response.data.errors;
          Object.keys(serverErrors).forEach(key => {
            if (errors.hasOwnProperty(key)) {
              errors[key] = serverErrors[key][0];
            }
          });
        }
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCountry();
    });

    return {
      i18nStore,
      country,
      form,
      errors,
      loading,
      submitForm
    };
  }
};
</script>
