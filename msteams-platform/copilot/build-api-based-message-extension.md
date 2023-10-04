---
title: Create API based Message extension
author: v-ypalikila
description: Learn how to build an API message extension and API plugin using Teams developer portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Build copilot plugin

API based plugins are message extensions that use a web service to handle user requests and responses. They do not require a bot registration or a bot framework SDK. They can be configured and deployed using the Developer Portal for Teams or the Teams Toolkit.

You can create an Copilot plugin in Teams using an OpenAPI Specification document. After you've created an OpenAPI Specification document for the APIs you want to use, upload the OpenAPI Specification document to Teams Toolkit or Developer portal for Teams to generate and integrate the client code in your app's project. Create an Adaptive Card template to handle the responses from the API.

# [Developer portal for Teams](#tab/developer-portal-for-teams)

## Create an API based ME

To create an API base message extension using Developer portal, follow these steps:

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the plugin of copilot option in Teams developer portal.":::

1. Under **Message extension type**, select **API based**.

1. Under **Open API spec**, select **Upload API spec**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-upload.png" alt-text="Screenshot shows the Upload now option in Teams developer portal.":::

1. Select the Open API specification file in JSON or YAML and select **Open**.

1. Select **Save**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-convert-api-commands.png" alt-text="Screenshot shows the list of APIs from the Open API spec document converted as commands.":::

**Add commands**

To extend copilot plugin as a message extension, add commands:

1. Under the Open API spec file, select **Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-edit-get-commands.png" alt-text="Screenshit shows the option to edit get commands in Teams developer portal.":::

   A list of all the available APIs from the Open API specification are displayed.

1. Select an API from the list and select **Next**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-commands-view-details.png" alt-text="Screenshot shows the view details option for the Get command.":::

   A command details page appears.

1. In the Command details page, update the following:
   * Command type
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-command-details.png" alt-text="Screenshot shows the fields available in the command details page.":::

1. Select **Save**. The command is added successfully.

:::image type="content" source="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png" alt-text="Screenshot shows the plugin for copilot app created in the app features page in Teams developer portal.":::

An API based ME is created.

## Create plugin for copilot

Before you an API plugin, ensure that you have an openAPI specification document.

If you have a chatGPT plugin manifest. You can build an API plugin using Teams developer portal.

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Plugin for copilot**.
1. To upload an open API spec for copilot plugin, select **Upload now**.
1. Select the Open API specification file in JSON or YAML and select **Open**.
1. Select **Save**.
1. In **LLM Description**, add the description for the plugin and select **Save**.

### Extend copilot plugin as API based ME

To extend an existing plugin for copilot to work as a API based message extension, follow these steps:

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select an existing plugin for copilot.
1. Under **extend you copilot plugin**, select **Get started**.
1. Under **Message extension type**, select **API based**.

1. Under the Open API spec file, select **Add**.

1. Select an API from the list and select **Next**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-commands-view-details.png" alt-text="Screenshot shows the view details option for the Get command.":::

   A command details page appears.

1. In the Command details page, update the following:
   * Command type
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-command-details.png" alt-text="Screenshot shows the fields available in the command details page.":::

1. Select **Save**. The command is added successfully.

The plugin for copilot can be used as an API based message extension.

If you want to add more commands, under the API spec file, select **+ Add** and follow the steps to add command details.

If you want to delete a command, select a command from the available commands and select **Delete**. A pop-up appears to confirm to delete the command, select **Delete**. The command is deleted.

# [Teams Toolkit](#tab/Teams-toolkit)

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot.png" alt-text="Screenshot shows the Plugin for copilot option in the Team Toolkit.":::

1. Select **API Based Search Message Extension**.

1. Select any of the following options:
    1. **Start with a new API**.
    1. **Start with an OpenAPI Description Document**.

     :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-options.png" alt-text="Screenshot shows the plugin options to create a plugin for copilot.":::

1. Follow these steps for the respective API types:

   # [New API](#tab/new-api)

   1. Select a programming language.

       :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-programming language.png" alt-text="Screenshot shows the programming language options.":::

   1. Select **Default folder**.

   1. Enter the name of your app and select **Enter**. Teams Toolkit creates a new plugin with API from Azure functions.

   # [OpenAPI specification](#tab/openapi-specification)

   1. Enter or browse the OpenAPI specification doc location.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-openapi-spec-location.png" alt-text="Screenshot shows the option to select OpenAPI spec location.":::

   1. From the API list, select the GET API and select **OK**.
   1. Select **Default folder**.
   1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI spec file and created a API based message extension.
   ---

# [Teams CLI](#tab/teams-cli)   

1. npm install -g @microsoft/teamsfx-cli@2.0.3-beta.2023092709.0 

1. Set “TEAMSFX_CLI_NEW_UX” to “true”.
 
1. Type `teamsfx new` in the terminal 

1. Select Message extension and then API Based search Message extension 

1. Select “Start from an OpenAPI specification” 

1. Generate the project 

1. Mitigate other warnings following the mitigation steps described in the output window. 

1. Provision resources: teamsfx provision --env dev 

1. Preview the app: teamsfx preview --env dev 

1. Test your MEs in Teams 


---

You can also build bot based message extensions.

## See also
