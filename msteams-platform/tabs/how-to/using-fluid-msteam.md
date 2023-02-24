---
title: Use Fluid with Teams
author: timtwang
ms.author: mobajemu
description: Tutorial for integrating Fluid-powered real-time collaboration features into a Microsoft Teams tab application
ms.localizationpriority: medium
ms.topic: conceptual
---

# Use Fluid with Teams

By the end of this tutorial, you can integrate any Fluid-powered application into Teams and collaborate with others in real-time.

In this section you can learn the following concepts:

1. Integrate a Fluid client into Teams tab application.
1. Run and connect your Teams application to a Fluid service (Azure Fluid Relay).
1. Create and get Fluid Containers, and pass them to a React component.

For more information to build complex application, see [Teams Fluid Hello World](https://github.com/microsoft/FluidExamples/tree/main/teams-fluid-hello-world) example in our FluidExamples repo.

## Prerequisites

This tutorial requires familiarity with the following concepts and resources:

- [Fluid Framework Overview](https://fluidframework.com/docs/)
- [Fluid Framework QuickStart](https://fluidframework.com/docs/start/quick-start/)
- The basics of [React](https://reactjs.org/) and [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- How to build a [Microsoft Teams Tab](/microsoftteams/platform/tabs/what-are-tabs)

> [!div class="nextstepaction"]
> [Install prerequisites](tab-requirements.md)

## Create the project

1. Open a Command Prompt and navigate to the parent folder where you want to create the project, for example, `/My Microsoft Teams Projects`.
1. Create a Teams tab application by running the following command and [creating a channel tab](create-channel-group-tab.md#create-a-custom-channel-or-group-tab-with-nodejs):

    ```cmd
    yo teams
    ```

1. After creating, navigate to the project, with the following command `cd <your project name>`.
1. The project uses the following libraries:

    |Library |Description |
    |---|---|
    | `fluid-framework`    |Contains the IFluidContainer and other [distributed data structures](https://fluidframework.com/docs/build/dds/) that synchronize data across clients.|
    | `@fluidframework/azure-client`   |Defines the starting schema for the [Fluid container](https://fluidframework.com/docs/build/containers/).|
    | `@fluidframework/test-client-utils` |Defines the `InsecureTokenProvider` needed to create the connection to a Fluid service.|

    Run the following command to install the libraries:

    ```cmd
    npm install @fluidframework/azure-client fluid-framework @fluidframework/test-client-utils
    ```

## Code the project

1. Open the file `/src/client/<your tab name>` in your code editor.
1. Create a new file as `Util.ts` and add the following import statements:

    ```ts
    //`Util.ts

    import { IFluidContainer } from "fluid-framework";
    import { AzureClient, AzureClientProps } from "@fluidframework/azure-client";
    import { InsecureTokenProvider } from "@fluidframework/test-client-utils";
    ```

### Defining Fluid functions and parameters

This app is intended to be used in the context of Microsoft Teams, with all Fluid-related imports, initialization, and functions together. This provides an enhanced experience and makes it easier to use in the future. You can add the following code to the import statements:

```ts
// TODO 1: Define the parameter key(s).
// TODO 2: Define container schema.
// TODO 3: Define connectionConfig (AzureClientProps).
// TODO 4: Create Azure client.
// TODO 5: Define create container function.
// TODO 6: Define get container function.
```

> [!NOTE]
> The comments define all the functions and constants needed to interact with the Fluid service and container.

1. Replace `TODO 1:` with the following code:

    ```ts
    export const containerIdQueryParamKey = "containerId";
    ```

    The constant is being exported as it appends to the `contentUrl` in the Microsoft Teams settings, and later for parsing the container ID in the content page. It's a common pattern to store important query parameter keys as constants, rather than typing the raw string each time.

    Before the client can create any containers, it needs a `containerSchema` that defines the shared objects used in this application. This example uses a SharedMap as the `initialObjects`, but any shared object can be used.

    > [!NOTE]
    > The `map` is the ID of the `SharedMap` object and it must be unique within the container as any other DDSes.

1. Replace `TODO: 2` with the following code:

    ```ts
    const containerSchema = {
        initialObjects: { map: SharedMap }
    };
    ```

1. Replace `TODO: 3` with the following code:

    ```ts
    const connectionConfig : AzureClientProps =
    {
        connection: {
            type: "local",
            tokenProvider: new InsecureTokenProvider("foobar", { id: "user" }),
            endpoint: "http://localhost:7070"
        }
    };
    ```

    Before the client can be used, it needs an `AzureClientProps` that defines the type of connection the client uses. The `connectionConfig` property is required to connect to the service. Local mode of Azure Client is used. To enable collaboration across all clients, replace it with Fluid Relay Service credentials. For more information, see how to [set up the Azure Fluid Relay service](/azure/azure-fluid-relay/how-tos/provision-fluid-azure-portal).

1. Replace `TODO: 4` with the following code:

    ```ts
    const client = new AzureClient(connectionConfig);
    ```

1. Replace `TODO: 5` with the following code:

    ```ts
    export async function createContainer() : Promise<string> {
        const { container } = await client.createContainer(containerSchema);
        const containerId = await container.attach();
        return containerId;
    };
    ```

    As you create the container in the configuration page and append it to the `contentUrl` in Teams setting, you must return the container ID after attaching the container.

1. Replace `TODO: 6` with the following code:

    ```ts
    export async function getContainer(id : string) : Promise<IFluidContainer> {
        const { container } = await client.getContainer(id, containerSchema);
        return container;
    };
    ```

    When you fetch the Fluid container, you need to return the container as your application must interact with the container and the DDSes inside it, in the content page.

### Create Fluid container in the configuration page

1. Open the file `src/client/<your tab name>/<your tab name>Config.tsx` in your code editor.

    The standard Teams tab application flow goes from the configuration to the content page. To enable collaboration, persisting the container while loading into the content page is crucial. The best solution to persist the container is to append the container ID onto the `contentUrl` and `websiteUrl`, the URLs of the content page, as a query parameter. Save button in the Teams configuration page is the gateway between the configuration page and the content page. It's a place to create the container and append the container ID in the settings.

1. Add the following import statement:

    ```ts
    import { createContainer, containerIdQueryParamKey } from "./Util";
    ```

1. Replace the `onSaveHandler` method with the following code. The only lines added here are calling the create container method defined earlier in `Utils.ts` and then appending the returned container ID to the `contentUrl` and `websiteUrl` as a query parameter.

    ```ts {linenos=inline,hl_lines=[134,136,137]}
    const onSaveHandler = async (saveEvent: microsoftTeams.settings.SaveEvent) => {
        const host = "https://" + window.location.host;
        const containerId = await createContainer();
        microsoftTeams.settings.setSettings({
            contentUrl: host + "/<your tab name>/?" + containerIdQueryParamKey + "=" + containerId + "&name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
            websiteUrl: host + "/<your tab name>/?" + containerIdQueryParamKey + "=" + containerId + "&name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
            suggestedDisplayName: "<your tab name>",
            removeUrl: host + "/<your tab name>/remove.html?theme={theme}",
            entityId: entityId.current
        });
        saveEvent.notifySuccess();
    };
    ```

    Ensure you replace `<your tab name>` with the tab name from your project.

    > [!WARNING]
    > As the content page URL is used to store the container ID, this record gets removed if the Teams tab is deleted.
    > Additionally, every content page can only support one container ID.

### Refactor content page to reflect Fluid application

1. Open the file `src/client/<your tab name>/<your tab name>.tsx` in your code editor. A typical Fluid-powered application consists of a view and a Fluid data structure. Focus on getting/loading the Fluid container and leave all the Fluid related interactions in a React component.

1. Add the following import statements in the content page:

    ```ts
    import { IFluidContainer } from "fluid-framework";
    import { getContainer, containerIdQueryParamKey } from "./Util";
    ```

1. Remove all the code below the import statements in the content page and replace it with the following:

    ```ts
    export const <your tab name> = () => {
      // TODO 1: Initialize Microsoft Teams.
      // TODO 2: Initialize inTeams boolean.
      // TODO 3: Define container as a React state.
      // TODO 4: Define a method that gets the Fluid container
      // TODO 5: Get Fluid container on content page startup.
      // TODO 6: Pass the container to the React component as argument.
    }
    ```

    Ensure you replace `<your tab name>` with the tab name that you define for your project.

1. Replace `TODO 1` with the following code:

    ```ts
    microsoftTeams.initialize();
    ```

    To display the content page in Teams, you must include the [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client) and include a call to initialize it after your page loads.

1. Replace `TODO 2` with the following code:

    ```ts
    const [{ inTeams }] = useTeams();
    ```

    As the Teams application is just an IFrame injection of a webpage, you need to initialize the `inTeams` Boolean constant in order to know if the application is inside Teams or not, and if the Teams resources, such as the `contentUrl`, are available.

1. Replace `TODO 3` with the following code:

    ```ts
    const [fluidContainer, setFluidContainer] = useState<IFluidContainer | undefined>(undefined);
    ```

    Use a React state for the container as it provides the ability to dynamically update the container and the data objects in it.

1. Replace `TODO 4` with the following code:

    ```ts
    const getFluidContainer = async (url : URLSearchParams) => {
        const containerId = url.get(containerIdQueryParamKey);
        if (!containerId) {
            throw Error("containerId not found in the URL");
        }
        const container = await getContainer(containerId);
        setFluidContainer(container);
    };
    ```

    Analyze the URL to get the query parameter string, defined by `containerIdQueryParamKey`, and retrieve the container ID. With the container ID, you can load the container. Once you have the container, set the `fluidContainer` React state, see previous step.

1. Replace `TODO 5` with the following code:

    ```ts
    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.settings.getSettings(async (instanceSettings) => {
                const url = new URL(instanceSettings.contentUrl);
                getFluidContainer(url.searchParams);
            });
            microsoftTeams.appInitialization.notifySuccess();
        }
    }, [inTeams]);
    ```

    After you've defined how to get the Fluid container, you need to tell React to call `getFluidContainer` on load, and then store the result in state based on if the application is inside Teams.
    React's [useState hook](https://reactjs.org/docs/hooks-state.html) provides the required storage, and [useEffect](https://reactjs.org/docs/hooks-effect.html) allows you to call `getFluidContainer` on render, passing the returned value into `setFluidContainer`.

    By adding `inTeams` in the dependency array at the end of the `useEffect`, the app ensures that this function only gets called on content page load.

1. Replace `TODO 6` with the following code:

    ```ts
    if (inTeams === false) {
      return (
          <div>This application only works in the context of Microsoft Teams</div>
      );
    }

    if (fluidContainer !== undefined) {
      return (
          <FluidComponent fluidContainer={fluidContainer} />
      );
    }

    return (
      <div>Loading FluidComponent...</div>
    );
    ```

    > [!NOTE]
    > It's important to ensure that the content page is loaded inside Teams and that the Fluid container is defined before passing it into the      React component (defined as `FluidComponent`, see below).

### Create React component for Fluid view and data

You've integrated the basic creation flow of Teams and Fluid. You can now create your own React component that handles the interactions between the application view and Fluid data. From now, the logic and flow behaves just like other Fluid-powered application. With the basic structure set up, you can create any of the [Fluid examples](https://github.com/microsoft/FluidExamples) as a Teams application by changing the `ContainerSchema` and the application view's interaction with the DDSes/data objects in the content page.

## Start the Fluid server and run the application

If you're running your Teams application locally with Azure Client local mode, ensure you run the following command in the Command Prompt to start the Fluid service:

```cmd
npx @fluidframework/azure-local-service@latest
```

To run and start the Teams application, open another terminal, and follow the [instructions to run the application server](create-channel-group-tab.md#upload-your-application-to-teams).

> [!WARNING]
> HostNames with `ngrok`'s free tunnels are not preserved. Each run will generate a different URL. When a new `ngrok` tunnel is created, the older container will no longer be accessible. For production scenarios, see [use AzureClient with Azure Fluid Relay](#use-azureclient-with-azure-fluid-relay).

> [!NOTE]
> Install an additional dependency to make this demo compatible with Webpack 5. If you receive a compilation error related to a "buffer" package, run `npm install -D buffer` and try again. This will be resolved in a future release of Fluid Framework.

## Next steps

### Use AzureClient with Azure Fluid Relay

As this is a Teams tab application, collaboration and interaction are the main focus. Replace the local mode `AzureClientProps` provided earlier with non-local credentials from your Azure service instance, so that others can join in and interact with you in the application. See [how to provision your Azure Fluid Relay service](/azure/azure-fluid-relay/how-tos/provision-fluid-azure-portal).

> [!IMPORTANT]
> It's important to hide the credentials that you are passing into `AzureClientProps` from being accidentally committed to source control. The Teams project comes with a `.env` file where you can store your credentials as environment variables and the file itself is already included in the `.gitignore`. To use the environment variables in Teams, see [Set and get environment variable](#set-and-get-environment-variable).

> [!WARNING]
> `InsecureTokenProvider` is a convenient way to test the application locally. It's your responsibility to handle any user authentication and use a [secure token](/azure/azure-fluid-relay/how-tos/connect-fluid-azure-service) for any production environment.

### Set and get environment variable

To set an environment variable and retrieve it in Teams, you can take advantage of the built-in `.env` file. The following code is used to set the environment variable in `.env`:

```
# .env

TENANT_KEY=foobar
```

To pass the contents of the `.env` file to our client-side app, you need to configure them into `webpack.config.js` so that `webpack` provides access to them at runtime. Use the following code to add the environment variable from `.env`:

```js
// webpack,config.js

webpack.EnvironmentPlugin({
    PUBLIC_HOSTNAME: undefined,
    TAB_APP_ID: null,
    TAB_APP_URI: null,
    REACT_APP_TENANT_KEY: JSON.stringify(process.env.TENANT_KEY) // Add environment variable here
}),
```

You can access the environment variable in `Util.ts`

```ts
// Util.ts

tokenProvider: new InsecureTokenProvider(JSON.parse(process.env.REACT_APP_TENANT_KEY!), { id: "user" }),
```

> [!TIP]
> When you make changes to the code, the project automatically rebuilds and the application server reloads. However, if you make changes to the container schema, they will only take effect if you close and restart the application server. To do this, go to the Command Prompt and press Ctrl-C twice. Then run `gulp serve` or `gulp ngrok-serve` again.

## See also

- [Azure Fluid Relay documentation](/azure/azure-fluid-relay)

- [Fluid Framework documentation](https://fluidframework.com/docs/)
- [Fluid examples GitHub Repo](https://github.com/microsoft/FluidExamples)
