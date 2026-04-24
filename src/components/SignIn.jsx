import Text from './Text';
import {Pressable, StyleSheet, TextInput, View} from "react-native";
import {useFormik} from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
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

const SignIn = () => {
	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		onSubmit: (values) => {
			console.log(values)
		}
	})

	return <>
		<View style={styles.container}>
			<Text fontWeight='bold' fontSize='subheading'>
				Sign in
			</Text>
			<TextInput
				style={styles.input}
				placeholder='Username'
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			<TextInput
					style={styles.input}
					placeholder='Password'
					secureTextEntry
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
			/>
			<Pressable style={styles.button} onPress={formik.handleSubmit}>
				<Text
						fontWeight='bold'
						color='white'
				>
					Sign in
				</Text>
			</Pressable>
		</View>
	</>;
};

export default SignIn;