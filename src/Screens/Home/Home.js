//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
//Packages
//Context
//Constants
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const Home = ({ navigation }) => {
	const goToScreen1 = () => {
		navigation.navigate('Screen1')
	}

	const goToScreen2 = () => {
		navigation.navigate('Screen2')
	}

	return (
		<View style={styles.content}>
			<Text style={styles.h2}>Home.js</Text>
			<Text style={styles.body}>Welcome to RN_Template!</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
	},
	h2: {
		...Fonts.h2,
	},
	body: {
		...Fonts.body,
		marginTop: Misc.margin * 2,
	},
	navRow: {
		flexDirection: 'row',
		marginTop: Misc.padding * 2,
	},
	navBtn: {
		...Buttons.transparent,
		marginHorizontal: Misc.margin,
		justifyContent: 'flex-start',
	},
})
