import React, { useState, useEffect } from 'react'
import './UserTable.css';
import MaterialTable from 'material-table'
import TableIcons from '../config/TableIcons'
import { API_URL } from '../config/AppConfig'

export const UserTable = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(results => results.json())
            .then(data => {
                setUserData(data);
            });
      }, []);

    const headerStyle = {
        backgroundColor: '#039be5',
        color: '#FFF'
    }
    const userColumns = [
        {
            title:"ID", 
            field: "id",
            editable: 'never',
            headerStyle: headerStyle,
        },
        {
            title:"Name", 
            field: "name",
            headerStyle: headerStyle,
        },
        {
            title:"Email", 
            field: "email",
            headerStyle: headerStyle,
        },
        {
            title:"Role", 
            field: "role",
            editable: 'never',
            headerStyle: headerStyle,
        },
    ]

    return (
        <div className="container">
            {
                !userData ? 
                'Loading...' : 
                <MaterialTable 
                    icons={TableIcons}
                    title="User Details" 
                    data={userData}
                    columns={userColumns}
                    options={
                        { 
                            search:true,
                            actionsColumnIndex: -1,
                            exportButton: true,
                            exportAllData: true,
                            headerStyle: headerStyle,
                            selection: true,
                            initialPage: 0,
                            paging: true,
                            pageSize: 10,
                            pageSizeOptions: [10, 50, 100],
                            paginationType: 'stepped'
                        }
                    }
                    actions={[
                        {
                            tooltip: 'Remove All Selected Users',
                            icon: TableIcons.Delete,
                            onClick: (evt, deteteSelectedData) => {
                                setTimeout(() => {
                                    const currentUserData = [...userData];

                                    const toDeleteData = [];
                                    for(let getDeleteId of deteteSelectedData){
                                        toDeleteData.push(getDeleteId.id);
                                    }
                                    const filterUserData = currentUserData.filter((eachData) => {
                                        let {id} = eachData;
                                        return (toDeleteData.includes(id)) ? null : eachData;
                                    })
                                    setUserData(filterUserData);
                                }, 1000)
                            }
                        }
                    ]}
                    editable={{
                        onRowUpdate: (modifiedUserData, previousUserData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const updateUserData = [...userData];
                                    const index = previousUserData.tableData.id;
                                    updateUserData[index] = modifiedUserData;
                                    setUserData(updateUserData);
                                    
                                    // Further action
                                    resolve()
                                    reject()
                                }, 1000)
                            }),
                        onRowDelete: modifiedUserData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const deleteUserData = [...userData];
                                    const index = modifiedUserData.tableData.id;
                                    deleteUserData.splice(index, 1);
                                    setUserData(deleteUserData);
                                    
                                    // Further action
                                    resolve()
                                    reject()
                                }, 1000)
                            }),
                    }}
                />
            }
        </div>
    );
}