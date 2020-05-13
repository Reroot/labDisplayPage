import * as React from 'react';
//Install-Package xrm-2015.TypeScript.DefinitelyTyped -Version 1.0.3
//dotnet add package xrm-2015.TypeScript.DefinitelyTyped --version 1.0.3
//npm install --save-dev xrm-webapi
//npm install --save @types/xrm --THIS IS THE ONE THE FIXES XRM
import {
    associate,
    batchOperation,
    boundAction,
    ChangeSet,
    create,
    createWithReturnData,
    deleteProperty,
    deleteRecord,
    disassociate,
    FunctionInput,
    parseGuid,
    retrieve,
    retrieveMultiple,
    retrieveMultipleNextPage,
    unboundAction,
    update,
    updateProperty,
    WebApiConfig
}  from "xrm-webapi/dist/xrm-webapi-node";

const blob: any = "";


// interface ComponentNameProps {
// };

// interface ComponentNameState {};
//<ComponentNameProps, ComponentNameState>
class ComponentName extends React.Component {

    public render(): JSX.Element {

            const fetchOpportunities = (blob) => {
                Xrm.WebApi.online.retrieveMultipleRecords("opportunity", "?$select=_accountid_value,_createdby_value,name,_owningteam_value,statuscode&$top=400").then(
                    function success(results) {
                        blob = results;
                        for (let i = 0; i < results.entities.length; i++) {
                            let _accountid_value = results.entities[i]["_accountid_value"];
                            let _accountid_value_formatted = results.entities[i]["_accountid_value@OData.Community.Display.V1.FormattedValue"];
                            let _accountid_value_lookuplogicalname = results.entities[i]["_accountid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            let _createdby_value = results.entities[i]["_createdby_value"];
                            let _createdby_value_formatted = results.entities[i]["_createdby_value@OData.Community.Display.V1.FormattedValue"];
                            let _createdby_value_lookuplogicalname = results.entities[i]["_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            let name = results.entities[i]["name"];
                            let _owningteam_value = results.entities[i]["_owningteam_value"];
                            let _owningteam_value_formatted = results.entities[i]["_owningteam_value@OData.Community.Display.V1.FormattedValue"];
                            let _owningteam_value_lookuplogicalname = results.entities[i]["_owningteam_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            let statuscode = results.entities[i]["statuscode"];
                        }
                    },
                    function(error) {
                        Xrm.Utility.alertDialog;
                    }
                );
                return blob;
              }


        console.log(blob.entities[1]["name"]);
        return (<span>blob.entities[1]["name"]</span>);
    }
    }

export default ComponentName;

