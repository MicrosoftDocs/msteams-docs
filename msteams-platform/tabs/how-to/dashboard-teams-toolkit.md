---
title: Dashboard, widget, and Graph API call in Teams toolkit
author: v-silakshmi
description:  Describes Dashboard, widget and Graph API call in Teams toolkit 
ms.author: surbhigupta
ms.localizationpriority: medium 
ms.topic: Dasboard, widget, and Graph API call in Teams toolkit
ms.date: 01/17/2023
---

# Dashboard, widget, and Graph API call in Teams toolkit

Dashboards in the Teams toolkit allow you to monitor your business and view important metrics briefly. Widget displays content from apps and services to stay engaged with the latest updates in Teams. Graph API can be used to visualize details about the implementation of the selected API.

## Dashboard

 A dashboard is a tool to track, analyze, and display data to gain insight of an organization or a specific process. The dashboard tab template from the Teams toolkit enables you to get started with integrating a canvas with multiple cards that provide an overview of the content in Microsoft Teams.

Example of a dashboard:

:::image type="content" source="../../assets/images/dashboard/dashboard-demonstration.png" alt-text="Screenshot shows the sample of a dashboard.":::

**Advantages**

* Dashboards connect numerous metrics, data sources, APIs, and services to help business extract relevant information from the sources and present it to the users.

* Customizable dashboards allow your business to set specific goals that help you track the information you need to view in multiple areas and across departments.

## Add a new dashboard

Following are the steps to add a new dashboard layout:

1. Create a dashboard class.
1. Override methods to customize dashboard layout.
1. Add a route for the new dashboard.
1. Modify manifest to add a new dashboard tab.

**Create a dashboard class**

Create a file with the extension `.tsx` for your dashboard in the tabs/src/views/dashboards directory. For example, YourDashboard.tsx. Then, create a class that extends the Dashboard class:

`export default class YourDashboard extends Dashboard {}`

**Override methods to customize dashboard layout**

Dashboard class provides few methods that you can override to customize the dashboard layout. The following table lists the methods that you can override:

| **Methods** | **Function** |
|---|---|
| `rowHeights()` | Customize the height of each row of the dashboard. |
| `columnWidths()` | Customize how many columns the dashboard has at most and the width of each column. |
| `dashboardLayout()` | Define widgets layout. |

Following is an example to customize the dashboard layout.

```typescript
export default class YourDashboard extends Dashboard {
  protected rowHeights(): string | undefined {
    return "500px";
  }

  protected columnWidths(): string | undefined {
    return "4fr 6fr";
  }

  protected dashboardLayout(): void | JSX.Element {
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

>[!NOTE]
> All methods are optional. If you do not override any method, the default dashboard layout will be used.

**Add a route for the new dashboard**

Open **tabs/src/App.tsx** file, and add a route for the new dashboard. Here is an example:

```typescript
import YourDashboard from "./views/dashboards/YourDashboard";

