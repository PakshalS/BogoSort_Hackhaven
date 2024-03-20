import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedFile(file);
  //       setImagePreview(reader.result);
  //     };
  //     // reader.readAsDataURL(file);
  //     const img = file.toDataURL();
  //     console.log(img)
  //   }
  // };
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
      // const formData = new FormData();
      // formData.append('image', selectedFile);

      axios.post('http://localhost:5000/',  {
       "base64" : {
        "image":imagePreview
       }
      })
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        // Handle success response
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        console.log(formData)
        // Handle error
      });
      const email = getEmailFromSession();
    } else {
      console.warn('No image selected for upload.');
    }
    console.log(imagePreview)
   
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

function getEmailFromSession() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'session_cookie_name') { // Replace 'session_cookie_name' with the name of your session cookie
          const sessionData = JSON.parse(decodeURIComponent(value));
          const email = sessionData.email; // Assuming email is stored in session data
          console.log('Email:', email);
          return email;
      }
  }
  console.log('Email not found');
  return null;
}

export default ImageUploader;