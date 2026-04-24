import {useQuery} from "@apollo/client/react";
import {GET_REPOSITORY} from "../graphql/queries";

const useRepository = (id) => {
	const { data, error, loading, refetch} = useQuery(GET_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: {id: id}
	});

	return { repository: data?.repository, loading, refetch: refetch };
};

export default useRepository;