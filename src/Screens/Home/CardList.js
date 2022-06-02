//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
//Packages
import axios from 'axios'
import RenderHtml from 'react-native-render-html'
import FastImage from 'react-native-fast-image'
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
	const [renderedCards, setRenderedCards] = useState([])
	const [allPacks, setAllPacks] = useState([])
	const [cardsLoading, setCardsLoading] = useState(false)

	const getAllCards = async () => {
		setCardsLoading(true)
		await axios
			.get('https://marvelcdb.com/api/public/cards')
			.then(res => {
				setAllCards(res.data)
				setRenderedCards(res.data)
				setCardsLoading(false)
				console.log('finished getAllCards()')
			})
			.catch(e => console.log('error: ', e))
	}

	useEffect(() => {
		getAllCards()
	}, [])

	useEffect(async () => {
		await axios
			.get('https://marvelcdb.com/api/public/packs/')
			.then(res => {
				setAllPacks(res.data)
			})
			.catch(e => console.log('error: ', e))
	}, [])

	useEffect(() => {
		renderedCards.map(card => {
			if (!card.imagesrc) {
				allCards.map(card2 => {
					if (card2.imagesrc) {
						if (card.name === card2.name) {
							card.imagesrc = card2.imagesrc
						}
					}
				})
			}
		})
	}, [allCards, renderedCards])

	const renderCard = card => {
		const { name, text, traits, imagesrc, pack_name } = card.item

		const img = `https://marvelcdb.com${imagesrc}`
		const renderTxt = {
			html: text,
		}

		const htmlStyle = {
			body: {
				...Fonts.body,
				paddingBottom: Misc.padding / 2,
			},
		}

		return (
			<View style={styles.cardView}>
				{imagesrc ? (
					<FastImage
						style={styles.cardImg}
						source={{
							uri: img,
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
				) : (
					<FastImage
						style={styles.cardImg}
						source={{
							uri: 'https://cf.geekdo-images.com/kRvUgYiaOq07kC67ZK5UoQ__opengraph/img/mRM4HyXvEdJ2XJJNxo1RdJpVkig=/fit-in/1200x630/filters:strip_icc()/pic4900321.jpg',
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
				)}
				<View style={styles.nameView}>
					<Text style={styles.h2}>{name}</Text>
					<Text style={styles.italicBody}>{traits}</Text>
				</View>
				<RenderHtml contentWidth={Window.width} source={renderTxt} tagsStyles={htmlStyle} />
				<Text style={styles.set}>Pack: {pack_name}</Text>
			</View>
		)
	}

	const filterByPack = async pack_code => {
		setCardsLoading(true)
		await axios
			.get(`https://marvelcdb.com/api/public/cards/${pack_code}`)
			.then(res => {
				setRenderedCards(res.data)
				setCardsLoading(false)
				console.log('finished filterByPack()')
			})
			.catch(e => console.log('error: ', e))
	}

	const renderPack = pack => {
		return (
			<TouchableOpacity style={styles.packBtn} onPress={() => filterByPack(pack.item.code)}>
				<Text style={styles.body}>{pack.item.name}</Text>
			</TouchableOpacity>
		)
	}

	const sortAtoZ = () => {
		const sortedCards = allCards.sort((a, b) => (a.name > b.name ? 1 : -1))
		setAllCards(sortedCards)
	}

	const sortZtoA = () => {
		const sortedCards = allCards.sort((a, b) => (a.name < b.name ? 1 : -1))
		setAllCards(sortedCards)
	}

	const sortPack = () => {
		const sortedCards = allCards.sort((a, b) => (a.pack_code > b.pack_code ? 1 : -1))
		setAllCards(sortedCards)
	}

	return (
		<View style={styles.content}>
			<View style={styles.btnView}>
				<TouchableOpacity style={styles.btn} onPress={sortAtoZ}>
					<Text style={styles.body}>A to Z</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={sortZtoA}>
					<Text style={styles.body}>Z to A</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={sortPack}>
					<Text style={styles.body}>By Pack</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={allPacks}
				renderItem={renderPack}
				keyExtractor={item => item.index}
				style={styles.packList}
				contentContainerStyle={styles.packListContainer}
			/>
			{!cardsLoading ? (
				<FlatList data={renderedCards} renderItem={renderCard} keyExtractor={item => item.code} style={styles.flatList} />
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
	btnView: {
		width: '100%',
		marginBottom: Misc.margin,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: Misc.padding,
	},
	packList: {
		width: '100%',
		marginBottom: Misc.margin,
		paddingHorizontal: Misc.padding,
		height: '30%',
	},
	packListContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	packBtn: {
		...Buttons.transparent,
		marginBottom: Misc.margin / 2,
		marginRight: Misc.margin / 2,
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
		padding: Misc.padding,
		borderRadius: Misc.borderRadius,
	},
	nameView: {
		marginBottom: Misc.margin / 2,
		alignItems: 'center',
	},
	cardImg: {
		height: Window.height * 0.15,
		marginBottom: Misc.margin / 2,
	},
	setView: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	set: {
		...Fonts.body,
	},
})
