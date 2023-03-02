---
title: Build a dashboard tab app
author: v-silakshmi
description:  Describes Dashboard, widget and Graph API call in Teams toolkit 
ms.author: surbhigupta
ms.localizationpriority: medium 
ms.topic: Dashboard, widget, and Graph API call in Teams toolkit
ms.date: 01/17/2023
---

# Build a dashboard tab app

A dashboard is a tool to track, analyze, and display data to gain insight of an organization or a specific process. Dashboards in Teams allow you to monitor and view important metrics.

The dashboard tab template from Teams Toolkit allows you to get started with integrating a canvas with multiple cards that provide an overview of content in Teams. You can:

* Use widgets to display content from apps and services within your dashboard tab.
* Integrate your app with Graph API to visualize details about the implementation of the selected data.
* Create customizable dashboards that allow your business to set specific goals that help you track the information you need to view in multiple areas and across departments.

:::image type="content" source="../../assets/images/dashboard/dashboard-demonstration.png" alt-text="Screenshot shows the sample of a dashboard.":::

Your team can get the latest updates from different sources in Teams using the Teams dashboard tab app. Use dashboard tab apps to connect numerous metrics, data sources, APIs, and services to help your business extract relevant information from the sources and present it to the users. For more information about creating a dashboard tab app and the source code directory structure, see [step-by-step guide](#step-by-step-guide).

## Add a new dashboard

After you've created a dashboard tab app, you can add a new dashboard.

To add a new dashboard, follow these steps:

1. [Create a dashboard class](#create-a-dashboard-class)
1. [Override methods to customize dashboard tab app](#override-methods-to-customize-dashboard-tab-app)
1. [Add a route for the new dashboard tab app](#add-a-route-for-the-new-dashboard-tab-app)
1. [Modify manifest to add a new dashboard tab app](#modify-manifest-to-add-a-new-dashboard-tab-app)

### Create a dashboard class

Create a file with the .tsx extension for your dashboard in the tabs/src/views/dashboards directory, for example, YourDashboard.tsx. Then, create a class that extends the [Dashboard](https://github.com/OfficeDev/TeamsFx/wiki/) class:

```typescript

export default class YourDashboard extends Dashboard {}

```

> [!NOTE]
> All methods are optional. If you don't override any method, the default dashboard layout is used.

### Override methods to customize dashboard tab app

The `dashboard` class provides few methods that you can override to customize the dashboard layout. The following table lists the methods that you can override:

| **Methods** | **Function** |
|---|---|
| `rowHeights()` | Customize the height of each row of the dashboard. |
| `columnWidths()` | Customize how many columns the dashboard has at most and the width of each column. |
| `dashboardLayout()` | Define widgets layout. |

The following code is an example to customize the dashboard layout:

```typescript
export default class YourDashboard extends Dashboard {
  protected rowHeights(): string | undefined {
    return "500px";
  }

  protected columnWidths(): string | undefined {
    return "4fr 6fr";
  }

  protected dashboardLayout(): JSX.Element | undefined {
    return (
      <>
        <SampleWidget />
        <div style={oneColumn("6fr 4fr")}>
          <SampleWidget />
          <SampleWidget />
        </div>
      </>
    );
  }
}
```

### Add a route for the new dashboard tab app

You must link your widget to a data source file. The widget picks up the data that's presented in the dashboard from the source file.

Open tabs/src/App.tsx file and add a route for the new dashboard. Here's an example:

```typescript
import YourDashboard from "./views/dashboards/YourDashboard";

export default function App() {
  ...
  <Route exact path="/yourdashboard" component={YourDashboard} />
  ...
}
```

### Modify manifest to add a new dashboard tab app

Open templates/appPackage/manifest.template.json file and add a new dashboard tab under the `staticTabs`. Here's an example:

```json
{
  "name": "Your Dashboard",
  "entityId": "yourdashboard",
  "contentUrl": "{{state.fx-resource-frontend-hosting.endpoint}}{{state.fx-resource-frontend-hosting.indexPath}}/yourdashboard",
  "websiteUrl": "{{state.fx-resource-frontend-hosting.endpoint}}{{state.fx-resource-frontend-hosting.indexPath}}/yourdashboard",
  "scopes": ["personal"]
}
```

## Customize the dashboard layout

Teamsfx provides convenient methods to define and modify the layout of the dashboard. The following are the methods:

* Three widgets in a row with the height of 350 px occupying 20 percent, 60 percent, and 20 percent of the width, respectively.

    ```typescript
    export default class SampleDashboard extends Dashboard {
      protected rowHeights(): string | undefined {
        return "350px";
      }
    
      protected columnWidths(): string | undefined {
        return "2fr 6fr 2fr";
      }
    
      protected dashboardLayout(): undefined | JSX.Element {
        return (
          <>
            <ListWidget />
            <ChartWidget />
            <NewsWidget />
          </>
        );
      }
    }
    ```

   :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/customize-dashboard-layout.png" alt-text="Screenshot shows the customized dashboard layout.":::

* Two widgets in a row with a width of 600 px and 1100 px. The height of the first line is the maximum height of its content, and the height of the second line is 400 px.

    ```typescript
    export default class SampleDashboard extends Dashboard {
      protected rowHeights(): string | undefined {
        return "max-content 400px";
      }
     
      protected columnWidths(): string | undefined {
        return "600px 1100px";
      }
    
      protected dashboardLayout(): undefined | JSX.Element {
        return (
          <>
            <ListWidget />
            <ChartWidget />
            <NewsWidget />
          </>
        );
      }
    }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/customize-dashboard-layout2.png" alt-text="Screenshot shows the customization of height and width of the dashboard layout.":::

* Arrange two widgets in a column.

    ```typescript
    import { oneColumn } from '../lib/Dashboard.styles';
    export default class SampleDashboard extends Dashboard {
      protected rowHeights(): string | undefined {
        return "max-content";
      }
    
      protected columnWidths(): string | undefined {
        return "4fr 6fr";
      }
    
      protected dashboardLayout(): undefined | JSX.Element {
        return (
          <>
            <NewsWidget />
            <div style={oneColumn()}>
              <ListWidget />
              <ChartWidget />
              
            </div>
          </>
        );
      }
    }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/widget-customize.png" alt-text="Screenshot shows the two-widget customization.":::

* Customize the height of widgets in a row.

    The following code can achieve a height of 400 px for the `ListWidget` and a height of 350 px for the `ChartWidget`:

    ```typescript
        import { oneColumn } from '../lib/Dashboard.styles';
        export default class SampleDashboard extends Dashboard {
          protected rowHeights(): string | undefined {
            return "max-content";
          }
        
          protected columnWidths(): string | undefined {
            return "4fr 6fr";
          }
        
          protected dashboardLayout(): undefined | JSX.Element {
            return (
              <>
                <NewsWidget />
                <div style={oneColumn("400px 350px")}>
                  <ListWidget />
                  <ChartWidget />
                </div>
              </>
            );
          }
        }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/chart-widget.png" alt-text="Screenshot shows the customization of a chart widget.":::

### Dashboard tab app abstraction

To adjust the layout of the dashboard, Teamsfx provides a `dashboard` class for the developers to implement a dashboard.

The following code is an example of a dashboard class:

```typescript
interface IDashboardState {
  isMobile?: boolean;
  observer?: ResizeObserver;
}

/**
 * The dashboard class which is the base class for all dashboard components.
 */
export class Dashboard extends Component<any, IDashboardState> {
  private ref: React.RefObject<HTMLDivElement>;

  /**
   * Constructor for the dashboard class. Initializes the dashboard state.
   * @param props The properties for the dashboard.
   */
  constructor(props: any) {
    super(props);
    this.state = {
      isMobile: undefined,
      observer: undefined,
    };
    this.ref = React.createRef<HTMLDivElement>();
  }

  /**
   * This method is invoked immediately after a component is mounted. It's a good place to fetch data from server.
   */
  componentDidMount(): void {
    // Observe the dashboard div for resize events
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === this.ref.current) {
          const { width } = entry.contentRect;
          this.setState({ isMobile: width < 600 });
        }
      }
    });
    observer.observe(this.ref.current!);
  }

  /**
   * This method is invoked immediately when a component is unmounted. It's a good place to clean up the resources.
   */
  componentWillUnmount(): void {
    // Unobserve the dashboard div for resize events
    if (this.state.observer && this.ref.current) {
      this.state.observer.unobserve(this.ref.current);
    }
  }

  /**
   * Define the dashboard default layout, you can edit the code here to customize your dashboard layout.
   */
  render() {
    return (
      <>
        <div
          ref={this.ref}
          style={dashboardStyles(
            this.state.isMobile,
            this.rowHeights(),
            this.columnWidths()
          )}
        >
          {this.dashboardLayout()}
        </div>
      </>
    );
  }

  /**
   * Implement this method to define the row heights of the dashboard.
   * For example, if you want to have 3 rows, and the height of the first row is 100px, the height of the second row is 200px, and the height of the third row is 300px, you can return "100px 200px 300px".
   * @returns The row heights of the dashboard.
   */
  protected rowHeights(): string | undefined {
    return undefined;
  }

  /**
   * Implement this method to define the column widths of the dashboard.
   * For example, if you want to have 3 columns, and each column occupies 1/3 of the full width, you can return "1fr 1fr 1fr".
   * @returns The column widths of the dashboard.
   */
  protected columnWidths(): string | undefined {
    return undefined;
  }

  /**
   * Implement this method to define the dashboard layout.
   */
  protected dashboardLayout(): JSX.Element | undefined {
    return undefined;
  }
}
```

In the `dashboard` class, Teamsfx provides basic layouts with customizable methods. The dashboard is still a react component, and Teamsfx provides basic implementations of functions based on the lifecycle of react components, such as:

* Implementing a basic render logic based on the grid layout.
* Adding an observer to automatically adapt to mobile devices.

The following are the customizable methods to override:

| File | Content | Recommend to override |
|---|---|---|
| **constructor()** | Initializes the dashboard state and variables. | No |
| **componentDidMount()** | Invokes after a component is mounted. |  No |
| **componentWillUnmount()** | Invokes when a component is unmounted. |  No |
| **render()** |  Invokes when there's an update. The dashboard default layout is defined in this method. |  No |
| **rowHeights()** | Customizes the height of each row of the dashboard. |  Yes |
| **columnWidths()** | Customizes the number of columns the dashboard has at most and the width of each column. |  Yes |
| **dashboardLayout()** | Defines the widget layout in dashboard. |  Yes |

## Use a widget in your dashboard

Widgets display configurable information and charts on dashboards. They appear on the widget board where you can pin, unpin, arrange, resize, and customize widgets to reflect your interests. Your widget board is optimized to show relevant widgets and personalized content based on your usage.

### Customize the widget

You can customize the widget by overriding the following methods in the `widget` class:

* Override `headerContent()`, `bodyContent()`, and `footerContent()` to customize the widget.

    ```typescript
    export class NewsWidget extends Widget<void> {
    
        headerContent(): JSX.Element | undefined {
            return (
                <div style={headerContentStyle()}>
                    <News28Regular />
                    <Text style={headerTextStyle()}>Your News</Text>
                    <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
                </div>
            );
        }
    
        bodyContent(): JSX.Element | undefined {
            return (
                <div style={contentLayoutStyle()}>
                    <Image src="image.svg" style={imageStyle()} />
                    <Text style={titleStyle()}>Lorem Ipsum Dolor</Text>
                    <Text style={descStyle()}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, elementum sed</Text>
                </div>
            );
        }
    
        footerContent(): JSX.Element | undefined {
            return (
                <Button
                    appearance="transparent"
                    icon={<ArrowRight16Filled />}
                    iconPosition="after"
                    size="small"
                    style={footerButtonStyle()}
                    onClick={() => { }} // navigate to detailed page
                >
                    View details
                </Button>
            );
        }
    }
    ```

   :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/override-header-count.png" alt-text="Screenshot shows the example of header, body, and footer content in a widget.":::

* Override `bodyContent()` and `footerContent()` to customize the widget.

    ```typescript
    export class NewsWidget extends Widget<void> {
    
        bodyContent(): JSX.Element | undefined {
            return (
                <div style={contentLayoutStyle()}>
                    <Image src="image.svg" style={imageStyle()} />
                    <Text style={titleStyle()}>Lorem Ipsum Dolor</Text>
                    <Text style={descStyle()}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, elementum sed</Text>
                </div>
            );
        }
    
        footerContent(): JSX.Element | undefined {
            return (
                <Button
                    appearance="transparent"
                    icon={<ArrowRight16Filled />}
                    iconPosition="after"
                    size="small"
                    style={footerButtonStyle()}
                    onClick={() => { }} // navigate to detailed page
                >
                    View details
                </Button>
            );
        }
    }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/override-body-content-footer-content.png" alt-text="Screenshot shows the body and footer content in a widget.":::

* Override `bodyContent()` to customize the widget.

    ```typescript
    export class NewsWidget extends Widget<void> {
    
        bodyContent(): JSX.Element | undefined {
            return (
                <div style={contentLayoutStyle()}>
                    <Image src="image.svg" style={imageStyle()} />
                    <Text style={titleStyle()}>Lorem Ipsum Dolor</Text>
                    <Text style={descStyle()}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, elementum sed</Text>
                </div>
            );
        }
    
    }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/override-body-content.png" alt-text="Screenshot shows body content in a widget.":::

### Include a data loader

If you want to include a data loader to your widget before the widget is loaded, you can add a property to the state of the widget to indicate that the data loader is loading. You can use this property to show a loading indicator to the user.

The following steps show how to add a property to the state of `ListWidget` and how to use it to show a loading spinner while the data is loading.

1. Define a state type: Define a state type including a property named `loading` that indicates whether the data is loading.

    ```typescript
    interface ListWidgetState {
      data: ListModel[];
      loading?: boolean;
    }
    ```

1. Add a data loader: Modify the `bodyContent` method to show a loading spinner if data is loading.

    ```tsx
    bodyContent(): JSX.Element | undefined {
      return (
        <>
          {this.state.loading !== false ? (
            <div style={{ display: "grid", justifyContent: "center", height: "100%" }}>
              <Spinner label="Loading..." labelPosition="below" />
            </div>
          ) : (
            <div style={bodyContentStyle()}>
              ...
            </div>
          )}
        </>
      );
    }
    ```

1. Hide the footer button if the data is loading.

    The following code is an example of footer button:

    ```tsx
    footerContent(): JSX.Element | undefined {
      if (this.state.loading === false) {
        return (
          <Button
            ...
          </Button>
        );
      }
    }
    ```

1. Update the state reference: Update the state reference in the widget file to use the new state type and update the state in the `getData` method to set the `loading` property to `false` after the data is loaded.

    Now, the loading spinner is shown while the data is loading. When the data is loaded, the loading spinner is hidden and the list data, and footer button are shown.

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/spinner.gif" alt-text="Graphical representation shows the loading spinner while the data is loading.":::

### Handle empty state

You can display a specific content in your widget when the data is empty. To do so, you need to modify the `bodyContent` method in your widget file to adopt different states of the data.

The following example shows how to display an empty image when the data of `ListWidget` is empty.

```tsx
bodyContent(): JSX.Element | undefined {
    let hasData = this.state.data && this.state.data.length > 0;
    return (
      <div style={bodyContentStyle()}>
        {hasData ? (
          <>
            {this.state.data?.map((t: ListModel) => {
              ...
            })}
          </>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Image src="empty-default.svg" height="150px" />
            <Text align="center">No data</Text>
          </div>
        )}
      </div>
    );
  }
```

You can use a similar approach to remove the footer content of your widget when the data is empty.

```tsx
footerContent(): JSX.Element | undefined {
    let hasData = this.state.data && this.state.data.length > 0;
    if (hasData) {
      return (
        <Button
          ...
        </Button>
      );
    }
  }
```

  :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/no-data.png" alt-text="Screenshot showing no data in the list.":::

### Refresh data as scheduled

The following example shows how to display real-time data in a widget. The widget displays the current time and updates.

```tsx
import { Widget } from "../lib/Widget";

interface IRefreshWidgetState {
  data: string;
}

export class RefreshWidget extends Widget<IRefreshWidgetState> {
  bodyContent(): JSX.Element | undefined {
    return <>{this.state.data}</>;
  }

  async componentDidMount() {
    setInterval(() => {
      this.setState({ data: new Date().toLocaleTimeString() });
    }, 1000);
  }
}
```

You can modify `setInterval` method to call your own function to refresh data like this `setInterval(() => yourGetDataFunction(), 1000)`.

### Widget abstraction

To simplify the development of a widget, Teamsfx provides a `widget` class for developers to inherit to implement a widget that meets their needs without paying much attention to implement the widget layout.

The following code is an example of widget class:

```typescript
export abstract class Widget<T> extends Component<any, { data?: T | void }> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  /**
   * This method is invoked immediately after a component is mounted.
   * It's a good place to fetch data from server.
   */
  async componentDidMount() {
    this.setState({ data: await this.getData() });
  }

  /**
   * Define your widget layout, you can edit the code here to customize your widget.
   */
  render() {
    return (
      <div style={widgetStyles()}>
        {this.headerContent() && (
          <div style={headerStyles()}>{this.headerContent()}</div>
        )}
        {this.bodyContent() && <div>{this.bodyContent()}</div>}
        {this.footerContent() && <div>{this.footerContent()}</div>}
      </div>
    );
  }

  /**
   * Get data required by the widget, you can get data from a api call or static data stored in a file. Override this method according to your needs.
   * @returns data for the widget
   */
  protected async getData(): Promise<T> {
    return new Promise<T>(() => {});
  }

  /**
   * Override this method to customize the widget header.
   * @returns JSX component for the widget body
   */
  protected headerContent(): JSX.Element | undefined {
    return undefined;
  }

  /**
   * Override this method to customize the widget body.
   * @returns JSX component for the widget body
   */
  protected bodyContent(): JSX.Element | undefined {
    return undefined;
  }

  /**
   * Override this method to customize the widget footer.
   * @returns react node for the widget footer
   */
  protected footerContent(): JSX.Element | undefined {
    return undefined;
  }
}
```

The following are the recommended methods to override:

| Methods | Function | Recommend to override |
|---|---|---|
| **constructor()** | Invokes the initial `this.state` and calls the constructor of the super class `React` component. |  No |
| **componentDidMount()** | Invokes after a component is mounted and assigns a value to the `data` property of the state by calling the `getData()` method. |  No |
| **render()** | Invokes whenever there's an update. The dashboard default layout is defined in this method. |  No |
| **getData()** | Invokes the data needed by the widget. The value returned by this method is set to `this.state.data`. |
| **headerContent()** | Invokes what the widget header looks like. You can choose to override this method to customize a widget or not, if not, the widget won't have a header. |  Yes |
| **bodyContent()** | Invokes what the widget body looks like. You can choose to override this method to customize a widget or not, if not, the widget won't have a body. |  Yes |
| **footerContent()** | Invokes what the widget footer looks like. You can choose to override this method to customize a widget or not, if not, the widget won't have a footer. |  Yes |

### Microsoft Graph Toolkit as widget content

Microsoft Graph Toolkit is a set of renewable, framework-agnostic web components, which helps accessing and working with Microsoft Graph. You can use the Microsoft Graph Toolkit with any web framework or without a framework.

To use Microsoft Graph Toolkit as your widget content, follow these steps:

1. Add SSO feature to your Teams app: Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph. For more information, refer [SSO feature to your Teams app](../../toolkit/add-single-sign-on.md).

1. Install required `npm` packages.

   Run the following command in your project `tabs` folder to install the required `npm` packages:

      ```bash
      npm install @microsoft/mgt-react @microsoft/mgt-teamsfx-provider

      ```

1. Add a new Graph Toolkit widget: Create a new widget file in your project tabs/src/views/widgets folder, for example, GraphyWidget.tsx. In this widget, we'll guide users to consent our app to access Microsoft Graph and then show the user's `Todo` list by using Microsoft Graph Toolkit.

      The following code is an example of using `Todo` component from Microsoft Graph Toolkit in widget:

      ```tsx
        import { Providers, ProviderState, Todo } from "@microsoft/mgt-react";
        import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
        
        import { loginAction } from "../../internal/login";
        import { TeamsUserCredentialContext } from "../../internal/singletonContext";
        import { Widget } from "../lib/Widget";
        
        interface IGraphWidgetState {
          needLogin: boolean;
        }
        
        export class GraphWidget extends Widget<IGraphWidgetState> {
          protected bodyContent(): JSX.Element | undefined {
            return <div>{this.state.needLogin === false && <Todo />}</div>;
          }
        
          async componentDidMount() {
            super.componentDidMount();
        
            // Initialize TeamsFx provider
            const provider = new TeamsFxProvider(TeamsUserCredentialContext.getInstance().getCredential(), [
              "Tasks.ReadWrite",
            ]);
            Providers.globalProvider = provider;
        
            // Check if user is signed in
            if (await this.checkIsConsentNeeded()) {
              await loginAction(["Tasks.ReadWrite"]);
            }
        
            // Update signed in state
            Providers.globalProvider.setState(ProviderState.SignedIn);
            this.setState({ needLogin: false });
          }
        
          /**
           * Check if user needs to consent
           * @returns true if user needs to consent
           */
          async checkIsConsentNeeded() {
            let needConsent = false;
            try {
              await TeamsUserCredentialContext.getInstance().getCredential().getToken(["Tasks.ReadWrite"]);
            } catch (error) {
              needConsent = true;
            }
            return needConsent;
          }
        }
        
      ```

      For more information, refer [Microsoft Graph Toolkit](/graph/toolkit/overview).

1. Add the widget to dashboard layout. Include the new widget in your dashboard file.

    ```tsx
    ...
    export default class YourDashboard extends Dashboard {
      ...
      protected dashboardLayout(): undefined | JSX.Element {
        return (
          <>
            <GraphWiget />
          </>
        );
      }
      ...
    }
    ```

Now, launch or refresh your Teams app, you'll see the new widget using Microsoft Graph Toolkit.

## Graph API call

Microsoft Graph API is a web API that you can use to communicate with Microsoft cloud and other services. Custom applications can use the Microsoft Graph API to connect to data and use it in custom applications to enhance organizational productivity.

To add a Graph API call:

* [Call Graph API from the front-end (use delegated permissions)](#call-graph-api-from-the-front-end-use-delegated-permissions)
* [Call Graph API from the back-end (use application permissions)](#call-graph-api-from-the-back-end-use-application-permissions)

### Call Graph API from the front-end (use delegated permissions)

If you want to call a Graph API from the front-end tab, follow these steps:

1. Consent delegated permissions first: You can call `addNewPermissionScope(scopes: string[])` to consent the scopes of permissions you want to add. The consented status is preserved in a global context `FxContext`.

1. Create a Graph client by adding the scope related to the Graph API you want to call.

    ```typescript
    let teamsfx;
    teamsfx = FxContextInstance.getTeamsFx();
    const graphClient = createMicrosoftGraphClient(teamsfx, scope);
    ```

1. Call the Graph API and parse the response into a certain model.

    ```typescript
    try {
      const graphApiResult = await graphClient.api("<GRAPH_API_PATH>").get();
      // Parse the graphApiResult into a Model you defined, used by the front-end.
    } catch (e) {}
    ```

### Call Graph API from the back-end (use application permissions)

If you want to call a Graph API from the back-end, follow these steps:

1. [Consent application permissions](#consent-application-permissions)
1. [Add an Azure function](#add-an-azure-function)
1. [Add your logic in Azure function](#add-your-logic-in-azure-function)
1. [Call the Azure function from the front-end](#call-the-azure-function-from-the-front-end)

#### Consent application permissions

To consent application permissions, follow these steps:

1. Go to [Azure portal](https://ms.portal.azure.com/#home).
1. Select **Azure Active Directory**.
1. Select **App registrations** in the left pane.
1. Select your dashboard app.
1. Select **API permissions** in the left pane.
1. Select **Add permission**.
1. Select **Microsoft Graph**.
1. Select **Application permissions**.
1. Find the permissions you need.
1. Select the **Add permissions** button at the bottom.
1. Select **✔Grant admin consent**.
1. Select the **Yes** button to finish the admin consent.

#### Add an Azure function

In the left pane of the Visual Studio Code, select **Teams Toolkit** > **Adding features** > **Azure Functions** > and Enter the function name.

:::image type="content" source="~/assets/images/sbs-create-a-new-dashboard/azure-functions.png" alt-text="Screenshot shows the selection of Azure Functions.":::

#### Add your logic in Azure function

In the `index.ts`/`index.ts` under the folder named Azure Function, you can add your logic that contains back-end Graph API calling with application permissions. Refer to the following code snippet:

```typescript
/**
 * This function handles requests from teamsfx client.
 * The HTTP request should contain an SSO token queried from Teams in the header.
 * Before triggering this function, teamsfx binding would process the SSO token and generate teamsfx configuration.
 *
 * You should initializes the teamsfx SDK with the configuration and calls these APIs.
 *
 * The response contains multiple message blocks constructed into a JSON object, including:
 * - An echo of the request body.
 * - The display name encoded in the SSO token.
 * - Current user's Microsoft 365 profile if the user has consented.
 *
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @param {teamsfxContext} TeamsfxContext - The context generated by teamsfx binding.
 */
export default async function run(
  context: Context,
  req: HttpRequest,
  teamsfxContext: TeamsfxContext
): Promise<Response> {
  context.log("HTTP trigger function processed a request.");

  // Initialize response.
  const res: Response = {
    status: 200,
    body: {},
  };

  // Your logic here.

  return res;
}
```

#### Call the Azure function from the front-end

Call the Azure function by function name. Refer to the following code snippet to call the Azure function:

```typescript
const functionName = process.env.REACT_APP_FUNC_NAME || "myFunc";
async function callFunction(teamsfx) {
  if (!teamsfx) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  try {
    const credential = teamsfx.getCredential();
    const apiBaseUrl = teamsfx.getConfig("apiEndpoint") + "/api/";
    // createApiClient(...) creates an Axios instance which uses BearerTokenAuthProvider to inject token to request header
    const apiClient = createApiClient(
      apiBaseUrl,
      new BearerTokenAuthProvider(
        async () => (await credential.getToken(""))!.token
      )
    );
    const response = await apiClient.get(functionName);
    return response.data;
  } catch (e) {}
}
```

For more information, see:

* [sample](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/hello-world-tab-with-backend/tabs/src/components/sample/AzureFunctions.tsx)
* [Developer guide](/azure/azure-functions/functions-reference?tabs=blob)

## Embed Power BI to dashboard

To embed Power BI to the dashboard, see [Power BI client react](/javascript/api/overview/powerbi/powerbi-client-react).

## Step-by-step guide

Follow the [step-by-step](~/sbs-create-dashboard-widget-graph-api-call-in-Teams-toolkit.yml) guide to build a dashboard, and learn to add a widget and Graph API call to the dashboard.

## See also

* [What are Teams tabs](../what-are-tabs.md)
* [App design guidelines for tab](../design/tabs.md)
* [Fluent UI library](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)
* [Fluent UI React charting examples](https://fluentuipr.z22.web.core.windows.net/heads/master/react-charting/demo/index.html#/)
