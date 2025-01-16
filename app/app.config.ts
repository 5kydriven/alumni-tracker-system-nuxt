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
		horizontalNavigation: {
			before: 'before:rounded-none hover:before:bg-transparent',
			after:
				'after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2',
			active: 'text-yellow-500 border-b border-yellow-500 rounded-none',
			inactive: 'text-white hover:text-yellow hover:bg-transparent',
		},
		avatar: {
			background: 'bg-gray-200',
		},
	},
});
