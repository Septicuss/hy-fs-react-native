import {GET_MY_REVIEWS} from "../graphql/queries";
import {FlatList} from "react-native";
import ReviewItem from "./ReviewItem";
import {useQuery} from "@apollo/client/react";

const MyReviewsPage = () => {
	const {data, error, loading, refetch} = useQuery(GET_MY_REVIEWS, {
		fetchPolicy: 'cache-and-network',
	});

	const reviewNodes = data?.me?.reviews
			? data?.me?.reviews.edges.map(edge => edge.node)
			: []

	return <FlatList
			data={reviewNodes}
			renderItem={({item}) => <ReviewItem
					review={item}
					controls={true}
					refetch={refetch}
			/>}
			keyExtractor={({id}) => id}
	/>
}

export default MyReviewsPage