//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LogBox } from 'react-native'
//Packages
import SplashScreen from 'react-native-splash-screen'
//Context
import { CardsProvider } from './src/Context/CardsProvider'
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
			<CardsProvider>
				<View style={styles.appView}>
					<Routes />
				</View>
			</CardsProvider>
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
