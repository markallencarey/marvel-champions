//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
//Packages
//Context
import { AuthContext } from '../../Context/AuthProvider'
//Constants
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const LogIn = ({ navigation }) => {
	const { login } = useContext(AuthContext)
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	return (
		<View style={styles.content}>
			<Text style={styles.h2}>LogIn.js</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.input}
					placeholder='Email'
					onChangeText={input => setEmail(input)}
					autoComplete='email'
					keyboardType='email-address'
					autoCapitalize='none'
				/>
				<TextInput style={styles.input} placeholder='Password' onChangeText={input => setPassword(input)} secureTextEntry={true} />
				<TouchableOpacity style={styles.btn} onPress={() => login(email, password)}>
					<Text style={styles.h3}>Log In</Text>
				</TouchableOpacity>
				<Text style={styles.h3}>Are you new?</Text>
				<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
					<Text style={styles.h3}>Register</Text>
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
	h3: {
		...Fonts.h3,
	},
	inputView: {
		marginTop: Misc.margin * 3,
		width: '100%',
		alignItems: 'center',
	},
	input: {
		...Containers.textInput,
		width: '100%',
	},
	btn: {
		...Buttons.transparent,
		marginVertical: Misc.margin,
	},
})
