import {useParams} from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hook/useRepository";
import Text from "./Text";
import {FlatList} from "react-native";
import ReviewItem from "./ReviewItem";

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