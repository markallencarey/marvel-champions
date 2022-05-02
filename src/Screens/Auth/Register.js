//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
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

export const Register = ({ navigation }) => {
	const { register } = useContext(AuthContext)
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [name, setName] = useState()
	const [phone, setPhone] = useState()

	return (
		<ScrollView contentContainerStyle={styles.content}>
			<Text style={styles.h2}>Register.js</Text>
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
				<TextInput style={styles.input} placeholder='Name' onChangeText={input => setName(input)} />
				<TextInput
					style={styles.input}
					placeholder='Phone Number'
					onChangeText={input => setPhone(input)}
					keyboardType='phone-pad'
					autoComplete='tel'
				/>
				<TouchableOpacity style={styles.btn} onPress={() => register(email, password, name, phone)}>
					<Text style={styles.h3}>Register</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
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
		marginTop: Misc.margin * 2,
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
