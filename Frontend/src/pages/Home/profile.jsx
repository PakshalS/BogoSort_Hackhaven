import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

 
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedFile(file)
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    console.log(imagePreview)
   
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default ImageUploader;
