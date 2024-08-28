import React from "react";
import "./Elements.css"

const APIStatus = {
    OK: "OK", 
    Error: "Connection error", 
    NotSet: "No API configured"
}
   
function APIStatusIndicator({api}) {
    if (api != null && api.status === APIStatus.OK) {
        return (
            <div className="server-header">
                <div className="server-status" > Server Status: 🟢 Connected </div>
            </div>
        );
    }
    if (api != null && api.status === APIStatus.Error) {
        console.log(api.error)
        return (
            <div className="server-header">
                <div className="server-status" > Server Status: 🔴 Connection Error </div>
            </div>
        );
    }

    return (
        <div className="server-header">
            <div className="server-status" > Server Status: ⚪️ Not Configured </div>
        </div>
    );
}

export { APIStatusIndicator, APIStatus };