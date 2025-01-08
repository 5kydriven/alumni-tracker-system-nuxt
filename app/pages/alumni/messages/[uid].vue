<script setup lang="ts">
	import { breakpointsTailwind } from '@vueuse/core'

	definePageMeta({
		layout: 'user'
	})

	const route = useRoute()
	console.log(route.params.uid)
	const breakpoints = useBreakpoints(breakpointsTailwind)
	const isLaptop = breakpoints.greaterOrEqual('lg')

	interface User {
		name: String,
		date: String,
		message: String
	}

	// const { data } = await useFetch<User[]>('/api/messages')
</script>

<template>
	<div class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
		<InboxMessageList v-show="isLaptop" />
		<InboxMessage />
		<!-- <InboxDefaultMessage v-else /> -->
	</div>
</template>