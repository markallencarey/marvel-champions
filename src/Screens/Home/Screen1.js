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

export const Screen1 = () => {
	const [pressed, setPressed] = useState(false)
	const [bgColor, setBgColor] = useState(Colors.white)

	const changeBg = () => {
		setPressed(!pressed)
	}

	return (
		<View style={styles.content(pressed)}>
			<Text style={styles.h2(pressed)}>Screen1.js</Text>
			<TouchableOpacity style={styles.btn(pressed)} onPress={changeBg}>
				<Text style={styles.body(pressed)}>Tap Me!</Text>
				<Text style={styles.body(pressed)}>{pressed ? 'Dark' : 'Light'}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	content: pressed => ({
		...Containers.content,
		backgroundColor: pressed ? Colors.black : Colors.white,
	}),
	h2: pressed => ({
		...Fonts.h2,
		color: pressed ? Colors.white : Colors.black,
	}),
	body: pressed => ({
		...Fonts.body,
		color: pressed ? Colors.white : Colors.black,
	}),
	btn: pressed => ({
		...Buttons.transparent,
		marginHorizontal: Misc.margin,
		marginTop: Misc.padding * 2,
		borderColor: pressed ? Colors.white : Colors.black,
	}),
})