export default function App() {
  ...
  <Route exact path="/yourdashboard" component={YourDashboard} />
  ...
}
```

**Modify manifest to add a new dashboard tab**

Open **templates/appPackage/manifest.template.json file**, and add a new dashboard tab under the staticTabs. Here is an example:

```typescript
{
  "name": "Your Dashboard",
  "entityId": "yourdashboard",
  "contentUrl": "{{state.fx-resource-frontend-hosting.endpoint}}{{state.fx-resource-frontend-hosting.indexPath}}/yourdashboard",
  "websiteUrl": "{{state.fx-resource-frontend-hosting.endpoint}}{{state.fx-resource-frontend-hosting.indexPath}}/yourdashboard",
  "scopes": ["personal"]
}
```

### Take a tour of your app source code

This section walks through the generated code. The core dashboard implementation is in tabs folder, the project folder contains the following:

| **Folder** | **Content** |
|---|---|
| `.fx` | Project level settings, configurations, and environment information. |
| `.vscode` | Visual Studio Code files for local debug. |
| `tabs` | The source code for the dashboard tab Teams application |
| `templates` | Templates for the Teams application manifest and for provisioning Azure resources. |

The following files provide the business logic for the dashboard tab. These files can be updated to fit your business logic requirements. The default implementation provides a starting point to help you get started:

| **File** | **Content** |
|---|---|
| **src/models/listModel.tsx** | Data model for the list widget. |
| **src/services/listService.tsx** | A data retrieve implementation for the list widget. |
| **src/views/dashboards/SampleDashboard.tsx** | A sample dashboard layout implementation. |
| **src/views/lib/Dashboard.styles.ts** | The dashboard style file. |
| **src/views/lib/Dashboard.tsx** | An base class that defines the dashboard. |
| **src/views/lib/Widget.styles.ts** | The widget style file. |
| **src/views/lib/Widget.tsx** | An abstract class that defines the widget. |
| **src/views/styles/ListWidget.styles.ts** | The list widget style file. |
| **src/views/widgets/ChartWidget.tsx** | A widget implementation that can display a chart. |
| **src/views/widgets/ListWidget.tsx** | A widget implementation that can display a list. |

The following files are project-related files. You'll not need to customize these files:

| **File** | **Content**|
|---|---|
| **src/index.tsx** | Application entry point. |
| **src/App.tsx** | Application route. |
| **src/internal/addNewScopes.ts** | Implementation of new scopes add. |
| **src/internal/context.ts** | `TeamsFx` Context.
| **src/internal/login.ts** | Implementation of login |
| **src/internal/singletonContext.ts** | Implementation of the TeamsFx instance singleton |

### Dashboard Abstraction

To adjust the layout of the dashboard, the `TeamsFx` provides a dashboard class for developers to implement a dashboard.

Following is an example of dashboard class:

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
   * This method is invoked immediately when a component will be unmounted. It's a good place to clean up the resources.
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

In the Dashboard class, the `TeamsFx` provides basic layouts with customizable methods. The Dashboard is still a react component, and the `TeamsFx` provides basic implementations of functions based on the lifecycle of react components, such as:

* Implementing a basic render logic based on the Grid layout.
* Adding an observer to automatically adapt to mobile devices.

Following are the customizable methods to override:

| File | Content | Recommend to override |
|---|---|---|
| **constructor()** | Initializes the dashboard state and variables. | NO |
| **componentDidMount()** | This method Will be invoked after a component is mounted. | NO |
| **componentWillUnmount()** | This method Will be invoked when a component will be unmounted. | NO |
| **render()** | This method Will be called each time an update happens, we defined the dashboard default layout in this method. | NO |
| **rowHeights()** | Customize the height of each row of the dashboard. | YES |
| **columnWidths()** | Customize how many columns the dashboard has at most and the width of each column. | YES |
| **dashboardLayout()** | Define the widgets layout in dashboard. | YES |

## Widget

Widgets display configurable information and charts on dashboards. They appear on the widget board where you can pin, unpin, arrange, resize, and customize widgets to reflect your interests. Your widget board is optimized to show relevant widgets and personalized content based on your usage.

**To add a new widget**:

* Define a model.
* Create a data retrieve service.
* Create a widget file.
* Add the widget to the dashboard.

Following is an example of a calendar widget:

:::image type="content" source="../../assets/images/dashboard/widget.png" alt-text="Screenshot shows the calender as a widget.":::

Following is an example of widget implementation:

```typescript
import { Button, Text } from "@fluentui/react-components";
import { Widget } from "../lib/Widget";
import { SampleModel } from "../../models/sampleModel";
import { getSampleData } from "../../services/sampleService";

export class SampleWidget extends Widget<SampleModel> {
  async getData(): Promise<SampleModel> {
    return getSampleData();
  }

  headerContent(): JSX.Element | undefined {
    return <Text>Sample Widget</Text>;
  }

  bodyContent(): JSX.Element | undefined {
    return <div>{this.state.data?.content}</div>;
  }

  footerContent(): JSX.Element | undefined {
    return (
      <Button
        appearance="primary"
        size="medium"
        style={{ width: "fit-content" }}
        onClick={() => {}}
      >
        View Details
      </Button>
    );
  }
}
```

### Widget Abstraction

To simplify the development of a widget, the `TeamsFx` provides a Widget class for developers to inherit to implement a widget that meets their needs without much attention to implement the widget layout:

## Graph API call

Microsoft Graph API is a web API that you can use to communicate with Microsoft cloud and other services. Custom applications can use the Microsoft Graph API to connect to data and use it in custom applications to enhance organizational productivity.

**To add a Graph API call**:

* Add single-sign-on related files.
* Call Graph API from the front-end (use delegated permissions).
* Call Graph API from the back-end (use application permissions).

## Step-by-step guide

Follow the step-by-step guide to build a dashboard, and also learn to add a widget and Graph API call to the dashboard.
