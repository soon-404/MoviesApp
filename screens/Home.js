import React, {useState, useEffect, Fragment} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../service/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimentions = Dimensions.get('screen');
const Home = () => {
  const [moviesImages, setMoviesImages] = useState('');
  const [popularMovies, setPopularMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const moviesImageArray = [];
        movies.forEach(movie => {
          moviesImageArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImageArray);
      })
      .catch(err => {
        setError(err);
      });

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        setError(err);
      });
  }, []);
  return (
    <Fragment>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <SliderBox
            images={moviesImages}
            dotStyle={styles.sliderStyle}
            sliderBoxHeight={dimentions.height / 1.5}
            autoplay={true}
            circleLoop={true}></SliderBox>
        </View>

        <View style={styles.carousel}>
          <List title="Popular Movies" content={popularMovies}></List>
        </View>

        <View style={styles.carousel}>
          <List title="Popular Movies" content={popularMovies}></List>
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
