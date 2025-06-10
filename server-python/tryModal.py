from tensorflow.keras.models import load_model

model = load_model('clothing_classifier_model.h5')  # כאן שם הקובץ של המודל ששמרת


# Load the category mapping
with open('class_indices.json', 'r', encoding='utf-8') as f:
    index_to_class = json.load(f)

# Finding the predicted category
predicted_class_name = index_to_class[str(predicted_class)]
print("Predicted class:", predicted_class_name)
c

class_names = ['shirts', 'pants','skirts', 'dresses', 'shoses']
print("Predicted class:", class_names[predicted_class])
