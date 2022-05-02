import * as Fonts from './Fonts'
import * as Colors from './Colors'
import * as Misc from './Misc'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { standardScreenHeight } = Fonts

const styles = StyleSheet.create({
	logo: {
		height: RFValue('', standardScreenHeight),
		width: RFValue('', standardScreenHeight),
	},
})
