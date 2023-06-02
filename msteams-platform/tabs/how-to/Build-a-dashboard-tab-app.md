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

Your team can get the latest updates from different sources in Teams using the Teams dashboard tab app. Use dashboard tab apps to connect numerous metrics, data sources, APIs, and services. Dashboard tab apps help your business extract relevant information from the sources and present it to the users. For more information about creating a dashboard tab app and the source code directory structure, see [step-by-step guide](#step-by-step-guide).

## Add a new widget

To add a new widget, follow these steps:

1. [Define a data model](#define-a-data-model)
1. [Create a data retrieve service](#create-a-data-retrieve-service)
1. [Create a widget file](#create-a-widget-file)
1. [Add widget to the dashboard](#add-widget-to-the-dashboard)

### Define a data model

It's recommended to place the data model under the `src/models` directory to define a data model based on the business scenario. The following code is an example of a data model:

```typescript
//sampleModel.ts
export interface SampleModel {
  content: string;
}
```

### Create a data retrieve service

A widget requires a service to retrieve the necessary data for displaying its content. This service can either fetch static data from a predefined source or retrieve dynamic data from a backend service or API.
For instance, you can implement a service that returns static data and place it under the `src/services` directory.

The following code is a sample service for retrieving static data:

```typescript
//sampleService.ts
import { SampleModel } from "../models/sampleModel";

export const getSampleData = (): SampleModel => {
  return { content: "Hello world!" };
};
```

### Create a widget file

Create a widget file in `src/widgets` folder. Inherit the `BaseWidget` class from `@microsoft/teamsfx-react`.
The following code is a sample widget implementation:

```typescript
//SampleWidget.tsx
import { Button, Text } from "@fluentui/react-components";
import { BaseWidget } from "@microsoft/teamsfx-react";
import { SampleModel } from "../models/sampleModel";
import { getSampleData } from "../services/sampleService";

interface SampleWidgetState {
  data?: SampleModel;
}

export class SampleWidget extends BaseWidget<any, SampleWidgetState> {
  override async getData(): Promise<SampleWidgetState> {
    return { data: getSampleData() };
  }

  override header(): JSX.Element | undefined {
    return <Text>Sample Widget</Text>;
  }

  override body(): JSX.Element | undefined {
    return <div>{this.state.data?.content}</div>;
  }

  override footer(): JSX.Element | undefined {
    return <Button>View Details</Button>;
  }
}
```

 The following table lists the methods that you can override to customize your widget.

| **Methods** | **Function** |
|---|---|
| `getData()` | Retrieves data for the widget. You can implement this method to obtain data from either the backend service or the Microsoft Graph API. |
| `header()` | Customize the header content of the widget. |
| `body()` | Customize the body content of the widget. |
| `footer()` | Customize the footer content of the widget. |
| `styling()` | Customize the style of the widget. |

### Add widget to the dashboard

Navigate to the `src/dashboards/SampleDashboard.tsx` file and include the widget in the implementation of the `layout()` method. For more information on how to create a new dashboard, see [how to add a new dashboard](https://github.com/OfficeDev/TeamsFx/wiki/Embed-a-dashboard-canvas-in-Teams#how-to-add-a-new-dashboard).

```
override layout(): JSX.Element | undefined {
  return (
    <>
      <ListWidget />
      <ChartWidget />
      <SampleWidget />
    </>
  );
}
```

Use the following code snippet if you prefer to arrange multiple widgets within the same column:

```
.one-column {
  display: grid;
  gap: 20px;
  grid-template-rows: 1fr 1fr;
}
```

```javascript
override layout(): JSX.Element | undefined {
  return (
    <>
      <ListWidget />
      <div className="one-column">
        <ChartWidget />
        <SampleWidget />
      </div>
    </>
  );
}
```

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
  override rowHeights(): string | undefined {
    return "500px";
  }

  override columnWidths(): string | undefined {
    return "4fr 6fr";
  }

  override dashboardLayout(): JSX.Element | undefined {
    return (
      <>
        <SampleWidget />
      </>
    );
  }
}
```

### Add a route for the new dashboard tab app

You must link your widget to a data source file. The widget picks up the data that's presented in the dashboard from the source file.

Open **tabs/src/App.tsx** and add a route for the new dashboard. Here's an example:

```typescript
import YourDashboard from "./views/dashboards/YourDashboard";

export default function App() {
  ...
  <Route exact path="/yourdashboard" component={YourDashboard} />
  ...
}
```

### Modify manifest to add a new dashboard tab app

Open **templates/appPackage/manifest.template.json** and add a new dashboard tab under **staticTabs**. Here's an example:

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

TeamsFx provides convenient methods to define and modify the layout of the dashboard. The following are the methods:

* Three widgets in a row with the height of 350 px occupying 20 percent, 60 percent, and 20 percent of the width, respectively.

    ```typescript
    export default class SampleDashboard extends Dashboard {
      override rowHeights(): string | undefined {
        return "350px";
      }
    
      override columnWidths(): string | undefined {
        return "2fr 6fr 2fr";
      }
    
      override dashboardLayout(): undefined | JSX.Element {
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
      override rowHeights(): string | undefined {
        return "max-content 400px";
      }
     
      override columnWidths(): string | undefined {
        return "600px 1100px";
      }
    
      override dashboardLayout(): undefined | JSX.Element {
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

    ```css
    .one-column {
      display: grid;
      gap: 20px;
      grid-template-rows: 1fr 1fr;
    }
    ```

    ```typescript
    override dashboardLayout(): JSX.Element | undefined {
      return (
        <>
          <NewsWidget />
          <div className="one-column">
            <ListWidget />
            <ChartWidget />
          </div>
        </>
      );
    }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/widget-customize.png" alt-text="Screenshot shows the two-widget customization.":::

* Customize the height of widgets in a row.

    The following code can achieve a height of 400 px for the `ListWidget` and a height of 350 px for the `ChartWidget`:

    ```css
    .one-column {
      display: grid;
      gap: 20px;
      grid-template-rows: 400px 350px;
    }
    ```

    ```typescript
    override dashboardLayout(): JSX.Element | undefined {
      return (
        <>
          <NewsWidget />
          <div className="one-column">
            <ListWidget />
            <ChartWidget />
          </div>
        </>
      );
    }
    ```

    :::image type="content" source="../../assets/images/sbs-create-a-new-dashboard/chart-widget.png" alt-text="Screenshot shows the customization of a chart widget.":::

### Dashboard tab app abstraction

To adjust the layout of the dashboard, TeamsFx provides a `BaseDashboard` class for the developers to implement a dashboard.

The following code is an example of a `BaseDashboard` class:

```typescript
function dashboardStyle(isMobile?: boolean) {
  return mergeStyles({
    display: "grid",
    gap: "20px",
    padding: "20px",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "4fr 6fr",
    ...(isMobile === true ? { gridTemplateColumns: "1fr", gridTemplateRows: "1fr" } : {}),
  });
}

interface BaseDashboardState {
  isMobile?: boolean;
  showLogin?: boolean;
  observer?: ResizeObserver;
}

export class BaseDashboard<P, S> extends Component<P, S & BaseDashboardState> {
  private ref: React.RefObject<HTMLDivElement>;

  public constructor(props: Readonly<P>) {
    super(props);
    this.state = {
      isMobile: undefined,
      showLogin: undefined,
      observer: undefined,
    } as S & BaseDashboardState;
    this.ref = React.createRef<HTMLDivElement>();
  }

  public async componentDidMount() {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.ref.current) {
          const { width } = entry.contentRect;
          this.setState({ isMobile: width < 600 } as S & BaseDashboardState);
        }
      }
    });
    observer.observe(this.ref.current!);
  }

  public componentWillUnmount(): void {
    if (this.state.observer && this.ref.current) {
      this.state.observer.unobserve(this.ref.current);
    }
  }

  public render() {
    return (
      <div
        ref={this.ref}
        className={mergeStyles(dashboardStyle(this.state.isMobile), this.styling())}
      >
        {this.layout()}
      </div>
    );
  }

  protected layout(): JSX.Element | undefined {
    return undefined;
  }

  protected styling(): string {
    return null;
  }
}
```

In the `BaseDashboard` class, TeamsFx provides basic layouts with customizable methods. The dashboard is still a react component, and TeamsFx provides basic implementations of functions based on the lifecycle of react components, such as:

* Implementing a basic render logic based on the grid layout.
* Adding an observer to automatically adapt to mobile devices.

The following are the customizable methods to override:

| Methods | Function | Recommend to override |
|---|---|---|
| `constructor()` | Initializes the dashboard state and variables. | No |
| `componentDidMount()` | Invokes after a component is mounted. |  No |
| `componentWillUnmount()` | Invokes when a component is unmounted. |  No |
| `render()` |  Invokes when there's an update. The dashboard default layout is defined in this method. |  No |
| `layout` | Defines the layout of the widget in the dashboard. You can override this method. |  Yes |
| `styling()` | To customize the style of the dashboard. You can override this method. |  Yes |

## Use a widget in your dashboard

Widgets display configurable information and charts on dashboards. They appear on the widget board where you can pin, unpin, arrange, resize, and customize widgets to reflect your interests. Your widget board is optimized to show relevant widgets and personalized content based on your usage.

### Customize the widget

You can customize the widget by overriding the following methods in the `widget` class:

* Override `headerContent()`, `bodyContent()`, and `footerContent()` to customize the widget.

    ```typescript
    export class NewsWidget extends Widget<any, any> {
    
      headerContent(): JSX.Element | undefined {
        return (
          <div>
            <News28Regular />
            <Text>Your News</Text>
            <Button icon={<MoreHorizontal32Regular />} appearance="transparent" />
          </div>
        );
      }
    
      bodyContent(): JSX.Element | undefined {
        return (
          <div className="content-layout">
            <Image src="image.svg" className="img" />
            <Text className="title">Lorem Ipsum Dolor</Text>
            <Text className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, elementum sed</Text>
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
            className="footer-button"
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
    export class NewsWidget extends Widget<any, any> {
    
      bodyContent(): JSX.Element | undefined {
        return (
          <div className="content-layout">
            <Image src="image.svg" className="img" />
            <Text className="title">Lorem Ipsum Dolor</Text>
            <Text className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, elementum sed</Text>
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
            className="footer-button"
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
    export class NewsWidget extends Widget<any, any> {
    
        bodyContent(): JSX.Element | undefined {
        return (
          <div className="content-layout">
            <Image src="image.svg" className="img" />
            <Text className="title">Lorem Ipsum Dolor</Text>
            <Text className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, elementum sed</Text>
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

    ```typescript
    bodyContent(): JSX.Element | undefined {
      return (
        <>
          {this.state.loading !== false ? (
            <div className="loading-class-name">
              <Spinner label="Loading..." labelPosition="below" />
            </div>
          ) : (
            <div className="list-body">
              ...
            </div>
          )}
        </>
      );
    }
    ```

1. Hide the footer button if the data is loading.

    The following code is an example of footer button:

    ```typescript
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

```css
.empty-layout {
  display: grid;
  gap: 1rem
  justify-content: center;
  align-content: center;
}
```

```typescript
bodyContent(): JSX.Element | undefined {
  let hasData = this.state.data && this.state.data.length > 0;
  return (
    <div className="list-body">
      {hasData ? (
        <>
          {this.state.data?.map((t: ListModel) => {
            ...
          })}
        </>
      ) : (
        <div className="empty-layout">
          <Image src="empty-default.svg" height="150px" />
          <Text align="center">No data</Text>
        </div>
      )}
    </div>
  );
}
```

You can use a similar approach to remove the footer content of your widget when the data is empty.

```typescript
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

```typescript
import { Widget } from "../lib/Widget";

interface IRefreshWidgetState {
  data: string;
}

export class RefreshWidget extends Widget<any, IRefreshWidgetState> {
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

To simplify the development of a widget, TeamsFx SDK provides a `BaseWidget` class for developers to inherit to implement a widget that meets their needs without paying much attention to implement the widget layout.

The following code is an example of BaseWidget class:

```typescript
export interface IWidgetClassNames {
  root?: string;
  header?: string;
  body?: string;
  footer?: string;
}

const classNames: IWidgetClassNames = mergeStyleSets({
  root: {
    display: "grid",
    padding: "1.25rem 2rem 1.25rem 2rem",
    backgroundColor: tokens.colorNeutralBackground1,
    border: "1px solid var(--colorTransparentStroke)",
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    gap: tokens.spacingHorizontalL,
    gridTemplateRows: "max-content 1fr max-content",
  },
  header: {
    display: "grid",
    height: "max-content",
    "& div": {
      display: "grid",
      gap: tokens.spacingHorizontalS,
      alignItems: "center",
      gridTemplateColumns: "min-content 1fr min-content",
    },
    "& svg": {
      height: "1.5rem",
      width: "1.5rem",
    },
    "& span": {
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase200,
      fontSize: tokens.fontSizeBase200,
    },
  },
  footer: {
    "& button": {
      width: "fit-content",
    },
  },
});

interface BaseWidgetState {
  loading?: boolean;
}

export class BaseWidget<P, S> extends Component<P, S & BaseWidgetState> {
  public constructor(props: Readonly<P>) {
    super(props);
    this.state = { loading: undefined } as S & BaseWidgetState;
  }

  public async componentDidMount() {
    this.setState({ ...(await this.getData()), loading: false });
  }

  public render() {
    const { root, header, body, footer } = this.styling();
    const showLoading = this.state.loading !== false && this.loading() !== undefined;
    return (
      <div className={mergeStyles(classNames.root, root)}>
        {this.header() && (
          <div className={mergeStyles(classNames.header, header)}>{this.header()}</div>
        )}
        {showLoading ? (
          this.loading()
        ) : (
          <>
            {this.body() !== undefined && <div className={body}>{this.body()}</div>}
            {this.footer() !== undefined && (
              <div className={mergeStyles(classNames.footer, footer)}>{this.footer()}</div>
            )}
          </>
        )}
      </div>
    );
  }

  protected async getData(): Promise<S> {
    return undefined;
  }

  protected header(): JSX.Element | undefined {
    return undefined;
  }

  protected body(): JSX.Element | undefined {
    return undefined;
  }

  protected footer(): JSX.Element | undefined {
    return undefined;
  }

  protected loading(): JSX.Element | undefined {
    return undefined;
  }

  protected styling(): IWidgetClassNames {
    return {};
  }
}
```

The following are the recommended methods to override:

| Methods | Function | Recommend to override |
|---|---|---|
| `constructor()` | Invokes the initial `this.state` and calls the constructor of the super class `React.Component`. |  No |
| `componentDidMount()` | Invokes after a component is mounted and assigns a value to the `data` property of the state by calling the `getData()` method. |  No |
| `render()` | Invokes whenever there's an update. The dashboard default layout is defined in this method. |  No |
| `getData()` | Invokes the data needed by the widget. The value returned by this method is set to `this.state.data`. | Yes |
| `header()` | Invokes what the widget header looks like. You can choose to override this method to customize a widget or not, if not, the widget won't have a header. |  Yes |
| `bodyContent()` | Invokes what the widget body looks like. You can choose to override this method to customize a widget or not, if not, the widget won't have a body. |  Yes |
| `footer()` | Invokes what the widget footer looks like. You can choose to override this method to customize a widget or not, if not, the widget won't have a footer. |  Yes |
| `loading()` | Invokes when the widget is in the process of fetching data. If a loading indicator is required, the method can return a `JSX.Element` that contains the necessary components to render the loading indicator. |  Yes |
| `style()` | Invokes n object that defines the class names for the different parts of the widget. |  Yes |

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
        
        export class GraphWidget extends Widget<any, IGraphWidgetState> {
          override bodyContent(): JSX.Element | undefined {
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
      override dashboardLayout(): undefined | JSX.Element {
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

* [Sample](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/hello-world-tab-with-backend/src/components/sample/AzureFunctions.tsx)
* [Developer guide](/azure/azure-functions/functions-reference?tabs=blob)

## Embed Power BI to dashboard

To embed Power BI to the dashboard, see [Power BI client react](/javascript/api/overview/powerbi/powerbi-client-react).

## Step-by-step guide

Follow the [step-by-step](~/sbs-create-dashboard-widget-graph-api-call-in-Teams-toolkit.yml) guide to build a dashboard, and learn to add a widget and Graph API call to the dashboard.

## See also

* [What are Teams tabs](../what-are-tabs.md)
* [App design guidelines for tab](../design/tabs.md)
* [Fluent UI library](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)
* [Fluent UI React charting examples](https://63587347138fdad13ed63ccd-omfbjvvebn.chromatic.com/?path=/story/ui-templates-dashboards--default)
