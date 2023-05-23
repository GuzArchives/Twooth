import type { RadixColors } from 'unocss-preset-radix';
export type Color = RadixColors;

export const userColors: Color[] = [
	'tomato',
	'crimson',
	'pink',
	'plum',
	'purple',
	'violet',
	'indigo',
	'blue',
	'cyan',
	'teal',
	'green',
	'grass',
	'orange',
	'brown',
];

export const brightColors: Color[] = [
	'sky', 'mint', 'lime', 'yellow', 'amber', 'red',
];

const colors: Color[] = [
	'gray', 'sand', 'slate', 'mauve',
	...userColors, ...brightColors,
];
export default colors;

export function getRandomColor(): Color {
	return userColors[Math.floor(Math.random() * userColors.length)];
}
