import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),

  actions: {
    addNotification(notification) {
      const id = Date.now() + Math.random();
      const newNotification = {
        id,
        type: notification.type || 'info', // success, error, warning, info
        title: notification.title || '',
        message: notification.message || '',
        duration: notification.duration || 5000, // 5 seconds default
        ...notification
      };

      this.notifications.push(newNotification);

      // Auto remove after duration
      if (newNotification.duration > 0) {
        setTimeout(() => {
          this.removeNotification(id);
        }, newNotification.duration);
      }

      return id;
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },

    clearAll() {
      this.notifications = [];
    },

    // Convenience methods
    success(title, message, options = {}) {
      return this.addNotification({
        type: 'success',
        title,
        message,
        ...options
      });
    },

    error(title, message, options = {}) {
      return this.addNotification({
        type: 'error',
        title,
        message,
        duration: 7000, // Errors stay longer
        ...options
      });
    },

    warning(title, message, options = {}) {
      return this.addNotification({
        type: 'warning',
        title,
        message,
        ...options
      });
    },

    info(title, message, options = {}) {
      return this.addNotification({
        type: 'info',
        title,
        message,
        ...options
      });
    }
  }
});
