//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
//Context
//Constants
//Navigation
//Components
//Screens
// import { CardList } from './CardList'
// import { DeckList } from '../../Screens/Home/DeckList'
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const Home = ({ navigation }) => {
	const goToCardList = () => {
		navigation.navigate('CardList')
	}

	const goToDeckList = () => {
		navigation.navigate('DeckList')
	}

	return (
		<View style={styles.content}>
			{/* <Text style={styles.h2}>Home.js</Text> */}
			<View style={styles.navRow}>
				<TouchableOpacity style={styles.navBtn} onPress={goToCardList}>
					{/* <Text style={styles.body}>Go to</Text> */}
					<Text style={styles.body}>Card List</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navBtn} onPress={goToDeckList}>
					{/* <Text style={styles.body}>Go to</Text> */}
					<Text style={styles.body}>Deck List</Text>
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
