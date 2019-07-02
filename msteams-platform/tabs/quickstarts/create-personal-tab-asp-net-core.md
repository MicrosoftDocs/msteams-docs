---
title: "Quickstart: Create a custom personal tab with C# and ASP.NET Core in Visual Studio" 
author: laujan 
description: A quickstart guide to creating a personal tab with ASP.NET Core in Visual Studio
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a custom personal tab with C# and ASP.NET Core in Visual Studio 2019

Custom tabs enable you to embed your hosted web content directly into Microsoft Teams and add Teams-specific functionality via your [Teams App Package](foo.md). See [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md). There are two types of tabs available in Teams - channel/group and personal. A channel/group tab delivers content to channels and group chats. Personal tabs, along with direct conversation bots, are part of personal apps and are scoped to a single user. Personal tabs can be pinned to the left navigation bar and promote increased productivity by making your service available directly inside the Teams client. Your app can have up to sixteen (16) personal tabs.

In this quickstart we'll walk-through creating a Teams personal tab with C# and[ASP.Net Core](AspNetCore.Docs/aspnetcore/index.md). We will also test your tab's Teams integration by uploading it into a Teams channel using the App Studio for Microsoft Teams[App Studio for Microsoft Teams](/msteams-platform/get-started/get-started-app-studio.md) Manifest Editor.

## Prerequisites

- To complete this quickstart you will need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365.md). If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription will remain active as long as you're using it for ongoing development. See [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program.md).

- You will also need a [GitHub](https://github.com) account, so that you can get a copy of the source code for for this project.

In addition, this project requires that you have the following installed in your development environment:

- The Visual Studio 2019 IDE with the ".NET CORE cross-platform development" workload installed. If you don't already have Visual Studio,  you can download and install the latest [Microsoft Visual Studio Community](https://visualstudio.microsoft.com/downloads) for free. [Visual Studio downloads]. When you install Visual Studio, make sure to select the .NET Core cross-platform development workload selected.

![screenshot: visual studio install options](/msteams-docs/platform/assets/workloads.png)

## Get the source code for your project

Open a command prompt and create a new directory for your tab project. You can find the GitHub repository for this quickstart at [GitHubRepository](https:///github.com/MicrosoftDocs/foo.md). Navigate to your new directory and type the following command to [clone](https://help.github.com/en/articles/cloning-a-repository) the sample repository to your local machine:

```bash
git clone https:///github.com/MicrosoftDocs/foo.md

```
Once the repo is cloned, use Visual Studio to open the solution file foo.md: `Microsoft.Teams.Samples.CreateChannelGroupTabNetCore` and click `Build Solution`
from the `Build` menu.You can run the sample by pressing `F5` or choosing `Start Debugging` from the `Debug` menu. You can navigate to the following URLs to verify that all the app URLS are loading:

* http://localhost:44311
* http://localhost:44311/channelgroup
* http://localhost:44311/privacy
* http://localhost:44311/tou


## Build your tab

You are going to navigate to several files and update the code

&#9989; update the startup file.

1. add code to static files - navigate to wwwroot:
    - Css
    - images (already added)
    - bootstrap library (already added)
1. navigate to shared folder and open _layout
    - add code to the _Layout page
1. add code to the following razor pages:
    - Index.cshtml
    - Personal.cshtml
    - Privacy.cshtml
    - TOU.cshtml
1. Create project Zip from manifest folder
    - navigate to .csproj and add code
1. explain the add SDK reference with explanation
1. ngrok - get authtoken from ngrok
1. launch your project
1. use ngrok http in bash to create a tunnel
1. make note of the https grok address (copy it to notepad)
1. open app studio - complete the questions
1.  

## Get the code

Fork this GitHub repo to your local machine:

```url
https://github.com/MicrosoftDocs/msteams-personal-tab-dotnet-core

```

## Upload and run your app in Microsoft Teams

