import React, {useState, useEffect} from 'react';
import {Table, Empty} from 'antd';
import './OverallClassification.css';

export default function OverallClassification({logFile}){
    const [data, setData]=useState([]);

    useEffect(()=>{
        if(logFile){
        }
    }, [logFile]);

    const columns=[
        {
            title: 'Pos.',
            dataIndex: 'position',
            key: 'position',
            rowScope: 'row'
        },
        {
            title: 'Pilota',
            dataIndex: 'driver',
            key: 'driver'
        },
        {
            title: 'Tempo',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Dist.',
            dataIndex: 'delta',
            key: 'delta'
        }
    ];

    return(
        <React.Fragment>
            <h4 id='title'>Classifica generale</h4>
            <div id='tableContainer'>
                <Table className='table' columns={columns} dataSource={data} pagination={false} locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Nessun dato presente'/>}}/>
            </div>
        </React.Fragment>
    );
}