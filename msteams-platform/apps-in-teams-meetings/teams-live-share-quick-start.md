---
title: Live Share quick start
author: surbhigupta
description: Learn how to quickly build and run the Dice Roller sample using Microsoft Live Share SDK with Microsoft Visual Studio Code, Node.js, and Git.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
ms.date: 04/07/2022
---

# Quick start guide

Get started with Live Share SDK using the Dice Roller sample, which is designed to quickly run a [Dice Roller sample](https://github.com/microsoft/live-share-sdk/tree/main/samples/javascript/01.dice-roller) based on the Live Share SDK on your computer's localhost.

:::image type="content" source="../assets/images/teams-live-share/dice-roller.png" alt-text="DiceRoller Sample":::

> [!NOTE]
> This guide walks through using Live Share locally in a browser. To learn more about using the SDK in a Teams meeting, try our [Agile Poker tutorial](../sbs-teams-live-share.yml).

## Set up your development environment

To get started, install:

* [Node.js](https://nodejs.org/en/download): The Live Share SDK supports Node.js LTS versions 12.17 and later.
* [Latest version of Visual Studio Code](https://code.visualstudio.com/).
* [Git](https://git-scm.com/downloads)

## Build and run the Dice Roller app

1. Go to the [Dice Roller](https://github.com/microsoft/live-share-sdk/tree/main/samples/javascript/01.dice-roller) sample app.

1. Clone the [Live Share SDK](https://github.com/microsoft/live-share-sdk) repository to test the sample app:

    ```bash
    git clone https://github.com/microsoft/live-share-sdk.git
    ```

1. Run the following command to go to the Dice Roller sample app folder:

   ```bash
    cd live-share-sdk\samples\javascript\01.dice-roller
   ```

1. Run the following command to install the dependency package:

    ```bash
    npm install
    ```

1. Run the following command to start the client and the local server:

   ```bash
   npm start
   ```
  
     A new browser tab opens a `http://localhost:8080` url and the Dice Roller game appears.

1. Copy the complete URL in the browser, including the ID and paste the URL in a new window or a different browser.

   A second client for your dice roller application opens.

1. Open both the windows and select the **Roll** button in one window. The state of the dice changes in both clients.

    :::image type="content" source="../assets/images/teams-live-share/dice-roller.png" alt-text="Dice Roller multiple tabs":::
  
   **Congratulations** you've learned how to build and run an app using the Live Share SDK.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+the+Dice+Roller+app&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fapps-in-teams-meetings%2Fteams-live-share-quick-start%23build-and-run-the-dice-roller-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fapps-in-teams-meetings%2Fteams-live-share-quick-start.md&documentVersionIndependentId=ed8f0f96-5a47-75e3-e8f8-0a53dad9da52&platformId=eb4ca777-1abd-300d-16a1-0c05025c8db2&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Next step

> [!div class="nextstepaction"]
> [Dice Roller tutorial](teams-live-share-tutorial.md)

## See also

* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Live Share capabilities](teams-live-share-capabilities.md)
* [Live Share FAQ](teams-live-share-faq.md)
