import {View, StyleSheet, Pressable} from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 10,
		paddingLeft: 20,
		paddingBottom: 20,
		marginBottom: 20,
		backgroundColor: theme.colors.primary,
	},
});

const AppTab = ({name}) => (
		<Pressable>
			<Text
					fontSize='subheading'
					fontWeight='bold'
			>
				{name}
			</Text>
		</Pressable>
)

const AppBar = () => {
	return <View style={styles.container}>
		<AppTab name={"Repositories"} />
	</View>;
};

export default AppBar;
