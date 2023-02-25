import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Card, HelperText, withTheme,TextInput } from 'react-native-paper';
import NavbarStyles from '../../assets/styles/NavbarStyles/NavbarStyles';
import GeneralProperties from '../../assets/styles/GeneralProperties';

const SearchBar = ({navigation, theme, title, func}) => {
  return (
    <View style={NavbarStyles.searchAddScriptView}>
            <View style={NavbarStyles.searchTextFieldView}>
                <Feather name='search' size={20} color={colors.grey} style={[GeneralProperties.ml2]} />
                <TextInput 
                autoCapitalize='none'
                // dense={true}
                underlineColorAndroid='white'
                underlineColor='white'
                backgroundColor="transparent"
                theme={{colors:{primary: "white",
                backgroundColor:"transparent"}}}
                style={NavbarStyles.textInput}
                placeholder='Search...'/>
            </View>
            <Button 
            onPress={()=>{navigation.navigate(func)}}
            mode='contained'
            style={NavbarStyles.addScriptButton}>
                <Text style={NavbarStyles.button}>+ Script</Text>
            </Button>

        </View>
  );
};


export default withNavigation(SearchBar);
