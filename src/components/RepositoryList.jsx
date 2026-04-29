import {FlatList, Pressable, StyleSheet, TextInput, View} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hook/useRepositories";
import {useNavigate} from "react-router-native";
import {useEffect, useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {useDebounce} from "use-debounce";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	search: {
		borderWidth: 1,
		borderRadius: 15,
		height: 50,
		paddingHorizontal: 10,
		marginLeft: 10,
		marginRight: 10
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({handleChangeOrdering, handleChangeSearch}) => {
	const [orderingType, setOrderingType] = useState('latest')
	const [search, setSearch] = useState('')
	const [searchValue] = useDebounce(search, 300)

	useEffect(() => {
		handleChangeSearch(searchValue)
	}, [searchValue])

	const orderingTypes = [
		{id: 'latest', label: 'Latest repositories'},
		{id: 'highest_rated', label: 'Highest rated repositories'},
		{id: 'lowest_rated', label: 'Lowest rated repositories'}
	]

	return (
			<>
				<TextInput
					style={styles.search}
					value={search}
					onChangeText={(text) => setSearch(text)}
					placeholder={'Search'}
				/>
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

export const RepositoryListContainer = ({ repositories, pressRepository, loading, handleChangeSearch, handleChangeOrdering }) => {
	const repositoryNodes = repositories
			? repositories.edges.map(edge => edge.node)
			: [];

	return (
			<FlatList
					data={repositoryNodes}
					ItemSeparatorComponent={ItemSeparator}
					ListHeaderComponent={<RepositoryListHeader
							handleChangeOrdering={handleChangeOrdering}
							handleChangeSearch={handleChangeSearch}
					/>}
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
	const [searchOptions, setSearchOptions] = useState({
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC'
	})
	const { repositories, loading } = useRepositories({...searchOptions})
	const navigate = useNavigate()

	const pressRepository = async (repository) => {
		navigate(`/repository/${repository.id}`)
	}

	// 'latest','highest rated', 'lowest rated'
	const handleChangeOrdering = (orderingType) => {
		switch (orderingType.toLowerCase()) {
			case 'latest':
				setSearchOptions({...searchOptions, orderBy: 'CREATED_AT', orderDirection: 'DESC'})
				break
			case 'highest_rated':
				setSearchOptions({...searchOptions, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'})
				break
			case 'lowest_rated':
				setSearchOptions({...searchOptions, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'})
				break
			default:
				break
		}
	}

	const handleChangeSearch = (search) => {
		setSearchOptions({...searchOptions, search: search})
	}

	return <RepositoryListContainer
			repositories={repositories}
			loading={loading}
			pressRepository={pressRepository}
			handleChangeOrdering={handleChangeOrdering}
			handleChangeSearch={handleChangeSearch}
	/>
};

export default RepositoryList;