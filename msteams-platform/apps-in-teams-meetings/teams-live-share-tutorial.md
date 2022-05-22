---
title: Live Share Tutorial
description: Live Share Dice Roller Tutorial
ms.topic: concept
ms.localizationpriority: high
ms.author: stevenic
---
---

In this walkthrough, you'll learn about using the Live Share SDK by examining the SDKs [Dice Roller sample](https://github.com/microsoft/live-share-sdk/tree/main/samples/01.dice-roller). To get started, go through the [Quick Start](teams-live-share-quick-start.md) guide.

:::image type="content" source="../assets/images/teams-live-share/dice-roller.png" alt-text="Dice Roller Sample":::

In the Dice Roller sample, users are shown a die with a button to roll it. When the die is rolled, Live Share uses the Fluid Framework to sync the data across clients so everyone sees the same result. To do this, complete the following steps:

1. Set up the application.
2. Join a Fluid container.
3. Write the stage view.
4. Connect the stage view to Fluid data.
5. Write the sidebar view
6. Write the settings view

All of the work in this demo will be done in the [app.js](https://github.com/microsoft/live-share-sdk/blob/main/samples/01.dice-roller/src/app.js) file.

## Set up the application

Start by importing the required modules. The sample uses the [SharedMap DDS](https://fluidframework.com/docs/data-structures/map/) from the Fluid Framework and the [TeamsFluidClient](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.TeamsFluidClient.html) from the Live Share SDK. The sample supports Teams Meeting Extensibility so we'll need to include the [Teams JavaScript SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest). Finally, the sample is designed to run both locally and in a Teams meeting so we'll need to include some additional Fluid Framework pieces needed to [test the sample locally](https://fluidframework.com/docs/testing/testing/#azure-fluid-relay-as-an-abstraction-for-tinylicious).
  
Applications create Fluid containers using a schema that defines a set of *initial objects* that will be available to the container. The sample uses a SharedMap to store the most recent die value that was rolled. Learn more about initial objects in [Data modeling](https://fluidframework.com/docs/build/data-modeling/).

Teams Meeting Apps require multiple views; content, config, and stage. We'll create a start() function to help identify teh view to render and to perform any initialization that's required. We want our app to support running both locally in a web browser and from within a Teams Meeting so the start() function looks for an `inTeams=true` query parameter to determine if it's running in Teams. When running in Teams your application need to call `app.initialize()` prior to calling any other teams-js methods.

In addition to the `inTeams=true` query parameter, we can use a `view=content|config|stage` query parameter to determine the view that should be rendered.

```js
import { SharedMap } from "fluid-framework";
import { TeamsFluidClient } from "@microsoft/live-share";
import { app, pages } from "@microsoft/teams-js";
import { LOCAL_MODE_TENANT_ID } from "@fluidframework/azure-client";
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";

const searchParams = new URL(window.location).searchParams;
const root = document.getElementById("content");

// Define container schema

const diceValueKey = "dice-value-key";

const containerSchema = {
  initialObjects: { diceMap: SharedMap }
};

function onContainerFirstCreated(container) {
  // Set initial state of the rolled dice to 1.
  container.initialObjects.diceMap.set(diceValueKey, 1);
}


// STARTUP LOGIC

async function start() {

  // Check for page to display
  let view = searchParams.get('view') || 'stage';

  // Check if we are running on stage.
  if (!!searchParams.get('inTeams')) {

    // Initialize teams app
    await app.initialize();

    // Get our frameContext from context of our app in Teams
    const context = await app.getContext();
    if (context.page.frameContext == 'meetingStage') {
      view = 'stage';
    }
  }

  // Load the requested view
  switch (view) {
    case 'content':
      renderSideBar(root);
      break;
    case 'config':
      renderSettings(root);
      break;
    case 'stage':
    default:
      const { container } = await joinContainer();
      renderStage(container.initialObjects.diceMap, root);
      break;
  }
}

start().catch((error) => console.error(error));
```

## Join a Fluid container

Not all of your apps views will need to be collaborative. The `stage` view will always need collaborative features, the `content` view may need collaborative features, and the `config` view should never need collaborative features. For the views that do need collaborative features you'll need to join a Fluid container associated with the current meeting.

Joining the container for the meeting is as sample as creating a new [TeamsFluidClient](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.TeamsFluidClient.html) and then calling it's [joinContainer()](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.TeamsFluidClient.html#joinContainer) method.  When running locally you'll need to pass in a custom connection config with a special `LOCAL_MODE_TENANT_ID` but otherwise, join a local container is the same as joining a container in Teams.

```js
async function joinContainer() {
  // Are we running in teams?
  let client;
  if (!!searchParams.get('inTeams')) {
      // Create client
      client = new TeamsFluidClient();
  } else {
      // Create client and configure for testing
      client = new TeamsFluidClient({
        connection: {
          tenantId: LOCAL_MODE_TENANT_ID,
          tokenProvider: new InsecureTokenProvider("", { id: "123", name: "Test User" }),
          orderer: "http://localhost:7070",
          storage: "http://localhost:7070",
        }
      });
  }

  // Join container
  return await client.joinContainer(containerSchema, onContainerFirstCreated);
}
```

> [!NOTE]
> When testing locally, the TeamsFluidClient updates the browser URL to contain the ID of the test container that was created. Copying that link to other browser tabs causes the TeamsFluidClient to join the test container that was created. If the modification of the applications URL interferers with the operation of the application, the strategy used to store the test containers ID can be customized using the [setLocalTestContainerId](https://livesharesdk.z5.web.core.windows.net/interfaces/_microsoft_live_share.ITeamsFluidClientOptions.html#setLocalTestContainerId) and [getLocalTestContainerId](https://livesharesdk.z5.web.core.windows.net/interfaces/_microsoft_live_share.ITeamsFluidClientOptions.html#getLocalTestContainerId) options passed to the TeamsFluidClient.

## Write the stage view

Most Teams Meeting Extensibility applications will be designed to use React for their view framework. To keep things simple, this sample uses standard HTML/DOM methods to render a view.

### Start with a static view

It is simplest to create the view using local data without any Fluid functionality, then add in Fluid by changing some key pieces of the app. 

The `renderStage` function appends the `stageTemplate` to the passed in HTML element, and creates a working dice roller with a random dice value each time the "Roll" button is clicked. The `diceMap` will be used in the next few steps.

```js
const stageTemplate = document.createElement("template");

stageTemplate["innerHTML"] = `
  <div class="wrapper">
    <div class="dice"></div>
    <button class="roll"> Roll </button>
  </div>
`
function renderStage(diceMap, elem) {
    elem.appendChild(stageTemplate.content.cloneNode(true));
    const rollButton = elem.querySelector(".roll");
    const dice = elem.querySelector(".dice");

    rollButton.onclick = () => updateDice(Math.floor(Math.random() * 6)+1);

    const updateDice = (value) => {
        // Unicode 0x2680-0x2685 are the sides of a die (⚀⚁⚂⚃⚄⚅).
        dice.textContent = String.fromCodePoint(0x267f + value);
    };
    updateDice(1);
}
```

## Connect the stage view to Fluid data

### Modifying Fluid data

To begin using Fluid in the application, the first thing to change is what happens when the user clicks the `rollButton`. Instead of updating the local state directly, the button updates the number stored in the `value` key of the passed in `diceMap`. Because the `diceMap` is a Fluid `SharedMap`, changes will be distributed to all clients. Any changes to the `diceMap` will cause a `valueChanged` event to be emitted, and an event handler can trigger an update of the view.

This pattern is common in Fluid because it enables the view to behave the same way for both local and remote changes.

```js
    rollButton.onclick = () => diceMap.set("dice-value-key", Math.floor(Math.random() * 6)+1);
```


### Relying on Fluid data

The next change that needs to be made is to change the `updateDice` function so it no longer accepts an arbitrary value. This means the app can no longer directly modify the local dice value. Instead, the value will be retrieved from the `SharedMap` each time `updateDice` is called.

```js
    const updateDice = () => {
        const diceValue = diceMap.get("dice-value-key");
        dice.textContent = String.fromCodePoint(0x267f + diceValue);
    };
    updateDice();
```

### Handling remote changes

The values returned from `diceMap` are only a snapshot in time. To keep the data up to date as it changes an event handler must be set on the `diceMap` to call `updateDice` each time that the `valueChanged` event is sent. See the [documentation for SharedMap](https://fluidframework.com/docs/data-structures/map/) to get a list of events fired and the values passed to those events.

```js
    diceMap.on("valueChanged", updateDice);
```

## Write the sidebar view

The sidebar view, also called the `content` view, is displayed to the user in a side bar when they click on your apps icon within a meeting. The goal of this view is to let a user select content for the app prior to sharing the app to the stage. For Live Share apps, the sidebar view can also be used as a remote control of sorts for the app. Calling [joinContainer()](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.TeamsFluidClient.html#joinContainer) from the sidebar view will connect to the same Fluid container the stage view is connected to. This container can then be used to communicate with the stage view. Just keep in mind that you're communicating with every ones stage view.

The samples sidebar view simply prompts the user to press the share to stage button.

```js
const sideBarTemplate = document.createElement("template");

sideBarTemplate["innerHTML"] = `
  <style>
    .wrapper { text-align: center }
    .title { font-size: large; font-weight: bolder; }
    .text { font-size: medium; }
  </style>
  <div class="wrapper">
    <p class="title">Lets get started</p>
    <p class="text">Press the share to stage button to share Dice Roller to the meeting stage.</p>
  </div>
`;

function renderSideBar(elem) {
    elem.appendChild(sideBarTemplate.content.cloneNode(true));
}
```

## Write the settings view

The settings view, also called the `config` view, is shown to a user when they first add your app to a Teams Meeting. This view lets the user configure the app globally for a meeting and is currently required to be displayed, even if there aren't any settings to configure. You are not allowed to call [joinContainer()](https://livesharesdk.z5.web.core.windows.net/classes/_microsoft_live_share.TeamsFluidClient.html#joinContainer) from this view as you're not in an actual meeting yet.

The samples settings view simply prompts the user to press the save button.

```js
const settingsTemplate = document.createElement("template");

settingsTemplate["innerHTML"] = `
  <style>
    .wrapper { text-align: center }
    .title { font-size: large; font-weight: bolder; }
    .text { font-size: medium; }
  </style>
  <div class="wrapper">
    <p class="title">Welcome to Dice Roller!</p>
    <p class="text">Press the save button to continue.</p>
  </div>
`;

function renderSettings(elem) {
    elem.appendChild(settingsTemplate.content.cloneNode(true));

    // Save the configurable tab
    pages.config.registerOnSaveHandler(saveEvent => {
      pages.config.setConfig({
        websiteUrl: window.location.origin,
        contentUrl: window.location.origin + '?inTeams=1&view=content',
        entityId: 'DiceRollerFluidLiveShare',
        suggestedDisplayName: 'DiceRollerFluidLiveShare'
      });
      saveEvent.notifySuccess();
    });

    // Enable the Save button in config dialog
    pages.config.setValidityState(true);
}
```

## Run the app

The [full code for this application is available](https://github.com/microsoft/live-share-sdk/tree/main/samples/01.dice-roller) for you to try out. Try opening it in multiple browser windows to see the changes reflected between clients.
