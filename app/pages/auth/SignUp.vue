<script setup lang="ts"></script>

<template>
	<div class="h-full w-full py-16 bg-gray-100">
		<div class="max-w-screen-md mx-auto flex flex-col gap-2">
			<NuxtLink
				to="/auth"
				class="hover:underline"
				>< Back</NuxtLink
			>
			<div
				class="w-full border-2 rounded-lg bg-white shadow-lg p-4 flex-col border-primary-500 flex gap-4">
				<div class="flex flex-col gap-4">
					<label
						class="text-lg font-bold bg-gray-100 text-primary-500 p-2 rounded"
						>Academic Partner Sign Up Form</label
					>
					<span
						>To apply, complete the required fields on this form and click
						"Submit" when finished.</span
					>
				</div>
				<div class="flex flex-col gap-2">
					<label
						class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
						>Contact Information</label
					>
					<div class="grid grid-cols-2 gap-2">
						<UFormGroup
							label="Company"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Company Address"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup label="Website">
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Telephone Number"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label
						class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
						>Bussiness Information</label
					>
					<div class="grid grid-cols-2 gap-2">
						<UFormGroup label="Number of Branches">
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup label="Number of Employees">
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Select your field"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Brief description"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup label="logo">
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Bussiness permits"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label
						class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
						>Contact Details</label
					>
					<div class="grid grid-cols-2 gap-2">
						<UFormGroup
							label="Acomplished by"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Position"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Contact Number"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
						<UFormGroup
							label="Email Address"
							required>
							<UInput type="text"></UInput>
						</UFormGroup>
					</div>
				</div>
				<UButton
					block
					class="mt-4"
					label="Submit" />
			</div>
		</div>
	</div>
</template>
