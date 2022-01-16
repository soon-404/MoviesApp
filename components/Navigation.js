import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class Navbar extends React.PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name={'chevron-back'} size={40} color={'#aaa'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Navbar;
