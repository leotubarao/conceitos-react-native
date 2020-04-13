import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

	async function handleListRepositories() {
		const response = await api.get('repositories');
		
    setRepositories(response.data);
  }

	async function handleLikeRepository(id) {
		await api.post(`repositories/${id}/like`);

		handleListRepositories();
	}

	useEffect(() => {
		handleListRepositories()
	}, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
					data={repositories}
					keyExtractor={ repository => repository.id }
					renderItem={({ item }) => (
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{item.title}</Text>

            <View style={styles.techsContainer}>
              {item.techs.map((tech, i) => (
                <Text key={i} style={styles.tech}>{tech}</Text>
              ))}
            </View>

            {!!item.likes && (
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} {item.likes > 1 ? 'curtidas' : 'curtida' }
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(item.id)}
              testID={`like-button-${item.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>

          </View>
        )}
				/>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    flexDirection: "row",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
