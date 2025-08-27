import { ChangeEvent, useState } from 'react';

export default function FileUploader() {
    
    const [file,setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return;
    }

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
          await fetch("http://localhost:5000/upload-csv", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData
          });
          setUploadStatus('uploaded');
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

      {file && uploadStatus !== "uploading" && <button onClick={handleUpload}>Upload</button>}
    </div>
    
  );
}

