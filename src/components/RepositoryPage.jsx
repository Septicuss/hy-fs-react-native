import {useParams} from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hook/useRepository";
import Text from "./Text";
import {FlatList, StyleSheet, View} from "react-native";
import theme from "../theme";
import {format} from 'date-fns'

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
	const prettyDate = format(date, "dd MMM yyyy")

	return (
			<View style={styles.review}>

				<View style={styles.rating}>
					<Text fontWeight='bold'>{review.rating}</Text>
				</View>


				<View style={styles.details}>
					<View style={styles.detailsAuthor}>
						<Text fontWeight='bold'>{review.user.username}</Text>
						<Text color='textSecondary'>{prettyDate}</Text>
					</View>

					<View>
						<Text>{review.text}</Text>
					</View>
				</View>

			</View>
	)
}

const RepositoryPage = () => {
	const {repositoryId} = useParams()
	const {repository, loading} = useRepository(repositoryId)

	if (loading) {
		return <Text>Loading...</Text>
	}

	const reviewNodes = repository?.reviews
			? repository.reviews.edges.map(edge => edge.node)
			: []


	return <FlatList
			data={reviewNodes}
			renderItem={({item}) => <ReviewItem review={item} />}
			keyExtractor={({id}) => id}
			ListHeaderComponent={() => <RepositoryItem item={repository} single={true}/>}
	/>
}

export default RepositoryPage