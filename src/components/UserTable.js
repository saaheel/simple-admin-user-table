import React, { useState, useEffect } from 'react'
import './UserTable.css';
import { API_URL } from '../config/AppConfig'
import MaterialDataTable from '../common/MaterialDataTable'
import {headerStyle, userColumns} from './UserTableConst'

export const UserTable = () => {
    
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(results => results.json())
            .then(data => {
                setUserData(data);
            });
    }, []);

    return (
        <div className="container">
            {
                !userData ? 
                'Loading...' : 
                <MaterialDataTable title={"User Details"} userData={userData} headerStyle={headerStyle} userColumns={userColumns} setUserData={setUserData} />
            }
        </div>
    );
}