<script setup lang="ts">
import { signOut } from 'firebase/auth';

const auth = useFirebaseAuth();
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 flex flex-col gap-4 lg:py-8">
    <h1 class="text-xl text-center p-4">Personal Details</h1>

    <UpdateForm />
    <UButton @click="signOut(auth)" label="sign out(debugging)" />
  </div>
</template>