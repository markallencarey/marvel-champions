//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
//Packages
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'
//Context
//Constants
//Navigation
//Components
import { Card } from './Card'
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

export const CardList = () => {
	const [allCards, setAllCards] = useState([])
	const [renderedCards, setRenderedCards] = useState([])
	const [packsDropDownOpen, setPacksDropDownOpen] = useState(false)
	const [packsLabels, setPacksLabels] = useState([{ label: 'All cards', value: 'all' }])
	const [selectedPack, setSelectedPack] = useState()
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
				setSelectedPack()
			})
			.catch(e => console.log('error: ', e))
	}

	const getAllPacks = async () => {
		await axios
			.get('https://marvelcdb.com/api/public/packs/')
			.then(res => {
				setAllPacks(res.data)
				res.data.map(pack => {
					packsLabels.push({ label: pack.name, value: pack.code })
				})
			})
			.catch(e => console.log('error: ', e))
	}

	useEffect(() => {
		getAllCards()
	}, [])

	useEffect(() => {
		getAllPacks()
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
	}, [renderedCards])

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

	const sortAtoZ = () => {
		const sortedCards = renderedCards.sort((a, b) => (a.name > b.name ? 1 : -1))
		// console.log('file: CardList.js -> line 138 -> sortAtoZ -> sortedCards', sortedCards)
		setRenderedCards(sortedCards)
	}

	const sortZtoA = () => {
		const sortedCards = renderedCards.sort((a, b) => (a.name < b.name ? 1 : -1))
		setRenderedCards(sortedCards)
	}

	const SortingView = () => (
		<View>
			<View style={styles.btnView}>
				<TouchableOpacity style={styles.btn} onPress={sortAtoZ}>
					<Text style={styles.body}>A to Z</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={sortZtoA}>
					<Text style={styles.body}>Z to A</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.btnView}>
				<DropDownPicker
					open={packsDropDownOpen}
					value={selectedPack}
					items={packsLabels}
					setOpen={setPacksDropDownOpen}
					setValue={setSelectedPack}
					setItems={setPacksLabels}
					style={styles.packDropDown(packsDropDownOpen)}
					dropDownContainerStyle={styles.containerDropDown}
					labelStyle={styles.dropDownLabel}
					textStyle={styles.dropDownText}
					placeholder={'Filter by pack...'}
					onSelectItem={item => (item.value === 'all' ? setRenderedCards(allCards) : item.value ? filterByPack(item.value) : null)}
				/>
			</View>
		</View>
	)

	return (
		<View style={styles.content}>
			{!cardsLoading ? (
				<FlatList
					data={renderedCards}
					renderItem={item => <Card card={item} />}
					keyExtractor={item => item.code}
					style={styles.flatList}
					ListHeaderComponent={SortingView}
				/>
			) : (
				<ActivityIndicator style={styles.activityIndicator} size='large' />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
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
		// paddingHorizontal: Misc.padding,
		zIndex: 1000,
	},
	packDropDown: packsDropDownOpen => ({
		backgroundColor: Colors.background,
		borderRadius: Misc.borderRadius,
		marginBottom: Misc.padding,
		shadowOffset: { width: 5, height: 10 },
		shadowOpacity: packsDropDownOpen ? 0.75 : 0,
		shadowRadius: 5,
		overflow: 'visible',
		borderWidth: 2,
	}),
	containerDropDown: {
		backgroundColor: Colors.background,
		borderRadius: Misc.borderRadius,
		shadowColor: Colors.black,
		shadowOffset: { width: 5, height: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		overflow: 'visible',
		borderWidth: 2,
	},
	dropDownLabel: {
		...Fonts.body,
	},
	dropDownText: {
		...Fonts.body,
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
})
