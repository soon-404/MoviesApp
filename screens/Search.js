import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../service/services';
import Card from '../components/Card';
import Error from '../components/Error';
const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResult, setSearchResults] = useState();
  const [error, setError] = useState(false);
  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movie, tv]) => {
        const data = [...movie, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Search Movie or TV Show"
              onChangeText={onChangeText}
              value={text}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} color={'#aaa'} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResult && searchResult.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResult}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item}></Card>
              )}
              keyExtractor={item => item.id}></FlatList>
          )}

          {/* When searched but no results */}
          {searchResult && searchResult.length == 0 && (
            <View>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResult && (
            <View>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 8,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {alignItems: 'center'},
});

export default Search;
