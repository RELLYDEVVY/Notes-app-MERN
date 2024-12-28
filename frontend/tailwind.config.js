// tailwind.config.js
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // Include all your source files here
		"./public/index.html", // Add any other relevant paths
	],
	theme: {
		extend: {
			colors: {
				primary: "#2D85FF",
				secondary: "#EF863E",
			},
		},
	},
	plugins: [],
};
