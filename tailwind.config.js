module.exports = {
	mode: "jit",
	purge: ["./pages/*.tsx"],
	darkMode: false,
	theme: {
		colors: {
			blue: {
				700: "#498fb1",
				600: "#569cbb",
				500: "#73b1cc",
				400: "#8abfd7",
				300: "#b7dced",
				200: "#c5e4f3",
				100: "#def2fb",
			},
			gray: {
				700: "#252627",
				600: "#494a4c",
				500: "#7d7f81",
				400: "#939597",
				300: "#afb1b4",
				200: "#c8cacc",
				100: "#f9fcff",
			},
		},
		fontFamily: {
			sans: ["Work Sans", "Helvetica Neue", "sans-serif"],
		},
		fontWeight: {
			light: 300,
			normal: 500,
			bold: 600,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
