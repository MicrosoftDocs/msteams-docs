---
title: Live Share canvas overview
author: surbhigupta
description: In this module, learn more about Live Share canvas, an extension enabling turn-key inking, laser pointers, and cursors for meeting apps.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 10/04/2022
---

# Live Share canvas overview

:::image type="content" source="../assets/images/teams-live-share/live-share-canvas-docs-feature-1.png" alt-text="Teams Live Share media synchronization":::

In conference rooms and classrooms across the globe, whiteboards are a pivotal part of collaboration. In modern times however, the whiteboard is no longer enough. With numerous digital tools such as PowerPoint being the focal point of collaboration in the modern era, it is essential to enable the same creative potential.

To enable more seamless collaboration, Microsoft created PowerPoint Live, which has become instrumental to how people work in Teams. Presenters can annotate over slides for everyone to see, using pens, highlighters, and laser pointers to draw attention to key concepts. Using Live Share canvas, your app can bring the power of PowerPoint Live inking tools with minimal effort.

## Install

To add the latest version of the SDK to your application using npm:

```bash
npm install @microsoft/live-share --save
npm install @microsoft/live-share-canvas --save
```

OR

To add the latest version of the SDK to your application using [Yarn](https://yarnpkg.com/):

```bash
yarn add @microsoft/live-share
yarn add @microsoft/live-share-canvas
```

## Setting up the package

Live Share canvas has two primary classes that enable turn-key collaboration: `InkingManager` and `LiveCanvas`. `InkingManager` is responsible for attaching a fully-featured `<canvas>` element to your app, while `LiveCanvas` manages the remote synchronization with other meeting participants. Used together, your app can have complete whiteboard-like functionality in just a few lines of code.

| Classes                                                                     | Description                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [InkingManager](/javascript/api/@microsoft/live-share-canvas/inkingmanager) | Class that attaches a `<canvas>` element to a given `<div>` to automatically manage pen/highlighter strokes, laser pointer, lines & arrows, erasers, and cursors. Exposes a set of APIs to control which tool is active and basic configuration settings. |
| [LiveCanvas](/javascript/api/@microsoft/live-share-canvas/livecanvas)       | A `SharedObject` class that synchronizes strokes & cursor positions from `InkingManager` for everyone in a Live Share session.                                                                                                                            |

Example:

```html
<body>
  <div id="canvas-host"></div>
</body>
```

# [JavaScript](#tab/javascript)

```javascript
import * as microsoftTeams from "@microsoft/teams-js";
import { InkingManager, LiveCanvas } from "@microsoft/live-share-canvas";

// Initialize the Teams Client SDK
await microsoftTeams.app.initialize();

// Setup the Fluid container
microsoftTeams.liveShare.initialize();
const schema = {
  initialObjects: { liveCanvas: LiveCanvas },
};
const { container } = await microsoftTeams.liveShare.joinContainer(schema);
const { liveCanvas } = container.initialObjects;

// Get the canvas host element
const canvasHostElement = document.getElementById("canvas-host");
const inkingManager = new InkingManager(canvasHostElement);

// Begin synchronization for LiveCanvas
await liveCanvas.initialize(inkingManager);
```

# [TypeScript](#tab/typescript)

```TypeScript
import * as microsoftTeams from "@microsoft/teams-js";
import { InkingManager, LiveCanvas } from "@microsoft/live-share-canvas";
import { ContainerSchema } from "fluid-framework";

// Initialize the Teams Client SDK
await microsoftTeams.app.initialize();

// Setup the Fluid container
microsoftTeams.liveShare.initialize();
const schema: ContainerSchema = {
  initialObjects: { liveCanvas: LiveCanvas },
};
const { container } = await microsoftTeams.liveShare.joinContainer(schema);
const liveCanvas = container.initialObjects.liveCanvas as LiveCanvas;

// Get the canvas host element
const canvasHostElement = document.getElementById("canvas-host");
const inkingManager = new InkingManager(canvasHostElement);

// Begin synchronization for LiveCanvas
await liveCanvas.initialize(inkingManager);
```

---

## Canvas tools & cursors

Now that you understand how to set up the Live Share canvas and it is being synchronized, you can now configure the canvas for user interaction, such as with buttons to select a pen tool.

Example:

```html
<body>
  <div id="canvas-host"></div>
  <button id="pen">Enable Pen</button>
  <label for="pen-color">Select a color for pen:</label>
  <input type="color" id="color" name="color" value="#000000" />
  <button id="pen-tip-size">Increase pen size</button><br />

  <button id="highlighter">Enable Highlighter</button><br />

  <button id="eraser">Enable Eraser</button>
  <button id="point-eraser">Enable Point Eraser</button><br />

  <button id="laser-pointer">Enable Laser Pointer</button><br />

  <button id="arrow">Enable Line Arrow</button><br />

  <button id="clear">Clear strokes</button><br />

  <button id="cursors">Toggle Cursors</button>
</body>
```

```javascript
import {
  InkingManager,
  LiveCanvas,
  InkingTool,
  fromCssColor,
} from "@microsoft/live-share-canvas";
// ...

// Change the selected tool to pen
document.getElementById("pen").onclick = () => {
  inkingManager.tool = InkingTool.pen;
};
// Change the selected color for pen
document.getElementById("pen-color").onchange = () => {
  const colorPicker = document.getElementById("color");
  inkingManager.penBrush.color = fromCssColor(colorPicker.value);
};
// Increase the tip size for pen
document.getElementById("pen-tip-size").onclick = () => {
  inkingManager.penBrush.tipSize = inkingManager.penBrush.tipSize + 1;
};
// Change the selected tool to highlighter with custom color
document.getElementById("highlighter").onclick = () => {
  inkingManager.highlighterBrush.color = fromCssColor("#3BDE3B"); // optional
  inkingManager.tool = InkingTool.highlighter;
};
// Change the selected tool to eraser to erase entire strokes
document.getElementById("eraser").onclick = () => {
  inkingManager.tool = InkingTool.eraser;
};
// Change the selected tool to eraser to erase points in strokes
document.getElementById("point-eraser").onclick = () => {
  inkingManager.tool = InkingTool.pointEraser;
};
// Change the selected tool to laser pointer with disappearing strokes & custom color
document.getElementById("laser-pointer").onclick = () => {
  inkingManager.laserPointerBrush.color = fromCssColor("#3BDE3B"); // optional
  inkingManager.tool = InkingTool.laserPointer;
};
// Change the selected tool to line with arrow at end
document.getElementById("arrow").onclick = () => {
  inkingManager.tool = InkingTool.line;
  inkingManager.lineBrush.endArrow = "open"; // optional
};
// Clear all strokes, lines, etc. from the canvas
document.getElementById("clear").onclick = () => {
  inkingManager.clear();
};
// Enable cursor sharing within the Live Canvas
document.getElementById("cursors").onclick = () => {
  // Optional. Set user display info
  liveCanvas.onGetLocalUserInfo = () => {
    return {
      displayName: "YOUR USER NAME",
      pictureUri: "YOUR USER PICTURE URI",
    };
  };
  // Toggle Live Canvas cursor enabled state
  liveCanvas.isCursorShared = !isCursorShared;
};
```

## Optimizing across devices

For most applications in the web, content will render differently depending on screen size or varying application state. If `InkingManager` isn't optimized correctly for your app, that could cause strokes and cursors to appear differently for each user. Fortunately, Live Share canvas supports a simple set of APIs that can allow the `<canvas>` to adjust stroke positions to align correctly with your content.

By default, Live Share canvas works a lot like a whiteboard app, with the content being center aligned to the viewport with a 1x zoom level. Only part of the content is being rendered within the visible bounds of the `<canvas>`. Conceptually, it is like a recording a video from birdseye view. While the viewport of the camera is recording a portion of the world beneath it, the real world stretches nearly infinitely in every direction.

Here is a simple diagram to help visualize this concept:

:::image type="content" source="../assets/images/teams-live-share/live-share-canvas-capabilities-docs-diagram-1.png" alt-text="Live Share canvas viewport visualization":::

You can customize this behavior in the following ways:

- Changing the starting reference point to the top-left corner of the canvas.
- Alter the offset x and y positions of the viewport.
- Change the scale level of the viewport.

> [!NOTE]
> Reference points, offsets, and scale levels are local to the client and are not synchronized across meeting participants.

Example:

```html
<body>
  <button id="pan-left">Pan left</button>
  <button id="pan-up">Pan up</button>
  <button id="pan-right">Pan right</button>
  <button id="pan-down">Pan down</button>
  <button id="zoom-out">Zoom out</button>
  <button id="zoom-in">Zoom in</button>
  <button id="change-reference">Change reference</button>
</body>
```

```javascript
// ...

// Pan left
document.getElementById("pan-left").onclick = () => {
  inkingManager.offset = {
    x: inkingManager.offset.x - 10,
    y: inkingManager.offset.y,
  };
};
// Pan up
document.getElementById("pan-up").onclick = () => {
  inkingManager.offset = {
    x: inkingManager.offset.x,
    y: inkingManager.offset.y - 10,
  };
};
// Pan right
document.getElementById("pan-right").onclick = () => {
  inkingManager.offset = {
    x: inkingManager.offset.x + 10,
    y: inkingManager.offset.y,
  };
};
// Pan down
document.getElementById("pan-down").onclick = () => {
  inkingManager.offset = {
    x: inkingManager.offset.x,
    y: inkingManager.offset.y + 10,
  };
};
// Zoom out
document.getElementById("zoom-out").onclick = () => {
  if (inkingManager.scale > 0.1) {
    inkingManager.scale -= 0.1;
  }
};
// Zoom in
document.getElementById("zoom-in").onclick = () => {
  inkingManager.scale += 0.1;
};
// Change reference
document.getElementById("change-reference").onclick = () => {
  if (inkingManager.referencePoint === "center") {
    inkingManager.referencePoint = "topLeft";
  } else {
    inkingManager.referencePoint = "center";
  }
};
```

## Ideal scenarios

With web pages coming in all shapes and sizes, it isn't possible to make Live Share canvas work for every scenario. The package is ideal for scenarios at which all users are looking at the same content at the same time. While not all of the content needs to be visible on the screen, it must be content that scales across devices linearly.

Here are a couple examples of scenarios where Live Share canvas is a great option for your application:

- Overlay images and videos that render with the same aspect ratio on all clients.
- Viewing a map, 3D model, or whiteboard from the same rotation angle.

The reason both of these scenarios work well is because being viewed is the same on all devices, even though users may be looking at it with different zoom levels and offsets. If your app content doesn't fit one of these scenarios, it likely isn't a good fit for your scenario.

## Code samples

| Sample name          | Description                            | JavaScript                                                                                |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Live Canvas demo     | Simple whiteboard application.         | [View](https://github.com/microsoft/live-share-sdk/tree/main/samples/03.live-canvas-demo) |
| React media template | Draw over a synchronized video player. | [View](https://aka.ms/liveshare-mediatemplate)                                            |

## Next step

> [!div class="nextstepaction"]
> [Agile Poker tutorial](../sbs-teams-live-share.yml)

## See also

- [Live Share SDK FAQ](teams-live-share-faq.md)
- [Live Share SDK reference docs](/javascript/api/@microsoft/live-share/)
- [Live Share Canvas SDK reference docs](/javascript/api/@microsoft/live-share-canvas/)
- [Teams apps in meetings](teams-apps-in-meetings.md)
