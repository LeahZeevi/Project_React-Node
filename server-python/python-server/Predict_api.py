from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

model = load_model('clothing_classifier_model.h5')
with open('class_indices.json', 'r', encoding='utf-8') as f:
    index_to_class = json.load(f)


english_to_hebrew_translations = {
    "shirts": "חולצות",
    "pants": "מכנסים",
    "skirts": "חצאיות",
    "dresses": "שמלות",
    "shoses": "נעלים",
}
def translate_english_to_hebrew(english_category_name):
    return english_to_hebrew_translations.get(english_category_name, english_category_name)

@app.route('/predict', methods=['POST'])
def predict():
    print("request.files:", request.files)
    print("request.files:", request.files)  # מדפיס את כל הקבצים שנשלחו
    if 'image' not in request.files:
        return jsonify({'error': 'לא התקבלה תמונה'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Processes the image
    img = image.load_img(filepath, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predictor
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)  # מספר כמו 0, 1, 2
    predicted_class_name = index_to_class[str(predicted_class)]  # מחרוזת כמו "shirts"

    # Hebrew translation
    hebrew_predicted_category = translate_english_to_hebrew(predicted_class_name)

    # Returning the result
    return jsonify({'predicted_class': hebrew_predicted_category})


if __name__ == '__main__':
    app.run(port=5000, debug=True)
