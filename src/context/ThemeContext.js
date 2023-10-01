import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  addSavedVideos: () => {},
})

export default ThemeContext
