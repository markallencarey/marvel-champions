import * as Misc from './Misc'
import * as Colors from './Colors'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const extraBold = 'Mukta-ExtraBold'
export const semiBold = 'Mukta-SemiBold'
export const bold = 'Mukta-Bold'
export const medium = 'Mukta-Medium'
export const regular = 'Mukta-Regular'
export const light = 'Mukta-Light'
export const extraLight = 'Mukta-ExtraLight'

const standardScreenHeight = 680

const styles = StyleSheet.create({
	h1: {
		fontSize: RFValue(20, standardScreenHeight),
		fontFamily: bold,
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
	italicBody: {
		fontSize: RFValue(14, standardScreenHeight),
		fontFamily: regular,
		color: Colors.black,
		fontStyle: 'italic',
	},
})

export const h1 = styles.h1
export const h2 = styles.h2
export const h3 = styles.h3
export const body = styles.body
