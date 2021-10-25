# Mobile Flash Cards

This is a mobile application build using React Native for the Udacity React Native course.

The app lets a user create decks that they can add flash cards to. The flash cards contain questions that can be answered/guessed. The user is able to see the correct answer before submitting whether they guessed correctly or not and at the end of the questions on a deck, a score is shown.

This application was created using `create-react-native-app` and tested using Expo

## Installation

- Clone this repo
- Go to the root folder and install dependencies using `yarn install`
- Run the application using `expo start`

## Testing and implementation details

This app was tested on an Android device (Xiaomi Mi 9T Pro) using Expo Go.

The app was run using `expo start`. Some dependencies are specific to the Expo version so be sure to run `expo install` should you encounter version incompatibility issues.

The card flip animation was made using a tutorial by [Jason Brown](https://codedaily.io/tutorials/Create-a-Flip-Card-Animation-with-React-Native)