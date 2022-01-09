# LifeTree
## _the app that grows as your life grows_
***
***

LifeTree is a React-Native journal application designed to help track and document your moods,
every day to help improve your mental well-being. 

## Project Idea:
***
The project that I chose to develop was a mobile application that allows a user to track their daily mental well-being, where the user can select a mood that summarises how they have felt for much of the day, as well as provide a brief discussion about the day, documenting any positive and negative emotions. By completing a daily breakdown, the user can see a chart of their selected moods over the course of the month, with the mood differentiated through a range of colours. If granted permission, the user can connect the application to access heart rate information stored in their device if the user has heart monitoring enabled on their device. When granted, the application will use said data to pinpoint specific areas within a day where a client’s heart rate had increased exponentially, to display and ask the user what could have caused that increase. If permission is not granted, the user will have the ability to manually enter their heart rate at different points throughout the day. User retention to the application will be completed through a reward scheme, where the user is rewarded for logging in daily.

## Features:
***
- Create an account to save and access your data from any device.
- Documet your mood, obsessions, and a journal for each day.
- View a list of all your entries, searchable by date or mood.
- View a Calendar of all entered moods, with viewable obsessions on date press.
- Set a heart rate monitor, that displays all times of a day where your heart rate goes above where you set your monitor.
- Manually enter your heart rate.
- Set descriptions of your heart rates and have them display on the calendar.
- View a graph of all heart rate data for a day currently stored in the application.

Build a days used score and watch the bonsai tree on the home screen grow with your mental well-being.


## Technology Stack:
***
#### LifeTree is built using:

