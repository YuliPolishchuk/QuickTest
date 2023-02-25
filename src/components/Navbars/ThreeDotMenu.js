import React, {useState} from 'react';
import {Alert, Modal, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';


const ThreeDotMenu = () => {
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(true);
      }}
      style={{height: 100, backgroundColor: 'red'}}>
      <Text>Hello world!</Text>
    
    </TouchableOpacity>
  );
};
export default ThreeDotMenu;
