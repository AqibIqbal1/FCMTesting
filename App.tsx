import {Alert, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';

const App = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    getDeviceToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived!',
        JSON.stringify(remoteMessage.notification?.body),
      );
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    let Token = await messaging().getToken();
    setToken(Token);
    console.log(Token);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 32}}>Firebase Cloud Messsaging</Text>
      <Text style={{fontSize: 16, padding: 20}} selectable>{token}</Text>
    </View>
  );
};

export default App;
