export default defineNuxtPlugin((nuxtApp) => {
	const colorMode = useColorMode();
	nuxtApp.hook('app:mounted', () => {
		colorMode.preference = 'light';
		colorMode.value = 'light';
	});
});
