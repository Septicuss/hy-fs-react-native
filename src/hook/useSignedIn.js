import {GET_ME} from "../graphql/queries";
import {useApolloClient, useQuery} from "@apollo/client/react";
import useAuthStorage from "./useAuthStorage";


const useSignedIn = () => {
	const authStorage = useAuthStorage()
	const apolloClient = useApolloClient()
	const {data} = useQuery(GET_ME)

	return {
		signedIn: data?.me?.id ? true : false,
		signOut: async () => {
			console.log("removing token")
			await authStorage.removeAccessToken()
			await apolloClient.resetStore()
		}
	}
}

export default useSignedIn