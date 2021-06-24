module.exports = {
	purge: ["./pages/*.tsx"],
	darkMode: false,
	theme: {
		colors: {
			blue: {
				700: "#498fb1",
				600: "#569cbb",
				500: "#73b1cc",
				400: "#8abfd7",
				300: "#b1d8ea",
				200: "#c5e6f3",
				100: "#def2fb",
			},
			gray: {
				700: "#252627",
				600: "#494a4c",
				500: "#77797a",
				400: "#939597",
				300: "#bbbec1",
				200: "#e4e6e9",
				100: "#f9fcff",
			},
		},
		spacing: {
			none: "0rem",
			smaller: "0.75rem",
			normal: "1.5rem",
			larger: "3rem",
		},
		fontSize: {
			small: ["0.8rem", "1.5rem"],
			base: ["1rem", "1.5rem"],
			xl: ["1.5rem", "1.5rem"],
			"2xl": ["2rem", "2.5rem"],
			"4xl": ["4rem", "4.5rem"],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
