---
title: Virtual tables Web API
author: surbhigupta
description: In this module, learn about Virtual Tables web API for Collaboration control app, virtual table sorting, and filtering in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Virtual tables Web API

When using the Dataverse Web API to retrieve multiple records from a virtual table additional query parameters can be included to support sorting, filtering, and pagination. These features aren't supported uniformly across the Collaboration controls virtual tables because they rely on the support provided by the Microsoft Graph API. See Virtual Tables Entity Reference for details on what each virtual table supports.

> [!NOTE]
> Currently, Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Virtual table sorting

With the virtual tables, you can use the OData $orderby query parameter to set criteria for how the result set should be sorted. Use the asc or desc suffix to specify ascending or descending order respectively. The default is ascending if the suffix isn't applied.  

**Supported Tables**: Each virtual table supports the same sorting functionality as it’s respective Graph resource. The virtual tables, which support sorting are:  

* Graph Drive Item
* Graph Event

> [!NOTE]
> Sorting is not supported on all the attributes of the respective Graph resources. If a user tries to sort on a virtual table with an unsupported attribute, this result set will have its default order. This is the same behaviour as the Dataverse Web API on columns that don't support sorting.

Examples:

* GET [Organization URI]/api/data/v9.2/m365_graphdriveitems?$filter=m365_collaborationrootid eq ‘00000000-0000-0000-0000-000000000000’&$orderby=m365_name desc
* GET [Organization URI]/api/data/v9.2/m365_graphevents?$filter=m365_groupid eq ‘00000000-0000-0000-0000-000000000000’$orderby=m365_subject asc

## Virtual table filtering

With the virtual tables, you can use the OData $filter query parameter to set criteria for which rows are returned. The virtual tables are queried using the same OData operators that are supported by the Dataverse Web API.

* **Comparison operators**

  |Operator|Description|Example|
  |----|----|----|
  |eq|Equal|$filter=m365_name eq ‘Contoso’|
  |ne|Not Equal|$filter=m365_name ne ‘Contoso’|
  |gt|Greater Than|$filter=m365_price gt 50.0|
  |ge|Greater Than or Equal|$filter=m365_price ge 50.0|
  |lt|Less Than|$filter=m365_price lt 50.0|
  |le|Less Than or Equal|$filter=m365_price le 50.0|

* **Logical operators**

  |Operator|Description|Example|
  |----|----|----|
  |and|Logical and |$filter=m365_name eq ‘Contoso’ and m365_price eq 50.0|
  |or|Logical or |$filter=m365_name ne ‘Contoso’ or m365_price eq 50.0|
  |not|Logical negotiation |$filter=not contains(m365_name,’Contoso’)|

* **Grouping operators**

  |Operator|Description|Example|
  |----|----|----|
  |( )|Precedence grouping |$filter=(m365_name eq ‘Contoso’ and m365_price eq 50.0) or contains(m365_subject,’Team Sync’)|

* **Query Functions**

  |Function |Example |
  |----|----|
  |contains|$filter=contains(m365_name,’Contoso’)|
  |endswith|$filter=endswith(m365_name,’Contoso’)|
  |startswith|$filter=startswith(m365_name,’Contoso’)|

**Supported Tables**: Each virtual table supports the same filtering functionality as it’s respective Graph resource. The virtual tables, which support filtering are:

* Graph Booking Appointment
* Graph Drive Item
* Graph Event

> [!Note]
> Filtering is not supported on all the attributes of the respective Graph resources. If a user tries to filter on a virtual table with an unsupported attribute, this filter is ignored. This is the same behaviour as the Dataverse Web API on columns that don't support filtering.

Examples:

* GET [Organization URI]/api/data/v9.2/m365_graphbookingappointments?$filter=m365_bookingbusinessid eq ‘ContosoBank@Contoso.onmicrosoft.com’ and m365_price eq 100.0
* GET [Organization URI]/api/data/v9.2/m365_graphdriveitems?$filter=m365_collaborationrootid eq ‘00000000-0000-0000-0000-000000000000’ and m365_name eq ‘Meeting Notes.docx’
* GET [Organization URI]/api/data/v9.2/m365_graphevents?$filter=m365_groupid eq ‘00000000-0000-0000-0000-000000000000’ and m365_subject eq ‘Monthly Sync’

## Virtual table pagination

Pagination is a useful resource for fetching a large set of records. Virtual Table pagination can be achieved in three different ways.

You can specify the page size by using the `odata.maxpagesize` preference value in the request header. If the result set spans multiple pages, the response includes the `@odata.nextLink` property. Sample request and response are as following:

# [Request](#tab/request)

```http
  GET [Organization URI]/api/data/v9.2/m365_graphdriveitems 
  Accept: application/json 
  Prefer: odata.maxpagesize=2 
```

