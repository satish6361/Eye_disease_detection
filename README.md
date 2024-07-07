# Eye Image Classification using Ensemble Model

## Overview

This project implements an ensemble model combining ResNet50, VGG19, and EfficientNet-b0 using a weighted average for eye image classification. The trained model is deployed through a FastAPI-based API for prediction, and a user-friendly web application built using the MERN stack integrates with this model to provide predictions.

## Table of Contents
- [Introduction](#introduction)
- [Model Details](#model-details)
- [API Setup](#api-setup)
- [Web Application](#web-application)
- [Installation](#installation)
- [Usage](#usage)


## Introduction

This project aims to classify eye images using an ensemble approach that leverages the strengths of ResNet50, VGG19, and EfficientNet-b0 models. By combining these models with a weighted average, the ensemble model achieves better accuracy and robustness.

## Model Details

- **ResNet50:** A deep residual network with 50 layers, known for its effectiveness in image classification tasks.
- **VGG19:** A 19-layer deep convolutional neural network that has been widely used in image classification.
- **EfficientNet-b0:** A model optimized for accuracy and efficiency, making it suitable for deployment in resource-constrained environments.

The ensemble model combines the outputs of these models using a weighted average to improve classification performance.

## API Setup

The trained model is saved and exposed through a FastAPI-based API. The API receives eye images and returns predictions from the ensemble model.

### API Endpoints

- **POST /predict:** Accepts an image file and returns the classification result.

## Web Application

A user-friendly web application built using the MERN stack (MongoDB, Express, React, Node.js) is integrated with the API for predictions. The web application provides an intuitive interface for users to upload eye images and receive classification results.

## Installation

### Prerequisites

- Python 3.7+
- Node.js 14+
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eye-image-classification.git
   cd eye-image-classification

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend

Install frontend dependencies:

npm install

Start the React development server:

npm start


