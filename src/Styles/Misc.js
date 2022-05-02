import * as Colors from './Colors'
import { StyleSheet } from 'react-native'

export const padding = 20
export const margin = 20
export const borderRadius = 5

const styles = StyleSheet.create({
	shadow: {
		shadowColor: Colors.black,
		shadowOffset: { height: 2, width: 2 },
		shadowOpacity: 1.0,
		shadowRadius: 5,
	},
	border: {
		borderWidth: 2,
		borderColor: Colors.black,
	},
})

export const shadow = styles.shadow
export const shadowLight = styles.shadowLight
export const border = styles.border
