import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'
export const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
          const data = JSON.parse(results)
          return data.decks || {}
        })
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
            .then((results) => {
              const data = JSON.parse(results)
              return data.decks[id] || {}
            })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        decks: {
          [title]: {title, questions: [], answers: []},
        }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data.decks[title].questions.push(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function removeEntry(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = Object.assign({}, JSON.parse(results))
            data.decks[title] = undefined
            delete data.decks[title]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function answerQuestion(title, answer) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data.decks[title].answers.push(answer)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function restartQuiz(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data.decks[title].answers = []
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).
      then(Notifications.cancelAllScheduledNotificationsAsync())
  }

  function createNotification () {
    return {
      title: 'Don\'t forget to clear you deck!',
      body: "👋🏾 Don't forget to answer your cards today!",
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  }

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
              if(status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                Notifications.scheduleNotificationAsync(
                  {
                    content: createNotification(),
                    trigger: {                      
                      hour: 20, minute: 30, repeats: true
                    } 
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
    })
    .catch((error) => console.warn('Failed to register notification: ', error))
}