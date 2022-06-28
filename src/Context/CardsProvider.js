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

export const CardsContext = createContext()

export const CardsProvider = ({ children }) => {
	const [allCards, setAllCards] = useState([])
	// console.log('file: CardsProvider.js -> line 19 -> CardsProvider -> allCards index 0', allCards[0]?.name)
	// console.log('file: CardsProvider.js -> line 19 -> CardsProvider -> allCards', allCards ? true : false, allCards.length)
	const [cardsLoading, setCardsLoading] = useState(false)
	const [renderedCards, setRenderedCards] = useState([])
	// console.log('file: CardsProvider.js -> line 23 -> CardsProvider -> renderedCards.length', renderedCards.length)
	const [selectedPack, setSelectedPack] = useState()
	const [allPacks, setAllPacks] = useState([])
	const [packsLabels, setPacksLabels] = useState([{ label: 'All cards', value: 'all' }])
	const [activeCard, setActiveCard] = useState({})
	// console.log('file: CardsProvider.js -> line 28 -> CardsProvider -> activeCard', activeCard.name, activeCard.arrayIndex)
	// console.log('file: CardsProvider.js -> line 25 -> CardsProvider -> activeCard', activeCard?.name)

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
				setActiveCard(res.data[0])
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
		renderedCards.map((card, index) => {
			card.arrayIndex = index
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

	return (
		<CardsContext.Provider
			value={{
				allCards,
				cardsLoading,
				renderedCards,
				allPacks,
				packsLabels,
				setCardsLoading,
				setRenderedCards,
				selectedPack,
				setSelectedPack,
				setPacksLabels,
				filterByPack,
				activeCard,
				setActiveCard,
			}}
		>
			{children}
		</CardsContext.Provider>
	)
}
