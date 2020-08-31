---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into developing on the Microsoft Teams platform by quickly building and running a basic app.

## Create an app project

The Microsoft Teams Toolkit can help you set up your first app project.

1. In Visual Studio Code, click on extension icon on the left Activity Bar and then search for "Microsoft Teams Toolkit". Install the toolkit
:::image type="content" source="../assets/images/build-your-first-app/VSC-install-toolkit.png":::
1. Select **Create a new Teams app**.
1. When prompted, enter a name for your app. This is the default name for your app and also the name of the project directory on your local machine.
:::image type="content" source="../assets/images/build-your-first-app/create-teams-app.png":::
1. On the **Add capabilities** screen, select **Tab** then **Next**.
1. Check the **Personal tab** option and select **Finish** to configure your project.
:::image type="content" source="../assets/images/build-your-first-app/personal-tab.png" alt-text="Example screenshot of using the Teams Toolkit to set up a project with personal tab scaffolding.":::

Once complete, you have the app scaffolding components for building a personal tab.


## Important app project files

After the toolkit completes the scaffold, you should see a page like below.  
The toolkit panel in the middle has many useful tools to allow you edit, publish and validate your app. See more about the toolkit [here](../toolkit/visual-studio-code-overview).  
On the left is the code scaffold. It has the basic hello world app code to get your app running. Let's take some time to understand some of the key files Teams app developers work with.

:::image type="content" source="../assets/images/build-your-first-app/tab-readme.png":::

### App manifest (`manifest.json`)

Located in the `.publish` directory, the app manifest is the starting point for any app project. The manifest defines your app's fundamental attributes and points to required resources. When you install an app, Teams parses the manifest to understand how to render your app in the client.

In the following tutorials, you'll focus on the sections of the app manifest for building personal and channel tabs.

### Package (`Development.zip`)

Also located in the `.publish` directory, you need the app package to [sideload your app](../concepts/deploy-and-publish/overview.md#upload-your-app-directly) in Teams. It's also used when [publishing to your organization's app catalog](../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or [AppSource](../concepts/deploy-and-publish/appsource/publish.md).

Here are some details about the app package files:

|Name|Type|Size|Manifest location|Toolkit filename|
|---|---|:---:|:---:|-----|
|**App manifest**|`.json`| — | — |`.publish/manifest.json`|
|**Color logo**|`.png`|192&times;192 pixels|`icon.color`|`.publish/color.png`|
|**Outline logo**|`.png`|32&times;32 pixels|`icon.outline`|`.publish/outline.png`|

### Scaffolding (`src`)

The toolkit automatically creates scaffolding for you in the `src` directory based on the capabilities you added during setup.

Some files are created no matter what kind of app you have, though. For example, the `App.js` file in the `src/components` directory is important because it handles the initialization and routing of your app. Most importantly, it calls the [Microsoft Teams SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams.

You can learn more about scaffolding in the tutorials for creating personal and channel tabs.

## Run your app   
Now let's get your app running. Follow the below steps to get your app running in Teams client. You can also follow the `README` in the toolkit. The information is pasted here for your convenience. 
1. Run `npm install` in the project directory. This steps can take couple minutes 
1. Run `npm start`. When this finishes, you should see a instance is running on localhost 3000
:::image type="content" source="../assets/images/build-your-first-app/npm-start.png":::
1. Now we have the hello world app running locally, We need to make it globally available so Teams can access it. We will use ngrok to do that. Install [ngrok](https://ngrok.com/download) if you haven't installed it in the previous step.  
1. Open a new terminal and run the command `ngrok http 3000`. This creates two globally available ngrok website that points to our localhost 3000. We will be using the second fowarding url since Teams only accept https
:::image type="content" source="../assets/images/build-your-first-app/ngrok-running.png":::
1. Copy your ngrok url (eg,  https://85528b2b3ba5.ngrok.io). Go to `.publish` > `development.env` and find the line `baseUrl0=http://localhost:3000`. Replace the baseUrl0 with your ngrok url. (eg. `baseUrl0=https://85528b2b3ba5.ngrok.io`) 
1. Save the change and your `development.zip` in `.publish` will be automatically updated with this new information. Now we are ready to upload this package into Teams. Use the [validation tool](../concepts/deploy-and-publish/appsource/prepare/submission-checklist#teams-app-validation-tool) in the toolkit panel to make sure your package is good to go. Yellow warning is okay just make sure there is no red errors. 
:::image type="content" source="../assets/images/build-your-first-app/validate.png":::
1. Go to Teams and log in with the account that allows you to sideload. Click on Upload a custom app. Select `Development.zip` in the `.publish` folder. 
:::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png":::
1. If the package is good to go you should see an install dialog. You need to click on the app if you are using an admin account.
:::image type="content" source="../assets/images/build-your-first-app/add-teams-app.png":::
1. Once you click "add", you should see your persoanl tab running
:::image type="content" source="../assets/images/build-your-first-app/tab-running.png" alt-text="Screenshot showing an example Hello, World! app in Teams.":::


## Next step

🎉 Congratulations! You have a running Teams app. Select the following button to learn how to add a real-world feature to it.

> [!div class="nextstepaction"]
> [Build a personal tab](../build-your-first-app/add-personal-tab.md)
