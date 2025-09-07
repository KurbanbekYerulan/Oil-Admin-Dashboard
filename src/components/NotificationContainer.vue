<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 w-80 sm:w-96 max-w-sm sm:max-w-md">
    <TransitionGroup
      name="notification"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          getNotificationClasses(notification.type)
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="getNotificationIcon(notification.type)" class="h-6 w-6" />
            </div>
            <div class="ml-3 flex-1 pt-0.5 min-w-0">
              <p v-if="notification.title" class="text-sm font-medium text-gray-900 break-words">
                {{ notification.title }}
              </p>
              <p v-if="notification.message" class="mt-1 text-sm text-gray-500 break-words">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeNotification(notification.id)"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useNotificationsStore } from '@/stores/notifications';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon 
} from '@heroicons/vue/24/outline';

export default {
  name: 'NotificationContainer',
  components: {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon
  },
  setup() {
    const notificationsStore = useNotificationsStore();

    const notifications = computed(() => notificationsStore.notifications);

    const getNotificationClasses = (type) => {
      switch (type) {
        case 'success':
          return 'border-l-4 border-green-400';
        case 'error':
          return 'border-l-4 border-red-400';
        case 'warning':
          return 'border-l-4 border-yellow-400';
        case 'info':
        default:
          return 'border-l-4 border-blue-400';
      }
    };

    const getNotificationIcon = (type) => {
      switch (type) {
        case 'success':
          return 'CheckCircleIcon';
        case 'error':
          return 'XCircleIcon';
        case 'warning':
          return 'ExclamationTriangleIcon';
        case 'info':
        default:
          return 'InformationCircleIcon';
      }
    };

    const removeNotification = (id) => {
      notificationsStore.removeNotification(id);
    };

    return {
      notifications,
      getNotificationClasses,
      getNotificationIcon,
      removeNotification
    };
  }
};
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
