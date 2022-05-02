//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
//Context
//Constants
//Navigation
import { TabNav } from './TabNav'
//Components
//Screens
//Icons
//Images
//Styles
import { Buttons, Colors, Containers, Fonts, Images, Index, Misc, Window } from '../Styles/Index'

export const Routes = () => {
	return (
		<View style={styles.routesView}>
			<TabNav />
		</View>
	)
}

const styles = StyleSheet.create({
	routesView: {
		...Containers.routesView,
	},
	safeAreaView: {
		...Containers.safeAreaView,
	},
})
