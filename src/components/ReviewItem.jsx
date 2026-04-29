import {format} from "date-fns";
import {StyleSheet, View} from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
	review: {
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5,
		padding: 3,
		borderWidth: 1,
		borderRadius: 5,
		paddingInline: 10,
		flexDirection: "row",
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
	}
})


const ReviewItem = ({review}) => {

	const date = new Date(review.createdAt)
	const prettyDate = format(date,"dd MMM yyyy")

	const reviewTitle = review?.user?.username
		? review.user.username
		: review.repository.fullName

	return (
			<View style={styles.review}>

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
	)
}

export default ReviewItem