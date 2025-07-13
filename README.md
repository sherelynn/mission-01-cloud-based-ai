# Mission 1 - Turners Car Insurance AI Solution

A cloud-based web application prototype that uses AI to identify vehicle types from uploaded photos for Turners Car Insurance premium calculations.

## Project Overview

This project demonstrates an AI-powered solution for Turners Car Auctions' motor vehicle insurance system redesign. The application allows users to upload car photos and automatically identifies vehicle types (sedan, SUV, truck, sports car, etc.) using Azure Computer Vision services.

## Installation

Navigate to the project directory and install dependencies:

```bash
cd turners-car-insurance
npm install
```

Set up your Azure Computer Vision API credentials in a `.env` file:

```
VITE_AZURE_COMPUTER_VISION_ENDPOINT=your_azure_endpoint
VITE_AZURE_COMPUTER_VISION_KEY=your_azure_key
```

Start the development server:

```bash
npm run dev
```

## Technology Stack

- **Frontend**: React 19 with Vite
- **AI Service**: Azure Computer Vision API
- **Key Libraries**: Axios, React Dropzone
- **Styling**: Modern CSS with responsive design

## Features

- Drag-and-drop photo upload interface
- Real-time AI vehicle type identification
- Clean, user-friendly design
- Integration with Azure cognitive services

This project fulfills the requirements for Mission Ready's Mission 1 individual assignment.
