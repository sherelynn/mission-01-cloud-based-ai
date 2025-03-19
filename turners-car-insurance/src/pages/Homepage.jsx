import React, { useState } from "react"
import UploadPhoto from "../components/UploadPhoto"
import CarIdentifier from "../components/CarIdentifier"

const Homepage = () => {
  const [uploadedCarFile, setUploadedCarFile] = useState(null)

  const handleFileUploaded = file => {
    setUploadedCarFile(file)
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Turners Car Insurance</h1>

      <UploadPhoto onFileUpload={handleFileUploaded} />

      {uploadedCarFile && (
        <div style={{ marginTop: "30px" }}>
          <CarIdentifier file={uploadedCarFile} />
        </div>
      )}
    </div>
  )
}

export default Homepage
