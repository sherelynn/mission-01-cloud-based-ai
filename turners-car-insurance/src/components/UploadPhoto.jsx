import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

// The UploadPhoto component is a file uploader that allows users to upload an image file
const UploadPhoto = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)

  // This onDrop function is called when a file is dropped
  // The useCallback hook will prevent the function from being recreated on every render
  const onDrop = useCallback(
    // The acceptedFiles parameter is an array of files that have been accepted
    acceptedFiles => {
      // Clear any previous error, providing a clean slate for the new file
      setError(null)

      // Check if we have a file
      if (acceptedFiles.length === 0) {
        // If no files are accepted, the return statement will exit the function
        return
      }

      // Get the first file from the acceptedFiles array
      const file = acceptedFiles[0]

      // Check if the uploaded file's MIME type is an image
      if (!file.type.startsWith("image/")) {
        // If the file is not an image, set an error message
        setError("Only image files are allowed. Please upload a valid image.")

        // The return statement immediately terminates the function, preventing any further processing of the invalid file
        return
      }

      // Create a URL for the image preview
      const newImagePreview = URL.createObjectURL(file)

      // If there is an existing image preview, revoke the object URL to free up memory
      if (imagePreview && imagePreview !== newImagePreview) {
        URL.revokeObjectURL(imagePreview)
      }

      // Store the file for later use
      setUploadedFile(file)
      // Store the image preview URL
      setImagePreview(newImagePreview)

      // Pass the file to the parent component via callback
      if (onFileUpload) {
        onFileUpload(file)
      }
    },
    // The dependencies array ensures that the function is recreated only when the values in the array change
    // If the values do not change, the function is memoized and the same function is returned
    [imagePreview, setImagePreview, setError, onFileUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // The onDrop function is passed to the useDropzone hook
    onDrop,
    // The accept option restricts the file types that can be uploaded
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    // The maxFiles option restricts the number of files that can be uploaded
    maxFiles: 1,
  })

  // This function is called when the user clicks the clear (x) button
  const handleClearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setUploadedFile(null)
    setImagePreview(null)
  }

  return (
    <div className="upload-photo-container">
      <h2>Upload Car Photo</h2>

      <div
        // The getRootProps function returns props to be spread on the root element
        // This div element is the dropzone area where the user can drop files
        // The isDragActive variable is true when a file is being dragged over the dropzone
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "4px",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
        }}>
        {/* The getInputProps function returns props to be spread on the input element */}
        {/* This input element is hidden from view, but is still accessible to the 
        user */}
        {/* When the user clicks or drags a file, the input element will receive the file */}
        {/* The onDrop function will be called with the accepted files */}
        {/* The accept and maxFiles options are passed to the useDropzone hook // */}
        {/* The accept option restricts the file types that can be uploaded // The
        maxFiles option restricts the number of files that can be uploaded */}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the car image here...</p>
        ) : (
          <div>
            <p>Drag & drop a car image here, or click to select one</p>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>
              (Only *.jpeg, *.jpg and *.png images will be accepted)
            </p>
          </div>
        )}
      </div>

      {/* Display an error message if there is an error */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {/* Display the image preview if an image has been uploaded */}
      {imagePreview && (
        <div className="preview-container">
          <h3>Image Preview</h3>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={imagePreview}
              alt="Car preview"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "4px",
              }}
            />

            {/* The X Button to clear an image preview */}
            <button
              onClick={handleClearImage}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "white",
                border: "none",
                cursor: "pointer",
              }}>
              X
            </button>
          </div>

          {/* Display the file name and size of the image preview */}
          <div style={{ marginTop: "15px" }}>
            <p>
              <strong>File name:</strong> {uploadedFile?.name}
            </p>
            <p>
              <strong>File size:</strong>{" "}
              {(uploadedFile?.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadPhoto
