from tflite_runtime.interpreter import Interpreter
import numpy as np
from PIL import Image
import flask
from flask import request, Flask, jsonify
import base64
from flask_cors import CORS
import json

app = flask.Flask(__name__)

app.config["DEBUG"] = True

CORS(app)

top_k_results = 1

model_path = "C:\MyAIDermatologist\TFLite\model.tflite"
label_path = "C:\MyAIDermatologist\TFLite\labels.txt"


def predictDisease(file):
    with open(label_path, 'r') as f:
        labels = list(map(str.strip, f.readlines()))

    # Load TFLite model and allocate tensors
    interpreter = Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    # Get input and output tensors.
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Read image
    img = Image.open(file).convert('RGB')

    # Get input size
    input_shape = input_details[0]['shape']
    size = input_shape[:2] if len(input_shape) == 3 else input_shape[1:3]

    # Preprocess image
    img = img.resize(size)
    img = np.array(img)

    # Add a batch dimension
    input_data = np.expand_dims(img, axis=0)

    # Point the data to be used for testing and run the interpreter
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()

    # Obtain results and map them to the classes
    predictions = interpreter.get_tensor(output_details[0]['index'])[0]

    # Get indices of the top k results
    top_k_indices = np.argsort(predictions)[::-1][:top_k_results]

    final_prediction = labels[top_k_indices[0]]
    return final_prediction


@app.route('/getPrediction', methods=['POST'])  #GET requests will be blocked
def getPrediction():
    req_data = request.get_json()
    imgasStr = req_data['imgdata']

    imgasbytes = imgasStr.encode()

    with open("img.png", "wb") as fh:
        fh.write(base64.decodebytes(imgasbytes))

    result = predictDisease("img.png")
    tempResult = {"result": result}
    print(tempResult)
    return json.dumps(tempResult)

app.run()
