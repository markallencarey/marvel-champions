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
	const [cardsLoading, setCardsLoading] = useState(false)
	const [renderedCards, setRenderedCards] = useState([])
	const [selectedPack, setSelectedPack] = useState()
	const [allPacks, setAllPacks] = useState([])
	const [packsLabels, setPacksLabels] = useState([{ label: 'All cards', value: 'all' }])

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
			}}
		>
			{children}
		</CardsContext.Provider>
	)
}
