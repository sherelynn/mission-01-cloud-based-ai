import React, { useState, useEffect } from "react"
import axios from "axios"

const CarIdentifier = ({ file }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  // Function to analyze car image
  const analyzeCarImage = async file => {
    // Indicate that the image analysis process has started
    setIsProcessing(true)
    // Reset the error state before starting a new analysis
    setError(null)

    try {
      // Create form data to send file
      const formData = new FormData()
      formData.append("image", file)

      // Send the image to the Azure Computer Vision API
      // Use your own Azure Computer Vision API endpoint and key
      const response = await axios.post(
        `${
          import.meta.env.VITE_AZURE_COMPUTER_VISION_ENDPOINT
        }/vision/v3.2/analyze?visualFeatures=Tags,Description,Objects`,
        formData,
        {
          // Set headers for the request
          headers: {
            // Set the content type to multipart/form-data
            "Content-Type": "multipart/form-data",
            // Set the subscription key for the Azure Computer Vision API
            "Ocp-Apim-Subscription-Key": import.meta.env
              .VITE_AZURE_COMPUTER_VISION_KEY,
          },
        }
      )

      // Process response data
      // Check if the response contains tags
      // The tags array contains objects with information about the image content
      const tags = response?.data.tags
      // Filter the tags array to find car types
      const carTypes = tags.filter(tag =>
        [
          "sedan",
          "suv",
          "truck",
          "sports car",
          "minivan",
          "hatchback",
        ].includes(tag.name.toLowerCase())
      )

      // Set the vehicle details based on the car types found
      if (carTypes.length > 0) {
        setVehicleDetails(carTypes[0].name)
        // If no car types are found, check if the image is tagged as a car
      } else if (response.data.description.tags.includes("car")) {
        setVehicleDetails("car (specific type not identified)")
      } else {
        // If the image is not tagged as a car, set the vehicle details to "Not a recognized vehicle"
        setVehicleDetails("Not a recognized vehicle")
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  // Run analysis when file changes
  // This effect will run every time the file changes
  useEffect(() => {
    if (file) {
      analyzeCarImage(file)
    }
  }, [file])

  return (
    <div className="car-identifier">
      <h2>Car Identification</h2>

      {!file && <p>Please upload a car image to begin analysis</p>}

      {isProcessing && (
        <div>
          <p>Analyzing your car image... Please wait.</p>
        </div>
      )}

      {error && <div style={{ color: "red", marginTop: "15px" }}>{error}</div>}

      {vehicleDetails && !isProcessing && (
        <div
          className="results"
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f0f8ff",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}>
          <h3>Results</h3>
          <p>
            Vehicle Type: <strong>{vehicleDetails}</strong>
          </p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default CarIdentifier
