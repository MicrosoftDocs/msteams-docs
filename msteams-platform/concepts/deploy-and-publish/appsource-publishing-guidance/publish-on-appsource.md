---
title: Microsoft Teams app approval process guidance
description: Describes the approval process for getting your app published to the Microsoft Teams app store
keywords: teams publish store office publishing AppSource
---

# Overview of Microsoft Teams app submission process

1. Develope or Migrate: Develope your app following our design guidelines
2. Debug and test: Make sure your app meets all the Test and debug criteria
3. Prepare your app: Make sure your app passes the [submission checklist]()
3. Submission prerequisites: Make sure you satisfy all the [submission prerequisites]().
4. Testing Notes: Include proper [Test Notes for validation](#Test-Notes-for-validation/approval)
5. Tips: Go through our [tips for submission](Tips-for-successful-app-submission) for a quicker submission process/ 
6. Validation: [Submit your app in partner center]() 
7. Update: Make sure your app adhere to our [expectation for Teams App]() 

### Test Notes for validation/approval

You must provide at least two login credentials, one admin and one not, so your app can be validated.

* The accounts you provide should have sufficient data pre-populated for verification purposes.
* For enterprise apps, apps where a subscription is required, or where there is an office 365 tenant/domain dependency for testing you must provide an 3rd account in the same domain that is not already configured to use your app so we can validate the first-run user experience.
* If your app has any Premium/Upgraded features, an account with the necessary access must be provided to test that experience.
* You may choose to upload your test notes to SharePoint. In such cases, please provide a public link to the file.

### Submission prerequisites
TODO: Any accounts developer need to register etc.  

### Tips for successful app submission
* Do not make changes to your app while validation is in progress. This will require a complete re-validation of your app.
* Your app  must not stop responding, end unexpectedly, or contain programming errors. If there is an issue it should fail gracefully with a valid way forward message to user.
* Your app must not automatically download, install or launch any executable code on the user's environment. Any download should seek an explicit permission from the user.
