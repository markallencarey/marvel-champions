//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
//Context
//Constants
import { AuthContext } from '../Context/AuthProvider'
//Navigation
import { MainStack } from './MainStack'
import { AuthStack } from './AuthStack'
//Components
//Screens
//Icons
//Images
//Styles
import { Buttons, Colors, Containers, Fonts, Images, Index, Misc, Window } from '../Styles/Index'

export const Routes = () => {
	const { user } = useContext(AuthContext)

	return <View style={styles.routesView}>{user ? <MainStack /> : <AuthStack />}</View>
}

const styles = StyleSheet.create({
	routesView: {
		...Containers.routesView,
	},
	safeAreaView: {
		...Containers.safeAreaView,
	},
})
