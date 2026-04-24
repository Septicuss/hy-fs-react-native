import {Image, Linking, Pressable, StyleSheet, View} from "react-native";
import Text from "./Text";
import theme from "../theme";


const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.secondary,
		padding: 20,
	},
	itemHeading: {
		flexDirection: 'row',
		gap: 20,
	},
	itemHeadingDescription: {
		gap: 2,
	},
	languageCard: {
		backgroundColor: '#ffffff',
		padding: 5,
		borderRadius: 30,
		alignSelf: 'flex-start',
		marginTop: 5,
	},
	stats: {
		marginTop: 10,
		paddingLeft: 30,
		paddingRight: 30,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	statCard: {
		textAlign: 'center'
	},
	statCardStat: {
		textAlign: 'center'
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 10
	},
	button: {
		height: 40,
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
	}
})

const Stat = ({testID, name, amount}) => {
	let amountText = amount

	if (amount > 1000) {
		amountText = (Math.round((amount / 1000) * 10) / 10) + 'k '
	}

	return (
		<View testID={testID}>
			<Text fontWeight='bold' style={styles.statCard}>{amountText}</Text>
			<Text style={styles.statCard}>{name}</Text>
		</View>
	)
}

const RepositoryItem = ({item, single = false}) => {

	const handleOpenUrl = async () => {
		if (item.url)
			await Linking.openURL(item.url)
	}

	return (
			<View testID="repositoryItem" style={styles.container}>
				<View style={styles.itemHeading}>
					<View>
						<Image
							style={styles.image}
							source={{uri: item.ownerAvatarUrl}}
						/>
					</View>

					<View style={styles.itemHeadingDescription}>
						<Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
						<Text color="textSecondary">{item.description}</Text>
						<Text style={styles.languageCard}>{item.language}</Text>
					</View>
				</View>


				<View style={styles.stats}>
					<Stat testID="stars" name="Stars" amount={item.stargazersCount} />
					<Stat testID="forks" name="Forks" amount={item.forksCount} />
					<Stat testID="reviews" name="Reviews" amount={item.reviewCount} />
					<Stat testID="rating" name="Rating" amount={item.ratingAverage} />
				</View>

				{single &&
					<Pressable style={styles.button} onPress={handleOpenUrl}>
						<Text>Open in GitHub</Text>
					</Pressable>
				}
			</View>
		)
}

export default RepositoryItem