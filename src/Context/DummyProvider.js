//React & React Native
import React, { useContext, useEffect, useState, createContext } from 'react'
//Packages
import axios from 'axios'
//Context
//Constants
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles

export const DummyContext = createContext()

export const DummyProvider = ({ children }) => {
	const [dummyText, setDummyText] = useState([])
	const [dummyPeople, setDummyPeople] = useState([])
	const [dummyPhotos, setDummyPhotos] = useState([])

	const UNSPLASH_API_ACCESS_KEY = 'Clrh6EkCz98dkLzjAOjx5kNLYSOvvGe3yr126DjxhQY'
	const UNSPLASH_API_SECRET_KEY = '_tWb8csbmBBqorvtifVw6jv_psgSEGYSjdmkd-Jr9jE'

	useEffect(() => {
		const people = []

		for (var i = 0; i < 8; i++) {
			axios
				.get('https://randomuser.me/api/')
				.then(res => {
					people.push(res.data.results[0])
					setDummyPeople(people)
				})
				.catch(e => console.log('error: ', e))
		}
	}, [])

	useEffect(() => {
		//if you want photos of something specific, change the keyword
		const keyword = 'Utah'

		const photos = []

		for (var i = 0; i < 12; i++) {
			axios
				.get(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_ACCESS_KEY}&query=${keyword}`)
				.then(res => {
					const photoObj = {
						id: res.data.id,
						createdAt: res.data.created_at,
						description: res.data.description ? res.data.description : res.data.alt_description,
						url: res.data.urls.full,
					}
					photos.push(photoObj)
					setDummyPhotos(photos)
				})
				.catch(e => console.log('error: ', e))
		}
	}, [])

	const loremIpsums = [
		'https://baseballipsum.apphb.com/api/?paras=1',
		'https://baconipsum.com/api/?type=meat-filler&paras=1',
		'https://loripsum.net/api/1/plaintext',
		'https://skateipsum.com/get/1/0/text',
		'https://hipsum.co/api/?type=hipster-centric&sentences=3',
		'https://litipsum.com/api/1',
	]

	useEffect(() => {
		const text = []
		const number = Math.floor(Math.random() * loremIpsums.length)

		for (var i = 0; i < 8; i++) {
			axios
				.get(loremIpsums[number])
				.then(res => {
					typeof res.data === 'string' ? text.push(res.data) : text.push(res.data[0])
					setDummyText(text)
				})
				.catch(e => console.log('error: ', e))
		}
	}, [])

	return (
		<DummyContext.Provider
			value={{
				dummyPeople,
				dummyPhotos,
				dummyText,
			}}
		>
			{children}
		</DummyContext.Provider>
	)
}
