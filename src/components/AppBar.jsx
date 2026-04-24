import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";
import {Link} from "react-router-native";
import useSignedIn from "../hook/useSignedIn";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 10,
		paddingLeft: 20,
		paddingBottom: 20,
		marginBottom: 20,
		backgroundColor: theme.colors.primary,
		gap: 20,
	},
	tab: {
		padding: 2,
	}
});

const AppTab = ({ name, route, onPress }) => {
	const content = (
			<View style={styles.tab}>
				<Text fontSize="subheading" fontWeight="bold">
					{name}
				</Text>
			</View>
	)

	if (onPress) {
		return <>
			<Pressable onPress={onPress}>
				{content}
			</Pressable>
		</>
	}

	return <>
		<Link to={route}>
			{content}
		</Link>
	</>
}

const AppBar = () => {
	const {signedIn, signOut} = useSignedIn()

	return <>
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppTab name={"Repositories"} route='/' />
				{signedIn ?
					<>
						<AppTab name={"Create a review"} route='/create-review' />
						<AppTab name={"Sign Out"} onPress={async () => {
							await signOut()
						}} />
					</>
				:
					<>
						<AppTab name={"Sign In"} route='/sign-in' />
						<AppTab name={"Sign Up"} route='/sign-up' />
					</>
				}
			</ScrollView>
		</View>
	</>
};

export default AppBar;
