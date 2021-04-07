---
title: Test your app overview
description: Describes the process to test your Teams custom app in Microsoft 365
ms.topic: how-to
keywords: Configure Microsoft 365 tenant Teams uploading test app 
---

# Test your app

After integrating your app with Microsoft Teams, you must test your app before publishing it. The ultimate goal is to get as many users for your app, therefore, ensure to test the app on multiple devices that users could use. For testing your app, prepare your Microsoft 365 Tenant, choose a workspace to test and debug your app, and add test data to your Office 365 test tenant.

## Prepare your Microsoft 365 Tenant

Before you start testing your app, prepare your Microsoft 365 test tenant and enable custom Teams app to turn on app uploading. You must sign-up for Microsoft 365 developer program and manage the Teams settings for your organization. Set up your developer subscription and configure it through [prepare your Microsoft 365 Tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

## Test and debug

After signing up for the developer account, you must create at least one workspace. In this article, guidance to debug your Teams app is provided. You can choose a test setup, such as local host or cloud-based host to test and debug the app. Links are provided to load and run your app experience. Follow the article to [choose a set up and run your Microsoft Teams app](~/concepts/build-and-test/debug.md).

## Add test data to your Microsoft 365

After choosing a test setup, add the test data to Microsoft 365 test tenant. Links are provided to join and subscribe to the developer program. You learn to create teams and channels using the code snippet. You can open a PowerShell session in Administrator mode and run the script you saved. Optional steps to upload custom apps is also given in this article. [Add test data to your Office 365 test tenant](~/concepts/build-and-test/test-data.md) and check all the prerequisites before you start to upload the custom app.

[Access the DevTools for Teams tabs](~/tabs/how-to/developer-tools.md) and learn about the differences between a browser and a desktop version. To test and debug your bot with IDE, see [debug your bot locally with an IDE](~/bots/how-to/debug/locally-with-an-ide.md).
You can also debug your bot with [inspection middleware](https://docs.microsoft.com/azure/bot-service/bot-service-debug-inspection-middleware?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true) and [adaptive tools](https://docs.microsoft.com/azure/bot-service/bot-service-debug-adaptive-tools?view=azure-bot-service-4.0&preserve-view=true). You can learn [how to develop calling and online meeting bots on your local PC](~/bots/calls-and-meetings/debugging-local-testing-calling-meeting-bots.md).

## See also

> [!div class="nextstepaction"]
> [Test RSC permissions in Teams](~/graph-api/rsc/test-resource-specific-consent.md)

> [!div class="nextstepaction"]
> [Test RSC Postman collection JSON](~/graph-api/rsc/test-rsc-json-file.md)

## Next step

> [!div class="nextstepaction"]
> [Prepare your Microsoft 365 tenant](https://docs.microsoft.com/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant)
