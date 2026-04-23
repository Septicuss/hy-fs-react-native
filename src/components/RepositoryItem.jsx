import {StyleSheet, View} from "react-native";
import Text from "./Text";


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		borderRadius: 20,
		padding: 20,
	}
})

const RepositoryItem = ({item}) => {
	return (
			<View style={styles.container}>
				<Text fontWeight={"bold"}>Full name: {item.fullName}</Text>
				<Text>Description: {item.description}</Text>
				<Text>Language: {item.language}</Text>
				<Text>Stars: {item.stargazersCount}</Text>
				<Text>Forks: {item.forksCount}</Text>
				<Text>Reviews: {item.reviewCount}</Text>
				<Text>Rating: {item.ratingAverage}</Text>
			</View>
		)
}

export default RepositoryItem