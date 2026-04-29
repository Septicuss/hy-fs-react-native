import {format} from "date-fns";
import {Alert, Pressable, StyleSheet, View} from "react-native";
import Text from "./Text";
import {useNavigate} from "react-router-native";
import {AUTHENTICATE, DELETE_REVIEW} from "../graphql/mutations";
import {useMutation} from "@apollo/client/react";

const styles = StyleSheet.create({
	review: {
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5,
		padding: 3,
		borderWidth: 1,
		borderRadius: 5,
		paddingInline: 10,
	},
	reviewLayout: {
		flexDirection: "row",
		gap: 10,
	},
	rating: {
		padding: 10,
		borderColor: 'blue',
		borderWidth: 4,
		flex: 0,
		height: 60,
		width: 60,
		borderRadius: 50,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	details: {
		flex: 10,
	},
	detailsAuthor: {
		marginBottom: 10,
	},
	separator: {
		borderColor: '#d1d1d1',
		margin: 10,
		marginLeft: 0,
		marginRight: 0,
		height: 1,
		borderWidth: 1
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		flexGrow: 1,
		borderRadius: 10,
	}
})

const Button = ({color = '#3287a8', title, onPress}) => {
	return (
			<Pressable
					style={{...styles.button, backgroundColor: color}}
					onPress={onPress}
			>
				<Text fontWeight='bold'>{title}</Text>
			</Pressable>
	)
}

const ReviewItem = ({review, controls = false, refetch = undefined}) => {
	const navigate = useNavigate()
	const [deleteReview, result] = useMutation(DELETE_REVIEW);

	const date = new Date(review.createdAt)
	const prettyDate = format(date,"dd MMM yyyy")

	const reviewTitle = review?.user?.username
		? review.user.username
		: review.repository.fullName

	const handleViewRepository = async () => {
		navigate(`/repository/${review.repository.id}`)
	}

	const handleDeleteReview = () => {
		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{text: 'Cancel', style: 'cancel'},
			{text: 'Delete', style: 'destructive', onPress: async () => {
					deleteReview({variables: {reviewId: review.id}})
					await refetch()
			}}
		])
	}

	return (
			<View style={styles.review}>

				<View style={styles.reviewLayout}>
					<View style={styles.rating}>
						<Text fontWeight='bold'>{review.rating}</Text>
					</View>


					<View style={styles.details}>
						<View style={styles.detailsAuthor}>
							<Text fontWeight='bold'>{reviewTitle}</Text>
							<Text color='textSecondary'>{prettyDate}</Text>
						</View>

						<View>
							<Text>{review.text}</Text>
						</View>

					</View>
				</View>

				{controls && <>
					<View style={styles.separator}></View>
					<View style={styles.reviewLayout}>

						<Button
							title='View repository'
							onPress={() => handleViewRepository()}
						/>

						<Button
							title='Delete review'
							color='#b82346'
							onPress={() => handleDeleteReview()}
						/>

					</View>
				</>}


			</View>
	)
}

export default ReviewItem