import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'


export default defineConfig({
	plugins: [sveltekit(), Icons({
		compiler: 'svelte',
		iconCustomizer(collection, icon, props) {
			// customize all icons in this collection
			if (collection === 'tabler') {
				props.width = '1.5em'
				props.height = '1.5em'
			}
		},
	}),],
});
