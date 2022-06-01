//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
//Context
//Constants
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//Components
//Screens
import { Home } from '../Screens/Home/Home'
import { CardList } from '../Screens/Home/CardList'
import { DeckList } from '../Screens/Home/DeckList'
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../Styles/Index'

const Stack = createNativeStackNavigator()

export const MainStack = () => {
	const headerOptions = {}

	return (
		<Stack.Navigator initialRouteName={'Home'}>
			<Stack.Screen
				name='Home'
				component={Home}
				options={{
					...headerOptions,
				}}
			/>
			<Stack.Screen
				name='CardList'
				component={CardList}
				options={{
					...headerOptions,
					headerTitle: 'Card List'
				}}
			/>
			<Stack.Screen
				name='DeckList'
				component={DeckList}
				options={{
					...headerOptions,
					headerTitle: 'Deck List'
				}}
			/>
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
	},
})
