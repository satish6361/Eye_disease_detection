from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "../saved_models/1"

try:
    MODEL = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading the model: {e}")

CLASS_NAMES = ['Normal', 'Cataract', 'Glaucoma', 'Retina_disease']

@app.get("/hello")
async def hello():
    return "Hello , working"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image



@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    resized_image = Image.fromarray(image).resize((180, 180))
    img_batch = np.expand_dims(resized_image,0)
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        # 'status':200,
        'class':predicted_class,
        # 'confidence': float(confidence)
    }


if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=5000)