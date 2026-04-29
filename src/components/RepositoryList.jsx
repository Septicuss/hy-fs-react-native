import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hook/useRepositories";
import {useNavigate} from "react-router-native";
import {useState} from "react";
import Text from "./Text";
import {Picker} from "@react-native-picker/picker";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({handleChangeOrdering}) => {
	const [orderingType, setOrderingType] = useState('latest')
	const orderingTypes = [
		{id: 'latest', label: 'Latest repositories'},
		{id: 'highest_rated', label: 'Highest rated repositories'},
		{id: 'lowest_rated', label: 'Lowest rated repositories'}
	]

	return (
			<>
				<Picker
					selectedValue={orderingType}
					onValueChange={(itemValue) => {
						setOrderingType(itemValue)
						handleChangeOrdering(itemValue)
					}}
				>
					{orderingTypes.map(value =>
							<Picker.Item label={value.label} value={value.id} />
					)}
				</Picker>
			</>
	)
}

export const RepositoryListContainer = ({ repositories, pressRepository, loading, handleChangeOrdering }) => {
	const repositoryNodes = repositories
			? repositories.edges.map(edge => edge.node)
			: [];

	return (
			<FlatList
					data={repositoryNodes}
					ItemSeparatorComponent={ItemSeparator}
					ListHeaderComponent={<RepositoryListHeader handleChangeOrdering={handleChangeOrdering} />}
					renderItem={({item}) => {

						if (loading)
							return null

						return (<Pressable onPress={() => pressRepository(item)}>
									<RepositoryItem
											key={item.id}
											item={item}
									/>
								</Pressable>
						)
					}}
			/>
	);
}

const RepositoryList = () => {
	const [ordering, setOrdering] = useState({
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC'
	})
	const { repositories, loading } = useRepositories({...ordering})
	const navigate = useNavigate()

	const pressRepository = async (repository) => {
		navigate(`/repository/${repository.id}`)
	}

	// 'latest','highest rated', 'lowest rated'
	const handleChangeOrdering = (orderingType) => {
		console.log('setting to', orderingType)
		switch (orderingType.toLowerCase()) {
			case 'latest':
				setOrdering({orderBy: 'CREATED_AT', orderDirection: 'DESC'})
				break
			case 'highest_rated':
				setOrdering({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'})
				break
			case 'lowest_rated':
				setOrdering({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'})
				break
			default:
				break
		}
		console.log(' result:',ordering)

	}

	return <RepositoryListContainer
			repositories={repositories}
			loading={loading}
			pressRepository={pressRepository}
			handleChangeOrdering={handleChangeOrdering}
	/>
};

export default RepositoryList;