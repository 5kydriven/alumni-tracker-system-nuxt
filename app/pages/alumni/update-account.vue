<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth()
const progres = ref(0);

const { form } = storeToRefs(useStepperStore())

const stepper = useStepper({
  'alumni-account': {
    title: 'Alumni account',
    isValid: () => form.value.email && form.value.password,
  },
  'alumni-credential': {
    title: 'Alumni credential',
    isValid: () => form.value.phoneNumber && form.value.address
  }
});

function onSubmit() {
  if (stepper.isLast.value) {
    console.log(stepper.isLast)
  } else {
    progres.value++
    stepper.goToNext()
  }
}

</script>

<template>
  <div class="max-w-2xl mx-auto p-4 flex flex-col gap-4 lg:py-8">
    <h1 class="text-xl text-center p-4">Personal Details</h1>

    <div class="flex justify-between w-full items-center p-4 relative">
      <div class="flex rounded-full p-1 z-10 bg-green-400">
        <UButton icon="i-heroicons-cog-6-tooth" size="sm" color="black"
          :disabled="!stepper.get('alumni-account').isValid()" variant="link" :padded="false" class="!text-black"
          @click="stepper.goTo('alumni-account')" />
      </div>
      <div class="flex rounded-full p-1 z-10" :class="progres >= 1 ? 'bg-green-400' : 'bg-gray-500'">
        <UButton icon="i-heroicons-user" size="sm" color="black" variant="link"
          :disabled="!stepper.current.value.isValid()" :padded="false" @click="stepper.goTo('alumni-credential')"
          :class="progres >= 1 ? '!text-black' : ''" />
      </div>
      <div class="flex rounded-full p-1 z-10" :class="progres >= 2 ? 'bg-green-400' : 'bg-gray-500'">
        <UButton icon="i-heroicons-document-text" size="sm" color="black" variant="link" :padded="false"
          @click="progres = 2" :class="progres >= 2 ? '!text-black' : ''" />
      </div>
      <UProgress :value="progres" class="absolute left-0 z-0 px-4" :max="2" />
    </div>

    <UForm :state="form" @submit.prevent="onSubmit">
      <UpdateAccount v-if="stepper.isCurrent('alumni-account')" />
      <UpdatePersonal v-if="stepper.isCurrent('alumni-credential')" />
      <!-- <UpdateExperiences v-else /> -->

      <UButton :label="progres != 2 ? 'Next step' : 'Finish'" type="submit" size="lg"
        :disabled="!stepper.current.value.isValid()" block class="mt-4" />
    </UForm>
    <UButton @click="signOut(auth)" label="sign out" />
  </div>
</template>