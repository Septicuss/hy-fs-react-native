import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		return await AsyncStorage.getItem(this.getTokenKey())
	}

	async setAccessToken(accessToken) {
		await AsyncStorage.setItem(this.getTokenKey(), accessToken)
	}

	async removeAccessToken() {
		await AsyncStorage.removeItem(this.getTokenKey())
	}

	getTokenKey() {
		return `${this.namespace}:token`
	}
}

export default AuthStorage;