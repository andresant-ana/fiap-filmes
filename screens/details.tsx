import { useRoute } from '@react-navigation/native';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function Details() {
  const route = useRoute<DetailsSreenRouteProp>();
  const { movieDetails } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.posterContainer}>
        <Image source={{ uri: movieDetails.posterUrl }} style={styles.moviePoster} />
      </View>
      <View style={styles.movieContainer}>
        <Text style={styles.text}>TITLE: {movieDetails.title}</Text>
        <Text style={styles.text}>RELEASE YEAR: {movieDetails.year}</Text>
        <Text style={styles.text}>DURATION: {movieDetails.runtime} min.</Text>
        <Text style={styles.text}>DIRECTOR: {movieDetails.director}</Text>
        <Text style={styles.text}>CAST: {movieDetails.actors}</Text>
        <Text style={styles.text}>SYNOPSIS: {movieDetails.plot}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1d0f52',
  },
  movieContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#1d0f52',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  moviePoster: {
    width: 150,
    height: 250,
    borderRadius: 10,
  },
  posterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    width: 175,
    height: 275,
    alignSelf: 'center',
  },
});
