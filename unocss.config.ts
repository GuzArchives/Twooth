import {
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno, presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
import { presetRadix } from 'unocss-preset-radix';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';


import colors from './src/lib/env/colors';


/** @type {import('@unocss/vite').VitePluginConfig} */
const config = {
	// mode: 'svelte-scoped',
	extractors: [extractorSvelte()],
	presets: [
		presetAttributify(),
		presetIcons({
			collections: {
				'solar': () => import('@iconify-json/solar/icons.json')
					.then(i => i.default as any),
				'svg-spinners': () => import('@iconify-json/svg-spinners/icons.json')
					.then(i => i.default as any),
				'custom': FileSystemIconLoader('./src/assets/icons'),
			},
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				inter: [
					{
						name: 'Inter',
						provider: 'bunny',
					},
					{
						name: 'sans-serif',
						provider: 'none',
					},
				],
			},
		}),
		presetUno(),
		presetRadix({ palette: colors }),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	safelist: [
		...colors.map(c => `hue-${c}`),
		'bg-[#161616]',
		'text-[#161616]',
		'transition-all',
		'delay-500',
	],
};

export default config;
