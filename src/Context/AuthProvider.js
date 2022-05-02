//React & React Native
import React, { useContext, useEffect, useState, createContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const login = async () => {}

	const register = async () => {}

	const logout = async () => {}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
