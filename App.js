import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {getPopularMovies} from './service/services';
import Home from './screens/Home';
const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Home></Home>
    </View>
  );
};

export default App;
