//React & React Native
import React, { useContext, useEffect, useState, createContext } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
//Packages
//Context
//Constants
import { auth, firestore, timestamp } from '../Constants/Firebase'
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
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		auth().onAuthStateChanged(account => {
			console.log('auth state changed')
			if (account) {
				setUser(account)
			} else {
				setUser(null)
			}
		})
	}, [user])

	useEffect(() => {
		firestore()
			.collection('Users')
			.doc(user?.uid)
			.get()
			.then(documentSnapshot => {
				if (documentSnapshot.exists) {
					setUserData(documentSnapshot.data())
				}
			})
	}, [user])

	const login = async (email, password) => {
		await auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('log in successful')
			})
			.catch(err => {
				console.log('file: AuthProvider.js -> line 40 -> login -> err', err)
				if (err.code === 'auth/user-not-found') {
					alert('There is no account associated with that email')
				}

				if (err.code === 'auth/invalid-email') {
					alert('The email address is formatted incorrectly')
				}

				if (err.code === 'auth/wrong-password') {
					alert('Incorrect password')
				}

				if (err.code === 'auth/too-many-requests') {
					alert('We have blocked all requests from this device due to unusual activity. Try again later.')
				}
			})
	}

	const register = async (email, password, name, phone) => {
		await auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log('User account created & signed in!')
				firestore().collection('Users').doc(user.user.uid).set({
					name: name,
					email: email,
					phone: phone,
					dateCreated: timestamp,
				})
			})
			.catch(err => {
				console.log('file: AuthProvider.js -> line 58 -> register -> err', err)
				if (err.code === 'auth/email-already-in-use') {
					alert('That email address is already in use')
				}

				if (err.code === 'auth/invalid-email') {
					alert('That email address is invalid')
				}

				if (err.code === 'auth/weak-password') {
					alert('The given password is invalid. Password should be at least 6 characters.')
				}
			})
	}

	const signOut = async () => {
		await auth()
			.signOut()
			.then(() => console.log('User signed out!'))
	}

	const deleteUserFromFirestore = async () => {
		await firestore()
			.collection('Users')
			.doc(user?.uid)
			.delete()
			.then(() => {
				console.log('user deleted from firestore')
				setUserData(null)
			})
	}

	const deleteUserFromFirebaseAuth = async () => {
		const thisUser = auth().currentUser
		await thisUser.delete().then(() => {
			console.log('user deleted from firebase auth')
			setUser(null)
		})
	}

	const deleteUser = () => {
		Alert.alert(
			'Delete Account',
			`Are you sure that you would like to delete your account?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => {
						deleteUserFromFirebaseAuth().then(() => {
							deleteUserFromFirestore().then(() => {
								Alert.alert('Your account has been deleted. We hope you come back soon!')
							})
						})
					},
				},
			],
			{
				cancelable: true,
			}
		)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				userData,
				login,
				register,
				signOut,
				deleteUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
