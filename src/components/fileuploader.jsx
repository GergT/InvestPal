import { ChangeEvent, useState } from 'react';
import { apiFetch } from '../utils/api';
import './fileuploader.css';

export default function FileUploader( { onUploadSuccess } ) {
    
    const [file,setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');


    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    async function handleUpload(){
      if (file){
        setUploadStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);
        try{
          await apiFetch("http://localhost:5000/upload-csv", {
            method: "POST",
            body: formData
          });
          setUploadStatus('uploaded');
          onUploadSuccess();

        }catch (error) {
          console.error('Error uploading file:', error);
          setUploadStatus('error');
          console.log(error);
        }
      }else{
        return;
      }
    }
    return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {file && (uploadStatus !== "uploading" || uploadStatus === "uploaded") && <button onClick={handleUpload}>Upload</button>}
      {uploadStatus === 'uploading' && (
        <div className="upload-progress">
          <p>Uploading file...</p>
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </div>
      )}

    </div>
    
  );
}

