import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

 
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

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      axios.post('http://localhost:5000/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        // Do something with the response if needed
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
      });
    } else {
      console.warn('No image selected for upload.');
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
