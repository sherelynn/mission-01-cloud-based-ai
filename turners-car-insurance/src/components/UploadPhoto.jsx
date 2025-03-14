import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

const UploadPhoto = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)

  const onDrop = useCallback(
    acceptedFiles => {
      setError(null)

      // Check if we have a file
      if (acceptedFiles.length === 0) {
        console.log("No files accepted")
        return
      }

      const file = acceptedFiles[0]
      console.log("File object: ", file)
      console.log("File type: ", file.type)

      // Check if the uploaded file is an image
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed. Please upload a valid image.")
        console.log("The uploaded file is not an image.")
        return
      }

      // Revoke previous preview URL
      const newImagePreview = URL.createObjectURL(file)
      if (imagePreview && imagePreview !== newImagePreview) {
        URL.revokeObjectURL(imagePreview)
      }

      // Store the file for later use
      setUploadedFile(file)

      setImagePreview(newImagePreview)
    },
    [imagePreview, setImagePreview, setError]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  })

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

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

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
            <button
              onClick={handleClearImage}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255,255,255,0.7)",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}>
              ×
            </button>
          </div>
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
