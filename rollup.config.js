import { nodeResolve } from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs'
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import nodeGlobals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins';
import babel from '@rollup/plugin-babel';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		name: 'app',
		format: 'es',
		dir: 'public/build',
        chunkFileNames: '[name].js'
	},
	plugins: [
		nodeResolve({
				browser: true,
				dedupe: ['svelte'],
				preferBuiltins: false
		}),
		json(),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('bundle.css');
			}
		}),	
		babel({
			babelHelpers: 'bundled',
			presets: [
				['@babel/preset-env', { targets: { node: "current" } }]
			], 
			plugins: [
                ["@babel/plugin-proposal-private-methods"],
                ["@babel/plugin-proposal-class-properties"]
            ]
			// plugins: ["@babel/plugin-transform-runtime"], babelHelpers: 'runtime',
			// plugins: babelConfig.env.browser.plugins,
		}),
		commonjs({
			include: [/node_modules/],
			// dynamicRequireTargets: [
			// 	// include using a glob pattern (either a string or an array of strings)
			// 	'node_modules/lodash.js',
			// 	'node_modules/lodash.merge/*'
			// ],
			requireReturnsDefault: "auto" // what is returned when requiring an ES module from a CommonJS file
		}),
		nodeGlobals(), // after commonjs, before builtins
		// nodePolyfills(),
		builtins(),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
