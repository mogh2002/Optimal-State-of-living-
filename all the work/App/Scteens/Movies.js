import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const movies = {
  Red: [
    {
      title: 'Inside Out (2015)',
      description:
        'A Pixar movie that explores emotions and how anger plays a role in personal growth.',
    },
    {
      title: 'The Pursuit of Happyness (2006)',
      description:
        'A story about perseverance despite frustration and hardship.',
    },
    {
      title: 'Good Will Hunting (1997)',
      description:
        'A powerful drama about overcoming anger and emotional barriers to find one\'s potential.',
    },
  ],
  White: [
    {
      title: 'Julie & Julia (2009)',
      description:
        'A story about finding structure and purpose through cooking and personal projects.',
    },
    {
      title: 'Eat Pray Love (2010)',
      description:
        'A journey to rediscover inner peace and balance amidst an overwhelming life.',
    },
    {
      title: 'Forrest Gump (1994)',
      description:
        'A film that portrays simplicity, focus, and navigating life with patience.',
    },
  ],
  Violet: [
    {
      title: 'The Shawshank Redemption (1994)',
      description: 'A story of hope and resilience in the darkest times.',
    },
    {
      title: 'Soul (2020)',
      description:
        'An animated film about rediscovering life\'s purpose and joy.',
    },
    {
      title: 'Big Fish (2003)',
      description:
        'A whimsical and emotional journey about love, loss, and storytelling.',
    },
  ],
  Yellow: [
    {
      title: 'The Secret Life of Walter Mitty (2013)',
      description:
        'A story about stepping into confidence and fully embracing life\'s adventures.',
    },
    {
      title: 'Dead Poets Society (1989)',
      description:
        'A film that highlights being present, empathetic, and grounded in one\'s passion.',
    },
    {
      title: 'The Greatest Showman (2017)',
      description:
        'A movie about staying confident and grounded while pursuing dreams.',
    },
  ],
};

const titleColors = {
  Red: '#ff4c4c', // Red
  White: '#808080', // Gray
  Violet: '#7a42f4', // Purple
  Yellow: '#ffd700', // Gold
};

export default function WatchMovies({ route }) {
  const { state } = route.params || [];
  const combinedMovies = state.flatMap((color) =>
    (movies[color] || []).map((movie) => ({ ...movie, color }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies to Watch</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {combinedMovies.map((movie, index) => (
          <View key={index} style={styles.card}>
            <Text
              style={[
                styles.movieTitle,
                { color: titleColors[movie.color] || '#333' },
              ]}
            >
              {movie.title}
            </Text>
            <Text style={styles.movieDescription}>{movie.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    borderColor: '#ddd',
    borderWidth: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
