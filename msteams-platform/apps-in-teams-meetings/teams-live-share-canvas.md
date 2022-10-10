---
title: Live Share canvas overview
author: surbhigupta
description: In this module, learn more about Live Share canvas, an extension enabling inking, laser pointers, and cursors for meeting apps.
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

| Classes                                                                     | Description                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [InkingManager](/javascript/api/@microsoft/live-share-canvas/inkingmanager) | Class that attaches a `<canvas>` element to a given `<div>` to automatically manage pen or highlighter strokes, laser pointer, lines and arrows, and erasers. Exposes a set of APIs (to control which tool is active) and basic configuration settings. |
| [LiveCanvas](/javascript/api/@microsoft/live-share-canvas/livecanvas)      | A `SharedObject` class that synchronizes strokes and cursor positions from `InkingManager` for everyone in a Live Share session.                                                                                                                   |

Example:

```html
<body>
  <div id="canvas-host"></div>
</body>
```

# [JavaScript](#tab/javascript)

```javascript
import { LiveShareClient } from "@microsoft/live-share";
import { InkingManager, LiveCanvas } from "@microsoft/live-share-canvas";

// Setup the Fluid container
const liveShare = new LiveShareClient();
const schema = {
  initialObjects: { liveCanvas: LiveCanvas },
};
const { container } = await liveShare.joinContainer(schema);
const { liveCanvas } = container.initialObjects;

// Get the canvas host element
const canvasHostElement = document.getElementById("canvas-host");
const inkingManager = new InkingManager(canvasHostElement);

// Begin synchronization for LiveCanvas
await liveCanvas.initialize(inkingManager);
```

# [TypeScript](#tab/typescript)

```TypeScript
import { LiveShareClient } from "@microsoft/live-share";
import { InkingManager, LiveCanvas } from "@microsoft/live-share-canvas";
import { ContainerSchema } from "fluid-framework";

// Setup the Fluid container
const liveShare = new LiveShareClient();
const schema: ContainerSchema = {
  initialObjects: { liveCanvas: LiveCanvas },
};
const { container } = await liveShare.joinContainer(schema);
const liveCanvas = container.initialObjects.liveCanvas as LiveCanvas;

// Get the canvas host element
const canvasHostElement = document.getElementById("canvas-host");
const inkingManager = new InkingManager(canvasHostElement);

// Begin synchronization for LiveCanvas
await liveCanvas.initialize(inkingManager);
```

---

## Canvas tools & cursors

Now that the Live Share canvas is set up and synchronizing, you can configure the canvas for user interaction, such as buttons to select a pen tool. In this section, we will discuss what tools are available and how to use them.

### Inking tools

Each inking tool in Live Share canvas renders strokes as users draw. If using a touch screen or stylus, the tools also support pressure dynamics, affecting stroke width. Configuration settings include brush color, thickness, shape, and an optional end arrow.

#### Pen tool

:::image type="content" source="../assets/images/teams-live-share/canvas-pen-tool.gif" alt-text="Teams Live Share canvas pen tool":::

The pen tool draws solid strokes that are stored into the canvas. The default tip shape is a circle.

```html
<div>
  <button id="pen">Enable Pen</button>
  <label for="pen-color">Select a color:</label>
  <input type="color" id="color" name="color" value="#000000" />
  <button id="pen-tip-size">Increase pen size</button>
</div>
```

```javascript
import {
  InkingManager,
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
```

#### Highlighter tool

:::image type="content" source="../assets/images/teams-live-share/canvas-highlighter-tool.gif" alt-text="Teams Live Share canvas highlighter tool":::

The highlighter tool draws translucent strokes that are stored into the canvas. The default tip shape is a square.

```html
<div>
  <button id="highlighter">Enable Highlighter</button><br />
  <label for="highlighter-color">Select a color:</label>
  <input type="color" id="highlighter-color" name="highlighter-color" value="#FFFC00" />
  <button id="highlighter-tip-size">Increase tip size</button>
</div>
```

