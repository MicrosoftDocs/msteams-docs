---
title: Create a bot for Teams
author: heath-hamilton
description: Learn how to build a bot in your first Microsoft Teams app.
ms.author: heath-hamilton
ms.date: 08/31/2020
ms.topic: tutorial
---
# Create a bot for Teams

In this tutorial, you'll build a basic *bot*.

## Get prerequisites

If you haven't yet, set up your development [account](../build-your-first-app/building-real-world-app.md#set-up-your-development-account) and [tools](../build-your-first-app/building-real-world-app.md#install-your-development-tools).

## Create your app project

Use the Microsoft Teams Toolkit in Visual Studio Code to set up your first app project.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When you create your app project, choose the **Bot** option and select **Next**.
1. Select **Create a new bot** and **Login** to sign in with your Microsoft development account.
1. Enter a name for your bot and select **Create**.
1. If successful, select **Finish** and copy your **Bot Id** and **Password**.
 
## Your assignment

Your workplace has been using Teams tabs to surface important contact information. Colleagues have quick access to the help desk phone number, but instead of calling, what if people could contact the help desk using a chatbot? Your boss has asked you to look at how quickly you can get a conversational bot up and running in Teams.

## What you'll learn

> [!div class="checklist"]
>
> * Identify the app manifest and scaffolding components relevant to bots
> * Configure bots through the Microsoft Bot Framework

## Identify relevant app manifest and scaffolding components

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

### App manifest

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

### App scaffolding

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

## Set up a secure tunnel to your app

You will 

1. In a terminal, run `ngrok http -host-header=rewrite 3978`.
1. Copy the HTTPS URL you're provided.
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ba5.ngrok.io`.)

## Configure your bot

Bot Framework stuff

## Run your app

npm stuff

## See the finished product

Upload and view your app in Teams.

> [!div class="nextstepaction"]
> [Keep going: Understand Teams app capabilities](../concepts/capabilities-overview.md)
