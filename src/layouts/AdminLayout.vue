<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
    </div>

    <!-- Sidebar -->
    <div
      class="sidebar fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div class="flex items-center">
          <div class="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="ml-3 text-lg font-semibold text-gray-900">Oil Admin</span>
        </div>
        <button
          @click="sidebarOpen = false"
          class="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Sidebar Navigation -->
      <nav class="mt-6 px-3 pb-24">
        <div class="space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            :class="[
              'sidebar-item',
              $route.path.startsWith(item.href) ? 'active' : ''
            ]"
          >
            <component :is="item.icon" class="mr-3 h-5 w-5" />
            {{ item.name }}
          </router-link>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div class="flex items-center">
          <div class="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-primary-700">
              {{ userInitials }}
            </span>
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ authStore.userName }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ authStore.userRole }}
            </p>
          </div>
          <button
            @click="handleLogout"
            class="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            title="Logout"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="md:ml-64 flex flex-col flex-1">
      <!-- Top Navigation Bar -->
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
        <button
          @click="sidebarOpen = true"
          class="lg:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <h1 class="text-2xl font-semibold text-gray-900 flex items-center">
              {{ currentPageTitle }}
            </h1>
          </div>

          <!-- Right side actions -->
          <div class="ml-4 flex items-center md:ml-6 space-x-4">
            <!-- Language Switcher -->
            <div class="relative language-dropdown">
              <button
                @click="languageDropdownOpen = !languageDropdownOpen"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <span class="mr-2">{{ i18nStore.currentLanguageInfo.flag }}</span>
                <span class="uppercase">{{ i18nStore.currentLanguageInfo.code }}</span>
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Language dropdown menu -->
              <div
                v-if="languageDropdownOpen"
                class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <button
                  v-for="lang in i18nStore.availableLanguages"
                  :key="lang.code"
                  @click="selectLanguage(lang.code)"
                  :class="[
                    'flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
                    i18nStore.currentLanguage === lang.code ? 'bg-primary-50 text-primary-700' : ''
                  ]"
                >
                  <span class="mr-2">{{ lang.flag }}</span>
                  <span class="uppercase">{{ lang.code }}</span>
                </button>
              </div>
            </div>

            <!-- Notifications -->
            <button class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.5 19.5a2 2 0 01-2-2v-6a2 2 0 012-2h11a2 2 0 012 2v6a2 2 0 01-2 2h-11z" />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="relative">
              <button
                @click="profileDropdownOpen = !profileDropdownOpen"
                class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              <!-- Profile dropdown menu -->
              <div
                v-if="profileDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="profileDropdownOpen = false"
                >
                  {{ i18nStore.t('profile.title') }}
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ i18nStore.t('auth.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <router-view />
          </div>
        </div>
      </main>
    </div>

    <!-- Notification Container -->
    <NotificationContainer />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useI18nStore } from '@/stores/i18n';
import NotificationContainer from '@/components/NotificationContainer.vue';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  UsersIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  PhotoIcon,
  CalendarIcon,
  UserIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline';

export default {
  name: 'AdminLayout',
  components: {
    HomeIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    WrenchScrewdriverIcon,
    CubeIcon,
    UsersIcon,
    ShoppingCartIcon,
    ChatBubbleLeftRightIcon,
    GiftIcon,
    PhotoIcon,
    CalendarIcon,
    UserIcon,
    GlobeAltIcon,
    NotificationContainer
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    const i18nStore = useI18nStore();

    const sidebarOpen = ref(false);
    const profileDropdownOpen = ref(false);
    const languageDropdownOpen = ref(false);

    const navigationItems = computed(() => [
      { name: i18nStore.t('navigation.dashboard'), href: '/dashboard', icon: HomeIcon },
      { name: i18nStore.t('navigation.employees'), href: '/employees', icon: UserGroupIcon },
      { name: i18nStore.t('navigation.branches'), href: '/branches', icon: BuildingOfficeIcon },
      { name: i18nStore.t('navigation.services'), href: '/services', icon: WrenchScrewdriverIcon },
      { name: i18nStore.t('navigation.countries'), href: '/countries', icon: GlobeAltIcon },
      { name: i18nStore.t('navigation.profile'), href: '/profile', icon: UserIcon },
    ]);

    const currentPageTitle = computed(() => {
      return route.meta?.title || (navigationItems.value.find(item => route.path.startsWith(item.href))?.name || i18nStore.t('navigation.dashboard'));
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

    const handleLogout = async () => {
      try {
        await authStore.logout();
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    const selectLanguage = (languageCode) => {
      i18nStore.setLanguage(languageCode);
      languageDropdownOpen.value = false;
    };

    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (sidebarOpen.value && !event.target.closest('.sidebar')) {
        sidebarOpen.value = false;
      }
    };

    // Close profile dropdown when clicking outside
    const handleProfileClickOutside = (event) => {
      if (profileDropdownOpen.value && !event.target.closest('.profile-dropdown')) {
        profileDropdownOpen.value = false;
      }
    };

    // Close language dropdown when clicking outside
    const handleLanguageClickOutside = (event) => {
      if (languageDropdownOpen.value && !event.target.closest('.language-dropdown')) {
        languageDropdownOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('click', handleProfileClickOutside);
      document.addEventListener('click', handleLanguageClickOutside);
      
      // Set initial language
      document.documentElement.lang = i18nStore.currentLanguage;
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('click', handleProfileClickOutside);
      document.removeEventListener('click', handleLanguageClickOutside);
    });

    return {
      sidebarOpen,
      profileDropdownOpen,
      languageDropdownOpen,
      navigationItems,
      currentPageTitle,
      userInitials,
      authStore,
      i18nStore,
      handleLogout,
      selectLanguage
    };
  }
};
</script>

<style scoped>
.sidebar-item {
  @apply flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200;
}

.sidebar-item.active {
  @apply bg-primary-100 text-primary-700;
}

.sidebar-item:hover {
  @apply bg-gray-100 text-gray-900;
}
</style>
