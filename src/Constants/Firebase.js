import firebase from 'firebase/compat/app'
import app from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

//Replace the info below with the API_KEY and firebaseConfig from your project

const FIREBASE_API_KEY = 'AIzaSyA9LBQJQv53VuuMbZ-XN3EJHHYd-NONDpk'

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: 'rn-template-2bf99.firebaseapp.com',
	projectId: 'rn-template-2bf99',
	storageBucket: 'rn-template-2bf99.appspot.com',
	messagingSenderId: '991218302641',
	appId: '1:991218302641:web:f4abe06c660f928c31ac90',
	measurementId: 'G-427EJY8HK6',
}

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
} else {
	firebase.app()
}

const timestamp = firestore.FieldValue.serverTimestamp()

export { app, firestore, storage, timestamp }
