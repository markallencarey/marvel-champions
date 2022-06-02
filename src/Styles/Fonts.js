import * as Misc from './Misc'
import * as Colors from './Colors'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const black = 'NunitoSans-Black'
export const blackItalic = 'NunitoSans-BlackItalic'
export const extraBold = 'NunitoSans-ExtraBold'
export const extraBoldItalic = 'NunitoSans-ExtraBoldItalic'
export const semiBold = 'NunitoSans-SemiBold'
export const semiBoldItalic = 'NunitoSans-SemiBoldItalic'
export const bold = 'NunitoSans-Bold'
export const boldItalic = 'NunitoSans-BoldItalic'
export const regular = 'NunitoSans-Regular'
export const italic = 'NunitoSans-Italic'
export const light = 'NunitoSans-Light'
export const lightItalic = 'NunitoSans-LightItalic'
export const extraLight = 'NunitoSans-ExtraLight'
export const extraLightItalic = 'NunitoSans-ExtraLightItalic'

const standardScreenHeight = 680

const styles = StyleSheet.create({
	h1: {
		fontSize: RFValue(20, standardScreenHeight),
		fontFamily: extraBold,
		color: Colors.black,
	},
	h2: {
		fontSize: RFValue(18, standardScreenHeight),
		fontFamily: bold,
		color: Colors.black,
	},
	h3: {
		fontSize: RFValue(16, standardScreenHeight),
		fontFamily: bold,
		color: Colors.black,
	},
	body: {
		fontSize: RFValue(14, standardScreenHeight),
		fontFamily: regular,
		color: Colors.black,
	},
	boldBody: {
		fontSize: RFValue(14, standardScreenHeight),
		fontFamily: bold,
		color: Colors.black,
	},
	italicBody: {
		fontSize: RFValue(14, standardScreenHeight),
		fontFamily: italic,
		color: Colors.black,
	},
})

export const h1 = styles.h1
export const h2 = styles.h2
export const h3 = styles.h3
export const body = styles.body
export const boldBody = styles.boldBody
export const italicBody = styles.italicBody
