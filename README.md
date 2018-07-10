# react-native-wallet-interface

Your app deals with payment but no time to develop and maintain UI and API calls for e-wallet or any payment gateway?

Introducing REACT NATIVE WALLET INTERFACE

A library that can exist on its own and also can be imported into other app seamlessly, does not conflict with any navigation modules since we have own navigation handling.


### Installation
npm i -S react-native-wallet-interface


### Properties
|Prop|Type|Description|Default|Required|
|----|----|-----------|-------|--------|
|currency|string|Currency to be displayed in the wallet. Does not affect any logic|MYR|optional|
|themeColor|color|Color to be the header of the wallet. Adviced to choose similar theme color with your app to maintain seamless user experience|```#3B4A5C```|optional|
|initialBalance|number|Amount of balance in the wallet initially. If you want this library handle everything for you, no need to supply this value. This library will call API to check balance on itself. Therefore this prop is just "placeholder" amount before the api is called|0|optional||
|onExit|function|Function to trigger when wishing to hide this module. (this prop is not used if this library is run independently on its own, only used if it is import into other app)|()=>null|optional|
|presetReloadAmount|array of objects|preset amount for user to reload (if you dont want to allow for user to freely reload any amount)|```[{ amount: "3" },{ amount: "5" },{ amount: "10" }]```|optional|


*due to incapability of modern computer handling floating points properly, all numbers that represent amount suppose and should be in integer. (You should know this issue if you are dealing with payment :P)
