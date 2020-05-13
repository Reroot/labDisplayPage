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
                var req = new XMLHttpRequest();
                //Insert API key & GET
                req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/opportunities(0d90be2d-1c67-463e-ac47-0d654fa42706)?$select=_accountid_value,_createdby_value,name,_owningteam_value,statuscode", false);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                req.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var result = JSON.parse(this.response);
                            blob = result;
                            var _accountid_value = result["_accountid_value"];
                            var _accountid_value_formatted = result["_accountid_value@OData.Community.Display.V1.FormattedValue"];
                            var _accountid_value_lookuplogicalname = result["_accountid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            var _createdby_value = result["_createdby_value"];
                            var _createdby_value_formatted = result["_createdby_value@OData.Community.Display.V1.FormattedValue"];
                            var _createdby_value_lookuplogicalname = result["_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            var name = result["name"];
                            var _owningteam_value = result["_owningteam_value"];
                            var _owningteam_value_formatted = result["_owningteam_value@OData.Community.Display.V1.FormattedValue"];
                            var _owningteam_value_lookuplogicalname = result["_owningteam_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            var statuscode = result["statuscode"];
                        } else {
                            Xrm.Utility.alertDialog;
                        }
                    }
                };
                req.send();
                return blob;
              }


        console.log(blob.entities[1]["name"]);
        return (<span></span>);
    }
    }

export default ComponentName;

