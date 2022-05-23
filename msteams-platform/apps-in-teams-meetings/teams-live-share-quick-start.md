---
title: Live Share Quick Start
description: Getting started with Live Share
ms.topic: concept
ms.localizationpriority: high
ms.author: stevenic
---
---

# Live Share quick start

This quick start is an evolution of the [Fluid Framework Quick Start](https://fluidframework.com/docs/start/quick-start/) and is designed to quickly run a Live Share based [DiceRoller sample](https://github.com/microsoft/live-share-sdk/tree/main/samples/01.dice-roller) on your computer's localhost.

:::image type="content" source="../assets/images/teams-live-share/dice-roller.png" alt-text="DiceRoller Sample":::

## Set up your development environment

To get started, install the following:

* [Node.js](https://nodejs.org/en/download): Live Share supports Node.js LTS versions 12.17 and greater.
* Code editor: We recommend [Visual Studio Code](https://code.visualstudio.com/).
* [Git](https://git-scm.com/downloads)

## Get started

Open a new command window and go to the folder where you want to install the project, and then clone the
[Live Share repo](https://github.com/microsoft/live-share-sdk) with the following commands. The cloning process
creates a subfolder named `live-share`:

1. Clone the Live Share SDK repository to test the sample app:

    ```bash
    $ git clone https://github.com/microsoft/live-share-sdk.git
    ```

1. Run the following command to go to the Dice Roller sample app folder:

   ```bash
    $ cd live-share-sdk\samples\01.dice-roller
   ```

1. Run the following command to install the dependency package:

    ```bash
    $ npm install
    ```

1. Run the following command to start the client and the local server:

   ```bash
   $ npm start
   ```

A new browser tab opens a http://localhost:8000 and the Dice Roller game appears. To see collaboration in
action, copy the complete URL in the browser, including the ID and paste the URL in a new window or a different browser. This opens a second client for your dice roller application. With both windows open, select the **Roll** button in either and note that the state of the dice changes in both clients.

**Congratulations** You have successfully taken the first step towards unlocking the world of Live Share based collaboration.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: DiceRoller Teams app](teams-live-share-tutorial.md)

## See also

* [GitHub repository](https://github.com/microsoft/live-share-sdk)
* [Reference docs](https://aka.ms/livesharedocs)
* [Teams apps in meetings](teams-apps-in-meetings.md)
