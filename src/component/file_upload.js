import React, { useState } from 'react';

function FileUpload() {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState([]);
    const [upload, setUpload] = useState([]);
    const [error, setError] = useState([])


    const handleUpload = () => {
        files.forEach((file, index) => {
            const formData = new FormData();
            // const form1 = formData.append('file', file);
            formData.append('file', file);
            // console.log(form1.files)
            console.log(files)
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress > 100) {
                    clearInterval(interval);
                    setUpload((prevStatus) => {
                        const status = [...prevStatus];
                        console.log(status)
                        status[index] = 'success';
                        return status;
                    });
                    alert(`File "${file.name}" uploaded successfully!`);
                } else {
                    setProgress((prevProgress) => {
                        const progress1 = [...prevProgress];
                        progress1[index] = progress;
                        return progress1;
                    });
                }
            }, 400);
            // if (files.length === 0) {
            //     alert('No files selected. Please choose a file to upload.');
            // }
            if (file.name === 'file.txt') {
                clearInterval(interval);
                setUpload((prevStatus) => {
                    const status = [...prevStatus];
                    status[index] = 'UploadError';
                    return status;
                });
                setError((prevError) => {
                    const errorMsg = [...prevError];
                    errorMsg[index] = `Error in uploading the file "${file.name}"`;
                    return errorMsg;
                });
            }
        });
    };

    const handleChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        console.log(selectedFiles, "selected files")
        setFiles(selectedFiles);
        setProgress(new Array(selectedFiles.length).fill(0));
        setUpload(new Array(selectedFiles.length).fill(''));
    };
    return (
        <div>
            <input type="file" multiple onChange={handleChange} />
            <br></br>
            <button onClick={handleUpload}>Upload</button>
            {files.map((file, index) => (
                <div key={index}>
                    <p>{file.name}</p>
                    <progress value={progress[index]} max={100} min={10} />
                    {upload[index] === 'success' && (
                        <p>{upload[index]}</p>
                    )}
                    {upload[index] === 'error' && (
                        <p>{error[index]}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FileUpload;
