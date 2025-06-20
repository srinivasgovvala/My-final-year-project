import sys
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer

# Load the saved model and vectorizer
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

# Read the comment passed as an argument
comment = sys.argv[1]

# Transform the comment using the loaded vectorizer
comment_vec = vectorizer.transform([comment])

# Predict the labels for the comment
predictions = model.predict(comment_vec)

# Print the predictions (comma-separated) to be captured by Node.js
print(','.join(map(str, predictions[0])))