# [Response](#tab/response)

```json
{ 

  "@odata.context": "[Organization URI]/api/data/v9.0/$metadata#m365_graphdriveitems", 
  "value": [ 
   { 
      "@odata.etag": "W/\"{FA93AF7C-1F45-4714-85A5-BB95EB86E1E5}\"", 
      "m365_name": "Review.doc", 
      "m365_graphdriveitemid": "f50aae23-6644-3d35-66d7-e3c5a979dad3", 
      …
      },
      {
      "@odata.etag": "W/\"{3938D549-1AEF-46A5-BF3C-38472AD934C2}\"", 
      "m365_name": "Review.doc", 
      "m365_graphdriveitemid": "3d59a7e2-ec83-d0b3-270e-8ad676622027", 
      … 
      } 
      ],
      "@odata.nextLink": "[Organization URI]/api/data/v9.0/m365_graphdriveitems &$skiptoken=%3Ccookie%20pagenumber=%222%22%20pagingcookie=%22UGFnZWQ9VFJVRSZwX1NvcnRCZWhhdmlvcj0xJnBfRmlsZUxlYWZSZWY9dGVzdCZwX0lEPTI5%22%20istracking=%22False%22%20/%3E" 
} 
```

---

Currently the following Virtual Tables support the `odata.maxpagesize` preference:

* Graph Booking Appointment
* Graph Calendar Event
* Graph Drive
* Graph Drive Item

You can specify the number of records to return by passing the `$top` option in the URL. If you also need to specify the page number, you can do so by passing a paging cookie as an XML-encoded string as the `$skiptoken` option. To fetch a specific page number, you can pass the paging cookie in the following format:

  `<cookie pagenumber=3 />`

# [Request](#tab/request1)

```http
     GET [Organization URL]/api/data/v9.2/m365_graphevents?$top=2&$skiptoken=<cookie pagenumber='3' /> 
```

# [Response](#tab/response1)

```json

{
  "@odata.context": "[Organization URI]/api/data/v9.0/$metadata#m365_graphevents", 
  "value": [
   { 
      "@odata.etag": "W/\"{FA93AF7C-1F45-4714-85A5-BB95EB86E1E5}\"", 
      "m365_graphdeventid": "3d59a7e2-ec83-d0b3-270e-8ad676622027", 
      "m365_subject": "Important meeting", 
      …
    }, 
    {
      "@odata.etag": "W/\"{3938D549-1AEF-46A5-BF3C-38472AD934C2}\"", 
      "m365_graphdeventid": "f50aae23-6644-3d35-66d7-e3c5a979dad3", 
      "m365_subject": "Another important meeting", 
      …
    } 
  ] 
}

```

---

> [!Note]
> The response won't include the `@nextLink` property. If your use case requires the next page link to be returned, you can use the odata.maxpagesize preference header described in section 1 instead of passing the $top URI parameter.

Currently the following virtual tables support fetching a specific page:

* Graph Booking Appointment
* Graph Calendar Event

You can pass a fetch XML as an XML-encoded string. With the fetch XML option, you can specify several query preferences. The pagination specific options are page (page number) and count (page size). The following XML specifies the page number and size:

  `<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="<Page Number>" count="<Page Size>"></fetch>`

# [Request](#tab/request2)

```http
GET [Organization URL]/api/data/v9.2/m365_graphevents?$fetchXml=<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="3" count="2"></fetch> 

```

# [Response](#tab/response2)

```json
{ 

    "@odata.context": "[Organization URI]/api/data/v9.0/$metadata#m365_graphdevents", 
    "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie": "<cookie pagenumber=\"3\" pagingcookie=\"\" istracking=\"False\" />", 
    "value": [ 
        { 
            "@odata.etag": "W/\"{FA93AF7C-1F45-4714-85A5-BB95EB86E1E5}\"", 
            "m365_graphdeventid": "3d59a7e2-ec83-d0b3-270e-8ad676622027", 
            "m365_subject": "Important meeting", 
            …
        }, 
        { 
            "@odata.etag": "W/\"{3938D549-1AEF-46A5-BF3C-38472AD934C2}\"", 
            "m365_graphdeventid": "f50aae23-6644-3d35-66d7-e3c5a979dad3", 
            "m365_subject": "Another important meeting", 
            …
        } 
    ] 
} 

```

---

The following virtual tables support the count property to be passed as part of the fetchXml option:

* Graph Drive
* Graph Drive Item

The following virtual tables support the page property as part of the fetchXml option:

* Graph Booking Appointment
* Graph Calendar Event

## See also

* [Integrate web apps](integrate-web-apps-overview.md)
* [Get meeting transcripts using Graph APIs](../graph-api/meeting-transcripts/overview-transcripts.md)
