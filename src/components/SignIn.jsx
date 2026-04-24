import Text from './Text';
import {Pressable, StyleSheet, TextInput, View} from "react-native";
import {useFormik} from "formik";
import {formStyles} from "../theme";
import * as yup from 'yup';
import useSignIn from "../hook/useSignIn";
import {useNavigate} from "react-router-native";

const signInSchema = yup.object().shape({
	username: yup
			.string()
			.required(),
	password: yup
			.string()
			.required()
})

export const SignInContainer = ({onSubmit}) => {
	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: signInSchema,
		onSubmit: (values) => {
			onSubmit(values)
		},
	})

	const usernameError = formik.touched.username && formik.errors.username
	const passwordError = formik.touched.password && formik.errors.password

	return <>
		<View style={formStyles.container}>
			<Text fontWeight='bold' fontSize='subheading'>
				Sign in
			</Text>
			<TextInput
					style={[formStyles.input, (usernameError && {borderColor: 'red'})]}
					placeholder='Username'
					value={formik.values.username}
					onChangeText={formik.handleChange('username')}
					onBlur={formik.handleBlur('username')}
			/>
			{usernameError && (
					<Text style={{ color: 'red' }}>{formik.errors.username}</Text>
			)}
			<TextInput
					style={[formStyles.input, (usernameError && {borderColor: 'red'})]}
					placeholder='Password'
					secureTextEntry
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
					onBlur={formik.handleBlur('password')}
			/>
			{passwordError && formik.errors.password && (
					<Text style={{ color: 'red' }}>{formik.errors.password}</Text>
			)}
			<Pressable role="button" style={formStyles.button} onPress={formik.handleSubmit}>
				<Text
						fontWeight='bold'
						color='white'
				>
					Sign in
				</Text>
			</Pressable>
		</View>
	</>;
}

const SignIn = () => {
	const navigate = useNavigate()
	const [signIn] = useSignIn();


	const onSubmit = async ({username, password}) => {
		try {
			if (await signIn({ username, password })) {
				console.log("successfully signed in")
				navigate('/')
			}
		} catch (e) {
			console.log(e);
		}
	}

	return <SignInContainer onSubmit={onSubmit} />
};

export default SignIn;