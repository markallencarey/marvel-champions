//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
//Packages
import axios from 'axios'
import RenderHtml from 'react-native-render-html'
//Context
//Constants
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const CardList = () => {
	const [allCards, setAllCards] = useState([])

	useEffect(() => {
		axios
			.get('https://marvelcdb.com/api/public/cards')
			.then(res => {
				setAllCards(res.data)
			})
			.catch(e => console.log('error: ', e))
	}, [])

	const renderCard = card => {
		const { name, text, traits } = card.item
		console.log('text', typeof text, text)

		const renderTxt = {
			html: text,
		}
		// console.log('file: CardList.js -> line 31 -> CardList -> card', card)
		// const textString = `${text}`
		// console.log('file: CardList.js -> line 34 -> CardList -> textString', typeof textString, textString)
		// const textParsed = parse(textString)
		// console.log('file: CardList.js -> line 36 -> CardList -> textParsed', typeof textParsed, textParsed)
		// const text = `${card.item.text}`
		// console.log('file: CardList.js -> line 32 -> CardList -> text', text)

		return (
			<View style={styles.cardView}>
				<Text style={styles.h2}>{name}</Text>
				<Text style={styles.italicBody}>{traits}</Text>
				<RenderHtml contentWidth={'100%'} source={renderTxt} />
			</View>
		)
	}

	return (
		<View style={styles.content}>
			{/* <ActivityIndicator style={styles.activityIndicator} size='large' /> */}
			{allCards.length !== 0 ? (
				<FlatList data={allCards} renderItem={renderCard} keyExtractor={item => item.code} style={styles.flatList} />
			) : (
				<ActivityIndicator style={styles.activityIndicator} size='large' />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
		paddingHorizontal: 0,
	},
	h1: {
		...Fonts.h1,
	},
	h2: {
		...Fonts.h2,
	},
	body: {
		...Fonts.body,
	},
	italicBody: {
		...Fonts.italicBody,
	},
	btn: {
		...Buttons.transparent,
	},
	activityIndicator: {
		marginTop: Window.height * 0.25,
	},
	flatList: {
		width: '100%',
		marginBottom: Misc.margin,
		paddingHorizontal: Misc.padding,
	},
	cardView: {
		borderWidth: 2,
		width: '100%',
		marginBottom: Misc.margin / 2,
		padding: Misc.padding / 2,
	},
})
