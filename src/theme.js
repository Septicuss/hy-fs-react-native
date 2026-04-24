import {Platform, StyleSheet} from "react-native";

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

export const formStyles = StyleSheet.create({
	container: {
		padding: 5,
		gap: 10,
	},
	input: {
		height: 40,
		borderColor: 'black',
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	button: {
		height: 40,
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
	}
})

export default theme;