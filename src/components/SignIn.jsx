import Text from './Text';
import {Pressable, StyleSheet, TextInput, View} from "react-native";
import {useFormik} from "formik";
import theme from "../theme";
import * as yup from 'yup';
import useSignIn from "../hook/useSignIn";

const signInSchema = yup.object().shape({
	username: yup
			.string()
			.required(),
	password: yup
			.string()
			.required()
})

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
	const [signIn] = useSignIn();
	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: signInSchema,
		onSubmit: async (values) => {
			const { username, password } = values;
			try {
				const {data} = await signIn({ username, password });
				console.log(data)
			} catch (e) {
				console.log(e);
			}
		}
	})

	const usernameError = formik.touched.username && formik.errors.username
	const passwordError = formik.touched.password && formik.errors.password
	const anyError = usernameError || passwordError

	return <>
		<View style={styles.container}>
			<Text fontWeight='bold' fontSize='subheading'>
				Sign in
			</Text>
			<TextInput
				style={[styles.input, (usernameError && {borderColor: 'red'})]}
				placeholder='Username'
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
				onBlur={formik.handleBlur('username')}
			/>
			{usernameError && (
					<Text style={{ color: 'red' }}>{formik.errors.username}</Text>
			)}
			<TextInput
					style={[styles.input, (usernameError && {borderColor: 'red'})]}
					placeholder='Password'
					secureTextEntry
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
					onBlur={formik.handleBlur('password')}
			/>
			{passwordError && formik.errors.password && (
					<Text style={{ color: 'red' }}>{formik.errors.password}</Text>
			)}
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