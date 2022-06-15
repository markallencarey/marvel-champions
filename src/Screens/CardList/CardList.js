//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
//Packages
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
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
	const [activeCard, setActiveCard] = useState()
	const [carouselVisible, setCarouselVisible] = useState(false)

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
		setRenderedCards(sortedCards)
	}

	const sortZtoA = () => {
		const sortedCards = renderedCards.sort((a, b) => (a.name < b.name ? 1 : -1))
		setRenderedCards(sortedCards)
	}

	const SortingView = () => (
		<View style={styles.sortingView}>
			<View style={styles.btnView}>
				<TouchableOpacity style={styles.btn} onPress={sortAtoZ}>
					<Text style={styles.body}>A to Z</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={sortZtoA}>
					<Text style={styles.body}>Z to A</Text>
				</TouchableOpacity>
			</View>
			<View>
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

	const renderCarouselItem = card => {
		const { name, text, traits, imagesrc, pack_name, card_set_name, set_position } = card.item

		const img = `https://marvelcdb.com${imagesrc}`
		return (
			<View>
				<FastImage
					style={styles.carouselCardImg}
					source={{
						uri: img,
						priority: FastImage.priority.normal,
					}}
					resizeMode={FastImage.resizeMode.contain}
				/>
				<View style={styles.carouselInfoView}>
					<Text style={styles.h2}>{name}</Text>

					<Text style={styles.italicBody}>{card_set_name} {set_position}/</Text>
					<Text style={styles.italicBody}>{pack_name}</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.content}>
			{carouselVisible ? (
				<View>
					<View style={styles.closeCarouselView}>
						<TouchableOpacity
							style={styles.closeCarouselBtn}
							onPress={() => {
								setCarouselVisible(false)
								setActiveCard()
							}}
						>
							<Text style={styles.closeCarouselText}>Close</Text>
						</TouchableOpacity>
					</View>
					<Carousel
						layout={'default'}
						ref={ref => (carousel = ref)}
						data={renderedCards}
						sliderWidth={Window.width}
						itemWidth={Window.width * 0.8}
						renderItem={card => renderCarouselItem(card)}
						onSnapToItem={index => setActiveCard(index)}
						containerCustomStyle={styles.carousel}
						// activeAnimationType='spring'
						// layout='stack'
					/>
				</View>
			) : null}
			{!carouselVisible ? (
				!cardsLoading ? (
					<FlatList
						data={renderedCards}
						renderItem={({ item }) => (
							<Card card={item} activeCard={activeCard} setActiveCard={setActiveCard} setCarouselVisible={setCarouselVisible} />
						)}
						keyExtractor={item => item.code}
						style={styles.flatList}
						ListHeaderComponent={SortingView}
						ListHeaderComponentStyle={styles.flatListHeader}
					/>
				) : (
					<ActivityIndicator style={styles.activityIndicator} size='large' />
				)
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		...Containers.content,
		paddingVertical: 0,
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
		backgroundColor: Colors.background,
	},
	flatListHeader: {
		zIndex: 1000,
		...Misc.shadow,
		paddingTop: Misc.padding,
	},
	btnView: {
		marginBottom: Misc.margin,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	packDropDown: packsDropDownOpen => ({
		backgroundColor: Colors.background,
		borderRadius: Misc.borderRadius,
		marginBottom: Misc.padding,
		borderWidth: 2,
		// zIndex: 1000,
	}),
	containerDropDown: {
		backgroundColor: Colors.background,
		borderRadius: Misc.borderRadius,
		borderWidth: 2,
		// zIndex: 1000,
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
	cardImg: {
		height: Window.height * 0.75,
	},
	carousel: {
		// backgroundColor: 'blue',
		// height: Window.height * 0.5,
		// top: Misc.margin * -2,
	},
	closeCarouselView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight: Misc.padding,
		alignItems: 'center',
		width: Window.width,
		// backgroundColor: 'blue',
	},
	closeCarouselBtn: {
		...Buttons.transparent,
		backgroundColor: Colors.background,
		...Misc.shadow,
	},
	closeCarouselText: {
		...Fonts.body,
	},
	carouselCardImg: {
		height: '75%',
		marginTop: Misc.margin * 1.5,
		marginBottom: Misc.margin,
	},
	carouselInfoView: {
		// backgroundColor: 'blue',
		alignItems: 'center',
	},
})
