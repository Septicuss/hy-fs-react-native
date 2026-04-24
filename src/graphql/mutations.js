import {gql} from '@apollo/client'

export const AUTHENTICATE = gql`
	mutation Authenticate($username: String!, $password: String!){
      authenticate(credentials: { username: $username, password: $password }) {
          accessToken
      }
	}
`

export const REGISTER = gql`
	mutation Register($username: String!, $password: String!){
      createUser(user: { username: $username, password: $password }) {
          id
          username
      }
	}
`