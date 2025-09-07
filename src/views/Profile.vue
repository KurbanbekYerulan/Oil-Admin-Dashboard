<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{{ i18nStore.t('profile.title') }}</h1>
      <p class="mt-2 text-sm text-gray-700">
        {{ i18nStore.t('profile.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Information -->
      <div class="lg:col-span-2">
        <div class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ i18nStore.t('profile.profileInformation') }}</h3>
          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">{{ i18nStore.t('profile.fullName') }}</label>
                <input
                  v-model="profile.name"
                  type="text"
                  class="input-field mt-1"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">{{ i18nStore.t('profile.email') }}</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="input-field mt-1"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">{{ i18nStore.t('profile.phone') }}</label>
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="input-field mt-1"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">{{ i18nStore.t('profile.company') }}</label>
                <input
                  v-model="profile.company"
                  type="text"
                  class="input-field mt-1"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">{{ i18nStore.t('profile.role') }}</label>
              <select v-model="profile.role" class="input-field mt-1">
                <option value="owner">{{ i18nStore.t('profile.roles.owner') }}</option>
                <option value="manager">{{ i18nStore.t('profile.roles.manager') }}</option>
                <option value="employee">{{ i18nStore.t('profile.roles.employee') }}</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn-primary" :disabled="updating">
                {{ updating ? i18nStore.t('profile.updating') : i18nStore.t('profile.updateProfile') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Profile Summary -->
      <div class="lg:col-span-1">
        <div class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ i18nStore.t('profile.accountSummary') }}</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-lg font-medium text-primary-700">
                  {{ userInitials }}
                </span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ authStore.userName }}</p>
                <p class="text-sm text-gray-500">{{ authStore.userRole }}</p>
              </div>
            </div>
            <div class="border-t pt-4">
              <p class="text-sm text-gray-600">{{ i18nStore.t('profile.memberSince') }}</p>
              <p class="text-sm font-medium text-gray-900">{{ memberSince }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useI18nStore } from '@/stores/i18n';

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore();
    const i18nStore = useI18nStore();
    const updating = ref(false);

    const profile = reactive({
      name: '',
      email: '',
      phone: '',
      company: '',
      role: ''
    });

    const userInitials = computed(() => {
      const name = authStore.userName;
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    });

    const memberSince = computed(() => {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    });

    const handleUpdateProfile = async () => {
      updating.value = true;
      try {
        // Update profile logic here
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Profile updated:', profile);
      } catch (error) {
        console.error('Profile update error:', error);
      } finally {
        updating.value = false;
      }
    };

    onMounted(() => {
      // Load profile data
      profile.name = authStore.userName;
      profile.email = authStore.userEmail;
      profile.role = authStore.userRole;
    });

    return {
      profile,
      updating,
      authStore,
      i18nStore,
      userInitials,
      memberSince,
      handleUpdateProfile
    };
  }
};
</script>
