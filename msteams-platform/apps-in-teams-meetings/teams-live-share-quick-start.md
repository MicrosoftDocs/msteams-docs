---
title: Live Share quick start
author: surbhigupta
description:  In this module, learn how to quickly try the Dice Roller sample
ms.topic: conceptual
ms.localizationpriority: high
ms.author: stevenic
ms.date: 04/07/2022
---

# Quick start guide

Get started with Live Share SDK using the Dice Roller sample is an evolution of the [Fluid Framework Quick Start](https://fluidframework.com/docs/start/quick-start/) and is designed to quickly run a Live Share SDK based [Dice Roller sample](https://github.com/microsoft/live-share-sdk/tree/main/samples/javascript/01.dice-roller) on your computer's localhost.

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

## Next step

> [!div class="nextstepaction"]
> [Dice Roller tutorial](teams-live-share-tutorial.md)

## See also

* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
* [Live Share Media SDK reference docs](/javascript/api/@microsoft/live-share-media/)
* [Live Share capabilities](teams-live-share-capabilities.md)
* [Live Share FAQ](teams-live-share-faq.md)
