//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
//Context
//Constants
//Navigation
//Components
//Screens
import { Screen1 } from '../../Screens/Home/Screen1'
import { Screen2 } from '../../Screens/Home/Screen2'
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
			<View style={styles.navRow}>
				<TouchableOpacity style={styles.navBtn} onPress={goToScreen1}>
					<Text style={styles.body}>Go to</Text>
					<Text style={styles.body}>Screen1</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navBtn} onPress={goToScreen2}>
					<Text style={styles.body}>Go to</Text>
					<Text style={styles.body}>Screen2</Text>
				</TouchableOpacity>
			</View>
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
	},
	navRow: {
		flexDirection: 'row',
		marginTop: Misc.padding * 2,
	},
	navBtn: {
		...Buttons.transparent,
		marginHorizontal: Misc.margin,
	},
})
