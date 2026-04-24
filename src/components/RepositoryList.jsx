import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hook/useRepositories";
import {useNavigate} from "react-router-native";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, pressRepository }) => {
	const repositoryNodes = repositories
			? repositories.edges.map(edge => edge.node)
			: [];

	return (
			<FlatList
					data={repositoryNodes}
					ItemSeparatorComponent={ItemSeparator}
					renderItem={({item}) => (
							<Pressable onPress={() => pressRepository(item)}>
								<RepositoryItem
										key={item.id}
										item={item}
								/>
							</Pressable>
					)}
			/>
	);
}

const RepositoryList = () => {
	const { repositories } = useRepositories()
	const navigate = useNavigate()

	const pressRepository = async (repository) => {
		navigate(`/repository/${repository.id}`)
	}

	return <RepositoryListContainer repositories={repositories} pressRepository={pressRepository} />
};

export default RepositoryList;