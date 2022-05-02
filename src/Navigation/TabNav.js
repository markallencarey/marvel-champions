//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
//Context
//Constants
//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
//Components
//Screens
import { Home } from '../Screens/Home/Home'
import { Screen1 } from '../Screens/Home/Screen1'
import { Screen2 } from '../Screens/Home/Screen2'
//Icons
import HomeIcon from '../Assets/Icons/TabNav/Home.svg'
import Screen1Icon from '../Assets/Icons/TabNav/Screen1.svg'
import Screen2Icon from '../Assets/Icons/TabNav/Screen2.svg'
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../Styles/Index'

const Tab = createBottomTabNavigator()

export const TabNav = () => {
	const isFocused = useIsFocused()

	return (
		<Tab.Navigator
			initialRouteName='Screen1'
			screenOptions={{
				style: styles.content,
			}}
		>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					tabBarIcon: () => <HomeIcon />,
				}}
			/>
			<Tab.Screen
				name='Screen1'
				component={Screen1}
				options={{
					tabBarIcon: () => <Screen1Icon />,
				}}
			/>
			<Tab.Screen
				name='Screen2'
				component={Screen2}
				options={{
					tabBarIcon: () => <Screen2Icon />,
				}}
			/>
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
	},
})
