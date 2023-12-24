import React, {useState, useEffect} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Upload, message} from 'antd';
import "./FileUploader.css";

export default function FileUploader({setLogFile, setFileList}){
    const handleChange=({file, fileList})=>{
        if(file.status != 'uploading'){
            new Promise((resolve, reject) => {
                const reader=new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload=()=>resolve(reader.result);
                reader.onerror=error=>reject(error);
            }).then(b64=>{
                b64=b64.replace(/^data:application\/[a-z]+;base64,/, "");
                const json=JSON.parse(atob(b64));
                json.uid=file.uid;
                setLogFile(json);
                setFileList(fileList);
            });
        }
        if(file.status == 'done'){
            message.success(`File '${file.name}' caricato con successo`);
        }else if(file.status == 'error'){
            message.error(`Errore nel caricamento del file '${file.name}'`);
        }
    };

    const dummyRequest=({file, onSuccess})=>{
        setTimeout(()=>{
            onSuccess("ok");
        }, 0);
    };

    return(
        <div id="uploaderContainer">
            <Upload customRequest={dummyRequest} onChange={handleChange}>
                <h4>Carica il file "race-out.json":</h4>
                <Button icon={<UploadOutlined />}>Seleziona file</Button>
            </Upload>
        </div>
    );
}