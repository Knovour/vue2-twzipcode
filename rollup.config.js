import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'index.js',
	format: 'cjs',
	moduleName: 'twzipcode',
	dest: 'dist/vue-twzipcode.js',
	plugins: [ vue(), babel() ]
}
