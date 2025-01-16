/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "EerieBlack": "#1C1C1C",
        "primaryRedHex": '#DC3535',
        "primaryOrangeHex": '#D17842',
        "primaryBlackHex": '#0C0F14',
        "primaryDarkGreyHex": '#141921',
        "secondaryDarkGreyHex": '#21262E',
        "primaryGreyHex": '#252A32',
        "secondaryGreyHex": '#252A32',
        "primaryLightGreyHex": '#52555A',
        "secondaryLightGreyHex": '#AEAEAE',
        "primaryWhiteHex": '#FFFFFF',
        "primaryBlackRGBA": 'rgba(12,15,20,0.5)',
        "secondaryBlackRGBA": 'rgba(0,0,0,0.7)',
        "VeryDarkDesaturatedRed": "#4A2C2A",
        "DarkOrange": "#8B4513"
      },
      backgroundColor: {
        "EerieBlack": "#1C1C1C",
        "primaryRedHex": '#DC3535',
        "primaryOrangeHex": '#D17842',
        "primaryBlackHex": '#0C0F14',
        "primaryDarkGreyHex": '#141921',
        "secondaryDarkGreyHex": '#21262E',
        "primaryGreyHex": '#252A32',
        "secondaryGreyHex": '#252A32',
        "primaryLightGreyHex": '#52555A',
        "secondaryLightGreyHex": '#AEAEAE',
        "primaryWhiteHex": '#FFFFFF',
        "primaryBlackRGBA": 'rgba(12,15,20,0.5)',
        "secondaryBlackRGBA": 'rgba(0,0,0,0.7)',
      },
      fontFamily: {
        'Black': ['"PlayfairDisplay-Black"'],
        "Regular": ['"PlayfairDisplay-Regular"'],
        "Medium": ['"PlayfairDisplay-Medium"'],
        "SemiBold": ['"PlayfairDisplay-SemiBold"'],
        "ExtraBold": ['"PlayfairDisplay-ExtraBold"'],
      },
      width: {
        'cardWidth': '32vw',
      },
      height: {
        'cardHeight': '32vw',
      }
    },
  },
  plugins: [],
};
