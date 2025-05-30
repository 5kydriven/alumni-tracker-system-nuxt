<script setup lang="ts">
	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				ring: '',
				divide: 'divide-y divide-gray-500 ',
			}">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Privacy Policy
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="emits('close')" />
				</div>
			</template>
			<div
				class="flex flex-col h-96 gap-4 overflow-auto border-2 rounded-lg p-2 bg-gray-100">
				<div class="flex flex-col gap-2 text-sm">
					<label class="text-gray-500">Updated April 2025</label>
					<p>
						Thank you for using Alumni Career Link as an employer. This Privacy
						Policy outlines how we manage your company and job-related
						information.
					</p>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">
						1. Information We Collect from Employers
					</label>
					<span class="mb-2 pl-4"> We may collect the following: </span>
					<ul class="list-disc list-inside pl-8 text-sm">
						<li>Company name and description</li>
						<li>Contact person&apos;s name and position</li>
						<li>Email address and contact number</li>
						<li>Job listings and descriptions</li>
						<li>Industry and company location</li>
						<li>
							Platform usage data (IP address, browser info, session duration,
							etc.)
						</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">
						2. How We Use Employer Data
					</label>
					<span class="mb-2 pl-4">We use this data to: </span>
					<ul class="list-disc list-inside pl-8">
						<li>Display job listings to qualified alumni</li>
						<li>Manage employer accounts and job postings</li>
						<li>Facilitate connections with alumni seeking employment</li>
						<li>Analyze job market trends for alumni</li>
						<li>Improve the platform experience and reliability</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">3. Data Sharing</label>
					<span class="mb-2 pl-4">
						We do not sell your data. Job postings and company profiles are
						publicly accessible to registered alumni. We may also share data
						with:
					</span>
					<ul class="list-disc list-inside pl-8">
						<li>Internal administrators for moderation and verification</li>
						<li>
							Third-party service providers (e.g., web hosting, analytics)
						</li>
						<li>Legal authorities when legally obligated</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">4. Your Rights</label>
					<span class="mb-2 pl-4">As an employer, you may:</span>
					<ul class="list-disc list-inside pl-8 text-sm">
						<li>Edit or remove job posts</li>
						<li>Update company details</li>
						<li>Request account deactivation</li>
						<li>Contact us for data requests at cpsu@gmail.com</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800"
						>5. Data Security</label
					>
					<span>
						We take reasonable measures to secure your data and prevent
						unauthorized access, modification, or disclosure.
					</span>
				</div>
			</div>
		</UCard>
	</UModal>
</template>
