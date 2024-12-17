<script setup lang="ts">
  definePageMeta({
    layout: 'user'
  })
</script>

<template>
  <div class="flex gap-4  flex-col xl:flex-row p-4">
    <div class="w-full xl:w-80">
      <div class="flex flex-col xl:gap-4 gap-2 p-4 border border-gray-200 dark:border-gray-800 rounded sticky top-4">
        <label class="xl:text-xl">Job Information</label>
        <div class="flex flex-wrap xl:flex-col gap-2 justify-between xl:gap-1.5">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
            <div class="flex flex-col">
              <p class="text-sm xl:text-lg">Employee Type</p>
              <span class="text-primary text-xs xl:text-sm">Full Time</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
            <div class="flex flex-col">
              <p class="text-sm xl:text-lg">Employee Type</p>
              <span class="text-primary text-xs xl:text-sm">Full Time</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
            <div class="flex flex-col">
              <p class="text-sm xl:text-lg">Employee Type</p>
              <span class="text-primary text-xs xl:text-sm">Full Time</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
            <div class="flex flex-col">
              <p class="text-sm xl:text-lg">Employee Type</p>
              <span class="text-primary text-xs xl:text-sm">Full Time</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <UAvatar alt="Benjamin Canac" :ui="{ rounded: 'rounded' }" size="lg" />
          <div class="flex flex-col">
            <label>Title</label>
            <span>text 3</span>
          </div>
        </div>
        <div>
          <UButton label="Apply" />
        </div>
      </div>
      <UDivider class="mt-2 mb-4 " />
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <h1 class="text-xl">
            Job Description
          </h1>
          <p class="dark:text-gray-400 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus numquam delectus vero culpa officia
            distinctio quod quo repellat, consequuntur ex beatae necessitatibus minus facilis nemo velit eligendi dolor
            explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, sapiente modi unde obcaecati
            voluptas
            deleniti ipsum recusandae quos quo harum. Amet et cupiditate voluptatem earum cum perspiciatis quam, a esse.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus architecto praesentium dolore
            doloremque
            corporis? Voluptas, ullam ab. Saepe voluptate voluptatibus delectus incidunt libero unde modi impedit ut
            vero.
            Doloribus, cum.
          </p>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="text-xl">
            Responsibilites and Duties
          </h1>
          <p class="dark:text-gray-400 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus numquam delectus vero culpa officia
            distinctio quod quo repellat, consequuntur ex beatae necessitatibus minus facilis nemo velit eligendi dolor
            explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, sapiente modi unde obcaecati
            voluptas
            deleniti ipsum recusandae quos quo harum. Amet et cupiditate voluptatem earum cum perspiciatis quam, a esse.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus architecto praesentium dolore
            doloremque
            corporis? Voluptas, ullam ab. Saepe voluptate voluptatibus delectus incidunt libero unde modi impedit ut
            vero.
            Doloribus, cum.
            <br /><br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus numquam delectus vero culpa officia
            distinctio quod quo repellat, consequuntur ex beatae necessitatibus minus facilis nemo velit eligendi dolor
            explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, sapiente modi unde obcaecati
            voluptas
            deleniti ipsum recusandae quos quo harum. Amet et cupiditate voluptatem earum cum perspiciatis quam, a esse.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus architecto praesentium dolore
            doloremque
            corporis? Voluptas, ullam ab. Saepe voluptate voluptatibus delectus incidunt libero unde modi impedit ut
            vero.
            Doloribus, cum.
          </p>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="text-xl">
            Required Experience, Skills and Qualifications
          </h1>
          <p class="dark:text-gray-400 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus numquam delectus vero culpa officia
            distinctio quod quo repellat, consequuntur ex beatae necessitatibus minus facilis nemo velit eligendi dolor
            explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, sapiente modi unde obcaecati
            voluptas
            deleniti ipsum recusandae quos quo harum. Amet et cupiditate voluptatem earum cum perspiciatis quam, a esse.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus architecto praesentium dolore
            doloremque
            corporis? Voluptas, ullam ab. Saepe voluptate voluptatibus delectus incidunt libero unde modi impedit ut
            vero.
            Doloribus, cum.
            <br /><br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus numquam delectus vero culpa officia
            distinctio quod quo repellat, consequuntur ex beatae necessitatibus minus facilis nemo velit eligendi dolor
            explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, sapiente modi unde obcaecati
            voluptas
            deleniti ipsum recusandae quos quo harum. Amet et cupiditate voluptatem earum cum perspiciatis quam, a esse.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus architecto praesentium dolore
            doloremque
            corporis? Voluptas, ullam ab. Saepe voluptate voluptatibus delectus incidunt libero unde modi impedit ut
            vero.
            Doloribus, cum.
          </p>
        </div>
        <div class=" flex justify-end">
          <!-- <UButton>
            Apply Now
          </UButton> -->
        </div>
      </div>
    </div>
  </div>

</template>
