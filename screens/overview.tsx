import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../navigation';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

const isPosterUrlValid = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json'
        );
        const json = await response.json();

        const filteredMovies = await Promise.all(
          json.movies.map(async (movie) => {
            if (await isPosterUrlValid(movie.posterUrl)) {
              return movie;
            }
          })
        );

        const validMovies = filteredMovies.filter((movie) => movie);

        setMovies(validMovies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleMovies}>MOVIES</Text>
      </View>
      <View style={styles.listMovies}>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { movieDetails: item })}
              style={styles.containerMovie}>
              <Image source={{ uri: item.posterUrl }} style={styles.moviePoster} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#1d0f52',
  },
  titleMovies: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    color: '#fff',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listMovies: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  movieTitle: {
    fontSize: 18,
    color: '#1d0f52',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    flexWrap: 'wrap',
    maxWidth: 170,
    paddingHorizontal: 10,
  },
  moviePoster: {
    width: 150,
    height: 250,
    borderRadius: 10,
    margin: 10,
  },
  containerMovie: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
  },
});
