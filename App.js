//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LogBox } from 'react-native'
//Packages
import SplashScreen from 'react-native-splash-screen'
//Context
import { DummyProvider } from './src/Context/DummyProvider'
//Constants
//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/Navigation/Routes'
//Components
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from './src/Styles/Index'

const App = () => {
	useEffect(() => {
		SplashScreen.hide()
	})

	LogBox.ignoreAllLogs()

	return (
		<NavigationContainer>
			<DummyProvider>
				<View style={styles.appView}>
					<Routes />
				</View>
			</DummyProvider>
		</NavigationContainer>
	)
}

export default App

const styles = StyleSheet.create({
	appView: {
		...Containers.appView,
	},
	h1: {
		...Fonts.h1,
	},
})
