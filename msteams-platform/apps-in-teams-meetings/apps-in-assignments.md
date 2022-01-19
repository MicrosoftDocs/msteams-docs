---
title: Assignment Apps Integration Requirements
author: cristobal-buenrostro
description: Identify prerequisites with apps for Teams meetings 
ms.topic: conceptual
ms.author: cristobal-buenrostro
ms.localizationpriority: medium
keywords: teams apps assignments 
---

# Assignment Apps Integration Requirements

We are excited that you will be integrating your app with the new Assignment Flow in Microsoft Teams! This makes it easier for educators to share your learning content with students.

The Assignment Integration is built on the **Channel Tabs Apps** in Teams. If you have already built this, you are almost there for supporting assignments. Since we are using a new functionality in Teams called Stage view, there are additional requirements for a JavaScript and Manifest version before enabling this in Assignments. Learn more below.

![](~/assets/images/apps-in-assignments/microsoft-teams.PNG)

## Requirements
Latest SDK JavaScript Version 
* The application needs to use SDK 1.9 or newer.  
* For SDK reference information see [here](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest).

Channel Tab App 
* Only Channel and Groups Tab Apps are supported for Assignments. 
* Find out more [here](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/what-are-tabs?view=msteams-client-js-latest) on how to create Channel and Group Tab Apps. 

Mobile Support 
* The Assignment Apps will appear on Teams mobile clients. 
* The setSettings() configuration must have a value for the websiteUrl property. 
* To ensure optimal user experience, you must follow the [guidance for tabs on mobile](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/design/tabs-mobile) when creating your tabs. 
* Apps [distributed through the Teams store](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/publish) have a separate approval process for mobile clients. 

Manifest Support 
* The [Manifest Support](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema?view=msteams-client-js-latest) for the application will need to be 1.6 or newer. 
* The developer updates the Manifest by resubmitting the app to the store with the updated manifest file. 

## App Category in Manifest 
* The app categories that the App is published under, must include "Learning and Training" (Previously known as "Training and Tutorials").

![](~/assets/images/apps-in-assignments/category.PNG)

## Stage View
When the application is launched from Assignments, it is launched in a new feature called Stage View. Stage View is a new UI component, which allows you to render the content that is opened in full screen in Teams. You can test your application in Stage view following the steps here [Tabs link unfurling and Stage View - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/tabs-link-unfurling)

> **Tip**: You can use the Excel Workbook here [https://aka.ms/StageViewURL](https://aka.ms/StageViewURL) to generate a URL to quickly test your app in Stage View using your appid, contentURL and WebURL. 

## Best Experience 
To maximize the best user experience, this is what you need to do: 

**Support SSO**

Support [an authentication flow](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-flow-tab?view=msteams-client-js-latest) for the application to allow for quick configuration for the educators creating the Assignment App and easy use for the Student using the Application inside Assignments. 

> **Note**: You need to support JavaScript 1.9 or newer in order to use SSO with Assignments.

Support content selection in App Setup 
* When a teacher shares content with students to use, the educator selects a single quiz or piece of content to share. So instead of sharing a dashboard of quizzes, move to a model where a single quiz or content is selected. 
* To enable this, the educator should be able to select from his quiz/content as part of the installation process. 
* The configuration is done on the configuration page here [Create a configuration page - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/create-tab-pages/configuration-page), where at the end you will get a content url that is shared with the student. 

**Loading Indicator**
* If the main content of the page takes some time to load, consider using the Teams Loading Indicator to provide the user feedback. [Show a native loading indicator - Create a content page - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/create-tab-pages/content-page#show-a-native-loading-indicator) 

![](~/assets/images/apps-in-assignments/advanced.PNG)

**Immersive Reader**
* Inclusively designed to help people of all abilities with reading. 
* Dyslexia, ADHD, emerging readers, non-native speakers, visual impairments 
* Already used in Word, OneNote, Teams, Outlook, Forms, Flipgrid and Office Lens.  Today, Immersive Reader is empowering more than 35 million people 
* [https://aka.ms/ImmersiveReaderforPartners](https://aka.ms/ImmersiveReaderforPartners).

**Developer Tips**
* Developer Environment: Using your Microsoft Partner Network (MPN) ID ([sign up here](https://partner.microsoft.com/en-US/) if you don’t have one), use the tool [here](https://cdx.transform.microsoft.com/) to create a EDU Developer Environment: 
> "My Environments" tab

![](~/assets/images/apps-in-assignments/myenvironments.PNG)

> Create Tenant button 

![](~/assets/images/apps-in-assignments/create-tenant.PNG)

> Microsoft Education Demo Content

![](~/assets/images/apps-in-assignments/demo-content.PNG)

* Demo Tenant Creation [guide here](https://docs.microsoft.com/en-US/partner-center/mpn-demos).  

Other helpful resources:  
* Figma Microsoft Team UI Kit: [Figma link for UI information](https://www.figma.com/community/file/916836509871353159).
* App submission tips and frequently failed cases – Teams: [Describes tips for a successful Teams store submission and common reasons submissions fail.](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases). 


## How to test
[Your developer tenant (is in Ring 3.6 now)](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/dev-preview/developer-preview-intro#enable-developer-preview) is now enabled with the ability to add Apps to Assignments, you can attach the app by

Teacher

![](~/assets/images/apps-in-assignments/assignmentsappsample.gif)

Student

![](~/assets/images/apps-in-assignments/assignmentsappstudent.gif)

## Known issues
The below issues are shared for your awareness:

•	**Closing Stage View** - We open the Assignment in Teams Stage View. The current version will open the Stage View in a Teams Window, and when closed the student will have to select the Assignments again. We are rolling out a new Stage View functionality that will take the student back to the Assignment View to turn in the assignments.

•	**Device Approval** - If your app needs to use a Microphone or Camera, and you are testing this in the Web Version of Teams, you are currently not able to approve the access to those tools. We are rolling out a device approval for Stage View.

•	**Personal / Teams App** - We recommend you test out your application by first selecting a Team and then select the Assignments Apps from the General Channel. We are rolling out a fix for this to start directly from the Assignment app.
