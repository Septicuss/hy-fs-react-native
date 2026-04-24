import * as yup from "yup";
import {useFormik} from "formik";
import Text from "./Text";
import {Pressable, StyleSheet, TextInput, View} from "react-native";
import theme from "../theme";
import {CREATE_REVIEW} from "../graphql/mutations";
import {useMutation} from "@apollo/client/react";
import {useNavigate} from "react-router-native";

const reviewSchema = yup.object().shape({
	repositoryOwner: yup
			.string()
			.required('Repository owner name is required'),
	repositoryName: yup
			.string()
			.required('Repository name is required'),
	rating: yup
			.number()
			.max(100, 'Rating must be between 0-100')
			.min(0, 'Rating must be between 0-100')
			.required(),
	review: yup
			.string()
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

const ReviewForm = () => {
	const navigate = useNavigate()
	const [mutate, result] = useMutation(CREATE_REVIEW);
	const formik = useFormik({
		initialValues: {
			repositoryOwner: '',
			repositoryName: '',
			rating: '',
			review: '',
		},
		validationSchema: reviewSchema,
		onSubmit: async (values) => {
			const {repositoryOwner, repositoryName, rating, review} = values

			const result = await mutate({variables: {
					ownerName: repositoryOwner,
					repositoryName: repositoryName,
					rating: parseInt(rating),
					text: review}
			})

			const repositoryId = result?.data?.createReview?.repositoryId
			if (repositoryId) {
				navigate(`/repository/${repositoryId}`)
			}
		},
	})

	const error = {
		repositoryOwner: formik.touched.repositoryOwner && formik.errors.repositoryOwner,
		repositoryName: formik.touched.repositoryName && formik.errors.repositoryName,
		rating: formik.touched.rating && formik.errors.rating,
		review: formik.touched.review && formik.errors.review,
	}

	return (
			<View style={styles.container}>
				<Text fontWeight='bold' fontSize='subheading'>
					Create review
				</Text>

				<View>
					<TextInput
							style={[styles.input, (error.repositoryOwner && {borderColor: 'red'})]}
							placeholder='Repository owner name'
							value={formik.values.repositoryOwner}
							onChangeText={formik.handleChange('repositoryOwner')}
							onBlur={formik.handleBlur('repositoryOwner')}
					/>
					{error.repositoryOwner && (
							<Text style={{ color: 'red' }}>{formik.errors.repositoryOwner}</Text>
					)}
				</View>

				<View>
					<TextInput
							style={[styles.input, (error.repositoryName && {borderColor: 'red'})]}
							placeholder='Repository name'
							value={formik.values.repositoryName}
							onChangeText={formik.handleChange('repositoryName')}
							onBlur={formik.handleBlur('repositoryName')}
					/>
					{error.repositoryName && (
							<Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
					)}
				</View>

				<View>
					<TextInput
							style={[styles.input, (error.rating && {borderColor: 'red'})]}
							placeholder='Rating between 0 and 100'
							value={formik.values.rating}
							onChangeText={formik.handleChange('rating')}
							onBlur={formik.handleBlur('rating')}
					/>
					{error.rating && (
							<Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
					)}
				</View>

				<View>
					<TextInput
							style={[styles.input, {height: 70}, (error.review && {borderColor: 'red'})]}
							placeholder='Review'
							value={formik.values.review}
							onChangeText={formik.handleChange('review')}
							onBlur={formik.handleBlur('review')}
							multiline
					/>
					{error.review && (
							<Text style={{ color: 'red' }}>{formik.errors.review}</Text>
					)}
				</View>

				<Pressable role="button" style={styles.button} onPress={formik.handleSubmit}>
					<Text
							fontWeight='bold'
							color='white'
					>
						Create review
					</Text>
				</Pressable>

			</View>
	)
}

export default ReviewForm