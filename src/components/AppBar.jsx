import {View, StyleSheet, Pressable} from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";
import {Link} from "react-router-native";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 10,
		paddingLeft: 20,
		paddingBottom: 20,
		marginBottom: 20,
		backgroundColor: theme.colors.primary,
		flexDirection: 'row',
		gap: 20,
	},
	tab: {
		padding: 2,
	}
});

const AppTab = ({name, route}) => (
		<Link to={route}>
			<View style={styles.tab}>
				<Text
						fontSize='subheading'
						fontWeight='bold'
				>
					{name}
				</Text>
			</View>
		</Link>
)

const AppBar = () => {
	return <View style={styles.container}>
		<AppTab name={"Repositories"} route='/' />
		<AppTab name={"Sign In"} route='/sign-in' />
	</View>;
};

export default AppBar;
