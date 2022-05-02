//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
//Packages
//Context
import { AuthContext } from '../../Context/AuthProvider'
//Constants
import { firestore, timestamp } from '../../Constants/Firebase'
//Navigation
//Components
//Screens
import { Screen1 } from '../../Screens/Home/Screen1'
import { Screen2 } from '../../Screens/Home/Screen2'
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const Home = ({ navigation }) => {
	const { signOut, userData, deleteUser } = useContext(AuthContext)
	const [textPosts, setTextPosts] = useState([])
	const [textInput, setTextInput] = useState('')

	useEffect(() => {
		firestore()
			.collection('Test')
			.orderBy('date', 'desc')
			.onSnapshot(
				querySnapshot => {
					const testPosts = []
					querySnapshot?.forEach(doc => {
						testPosts.push(doc.data())
					})
					setTextPosts(testPosts)
				},
				err => console.log(err)
			)
	}, [])

	const testPost = () => {
		firestore().collection('Test').add({
			text: textInput,
			date: timestamp,
		})
		setTextInput('')
	}

	const goToScreen1 = () => {
		navigation.navigate('Screen1')
	}

	const goToScreen2 = () => {
		navigation.navigate('Screen2')
	}

	console.log(new Date(userData?.dateCreated?.toDate()).toDateString())

	return (
		<View style={styles.content}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				<Text style={styles.h2}>Home.js</Text>
				<View style={styles.userRow}>
					<Text style={styles.h3}>Welcome, {userData?.name}!</Text>
					<Text style={styles.body}>Email: {userData?.email}</Text>
					<Text style={styles.body}>Phone: {userData?.phone}</Text>
					<Text style={styles.body}>Date joined: {new Date(userData?.dateCreated.toDate()).toDateString()}</Text>
					<TouchableOpacity style={styles.delBtn} onPress={deleteUser}>
						<Text style={styles.delBtnTxt}>Delete User</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.navRow}>
					<TouchableOpacity style={styles.navBtn} onPress={goToScreen1}>
						<Text style={styles.body}>Go to</Text>
						<Text style={styles.body}>Screen1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.navBtn} onPress={goToScreen2}>
						<Text style={styles.body}>Go to</Text>
						<Text style={styles.body}>Screen2</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.firebase}>
					<Text style={styles.h2}>Firebase Test:</Text>
					<Text style={styles.testTxt}>
						Below you can test that your Firebase connection is working. Type something into the text input and press Post. If your Firebase and
						Firestore are set up correctly should post to Firestore and then display in a FlatList at the bottom.
					</Text>
					<TextInput
						onChangeText={input => setTextInput(input)}
						style={styles.input}
						placeholder='enter test text here'
						value={textInput}
						onSubmitEditing={testPost}
					/>
					<TouchableOpacity onPress={testPost} style={styles.postBtn}>
						<Text style={styles.h3}>Post</Text>
					</TouchableOpacity>
					<FlatList
						data={textPosts}
						renderItem={({ item }) => <Text style={styles.testTxt}>{item.text}</Text>}
						keyExtractor={item => item.id}
						style={styles.flatList}
					/>
				</View>
				<TouchableOpacity onPress={signOut} style={styles.postBtn}>
					<Text style={styles.h3}>Sign Out</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
		paddingHorizontal: 0,
	},
	scrollView: {
		paddingHorizontal: Misc.padding * 2,
		alignItems: 'center',
		paddingBottom: Misc.margin * 2,
	},
	h2: {
		...Fonts.h2,
	},
	h3: {
		...Fonts.h3,
	},
	body: {
		...Fonts.body,
	},
	delBtnTxt: {
		...Fonts.body,
		color: Colors.error,
	},
	userRow: {
		marginTop: Misc.margin,
		alignItems: 'center',
	},
	navRow: {
		flexDirection: 'row',
		marginTop: Misc.padding * 2,
	},
	navBtn: {
		...Buttons.transparent,
		marginHorizontal: Misc.margin,
		justifyContent: 'flex-start',
	},
	delBtn: {
		...Buttons.transparent,
		marginHorizontal: Misc.margin,
		justifyContent: 'flex-start',
		marginTop: Misc.margin,
		borderColor: Colors.error,
	},
	firebase: {
		width: '100%',
		alignItems: 'center',
		marginTop: Misc.padding * 2,
	},
	firebaseTest: {
		...Fonts.h2,
		marginTop: Misc.margin * 2,
		marginBottom: Misc.margin / 2,
	},
	testTxt: {
		...Fonts.body,
		marginVertical: Misc.margin / 2,
	},
	input: {
		...Containers.textInput,
	},
	postBtn: {
		...Buttons.transparent,
		marginVertical: Misc.margin / 2,
		padding: Misc.padding / 2,
	},
	flatList: {
		marginVertical: Misc.margin / 2,
		borderColor: Colors.surface,
		borderWidth: 2,
		borderRadius: Misc.borderRadius,
		width: '100%',
		height: Window.height * 0.5,
		paddingHorizontal: Misc.padding,
	},
})
