import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Calculator from "./Calculator";
import TodoFetchOfOpps from "./TodoComponent/TodoFetchOfOpps";

export interface LabReativeInfo {
    EntityCollectionName: string;
    TotalCount: number;
}

export interface LabViewProps {
    id: string;
    context: ComponentFramework.Context<IInputs>;
}


export const LabView: React.FC<LabViewProps> = (overviewProps: LabViewProps) => {
    const fetchOpportunities = (blob) => {
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/opportunities?$select=_accountid_value,_createdby_value,name,_owningteam_value,statuscode", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\",odata.maxpagesize=400");
        req.setRequestHeader("Authorization", "Bearer " + "0d90be2d-1c67-463e-ac47-0d654fa42706"); //Replace token with your token value
        req.onreadystatechange = function() {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    blob = results;
                    for (var i = 0; i < results.value.length; i++) {
                        var _accountid_value = results.value[i]["_accountid_value"];
                        var _accountid_value_formatted = results.value[i]["_accountid_value@OData.Community.Display.V1.FormattedValue"];
                        var _accountid_value_lookuplogicalname = results.value[i]["_accountid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _createdby_value = results.value[i]["_createdby_value"];
                        var _createdby_value_formatted = results.value[i]["_createdby_value@OData.Community.Display.V1.FormattedValue"];
                        var _createdby_value_lookuplogicalname = results.value[i]["_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var name = results.value[i]["name"];
                        var _owningteam_value = results.value[i]["_owningteam_value"];
                        var _owningteam_value_formatted = results.value[i]["_owningteam_value@OData.Community.Display.V1.FormattedValue"];
                        var _owningteam_value_lookuplogicalname = results.value[i]["_owningteam_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var statuscode = results.value[i]["statuscode"];
                    }
                } else {
                    Xrm.Utility.alertDialog;
                }
            }
        };
        req.send();
        return blob;
      }
    const [relatedRecords, setRelatedRecords] = React.useState(Array<LabReativeInfo
    >());

    React.useEffect(() => {
        const retrieveAndSetData = async () => {
            let relatedRecords = await retrieveData(overviewProps.context, overviewProps.id);
            setRelatedRecords(relatedRecords);
        }
        retrieveAndSetData();
    },[overviewProps.id]);


    const retrieveData = async (context: ComponentFramework.Context<IInputs>, id: string) => {


        if(context.userSettings.userName==="")//local environment
        {

           return  [{ EntityCollectionName: "Activities", TotalCount: 24 }, 
                    { EntityCollectionName: "Cases", TotalCount: 32},
                    { EntityCollectionName: "Opportunities", TotalCount: 40 }];
        }


        let activityFilter = `?$filter=_regardingobjectid_value eq ${id}&$apply=aggregate($count as ActivityCount)`;
        let activityResponse = await context.webAPI.retrieveMultipleRecords("activitypointer", activityFilter);

        let relatedRecords = Array<LabReativeInfo
    >();
        if (activityResponse && activityResponse.entities && activityResponse.entities.length === 1) {
            let entity = activityResponse.entities[0];
            let activityCount = entity["ActivityCount"] as number;
            relatedRecords.push({ EntityCollectionName: "Activities", TotalCount: activityCount });
        }

        let caseFilter = `?$filter=_customerid_value eq ${id}&$apply=aggregate($count as CaseCount)`;
        let caseResponse = await context.webAPI.retrieveMultipleRecords("incident", caseFilter);
        if (caseResponse && caseResponse.entities && caseResponse.entities.length === 1) {
            let entity = caseResponse.entities[0];
            let caseCount = entity["CaseCount"] as number;
            relatedRecords.push({ EntityCollectionName: "Cases", TotalCount: caseCount });
        }


        let opportunityFilter = `?$filter=_customerid_value eq ${id}&$apply=aggregate($count as OpportunityCount)`;
        let opportunityResponse = await context.webAPI.retrieveMultipleRecords("opportunity", opportunityFilter);
        if (opportunityResponse && opportunityResponse.entities && opportunityResponse.entities.length === 1) {
            let entity = opportunityResponse.entities[0];
            let opportunityCount = entity["OpportunityCount"] as number;
            relatedRecords.push({ EntityCollectionName: "Opportunities", TotalCount: opportunityCount });
        }

        return relatedRecords;


    }

    let relatedRecordsInfo: any = null;
    if (relatedRecords && relatedRecords.length > 0) {
        relatedRecordsInfo = (
            relatedRecords.map((relatedRecord: LabReativeInfo
            ) => (
            <div key={relatedRecord.EntityCollectionName} className={"overviewItem"}>
                <div className={"itemTitle"}>{relatedRecord.TotalCount}</div>
                <div className={"itemSubTitle"}>{relatedRecord.EntityCollectionName}</div>
            </div>
            ))
            );
        }

return (
    <div className= {"overviewCont"}>
    {relatedRecordsInfo}    
    <div>
        <Calculator />
        console.log(blob);
        {/* <TodoFetchOfOpps />  */}
    </div>
    </div>

    ); 
}



