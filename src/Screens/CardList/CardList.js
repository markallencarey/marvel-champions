//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
//Packages
import DropDownPicker from 'react-native-dropdown-picker'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
//Context
import { CardsContext } from '../../Context/CardsProvider'
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
	const [packsDropDownOpen, setPacksDropDownOpen] = useState(false)
	const [activeCard, setActiveCard] = useState()
	const [carouselVisible, setCarouselVisible] = useState(false)

	const { allCards, cardsLoading, renderedCards, packsLabels, selectedPack, setSelectedPack, setRenderedCards, setPacksLabels, filterByPack } =
		useContext(CardsContext)

	const sortAtoZ = () => {
		const sortedCards = renderedCards.sort((a, b) => (a.name > b.name ? 1 : -1))
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

	const renderCarouselItem = card => {
		const { name, imagesrc, pack_name, card_set_name, set_position, quantity } = card.item

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
					<Text style={styles.h2}>
						{name} {quantity != 1 ? `(x${quantity})` : null}
					</Text>

					<Text style={styles.italicBody}>
						{card_set_name} {set_position}
					</Text>
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
					/>
				</View>
			) : null}
			<SortingView />
			{!carouselVisible ? (
				!cardsLoading ? (
					<FlatList
						data={renderedCards}
						renderItem={({ item }) => (
							<Card card={item} activeCard={activeCard} setActiveCard={setActiveCard} setCarouselVisible={setCarouselVisible} />
						)}
						keyExtractor={item => item.code}
						style={styles.flatList}
						// ListHeaderComponent={SortingView}
						// ListHeaderComponentStyle={styles.flatListHeader}
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
		// ...Containers.content,
		// paddingVertical: 0,
	},
	// h1: {
	// 	...Fonts.h1,
	// },
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
	btnView: {
		width: '100%',
		marginBottom: Misc.margin,
		flexDirection: 'row',
		justifyContent: 'space-between',
		zIndex: 1000,
		paddingHorizontal: Misc.padding,
	},
	// closeCarouselView: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'flex-end',
	// 	paddingRight: Misc.padding,
	// 	alignItems: 'center',
	// 	width: Window.width,
	// },
	// closeCarouselBtn: {
	// 	...Buttons.transparent,
	// 	backgroundColor: Colors.background,
	// 	...Misc.shadow,
	// },
	// closeCarouselText: {
	// 	...Fonts.body,
	// },
	// carouselCardImg: {
	// 	height: '75%',
	// 	marginTop: Misc.margin * 1.5,
	// 	marginBottom: Misc.margin,
	// },
	// carouselInfoView: {
	// 	alignItems: 'center',
	// },

	packDropDown: packsDropDownOpen => ({
		// backgroundColor: Colors.background,
		// borderRadius: Misc.borderRadius,
		// marginBottom: Misc.padding,
		// shadowOffset: { width: 5, height: 10 },
		// shadowOpacity: packsDropDownOpen ? 0.75 : 0,
		// shadowRadius: 5,
		// borderWidth: 2,
	}),
	containerDropDown: {
		// backgroundColor: Colors.background,
		// borderRadius: Misc.borderRadius,
		// shadowColor: Colors.black,
		// shadowOffset: { width: 5, height: 10 },
		// shadowOpacity: 0.5,
		// shadowRadius: 5,
		// borderWidth: 2,
	},
	// dropDownLabel: {
	// 	...Fonts.body,
	// },
	dropDownText: {
		...Fonts.body,
	},
	activityIndicator: {
		marginTop: Window.height * 0.1,
	},
	flatList: {
		width: '100%',
		marginBottom: Misc.margin,
		paddingHorizontal: Misc.padding,
		// zIndex: 0,
	},
})
