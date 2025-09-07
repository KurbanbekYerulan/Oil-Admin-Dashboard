<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="text-6xl font-bold text-primary-600">404</div>
      <h1 class="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p class="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
      <div class="mt-6">
        <router-link to="/dashboard" class="btn-primary">
          Go to Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
