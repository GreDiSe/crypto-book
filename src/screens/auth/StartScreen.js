import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import {View} from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
        <View style={{ height: 12, width: 1 }} />
      <Header size={28}>{'Crypto Book'}</Header>
        <View style={{ height: 24, width: 1 }} />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