```javascript
import {
  InkingManager,
  InkingTool,
  fromCssColor,
} from "@microsoft/live-share-canvas";
// ...

// Change the selected tool to highlighter
document.getElementById("highlighter").onclick = () => {
  inkingManager.tool = InkingTool.highlighter;
};
// Change the selected color for highlighter
document.getElementById("highlighter-color").onchange = () => {
  const colorPicker = document.getElementById("highlighter-color");
  inkingManager.highlighterBrush.color = fromCssColor(colorPicker.value);
};
// Increase the tip size for highlighter
document.getElementById("highlighter-tip-size").onclick = () => {
  inkingManager.highlighterBrush.tipSize = inkingManager.penBrush.tipSize + 1;
};
```

#### Eraser tool

:::image type="content" source="../assets/images/teams-live-share/canvas-eraser-tool.gif" alt-text="Teams Live Share canvas eraser tool":::

The eraser tool erases entire strokes that cross its path.

```html
<div>
  <button id="eraser">Enable Eraser</button><br />
  <button id="eraser-size">Increase eraser size</button>
</div>
```

```javascript
import {
  InkingManager,
  InkingTool,
} from "@microsoft/live-share-canvas";
// ...

// Change the selected tool to eraser
document.getElementById("eraser").onclick = () => {
  inkingManager.tool = InkingTool.eraser;
};
// Increase the tip size for eraser
document.getElementById("eraser-size").onclick = () => {
  inkingManager.eraserSize = inkingManager.eraserSize + 1;
};
```

#### Point eraser tool

:::image type="content" source="../assets/images/teams-live-share/canvas-point-eraser-tool.gif" alt-text="Teams Live Share canvas point eraser tool":::

The point eraser tool erases individual points within strokes that cross its path by splitting existing strokes in half. This tool is computationally expensive and may result in slower frame rates for your users.

> [!NOTE]
> The point eraser shares the same eraser point size as the regular eraser tool.

```html
<div>
  <button id="point-eraser">Enable Point Eraser</button><br />
</div>
```

```javascript
import {
  InkingManager,
  InkingTool,
} from "@microsoft/live-share-canvas";
// ...

// Change the selected tool to eraser
document.getElementById("point-eraser").onclick = () => {
  inkingManager.tool = InkingTool.pointEraser;
};
```

#### Laser pointer

:::image type="content" source="../assets/images/teams-live-share/canvas-laser-tool.gif" alt-text="Teams Live Share canvas laser pointer tool":::

The laser pointer is unique as the tip of the laser has a trailing effect as you move your mouse. When you draw strokes, the trailing effect renders for a short period before it fades out completely. This tool is perfect to point out information on the screen during a meeting, as the presenter doesn't have to switch between tools to erase strokes.

```html
<div>
  <button id="laser">Enable Laser Pointer</button><br />
  <label for="laser-color">Select a color:</label>
  <input type="color" id="laser-color" name="laser-color" value="#000000" />
  <button id="laser-tip-size">Increase tip size</button>
</div>
```

```javascript
import {
  InkingManager,
  InkingTool,
  fromCssColor,
} from "@microsoft/live-share-canvas";
// ...

// Change the selected tool to laser pointer
document.getElementById("laser").onclick = () => {
  inkingManager.tool = InkingTool.highlighter;
};
// Change the selected color for laser pointer
document.getElementById("laser-color").onchange = () => {
  const colorPicker = document.getElementById("laser-color");
  inkingManager.laserPointerBrush.color = fromCssColor(colorPicker.value);
};
// Increase the tip size for laser pointer
document.getElementById("laser-tip-size").onclick = () => {
  inkingManager.laserPointerBrush.tipSize = inkingManager.laserPointerBrush.tipSize + 1;
};
```

#### Line and arrow tools

:::image type="content" source="../assets/images/teams-live-share/canvas-line-tool.gif" alt-text="Teams Live Share canvas line tool":::

