> [!WARNING]
> The Collaboration controls for model-driven applications are set to retire by May 2024. Retirement will be carried out in two phases to ensure a smooth transition. Following table details the timeline of the retirement process and its impacts:
>    
> | Timeframe | Action | Impact |
> |---|---|---|
> | February 2024 |Collaboration controls will no longer be available to install from AppSource.|- New deployments of the collaboration controls in Power Apps environments aren't possible. </br> - Existing installations aren't affected.|
> | May 2024 |The internal service that powers the controls will be retired.|- The controls will stop supporting integration with Microsoft 365 and will return errors to users. </br> Data generated and managed through the controls won't be impacted. For more information, see the table later in this article.|
>             
> Artifacts created and managed through the controls will continue to exist after the service is retired.
>            
> | Control | Impact |
> |---|---|
> | **Approvals** |Approvals created in the Approvals control will remain in the Approvals app but will no longer be accessible in the Approvals control.|
> | **Files** |Files managed in the Files control will remain in SharePoint but will no longer be accessible in the Files control.|
> | **Meetings** |Meetings created in the Meeting control will remain in Outlook and Teams calendars but will no longer be accessible in the Meetings control.|
> | **Notes** |Notes created in the Notes control will remain in the Dataverse notes table.|
> | **Tasks** |Tasks created in the Task control will remain in Planner but will no longer be accessible in the Task control.|
>          
> We recommend removing the Collaboration controls and Collaboration connector from all Power Apps solutions and prepare users for the upcoming Collaboration controls retirement. 