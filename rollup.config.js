import resolve from 'rollup-plugin-node-resolve';

export default {
	input: "./CGT_WordWrapCore_MV_Main.js",
	output: 
	{
		file: "./CGT_WordWrapCore_MV.js",
		format: 'iife',
		freeze: false,
	},

	
	plugins: [
		resolve({
		  jsnext: true,
		  module: true
		}
		)
	  ],
	
	
};