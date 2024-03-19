import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      axios.post('http://localhost:5025/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('Image uploaded successfully:', response);
        // Handle success response
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        // Handle error
      });
    } else {
      console.warn('No image selected for upload.');
    }
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreview && (
        <div>
          <h3>Preview:</h3>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUploader;
