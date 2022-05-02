//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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

export const Screen2 = () => {
	const popup = () => {
		alert(`You're doing awesome!`)
	}

	return (
		<View style={styles.content}>
			<Text style={styles.h2}>Screen2.js</Text>
			<TouchableOpacity style={styles.btn} onPress={popup}>
				<Text style={styles.body}>Tap Me!</Text>
			</TouchableOpacity>
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
	btn: {
		...Buttons.transparent,
		marginHorizontal: Misc.margin,
		marginTop: Misc.padding * 2,
	},
})