##### Database: 
- [Firebase](https://firebase.google.com) - Backend as a Service (BaaS) Serverless platform using Firebase Firestore to collect and store user entries and heart rate descriptions.

##### Authentication:
- [Firebase](https://firebase.google.com) - Backend as a Service (BaaS) Serverless platform that handles all user authentication in creating and storing user accounts.

##### Storage:
- [Firebase](https://firebase.google.com) - Backend as a Service (BaaS) Serverless platform that stores assests used within the application as well as profile pictures that are uploaded by the user.

##### Front End:
- [React Native](https://reactnative.dev) - Builds the front-end application using the React-Native framework built on top of the React Framework that handles native development for both Android and iOS devices.

LifeTree itself can be found on [GitHub]() and [GitLab](https://git.cardiff.ac.uk/c1926084/year-3-autumn-project/).

## Prerequisites:
***
LifeTree requires: [Node.js](https://nodejs.org/en/) v12+, [OpenJDK](https://openjdk.java.net/) v8+ to run.
This guide will work on the assumption that openJDK and node are preinstalled on your device. Further details on installation can be found at the [React-Native Docs](https://reactnative.dev/docs/environment-setup).

##### Android:
To run application on android, [Android Studio](https://developer.android.com/studio) is required to be installed on your computer with access to the Android Emulator to create and simulate an Android Device. 

The installation of the application will assume that android studio is pre-installed and set up through the initial setup guide. Details on how to install and intialize Android Studio can be found [here](https://developer.android.com/studio/install).

##### iOS:
To run the application on iOS, a Mac is required with the latest version of XCode and the XCode command line tools installed. CocoaPods is also required to be installed for an iOS simulator to build the application correctly. Watchman is also a reccomended install. 
The [Hombrew](https://brew.sh/) package installer is best reccomended to install required  packages. 

The installation of the aplication will assume that both XCode and the XCode command line tools are pre-installed and that homebrew is also pre-installed. Details on how to install XCode and the XCode command line tools can be found [here](https://reactnative.dev/docs/environment-setup#xcode), and Homebrew [here](https://brew.sh/).

## Installation
 ***
 **These steps should be completed before running the React-Native CLI**
 
 1. Clone the project from the git repository:
```
git clone https://git.cardiff.ac.uk/c1926084/year-3-autumn-project.git
```
 2. Navigate into the repository and the MentalWellnessApplication folder:
```
cd year-3-autumn-project/MentalWellnessApplication
```
 3. Install the required node dependencies:
```
npm install
```
### React-Native CLI:
#### Android:
**Open Project in Android Studio and initialise the emulator:**
 1. After installing Android Studio from the provided links above, open Android Studio and select the 'Open Existing Project' option.
 2. Navigate to the MentalWellnessFolder folder of the application, then go to android, selecting the ‘build.gradle’ file to automatically build the application with all dependencies automatically being generated. 
 3. Once the project has opened, within the top right-hand corner of Android Studio, press on the field that says ‘No Devices’ and open the AVD Manager.
 4. In the AVD manager, press create virtual device to open the virtual device configurator.
 5. Select a Pixel 3A device from the settings and press next.
 6. If not already downloaded, download API levels 30 and 29 from the recommended system image for your device.
 7. Once downloaded, press next and finish.
 8. Once the emulator have been created, close the AVD manager and navigate back to the top-right hand corner of Android Studio. Here, select the device that you just created.

**Set-up the application:**
 1. In terminal: Navigate to the android folder and perform a gradle clean to build the application:
###### MacOS / Linux :
```
cd android
./gradlew clean
```
If you are getting a permissions error with gradle, use:
```
cd android
chmod +x gradlew
./gradlew clean
```
###### Windows :
```
cd android
.\gradlew clean
```

 2. Return back to android studio, and with the emulator selected, press the green play button next to the device to run the application. This will result in an 'Unable to Resolve Script' issue, ignore this as we will be solving it in the next section.

 3. Return back to your terminal and launch the Rect Native application on the android emulator using:
```
cd ..
npx react-native run-android
```

 4. This will then auto start the application on the emulator and you will be taken to the Welcome Screen.


 ##### iOS:
 
**To run the application in iOS, a Mac is required.**

**Installing an iOS Simulator:**
1. After installing XCode and the XCode command line tools from the links above, open XCode and in the menu bar, select: XCode > Preferences > Components. 
2. On the components tab, select and download a version of iOS to run the application on, the reccomended version is currently iOS 15.

**Installing CocoaPods and Watchman:**
 1. Watchman is a reccomended instal as it is a watches changes in the system and provides better performance. Assuming Homebrew has been installed, install Watchman in terminal by:
```
brew install watchman
```

2. CocoaPods is a dependency manager for Swift and Objective-C, and is require for the application to function. CocoaPods will require sudo access for its installation. In terminal, run the command:
```
sudo gem install cocoapods
```

**Set-up the application:**
  1. After completing all install steps, navigate to the ios directory from the MentalWellnessApplication directory and run a pod install to install all the required dependencies to run the application.
```
cd ios
pod install
```
  5. Once installed, return to the MentalWellnessApplication folder and run the application
```
cd ..
npx react-native run-ios
```
 
## Requirements:
***
The requirements for LifeTree were broken down into three sections:
- Functional Requirements
- Non-Functional Requirements
- Data Requirements

They can be found [here](https://git.cardiff.ac.uk/c1926084/year-3-autumn-project/-/requirements_management/requirements), and have been highlighted on what type the requirement is and if it is a MVP requirement or additional requirement.

## Documentation:
***

LifeTree uses multiple third party frameworks, languages and libraries within its development.
Instructions on their use and documentation are provided below.

| Name | Version |Documentation | Use Case |
| ------ | ------ | ------ | ------ |
| JavaScript | Babel 7.12.9 |https://developer.mozilla.org/en-US/docs/Web/JavaScript | The programming language for the application, allowing for the use of React and React Native frameworks.|
| | | | |
| React | 17.0.2 | https://reactjs.org/docs/getting-started.html | The foundational framework that React Native is built on top of. |
| React-Native | 0.66.3 | https://reactnative.dev/docs/getting-started | Used as the main framework of code development, top provide native code for iOS and Android. |
| | | | |
| Firebase Authentication | 13.1.1 |https://firebase.google.com/docs/auth | Used to creat and store user logins. |
| Firebase Firestore | 13.1.1 |https://firebase.google.com/docs/firestore | Used to store all user entry data. |
| Firebase Storage | 13.1.1 |https://firebase.google.com/docs/storage | Used to store application assets and user profile pictures. |
| | | | |
| @ovalmoney/react-native-fitness | 0.5.3 | https://github.com/OvalMoney/react-native-fitness | Used to read heart rate data from both Google Fit and Apple HealthKit to display hear rates in HRMonitoring.js. |
| @react-native-community/datetimepicker | 5.1.0 | https://github.com/react-native-datetimepicker/datetimepicker | Used to select a time when manually entering a heart rate. |
| @react-native-community/slider | 4.1.12 | https://github.com/callstack/react-native-slider | Used to filter the list to display heart rates by a set user variable. |
| @react-navigation/bottom-tabs | 6.0.9 | https://reactnavigation.org/docs/bottom-tab-navigator/ | Used as the main navigation for the application once a user has signed in. |  
| @react-navigation/stack | 6.0.11 | https://reactnavigation.org/docs/stack-navigator/ | Used for navigation not controlled through the tab navigator such as welcome and createAccount. |
| hoist-non-react-statics | - | - | Used with react-native-calendars to ensure calendar is rendered correctly. |
| react-native-calendars | 1.1271.0 | https://github.com/wix/react-native-calendars | Used to display a calendar with each day coloured to a specific mood, and display the users obsession and heart rate descriptions. |
| react-native-chart-kit | 6.11.0 | https://github.com/indiespirit/react-native-chart-kit | Used to display a graph with the heart rate data as entry points.  | | | | |
| react-native-image-picker | 4.6.0 | https://github.com/react-native-image-picker/react-native-image-picker | Used to access the camera and image library to set a profile picture. |
| react-native-loading-spinner-overlay | 2.0.0 | https://github.com/joinspontaneous/react-native-loading-spinner-overlay | Used to indicate when a background activity is occurring in the application such as logging in. |
| react-native-progress | 5.0.0 | https://github.com/oblador/react-native-progress | Used to indicate the progress of the profile picture upload. |
| react-native-svg | 12.1.1 | https://github.com/react-native-svg/react-native-svg | Adds SVG support for the graph in HRMonitoring.js. |
| react-native-vector-icons | 9.0.0 | https://github.com/oblador/react-native-vector-icons | Used to add icons used throughout the application. |

## Usage
***

When launching the application for the first time, you will be taken to the welcome screen. From here you can login with an account or create a new one.
A test accounts with pre entered data already exist within the application, the login information is:
`email:` `yelyah@paramore.net`
`password:` `paramore`

`email:` `timsmith@example.com`
`password:` `@TestAccount1`

To create a new account, enter your full name, email address and password, then press the create account button. This will then take you to the home page of the application. Here you will be displayed an image of the bonsai tree, the longer the application is used, the more the tree will grow. Below the tree is a generated inspirational quote that is updated each time the application is refreshed. The find out more button gives a description about the tree image.

If you press on the profile picture, you are taken to the settings page. Here you are able to take or select a profile picture, and upload the image to save to your profile. One issue is that on pressing the take picture button, if permissions have not been granted you are taken to the camera app on allowance. This requires you to go back to the application and press the take image button again. Upon pressing the submit image button, the image is uploaded and refreshed to display on the homepage on the next app refresh. The logout button returns you to the welcome screen.

The add an entry page allows a user to enter their mood, journal data and obsessions. On pressing of a mood, it is highlighted that you have selected it. Once a journal entry and an obsession has been entered, pressing the submit button adds the data to the entries list, and displays a message to say the entry has been saved.

The view all entries page shows a list of all entries that displays the date of entry, a description of the entry and the mood of the entry. This list can be searchable through the month or mood. Pressing on entry displays the entry in full, showing the mood that was highlighted, journal entry and obsession of the day. Pressing the return to entries button will return you back to the list.

The view moods page shows a calendar, where once an entry has been added with a mood, it will be highlighted on the calendar. If an obsession has been set, then pressing on a date will display information about the obsession, as well as if a heart rate description has been set.

The heart rate monitoring page shows a list of all heart rates and a graph with all data points. This page requires authentication from either Google Fit or Apple HealthKit, an email address with Google Fit permissions is required and provided below:
`email:` `lifetreeapp@gmail.com`
`password:` `lifeTreeApp1`

A warning that google hasnt verified this app for safety will appear, click continue and the page will ask for permissions to read heart rate data upon submission the page will load. If data is present, it will be shown in the graph above, otherwise the page will be blank. The scroller allows you to fine tune the hear rates to track from and requires interact before rendering the list.
To add a new entry, press on the add button where the date and time will be automatically entered, and you just need to input your BPM. when submitting, you are returned to the HR monitoring page and the graph should be updated with the new data input. To add a description to an input, scroll the scroller to the heart rate you want to track, then press the add description button. This will allow you to add a descriptive reason for a heart rate, and will be stored on the calendar.

## Project Creation
***

This project was created using React-Native, a framework built ontop of the React framework that produces native code for both iOS and Android, whilst only coding in one language. I chose React Native as it provides a dynamic load each time data is updated and ensures that you are only programming in one language for multiple platforms, instead of learning for multiple platforms.
I chose to develop using the React-Native-CLI, ensuring all libraries I wanted to use were available and supported. I could have used the Expo-CLI to develop my application, allowing my application to be built without the use of an emulator, however, many repositories I wanted to use were not supported with Expo development, so React-Native-CLI was the best option, despite the slower loading times.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. Reference to Dillinger for README template and editor to create a formatted README file - https://dillinger.io/)


