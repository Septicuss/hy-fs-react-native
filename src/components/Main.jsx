import {StyleSheet, View} from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const Main = () => {
	return (
			<View style={styles.container}>
				<AppBar />
				<View>
					<RepositoryList />
				</View>
			</View>
	);
};

export default Main;