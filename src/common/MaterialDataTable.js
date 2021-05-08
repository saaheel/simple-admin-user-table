import React from 'react';
import MaterialTable from 'material-table'
import TableIcons from '../config/TableIcons'

const MaterialDataTable = ({title, userData, headerStyle, userColumns, setUserData}) => {
    return ( 
        <MaterialTable 
            icons={TableIcons}
            title={title} 
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
    );
}
 
export default MaterialDataTable;