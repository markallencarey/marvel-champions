//React & React Native
import React, { useContext, useEffect, useState, createContext } from 'react'
//Packages
//Context
//Constants
//Navigation
//Components
//Screens
//Icons
//Images
//Data
//Styles

export const TemplateContext = createContext()

export const TemplateProvider = ({ children }) => {
	const [templateValue, setTemplateValue] = useState()

	const templateFunction = () => {
		alert('This is the template function')
	}

	return (
		<TemplateContext.Provider
			value={{
				templateValue,
				templateFunction,
			}}
		>
			{children}
		</TemplateContext.Provider>
	)
}
