import {createVuetify, type ThemeDefinition} from "vuetify";
import {aliases, mdi} from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

const customTheme: ThemeDefinition = {
	dark: false,
	colors: {
		tradewind50: "#f3fafa",
		tradewind100: "#d6f1ef",
		tradewind200: "#ade2df",
		tradewind300: "#7cccca",
		tradewind400: "#64b8b9",
		tradewind500: "#379295",
		tradewind600: "#2a7377",
		tradewind700: "#255d60",
		tradewind800: "#214b4e",
		tradewind900: "#203e41",
		tradewind950: "#0d2426",
	},
};

export const vuetify = createVuetify({
	components: {
		...labs,
		...components,
	},
	directives,
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
	theme: {
		defaultTheme: "customTheme",
		themes: {
			customTheme,
		},
	},
});
