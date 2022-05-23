---
title: Live Share Quick Start
description: Getting started with Live Share
ms.topic: concept
ms.localizationpriority: high
ms.author: stevenic
---
---

This Quick Start is an evolution of the [Fluid Framework Quick Start](https://fluidframework.com/docs/start/quick-start/), and is designed to quickly get a Live Share based [DiceRoller sample](https://github.com/microsoft/live-share-sdk/tree/main/samples/01.dice-roller) up and running on your computers localhost.

:::image type="content" source="../assets/images/teams-live-share/dice-roller.png" alt-text="DiceRoller Sample":::

## Set up your development environment

To get started you need the following installed.

- [Node.js](https://nodejs.org/en/download) - Live Share supports Node.js LTS versions 12.17 and greater.
- Code editor - we recommend [Visual Studio Code](https://code.visualstudio.com/).

We also recommend that you install the following:

- [Git](https://git-scm.com/downloads)

## Getting started

Open a new command window and navigate to the folder where you want to install the project, and then clone the
[Live Share repo](https://github.com/officeDev/live-share) with the following commands. The cloning process
will create a subfolder named `live-share` with the project files in it.

```bash
$ git clone https://github.com/officeDev/live-share.git
```

> [!NOTE]
> If you don't have Git installed you can [click here](https://github.com/officeDev/live-share/archive/main.zip) to
download a zip of the Live Share repo. Once the file downloads, extract the contents of the .zip file and run the following steps.

Navigate to the newly created folder and install required dependencies.

```bash
$ cd live-share/samples/01.dice-roller
$ npm install
```

Start both the client and a local server.

```bash
$ npm start
```

A new browser tab will open to <http://localhost:8080> and you will see the dice roller appear! To see collaboration in
action copy the full URL in the browser, including the ID, into a new window or even a different browser. This opens a
second client for your dice roller application. With both windows open, click the **Roll** button in either and note
that the state of the dice changes in both clients.


🥳**Congratulations**🎉 You have successfully taken the first step towards unlocking the world of Live Share based collaboration.

## Next step

> [!div class="nextstepaction"] > [Tutorial: DiceRoller Teams app](teams-live-share-tutorial.md)

## See also

- [GitHub repository](https://github.com/microsoft/live-share-sdk)
- [Reference docs](https://aka.ms/livesharedocs)
- [Teams apps in meetings](teams-apps-in-meetings.md)
