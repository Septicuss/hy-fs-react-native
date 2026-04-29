import {useQuery} from "@apollo/client/react";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = ({orderBy = 'CREATED_AT', orderDirection = 'DESC', search = undefined}) => {
	if (search === '')
		search = undefined

	const { data, error, loading, refetch} = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {orderBy, orderDirection, search}
	});

	return { repositories: data?.repositories, loading, refetch: refetch };
};

export default useRepositories;