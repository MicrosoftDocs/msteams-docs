---
title: API-based message extension FAQ
author: v-ypalikila
description: Learn how to troubleshoot common issues encountered with API Message Extensions. 
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 03/27/2024
---

# API-based message extensions FAQ

Get answers to common questions about API-based message extensions.
<br>

<details><summary> Q. What are the key elements to check in an app manifest for a successful deployment?</summary>

* Make sure that the app manifest version is "devPreview"
* The paths to the apiSpecificationFile and apiResponseRendering template must be relative paths.
* Make sure that the command Ids match exactly with the operation Ids defined in the OpenAPI spec file
* Make sure that the parameters for each command match exactly with the names of the parameters defined for the operation in the OpenAPI spec.

</details>
<br>

<details><summary> Q. What are the best practices for troubleshooting issues with an OpenAPI spec?</summary>

Make sure that the OpenAPI spec adheres to the limitations defined in [build API-based message extension](build-api-based-message-extension.md#OAD).

</details>
<br>

<details><summary> Q. How do you ensure that a response rendering template is correctly formatted and functional?</summary>

Call the API using Fiddler or Postman to make sure the requests look correct, and the response is valid. Also grab a sample response to use for validating the response rendering template. Teams only supports up to version 1.5 for adaptive cards but the designer supports up to version 1.6.

</details>
<br>

<details><summary> Q. What are the guidelines for using JSON Path in adaptive card templates?</summary>

The JSON Path is optional but should be used for arrays or where the object to be used as the data for the adaptive card isn't the root object. The JSON path should follow the format defined by Newtonsoft here
If the JSON path points to an array, then each entry in that array is bound with the adaptive card template and returns as separate results.

**Example**
Let's say you have the below JSON for a list of products and you want to create a card result for each entry.

```json
{
   "version": "1.0",
   "title": "All Products",
   "warehouse": {
      "products": [
        ...
      ]
   }
}
```

As you can see, the array of results is under "products", which is nested under "warehouse", so the JSON path would be "warehouse.products"

Use <https://adaptivecards.io/designer/> to preview the adaptive card by inserting the template into Card Payload Editor, and take a sample response entry from your array or for your object and insert it into the Same Data editor on the right. Make sure that the card renders properly and is to your liking.
Note that Teams supports cards up to version 1.5 while the designer supports 1.6.

</details>
<br>

<details><summary> Q. What steps should be taken to validate a package before submission?</summary>

Use [Teams app validator](https://dev.teams.microsoft.com/validation) to validate that the package, including the app manifest and OpenAPI spec file are valid.

</details>
<br>

<details><summary> Q. How can I dentify API request issues?</summary>

Analyzing network traces and standardized errors can be instrumental in identifying and resolving API request issues.

* **Network Trace Analysis**: By filtering the network trace for “invoke” actions, you can examine the standardizedError returned in the response. This error provides detailed information about what went wrong with the API request.

* **Error Codes and Messages**: The standardizedError object includes an errorCode, errorSubCode, and an errorDescription. For example, a 412 error code with a description of “Missing required parameter term” indicates that a required parameter was not included in the request.

* **Common HTTP Error Responses**:
  * A 400 Bad Request error may occur if a request parameter is missing or incorrectly formatted.
  * A 401 Unauthorized or 403 Forbidden error suggests issues with the API key, such as it being missing or unauthorized.
  * A 500 Internal Server Error indicates that the service does not know how to respond, possibly due to a server-side issue.

* **Headers and Parameters**: Ensure that all necessary headers are defined in the request and that all required parameters are included.

* **Troubleshooting with Tools**: If the information from the network trace is insufficient, you can construct a request following the API spec and use tools like Fiddler or Postman to test the request, including the authorization header for the API key if necessary.

</details>
<br>