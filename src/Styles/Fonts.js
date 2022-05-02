import * as Misc from './Misc'
import * as Colors from './Colors'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const bold = ''
export const regular = ''
export const thin = ''

const standardScreenHeight = 680

const styles = StyleSheet.create({
	h1: {
		fontSize: RFValue(32, standardScreenHeight),
		// fontFamily: '',
		color: Colors.black,
	},
	h2: {
		fontSize: RFValue(24, standardScreenHeight),
		// fontFamily: '',
		color: Colors.black,
	},
	h3: {
		fontSize: RFValue(18, standardScreenHeight),
		// fontFamily: '',
		color: Colors.black,
	},
	body: {
		fontSize: RFValue(14, standardScreenHeight),
		// fontFamily: '',
		color: Colors.black,
	},
})

export const h1 = styles.h1
export const h2 = styles.h2
export const h3 = styles.h3
export const body = styles.body
