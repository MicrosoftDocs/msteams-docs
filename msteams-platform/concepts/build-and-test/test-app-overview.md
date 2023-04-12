---
title: Test your app overview
description: In this module, learn the process to test and debug your Teams custom app in Microsoft 365 and add test data to your Microsoft 365 tenant
ms.topic: how-to
ms.localizationpriority: medium
---

# Test your app

After integrating your app with Microsoft Teams, you must test your app before publishing it. The ultimate goal is to get as many users for your app, therefore, ensure to test the app on multiple devices that users could use. For testing your app:

* Prepare your Microsoft 365 tenant.
* Choose a workspace to test and debug your app.
* Add test data to your Microsoft 365 tenant.

## Prepare your Microsoft 365 tenant

Before you start testing your app, prepare your Microsoft 365 test tenant and enable custom Teams app to allow you to upload your app. You must sign-up for Microsoft 365 developer program and manage the Teams settings for your organization. Set up your developer subscription and configure it through [prepare your Microsoft 365 Tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

## Test and debug

To test and debug your app, you must create at least one workspace. You can select a test setup, such as local host or cloud-based host to test and debug the app. Guidance to debug your Teams app is provided to load and run your app experience. For more information, see [choose a set up and run your Microsoft Teams app](~/concepts/build-and-test/debug.md).

Test your bot locally. For more information, see [debug your bot locally with an IDE](~/bots/how-to/debug/locally-with-an-ide.md). You can also debug your bot with [inspection middleware](/azure/bot-service/bot-service-debug-inspection-middleware?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true) and [adaptive tools](/azure/bot-service/bot-service-debug-adaptive-tools?view=azure-bot-service-4.0&preserve-view=true).

To view the console logs, view or modify html, css, and network requests during runtime, add breakpoints to your JavaScript code, and perform interactive debugging access the DevTools. For more information, see [access the DevTools for Teams tabs](~/tabs/how-to/developer-tools.md).

> [!NOTE]
> Debugging is supported on desktop, web, and Android devices but not on iOS devices.

## Add test data to your Microsoft 365 tenant

Add the test data to Microsoft 365 test tenant. For more information, see [add test data to your Microsoft 365 test tenant](~/concepts/build-and-test/test-data.md), and complete all the prerequisites before you start uploading your test data.

## Next step

> [!div class="nextstepaction"]
> [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md)

## See also

* [Debug your tab](~/tabs/how-to/developer-tools.md)
* [Debug your bots](~/bots/how-to/debug/locally-with-an-ide.md)
* [Test RSC permissions](~/graph-api/rsc/test-resource-specific-consent.md)
