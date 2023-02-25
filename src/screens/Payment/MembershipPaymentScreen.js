import React, { useContext } from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import { withNavigation } from 'react-navigation';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import StripeCheckout from 'react-native-stripe-checkout-webview';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import Auth from '@aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MembershipPaymentScreen = ({navigation}) => {
    const stripeCustomerId = navigation.state.params.id;
    const {
      storeFirstName,
      storeLastName,
      storeEmail,
      storePhone,
      storeToken,
      storePassword,
      regex,
      baseUrl,
      email,
      password,
      token
    } = useContext(AppContext);

    const loginUser = () => {
      Auth.signOut();
      Auth.signIn(email, password)
        .then((user) => {
          const arrayOfAttrib = Object.values(user.attributes);
          console.log(arrayOfAttrib[4]);
          storeFirstName(user.attributes.name);
          storeLastName(arrayOfAttrib[4]);
          storeEmail(user.attributes.email);
          storePassword(password);
          storePhone(user.attributes.phone_number);
          storeToken(user.signInUserSession.idToken.jwtToken);
          storeData(
            user.attributes.name,
            arrayOfAttrib[4],
            user.attributes.email,
            user.attributes.phone_number,
            user.signInUserSession.idToken.jwtToken,
            password,
          );
          
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    const storeData = async (name, lastname, email, phone_number, token,password) => {
      try {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('lastname', lastname);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('phone_number', phone_number);
        await AsyncStorage.setItem('token', token);
      } catch (e) {
        console.log(e);
      }
    };
    
    const completePayment = async (checkOutSessionId) => {
        await Auth.currentSession().then((data)=>{
          console.log(data.idToken.jwtToken);
          storeToken(data.idToken.jwtToken);
          RNFetchBlob.config({
            trusty: true,
            timeout: 60000,
          }).fetch('POST', `${baseUrl}/paymentcheckout/savePaymentMethodForCustomer?id=${checkOutSessionId}`, {
            Authorization : `${data.idToken.jwtToken}`
          })
          .then((resp) => {
            console.log(resp);
            if(resp.respInfo.status == 200) {
              // loginUser();
              navigation.goBack();  
            }
            
          }).catch((err) => {
                console.log(err);
          })
        }).catch((err) => {
          console.log(err);
        });
      };


    return (
       <SafeAreaView style={ContainerStyle.safeAreaContainer}>
           <StripeCheckout
          // stripePublicKey={'pk_live_51HdvlyKpWRNCpngDMqOnugPKfZu2L6qrWyBrpvAYGGWeEDfV9O605MwUy4fD5x73ZPU06gftVSWUiCs6wmMGGMtm0061eZfESQ'}
          stripePublicKey={'pk_test_51HdvlyKpWRNCpngD0AgXWKLkkDm7kFdo108PlJuKwrjZqGKJqFBIv3hYHjABpLlZmJNUI6nWlhWtvqfUIL6kBSqd00Gz54A6gI'}
          checkoutSessionInput={{
            sessionId: stripeCustomerId,
          }}
          onSuccess={({ currentUrl }) => {
              console.log(currentUrl.length);
              if(currentUrl.length > 200)
              {
                console.log("Url loaded");
              }else
              {
                let index = currentUrl.indexOf('membershipId')-1;
                let checkOutSessionId = currentUrl.substring(currentUrl.indexOf('id=')+3, index);
                // console.log(currentUrl);
                // console.log(checkOutSessionId);
                completePayment(checkOutSessionId);
              }
          }} 
          onCancel={() => {
              console.log(`Stripe checkout session cancelled.`);
              navigation.goBack();
          }}
        />
       </SafeAreaView>    
   );
}

export default withNavigation(MembershipPaymentScreen);