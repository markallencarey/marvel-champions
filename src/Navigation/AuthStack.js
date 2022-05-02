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
import { LogIn } from '../Screens/Auth/LogIn'
import { Register } from '../Screens/Auth/Register'
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../Styles/Index'

const Stack = createNativeStackNavigator()

export const AuthStack = () => {
	const headerOptions = {}

	return (
		<Stack.Navigator initialRouteName={'LogIn'}>
			<Stack.Screen
				name='LogIn'
				component={LogIn}
				options={{
					title: 'Log In',
					...headerOptions,
				}}
			/>
			<Stack.Screen
				name='Register'
				component={Register}
				options={{
					...headerOptions,
				}}
			/>
			{/* <Stack.Screen
				name='Screen2'
				component={Screen2}
				options={{
					...headerOptions,
				}}
			/> */}
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
	},
})
