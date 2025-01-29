<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from '#ui/types';
	const creds = reactive({
		email: '',
		password: '',
	});

	const auth = useFirebaseAuth();

	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.email) errors.push({ path: 'email', message: 'Required' });
		if (!state.password) errors.push({ path: 'password', message: 'Required' });
		return errors;
	};

	const { handleLogin, isLoading, error } = useAuth();
	watch(error, () => console.log(error.value));
</script>

<template>
	<div class="flex h-screen w-full">
		<div
			class="h-full flex-1 justify-center items-center hidden bg-primary-500 gap-4 flex-col text-white md:flex">
			<NuxtImg
				src="/cpsu-logo.png"
				class="w-52 h-52"
				preload />
			<div class="flex flex-col items-center justify-center">
				<label class="text-lg font-bold font-serif"
					>Central Philippines State University</label
				>
				<span class="font-thin">San Carlos City, Negros Occidental</span>
			</div>
		</div>
		<div
			class="flex justify-center items-center h-full w-full px-4 xl:px-16 lg:w-[600px]">
			<div
				class="flex flex-col w-full max-w-md gap-4 border p-8 rounded-lg shadow-lg lg:border-none lg:shadow-none lg:p-0">
				<div class="flex gap-2 items-center lg:hidden">
					<NuxtImg
						src="/cpsu-logo.png"
						height="44"
						width="44"
						preload />
					<label class="font-bold">CPSU</label>
				</div>
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					Sign in to your account
				</h1>
				<UAlert
					:title="error"
					color="red"
					variant="subtle"
					v-show="error"
					:ui="{ padding: 'p-2' }"
					class="text-center" />
				<UForm
					:validate="validate"
					:state="creds"
					class="flex flex-col gap-4"
					@submit.prevent="handleLogin(auth, creds.email, creds.password)">
					<UFormGroup label="Email">
						<UInput
							type="email"
							v-model="creds.email"
							name="email"
							id="email"
							placeholder="name@company.com"
							required />
					</UFormGroup>

					<UFormGroup label="Password">
						<UInput
							type="password"
							v-model="creds.password"
							name="password"
							id="password"
							placeholder="••••••••"
							required />
					</UFormGroup>
					<!-- <div class="flex items-center justify-between mb-4">
						<UCheckbox label="Remember me" />
						<a
							href="#"
							class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Forgot password?</a
						>
					</div> -->
					<UButton
						type="submit"
						block
						class="mt-4"
						label="Sign in"
						:loading="isLoading" />
					<p class="text-sm">
						Are you an employer?
						<NuxtLink
							to="/auth/signup"
							class="hover:underline text-primary-500 font-semibold"
							>Sign up</NuxtLink
						>
					</p>
				</UForm>
			</div>
		</div>
		<!-- <div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<UAlert
					:title="error"
					color="red"
					variant="subtle"
					v-show="error"
					:ui="{ padding: 'p-2' }"
					class="text-center"
				/>
				<form
					class="space-y-4 md:space-y-6"
					@submit.prevent="handleLogin(auth, creds.email, creds.password)"
				>
					<div class="flex flex-col gap-1">
						<label for="email">Your email</label>
						<UInput
							type="email"
							v-model="creds.email"
							name="email"
							id="email"
							placeholder="name@company.com"
							required
						/>
					</div>
					<div class="flex flex-col gap-1">
						<label for="password">Password</label>
						<UInput
							type="password"
							v-model="creds.password"
							name="password"
							id="password"
							placeholder="••••••••"
							required
						/>
					</div>
					<div class="flex items-center justify-between">
						<UCheckbox label="Remember me" />
						<a
							href="#"
							class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Forgot password?</a
						>
					</div>
					<UButton
						type="submit"
						block
						label="Sign in"
						:loading="isLoading"
					/>
				</form>
			</div>
		</div> -->
	</div>
</template>
