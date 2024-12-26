<script setup lang="ts">
const progres = ref(0);
const route = useRouter();

const incrementProgress = () => {
  if (progres.value < 2) {
    progres.value++;
  } else {
    route.push("/alumni");
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 flex flex-col gap-4 lg:py-8">
    <h1 class="text-xl text-center p-4">Personal Details</h1>

    <div class="flex justify-between w-full items-center p-4 relative">
      <div class="flex rounded-full p-1 z-10 bg-green-400">
        <UButton
          icon="i-heroicons-cog-6-tooth"
          size="sm"
          color="black"
          variant="link"
          :padded="false"
          class="!text-black"
          @click="progres = 0"
        />
      </div>
      <div
        class="flex rounded-full p-1 z-10"
        :class="progres >= 1 ? 'bg-green-400' : 'bg-gray-500'"
      >
        <UButton
          icon="i-heroicons-user"
          size="sm"
          color="black"
          variant="link"
          :padded="false"
          @click="progres = 1"
          :class="progres >= 1 ? '!text-black' : ''"
        />
      </div>
      <div
        class="flex rounded-full p-1 z-10"
        :class="progres >= 2 ? 'bg-green-400' : 'bg-gray-500'"
      >
        <UButton
          icon="i-heroicons-document-text"
          size="sm"
          color="black"
          variant="link"
          :padded="false"
          @click="progres = 2"
          :class="progres >= 2 ? '!text-black' : ''"
        />
      </div>
      <UProgress :value="progres" class="absolute left-0 z-0 px-4" :max="2" />
    </div>

    <UpdateAccount v-if="progres == 0" />
    <UpdatePersonal v-else-if="progres == 1" />
    <UpdateExperiences v-else />

    <UButton
      :label="progres != 2 ? 'Next step' : 'Finish'"
      size="lg"
      block
      class="mt-4"
      @click="incrementProgress"
    />
  </div>
</template>