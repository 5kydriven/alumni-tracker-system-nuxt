<script lang="ts" setup>
	const store = useStepperStore();
</script>

<template>
	<div class="flex flex-col gap-2">
		<UFormGroup
			label="Email"
			description="Please don't use the default email"
			required>
			<UInput
				placeholder="john@gmail.com"
				type="email"
				v-model="store.form.email" />
		</UFormGroup>
		<UFormGroup
			label="Password"
			required>
			<UInput
				placeholder="••••••••"
				type="password"
				v-model="store.form.password" />
		</UFormGroup>
	</div>
</template>
