import {AUTHENTICATE} from "../graphql/mutations";
import {useApolloClient, useMutation} from "@apollo/client/react";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
	const authStorage = useAuthStorage()
	const apolloClient = useApolloClient()
	const [mutate, result] = useMutation(AUTHENTICATE);

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({variables: {username, password}})
		const token = data?.authenticate?.accessToken

		if (token) {
			await authStorage.setAccessToken(token)

			apolloClient.resetStore();
		}

		return true
	};

	return [signIn, result];
};

export default useSignIn