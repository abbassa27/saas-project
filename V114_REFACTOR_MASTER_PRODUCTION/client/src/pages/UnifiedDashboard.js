
// =====================
// 🚀 NEW FEATURE START: UNIFIED REAL DASHBOARD
// =====================
import React, { useEffect, useState } from "react";

export default function UnifiedDashboard(){
    const [data,setData]=useState(null);

    useEffect(()=>{
        fetch("/api/dashboard",{
            headers:{Authorization:"token"}
        })
        .then(r=>r.json())
        .then(setData);
    },[]);

    if(!data) return <p>Loading...</p>;

    return(
        <div style={{padding:40}}>
            <h1>📊 Real Dashboard</h1>
            <p>Users: {data.users.length}</p>
            <p>Revenue: {data.revenue}</p>
            <p>Leads: {data.leads.length}</p>
        </div>
    )
}
// =====================
// 🚀 NEW FEATURE END
// =====================
