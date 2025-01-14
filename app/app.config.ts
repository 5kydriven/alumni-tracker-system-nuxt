export default defineAppConfig({
	//color palette:
	// Primary: #04401f
	// Secondary: #F1F806
	// neutral: #1f2d3d
	ui: {
		primary: 'zuccini',
		yellow: 'goldenfizz',
		modal: {
			container: 'items-center',
		},
		verticalNavigation: {
			ring: '',
			base: 'group-hover:before:text-black',
			active:
				'text-black dark:text-white before:bg-yellow-500 dark:before:bg-gray-800',
			inactive:
				'text-white dark:text-gray-400 hover:text-black dark:hover:text-white hover:before:bg-yellow-300 dark:hover:before:bg-gray-800/50',
		},
	},
});
