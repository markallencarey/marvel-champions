import * as Colors from './Colors'
import * as Fonts from './Fonts'
import * as Misc from './Misc'
import * as Window from './Window'
import { StyleSheet } from 'react-native'

export const centered = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

const styles = StyleSheet.create({
	appView: {
		width: Window.width,
		height: Window.height,
		backgroundColor: Colors.background,
		...centered,
	},
	safeAreaView: {
		height: '100%',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	routesView: {
		width: '100%',
		height: '100%',
		backgroundColor: Colors.background,
	},
	content: {
		height: '100%',
		width: '100%',
		paddingHorizontal: Misc.padding * 2,
		paddingVertical: Misc.padding,
		alignItems: 'center',
	},
	textInput: {
		...Misc.border,
		borderRadius: Misc.borderRadius,
		width: '100%',
		marginVertical: Misc.margin / 2,
		padding: Misc.margin / 2,
		...Fonts.body,
	},
})

export const appView = styles.appView
export const safeAreaView = styles.safeAreaView
export const routesView = styles.routesView
export const content = styles.content
export const textInput = styles.textInput
