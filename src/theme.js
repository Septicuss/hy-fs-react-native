import {Platform} from "react-native";

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#3e4750',
		primary: '#0366d6',
		secondary: '#89bbf6'
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
			default: 'System'
		}),
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
};

export default theme;