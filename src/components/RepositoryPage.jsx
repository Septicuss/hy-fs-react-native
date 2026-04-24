import {useParams} from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hook/useRepository";
import Text from "./Text";

const RepositoryPage = () => {
	const {repositoryId} = useParams()
	const {repository, loading} = useRepository(repositoryId)

	if (loading) {
		return <Text>Loading...</Text>
	}

	return <RepositoryItem item={repository} single={true}/>
}

export default RepositoryPage