---
title: Dashboard, widget and Graph API call in Teams toolkit
author: v-silakshmi
description:  Describes Dashboard, widget and Graph API call in Teams toolkit
ms.author: surbhigupta
ms.localizationpriority: medium 
ms.topic: Dasboard, widget and Graph API call in Teams toolkit
ms.date: 01/17/2023
---

# Dashboard, widget and Graph API call in Teams toolkit

Dashboards in the Teams toolkit allow you to monitor your business and see all your important metrics briefly. Widget displays content from apps and services to stay engaged with the latest updates in Teams. Graph API call can be used to visualize details about the implementation of the selected API.

## Dashboard

 A dashboard is a tool to track, analyze, and display data, to gain insight into the organization or specific process. The dashboard tab template from the Teams toolkit enables you to get started with integrating a canvas with multiple cards that provide an overview of content in Microsoft Teams.

:::image type="content" source="../../assets/images/dashboard/dashboard-demonstration.png" alt-text="Screenshot showing the dashboard.":::

**Advantages**

* Dashboards connect numerous metrics, data sources, APIs, and services to help business extract relevant information from the sources and present it to users.

* Customizable dashboards allow your business to set specific goals that help you track the information you need to see in multiple areas and across departments.

## Widget

Widgets display configurable information and charts on dashboards. They appear on the widgets board, where you can pin, unpin, arrange, resize and customize widgets to reflect your interests. Your widget board is optimized to show relevant widgets and personalized content based on your usage.

**To add a new widget**:

* Define a model.
* Create a data retrieve service.
* Create a widget file.
* Add the widget to the dashboard.

:::image type="content" source="../../assets/images/dashboard/widget.png" alt-text="Screenshot showing the calender as a widget.":::

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

## Graph API call

Microsoft Graph API is a Restful web API that we can use to communicate with Microsoft cloud and other services. Custom applications can use the Microsoft Graph API to connect to data and use it in custom applications to enhance organizational productivity.

**To add a Graph API call**

* Add Single-Sign-On related files.
* Call Graph API from the front-end(use delegated permissions).
* Call Graph API from the back-end(use application permissions).

## Step-by-step guide

Follow the step-by-step guide to build a dashboard, also learn to add a widget and Graph API call to the dashboard.
