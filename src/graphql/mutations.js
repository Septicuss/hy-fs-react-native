import {gql} from '@apollo/client'

export const AUTHENTICATE = gql`
	mutation Authenticate($username: String!, $password: String!){
      authenticate(credentials: { username: $username, password: $password }) {
          accessToken
      }
	}
`

export const CREATE_REVIEW = gql`
	mutation($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String) {
      createReview(review: {
          ownerName: $ownerName,
          rating: $rating,
          repositoryName: $repositoryName,
          text: $text
      }) {
          repositoryId
      }
	}
`