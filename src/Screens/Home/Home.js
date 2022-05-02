//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
//Packages
//Context
//Constants
import { firestore, timestamp } from '../../Constants/Firebase'
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const Home = ({ navigation }) => {
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

	return (
		<View style={styles.content}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				<Text style={styles.h2}>Home.js</Text>
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
						<Text>Post</Text>
					</TouchableOpacity>
					<FlatList
						data={textPosts}
						renderItem={({ item }) => <Text style={styles.testTxt}>{item.text}</Text>}
						keyExtractor={item => item.id}
						style={styles.flatList}
					/>
				</View>
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
		justifyContent: 'flex-start',
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
		marginTop: Misc.margin / 2,
		marginBottom: Misc.margin * 2,
		borderColor: Colors.surface,
		borderWidth: 2,
		borderRadius: Misc.borderRadius,
		width: '100%',
		height: Window.height * 0.5,
		paddingHorizontal: Misc.padding,
	},
})
