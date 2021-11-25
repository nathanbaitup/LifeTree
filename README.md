# Year 3 Autumn Project

**Project Idea:**

The project that I chose to develop was a mobile application that allows a user to track their daily mental well-being, where the user can select a mood that summarises how they have felt for much of the day, as well as provide a brief discussion about the day, documenting any positive and negative emotions. By completing a daily breakdown, the user can see a chart of their selected moods over the course of the month, with the mood differentiated through a range of colours. If granted permission, the user can connect the application to access heart rate information stored in their device if the user has heart monitoring enabled on their device. When granted, the application will use said data to pinpoint specific areas within a day where a client’s heart rate had increased exponentially, to display and ask the user what could have caused that increase. If permission is not granted, the user will have the ability to manually enter their heart rate at different points throughout the day to calculate the average heart rate per day and view it against heart rates for the past month.  User retention to the application will be completed through a reward scheme, where the user is rewarded for logging in daily. The application will come with a default theme with the option of an in-app purchase to get other themes.

**Running project after an update:**

To run the project in development after an update has been made, both the android and ios projects have to be updated with any new dependencies added.

**ANDROID:**

In terminal, navigate to the android folder within the Application folder. `cd android`

MacOS:

Ensure that you have the correct permissions to to run the gradle wrapper clean: `chmod +x gradlew`

Run a gradle clean `./gradlew clean` 

Windows:

Run a gradle clean `.\gradlew clean`



`cd ..` back to the main repository and you can then run `npx react-native run-android` to launch the android application.

**IOS:**

In terminal, navigate to the ios folder within the Application folder. `cd ios`

Run `pod update`

`cd ..` back to the main repository and you can then run `npx react-native run-ios` to launch the android application.
