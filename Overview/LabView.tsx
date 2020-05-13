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
        {/* <TodoFetchOfOpps /> */}
    </div>
    </div>

    ); 
}



