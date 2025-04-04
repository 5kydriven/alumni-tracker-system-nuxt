export default defineAppConfig({
	//color palette:
	// Primary: #04401f
	// Secondary: #F1F806
	// neutral: #1f2d3d
	ui: {
		theme: {
			default: 'light',
		},
		primary: 'zuccini',
		yellow: 'goldenfizz',
		modal: {
			container: 'items-center',
		},
		verticalNavigation: {
			ring: '',
			base: 'group-hover:before:text-black ',
			size: 'text-base',
			icon: {
				base: 'flex-shrink-0 w-5 h-5 relative',
				active: 'text-black dark:text-gray-200',
				inactive:
					'text-white dark:text-gray-500 group-hover:text-black dark:group-hover:text-gray-200',
			},
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
		slideover: {
			background: 'bg-zuccini-500',
		},
		avatar: {
			background: 'bg-gray-200',
		},
		card: {
			divide: 'divide-gray-300 divide-y dark:divide-gray-800',
		},
		input: {
			base: '[&::-webkit-inner-spin-button]:appearance-none',
		},
		table: {
			thead: 'bg-gray-100',
		},
	},
});
