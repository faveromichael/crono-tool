import React, {useState, useEffect} from 'react';
import {Table, Empty} from 'antd';
import './StageClassification.css';

export default function StageClassification({logFile}){
    const [data, setData]=useState([]);

    useEffect(()=>{
        if(logFile){
            setData([]);

            // CAPIRE SE L'ARRAY DEI BESTLAPS E' GIA' ORDINATO IN BASE AI LAPTIME
            logFile.sessions[0].bestLaps.sort(function(lap1, lap2){return lap1.time - lap2.time});

            logFile.sessions[0].bestLaps.forEach((lap, i) => {
                let driver=logFile.players[lap.car];
                let laptime=parseLapTime(lap.time);
                let delta=null;
                if(i>0) delta=calcDelta(lap.time, logFile.sessions[0].bestLaps[i-1].time);

                let row={
                    key: i,
                    position: i + 1,
                    driver: driver.name,
                    time: laptime,
                    delta: delta
                };
                setData(data => [...data, row]);
            });
        }
    }, [logFile]);

    const parseLapTime=laptime=>{
        laptime=laptime / 3600000;
        let hh=Math.floor(laptime);
        let min=Math.floor((laptime - hh) * 60);
        let sec=Math.floor(((laptime - hh) * 60 - min) * 60);
        let mls=Math.round((((laptime - hh) * 60 - min) * 60 - sec) * 1000);

        if(hh>0) return `${hh.toString()}:${min.toString().padStart(2, "0")}'${sec.toString().padStart(2, "0")}.${mls.toString().padEnd(3,"0")}`;
        if(min>0) return `${min.toString()}'${sec.toString().padStart(2, "0")}.${mls.toString().padEnd(3,"0")}`;
        else return `${sec.toString().padStart(2, "0")}.${mls.toString().padEnd(3,"0")}`;
    };

    const calcDelta=(currLaptime, precLaptime)=>{
        let delta=currLaptime - precLaptime;
        return parseLapTime(delta);
    };

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
            <h4 id='title'>Classifica di PS</h4>
            <div id='tableContainer'>
                <Table className='table' columns={columns} dataSource={data} pagination={false} locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Nessun dato presente'/>}}/>
            </div>
        </React.Fragment>
    );
}