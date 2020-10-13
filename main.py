from flask import Flask , render_template, jsonify, request, make_response

import tensorflow as tf
import numpy as np
import cv2
import os
import time

app = Flask(__name__) 

# model = tf.keras.models.load_model(os.path.join(os.getcwd(), 'VGG16.h5')) # load .h5 Model

@app.route("/") 
def home_view(): 
	params = {}
	return render_template('index.html', params = params)



@app.route('/upload', methods=['POST'])
def upload():
	params = {}

	if (request.method == 'POST'):
		try:
			img1 = request.files['imageIN1'] # Get Content Images from user
			img2 = request.files['imageIN2'] # Get Style Images from user

			# img.save(secure_filename(img.filename)) # for save image on server

			img1 = cv2.imdecode(np.fromstring(img1.read(), np.uint8), cv2.IMREAD_COLOR) # preprocessing on image 1
			img2 = cv2.imdecode(np.fromstring(img2.read(), np.uint8), cv2.IMREAD_COLOR) # preprocessing on image 2

			img1 = np.array(cv2.resize(img1 ,(224,224))) / 255.0
			img2 = np.array(cv2.resize(img2 ,(224,224))) / 255.0
						
			img1 = img1.reshape(-1, 224, 224 ,3)
			img2 = img2.reshape(-1, 224, 224 ,3)
			
			# prediction = model.predict(img) # get predictions on image
			# print(prediction)

			# params['status'] = True
		except:
			params['status'] = False
	return jsonify(params)

