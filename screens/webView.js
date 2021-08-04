import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const webView = ({route}) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')

//   const source = Platform.OS === 'ios' ? require('./assets/sample.html')
//     : { uri: 'file:///android_asset/sample.html' };

  const javascript = `
  document.body.style.backgroundColor = 'orange';
  window.alert('This is javascript');
`;

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async() => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('UserData')
  //     if (jsonValue != null) {
  //       let user = JSON.parse(jsonValue);
  //       setName(user.name);
  //       setEmail(user.email);
  //       setId(user.userid);
  //       console.log('webview user - ', id)
  //     }
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }

  const {userid, token} = route.params
  // const user_id = userid.toString();
  console.log(userid, token)

  return <>
    {
      !isLoaded ?
        <Progress.Bar
          progress={progress}
          width={null}
          borderWidth={0}
          borderRadius={0}
          color='#ff8300'
        /> : null
    }
    <WebView
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{uri: `https://customer-page.herokuapp.com?id=${userid}&token=${token}`}}
      onError={(event) =>
        alert(`Webview error: ${event.nativeEvent.description}`)
      }
      onMessage={(event) => {
        alert(event.nativeEvent.data);
      }}
      onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
      onLoadEnd={() => setLoaded(true)}
    />
  </>
}

export default webView