The line tool allows users to draw straight lines from one point to another, with an optional arrow that can be applied to the end.

```html
<div>
  <button id="line">Enable Line</button><br />
  <button id="line-arrow">Enable Arrow</button><br />
  <input type="color" id="line-color" name="line-color" value="#000000" />
  <button id="line-tip-size">Increase tip size</button>
</div>
```

```javascript
import {
  InkingManager,
  InkingTool,
  fromCssColor,
} from "@microsoft/live-share-canvas";
// ...

// Change the selected tool to line
document.getElementById("line").onclick = () => {
  inkingManager.tool = InkingTool.line;
  inkingManager.lineBrush.endArrow = "none";
};
// Change the selected tool to line
document.getElementById("line-arrow").onclick = () => {
  inkingManager.tool = InkingTool.line;
  inkingManager.lineBrush.endArrow = "open";
};
// Change the selected color for lineBrush
document.getElementById("line-color").onchange = () => {
  const colorPicker = document.getElementById("line-color");
  inkingManager.lineBrush.color = fromCssColor(colorPicker.value);
};
// Increase the tip size for lineBrush
document.getElementById("line-tip-size").onclick = () => {
  inkingManager.lineBrush.tipSize = inkingManager.lineBrush.tipSize + 1;
};
```

#### Clear all strokes

You can easily clear all strokes in the canvas by calling `inkingManager.clear()`. This will delete all strokes from the canvas and start over from scratch.

### Cursors

:::image type="content" source="../assets/images/teams-live-share/canvas-cursors.gif" alt-text="Teams Live Share cursor sharing":::

If you would like to enable live cursors in your application so users can track each other's cursor positions on the canvas, you can do so easily. Unlike the inking tools mentioned above, cursors operate entirely through the `LiveCanvas` class. You can also optionally provide a name and picture for each user to denote who is who. Cursors can be enabled together with the inking tools or separately.

```javascript
// Optional. Set user display info
liveCanvas.onGetLocalUserInfo = () => {
  return {
    displayName: "YOUR USER NAME",
    pictureUri: "YOUR USER PICTURE URI",
  };
};
// Toggle Live Canvas cursor enabled state
liveCanvas.isCursorShared = !isCursorShared;
```

## Optimizing across devices

For most applications on the web, content will render differently depending on screen size or varying application state. If `InkingManager` isn't optimized correctly for your app, that could cause strokes and cursors to appear differently for each user. Fortunately, Live Share canvas supports a simple set of APIs that can allow the `<canvas>` to adjust stroke positions to align correctly with your content.

By default, Live Share canvas works a lot like a whiteboard app, with the content being center aligned to the viewport with a 1x zoom level. Only part of the content is being rendered within the visible bounds of the `<canvas>`. Conceptually, it is like recording a video from birdseye view. While the viewport of the camera is recording a portion of the world beneath it, the real world stretches nearly infinitely in every direction.

Here is a simple diagram to help visualize this concept:

:::image type="content" source="../assets/images/teams-live-share/live-share-canvas-capabilities-docs-diagram-1.png" alt-text="Live Share canvas viewport visualization":::

You can customize this behavior in the following ways:

- Changing the starting reference point to the top-left corner of the canvas.
- Alter the pixel offset x and y positions of the viewport.
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

With web pages coming in all shapes and sizes, it isn't possible to make Live Share canvas to support every scenario. The package is ideal for scenarios in which all users are looking at the same content at the same time. While not all of the content needs to be visible on the screen, it must be content that scales across devices linearly.

Here are a couple examples of scenarios where Live Share canvas is a great option for your application:

- Overlay images and videos that render with the same aspect ratio on all clients.
- Viewing a map, 3D model, or whiteboard from the same rotation angle.

The reason both of these scenarios work well is because the content can be viewed the same on all devices, even though users may be looking at it with different zoom levels and offsets. If your app's layout or content change depending on screen size and it is not possible to generate a common view for all participants, Live Share canvas might not be a good fit for your scenario.

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
