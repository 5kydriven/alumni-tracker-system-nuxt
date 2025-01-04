<script setup lang="ts">
const creds = reactive({
  email: "",
  password: "",
});

const store = useAuthStore();
const auth = useFirebaseAuth();
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <UAlert :title="store.error" color="red" variant="subtle" v-show="store.error" :ui="{ padding: 'p-2' }"
          class="text-center" />
        <form class="space-y-4 md:space-y-6" @submit.prevent="store.login(auth, creds.email, creds.password)">
          <div class="flex flex-col gap-1">
            <label for="email">Your email</label>
            <UInput type="email" v-model="creds.email" name="email" id="email" placeholder="name@company.com"
              required />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <UInput type="password" v-model="creds.password" name="password" id="password" placeholder="••••••••"
              required />
          </div>
          <div class="flex items-center justify-between">
            <UCheckbox label="Remember me" />
            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
              password?</a>
          </div>
          <UButton type="submit" block label="Sign in" :loading="store.loading" />
        </form>
      </div>
    </div>
  </div>
</template>