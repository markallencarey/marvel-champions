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
	const [carouselVisible, setCarouselVisible] = useState(false)

	const {
		allCards,
		cardsLoading,
		renderedCards,
		packsLabels,
		selectedPack,
		setSelectedPack,
		setRenderedCards,
		setPacksLabels,
		filterByPack,
		activeCard,
		setActiveCard,
	} = useContext(CardsContext)
	console.log('file: CardList.js -> line 38 -> CardList -> activeCard', activeCard.name, activeCard.arrayIndex)

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
			<View style={styles.dropDownView}>
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
		// console.log('file: CardList.js -> line 81 -> CardList -> card', card)
		// console.log('file: CardList.js -> line 81 -> renderCarouselItem -> name', name)

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
								// setActiveCard()
							}}
						>
							<Text style={styles.closeCarouselText}>Close</Text>
						</TouchableOpacity>
					</View>
					<Carousel
						layout={'default'}
						data={renderedCards}
						sliderWidth={Window.width}
						itemWidth={Window.width * 0.8}
						renderItem={card => renderCarouselItem(card)}
						containerCustomStyle={styles.carousel}
						onSnapToItem={index => setActiveCard(renderedCards[index])}
						getItemLayout={(data, index) => ({ length: Window.width, offset: Window.width * index, index })}
						// initialScrollIndex={activeCard.arrayIndex}
						// loopClonesPerSide={renderedCards.length}
						ref={c => {
							carousel = c
						}}
						initialScrollIndex={12}
						onScrollToIndexFailed={() => console.log('scrollToIndexFailed')}
						onContentSizeChange={() => {
							if (carousel && carousel.scrollToIndex && renderedCards && renderedCards.length) {
								carousel.scrollToIndex({ index: 12 })
							}
						}}
						// useScrollView={true}
					/>
				</View>
			) : null}
			{!carouselVisible ? <SortingView /> : null}
			{!carouselVisible ? (
				!cardsLoading ? (
					<FlatList
						data={renderedCards}
						renderItem={({ item }) => <Card card={item} setCarouselVisible={setCarouselVisible} />}
						keyExtractor={item => item.code}
						style={styles.flatList}
						contentContainerStyle={{ zIndex: 0 }}
						// initialScrollIndex={activeCard.arrayIndex}
						// initialNumToRender={renderedCards.length}
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
	btnView: {
		marginBottom: Misc.margin,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: Misc.padding,
	},
	dropDownView: {
		marginBottom: Misc.margin / 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: Misc.padding,
	},
	packDropDown: packsDropDownOpen => ({
		backgroundColor: Colors.background,
		borderRadius: Misc.borderRadius,
		// marginBottom: Misc.padding,
		borderWidth: 2,
	}),
	containerDropDown: {
		backgroundColor: Colors.background,
		borderRadius: Misc.borderRadius,
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
		zIndex: 0,
		paddingTop: Misc.margin,
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
	},
	closeCarouselBtn: {
		...Buttons.transparent,
		backgroundColor: Colors.background,
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
		alignItems: 'center',
	},
})
