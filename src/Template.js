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
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../Styles/Index'

export const Template = () => {
	return (
		<View style={styles.content}>
			<Text>Template.js</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
	},
})
