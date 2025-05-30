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
						Welcome to Alumni Career Link ("we", "our", or "us"). This Privacy
						Policy explains how we collect, use, and protect the information you
						provide as an alumnus using our web application.
					</p>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">
						1. Information We Collect from Alumni
					</label>
					<span class="mb-2 pl-4">
						We may collect the following personal and academic/professional
						data:
					</span>
					<ul class="list-disc list-inside pl-8">
						<li>Full name</li>
						<li>Email address and contact number</li>
						<li>Current employment status, work history, and resume</li>
						<li>Location</li>
						<li>
							Platform usage data (IP address, browser info, session duration,
							etc.)
						</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">
						2. How We Use Your Information
					</label>
					<span class="mb-2 pl-4"> Your data helps us: </span>
					<ul class="list-disc list-inside pl-8">
						<li>Match you with relevant job opportunities</li>
						<li>Allow verified employers to discover your profile</li>
						<li>Send you employment updates or platform notifications</li>
						<li>
							Track alumni employment statistics (aggregated and anonymized)
						</li>
						<li>Improve platform functionality and experience</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">3. Data Sharing</label>
					<span class="mb-2 pl-4">
						We do not sell your personal data. Your profile will be viewable to
						registered and verified employers only. We may also share data with:
					</span>
					<ul class="list-disc list-inside pl-8 text-sm">
						<li>Internal team for job-matching support</li>
						<li>
							Technical service providers (e.g., for hosting and analytics)
						</li>
						<li>Legal authorities if required by law</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-lg text-gray-800">4. Your Rights</label>
					<span class="mb-2 pl-4">You may:</span>
					<ul class="list-disc list-inside pl-8 text-sm">
						<li>View and update your profile anytime</li>
						<li>Request account or data deletion</li>
						<li>Contact us for any data concerns at cpsu@gmail.com</li>
					</ul>
				</div>

				<div class="flex flex-col text-sm">
					<label class="font-bold text-gray-800 text-lg">
						5. Data Security
					</label>
					<span class="pl-4">
						We use secure authentication, encryption, and access controls to
						protect your information.
					</span>
				</div>
			</div>
		</UCard>
	</UModal>
</template>
