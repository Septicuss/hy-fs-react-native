import * as yup from "yup";
import {formStyles} from "../theme";
import {Pressable, TextInput, View} from "react-native";
import Text from "./Text";
import {useNavigate} from "react-router-native";
import {CREATE_REVIEW, CREATE_USER} from "../graphql/mutations";
import {useFormik} from "formik";
import {useMutation} from "@apollo/client/react";
import * as Yup from "yup";
import useSignIn from "../hook/useSignIn";

const signUpSchema = yup.object().shape({
	username: yup
			.string()
			.min(5, 'Username is too short')
			.max(30, 'Username is too long')
			.required("Username is required"),
	password: yup
			.string()
			.min(5, 'Password is too short')
			.max(50, 'Password is too long')
			.required("Password is required"),
	confirmPassword: yup
			.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match!')
			.required("Password confirmation is required")
})

const SignUp = () => {
	const navigate = useNavigate()
	const [signIn] = useSignIn();

	const [mutate, result] = useMutation(CREATE_USER);
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: signUpSchema,
		onSubmit: async (values) => {
			const {username, password} = values

			const result = await mutate({variables: {username, password}})

			if (result?.data?.createUser) {
				if (await signIn({username, password})) {
					navigate('/')
				}
			}

		},
	})

	const error = {
		username: formik.touched.username && formik.errors.username,
		password: formik.touched.password && formik.errors.password,
		confirmPassword: formik.touched.confirmPassword && formik.errors.confirmPassword,
	}

	return (
			<View style={formStyles.container}>
				<Text fontWeight='bold' fontSize='subheading'>
					Sign Up
				</Text>

				<View>
					<TextInput
							style={[formStyles.input, (error.username && {borderColor: 'red'})]}
							placeholder='Username'
							value={formik.values.username}
							onChangeText={formik.handleChange('username')}
							onBlur={formik.handleBlur('username')}
					/>
					{error.username && (
							<Text style={{ color: 'red' }}>{formik.errors.username}</Text>
					)}
				</View>

				<View>
					<TextInput
							style={[formStyles.input, (error.password && {borderColor: 'red'})]}
							placeholder='Password'
							value={formik.values.password}
							onChangeText={formik.handleChange('password')}
							onBlur={formik.handleBlur('password')}
					/>
					{error.password && (
							<Text style={{ color: 'red' }}>{formik.errors.password}</Text>
					)}
				</View>

				<View>
					<TextInput
							style={[formStyles.input, (error.confirmPassword && {borderColor: 'red'})]}
							placeholder='Confirm password'
							value={formik.values.confirmPassword}
							onChangeText={formik.handleChange('confirmPassword')}
							onBlur={formik.handleBlur('confirmPassword')}
					/>
					{error.confirmPassword && (
							<Text style={{ color: 'red' }}>{formik.errors.confirmPassword}</Text>
					)}
				</View>
				<Pressable role="button" style={formStyles.button} onPress={formik.handleSubmit}>
					<Text
							fontWeight='bold'
							color='white'
					>
						Sign up
					</Text>
				</Pressable>
			</View>
	)
}

export default SignUp