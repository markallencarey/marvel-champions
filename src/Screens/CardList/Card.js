//React & React Native
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Packages
import FastImage from 'react-native-fast-image'
import ImageColors from 'react-native-image-colors'
import RenderHtml from 'react-native-render-html'
//Context
import { CardsContext } from '../../Context/CardsProvider'
//Constants
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles
import { Buttons, Colors, Containers, Fonts, Icons, Images, Index, Misc, Window } from '../../Styles/Index'

const htmlStyle = {
	body: {
		...Fonts.body,
		paddingBottom: Misc.padding / 2,
	},
}

export const Card = ({ card, setCarouselVisible }) => {
	const { name, text, traits, imagesrc, pack_name, code } = card

	const [colors, setColors] = useState({})

	const { activeCard, setActiveCard } = useContext(CardsContext)
	// console.log('file: Card.js -> line 33 -> Card -> activeCard', activeCard.name, activeCard.arrayIndex)

	const img = `https://marvelcdb.com${imagesrc}`

	useEffect(() => {
		const fetchColors = async () => {
			const result = await ImageColors.getColors(img)

			setColors(result)
		}

		fetchColors()
	}, [])

	const renderTxt = {
		html: text ? text : '',
	}

	return (
		<TouchableOpacity
			style={styles.cardView}
			onPress={() => {
				setActiveCard(card)
				setCarouselVisible(true)
			}}
		>
			<View style={styles.diag1(colors)} />
			<View style={styles.diag2(colors)} />
			<View style={styles.imgView}>
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
			</View>
			<View style={styles.bottomView}>
				<View style={styles.nameView}>
					<Text style={styles.h2}>{name}</Text>
					<Text style={styles.italicBody}>{traits}</Text>
				</View>
				<RenderHtml contentWidth={Window.width} source={renderTxt} tagsStyles={htmlStyle} />
				<View style={styles.divider} />
				<View style={styles.setView}>
					<Text style={styles.set}>{pack_name}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardView: {
		borderWidth: 2,
		width: '100%',
		marginBottom: Misc.margin,
		padding: Misc.padding,
		borderRadius: Misc.borderRadius,
		backgroundColor: Colors.background,
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
	nameView: {
		marginBottom: Misc.margin / 2,
		alignItems: 'center',
	},
	imgView: {
		height: Window.height * 0.285,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardImg: {
		height: '100%',
		width: '100%',
	},
	bottomView: {
		backgroundColor: Colors.background,
		borderWidth: 2,
		padding: Misc.padding,
		marginTop: Misc.margin,
		borderRadius: Misc.borderRadius,
	},
	divider: {
		width: '100%',
		height: 1,
		backgroundColor: Colors.black,
		marginBottom: Misc.margin / 2,
	},
	setView: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	set: {
		...Fonts.boldBody,
	},
	diag1: colors => ({
		opacity: 0.75,
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: Window.height * 0.38,
		borderTopWidth: Window.height * 0.38,
		borderRightColor: 'transparent',
		position: 'absolute',
		borderTopLeftRadius: Misc.borderRadius / 1.15,
		borderTopColor: colors.secondary,
	}),
	diag2: colors => ({
		opacity: 0.75,
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: Window.height * 0.38,
		borderBottomWidth: Window.height * 0.38,
		borderLeftColor: 'transparent',
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderBottomRightRadius: Misc.borderRadius / 1.15,
		borderBottomColor: colors.detail,
	}),
})
