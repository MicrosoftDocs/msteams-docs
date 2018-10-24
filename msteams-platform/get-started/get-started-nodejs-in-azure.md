---
title: Host your Node based Teams app in Azure
description: Host your Teams app in Azure using Node.JS
keywords: getting started azure teams apps .net Node
ms.date: 10/24/2018
---
# Host your .NET Teams app in Azure

## You will need:

* **A Microsoft Azure account**. For testing you can use a free trial account and migrate to a production ready account when the app is ready for public use. If you have never used Azure before, you can get started by [creating a new free account](https://azure.microsoft.com/en-us/free/). If you already have an Azure account you can use pay-as-you-go to host this app for free.
* **Visual Studio Code**. This free code editor can be downloaded at:[Visual Studio Code](https://code.visualstudio.com/download). Once VS Code is installed, add support for Azure deployment by clicking [App service extension](vscode:extension/ms-azuretools.vscode-azureappservice).
* **A downloaded sample app to deploy**. Follow these steps to download and test the *Getting Started with Node.JS* sample app: (~/get-started/get-started-nodejs-app-studio#DownloadAndHost). Return to this topic when it is time to host the app.

## Open the app in VS.Code

Open your preferred shell, and navigate to the root of the sample app *msteams-samples-hello-world-nodejs*, then enter:

```bash
code .
```

VS Code will start, pointing to the root directory for the sample.

<img width="450px" title="Visual Studio" src="~/assets/images/get-started/visual-studio-code.png" />

## Configure Azure

In VS Code, click on the Azure icon in the left hand tool bar.

<img title="Azure icon" src="~/assets/images/get-started/visual-studio-code-azure-icon" />

This will display the Azure sign in and management pane.

<img title="Azure icon" src="~/assets/images/get-started/visual-studio-code-azure-sign-in"/>

Click on *Sign in to Azure...*. A dialog will open in the lower right corner of VS Code. Read the instructions and Click *Copy & Open*.
A web page will be displayed where you can enter a confirmation code.

<img title="Azure icon" src="~/assets/images/get-started/visual-studio-code-azure-login-web"/>

Right click where it says *Code*, and select paste from the right click menu.  This will enter a code provided by the previous dialog.

You can now return to VS Code, where the Azure pane will now look something like this:

<img title="Azure icon" src="~/assets/images/get-started/visual-studio-azure-account"/>

What you actually see will depend on the type of account you have with Azure.

## Deploy the app to Azure

Look for the up-arrow button at the top of the Azure pane in VS Code. This is the *Deploy to Web App...* button. click on it to start. 

You will first be asked if you want to create a new web app. Choose this option.

You will then be asked to enter a globally unique name for the new Web App. Do so and press enter.

<img title="Azure icon" src="~/assets/images/get-started/visual-studio-azure-name-web-app"/>

You will then be asked to select a Node.js runtime for your app. Choose the version marked LTS - Recommended for new apps.

You will see several messages as your app is deployed. 

You may be asked if you would like to update your workspace configuration to run npm install on the target server. Choose yes.

You may then be asked if you want to always deploy the workspace. You can answer yes to this also.

Finally you will see this message, assuming everything went well.

<img title="Azure icon" src="~/assets/images/get-started/visual-studio-azure-new-web-app-finished"/>

## Testing your app on Azure
