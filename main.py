from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os 

app = Flask(__name__)
CORS(app)

MONGODB_URI = os.environ.get("MONGODB_URI")
client = MongoClient(MONGODB_URI)
db = client.get_database("petadoption")  

# Register endpoint
@app.route("/register", methods=['POST'])
def register_user():
    data = request.json
    user_email = data.get('email')
    user_password = data.get('password')

    existing_user = db.users.find_one({"email": user_email})
    if existing_user:
        return jsonify({"error": "Email already in use"}), 400
    else:
        print(f"User email: {user_email}")  
        print(f"User password: {user_password}") 
        db.users.insert_one({
            "email": user_email,
            "password": user_password
        })
    return jsonify({"message": "User registered successfully"})


# Login endpoint
@app.route("/login", methods=['POST'])
def login_user():
    try:
        data = request.json
        user_email = data.get('email')
        user_password = data.get('password')

        user = db.users.find_one({"email": user_email, "password": user_password})
    
        if user:
            print("Email:", user_email)
            print("Password:", user_password)
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add Pet
@app.route("/addpet", methods=['POST'])
def add_pet():
    data = request.json
    pet_name = data.get('name')
    pet_age = data.get('age')
    pet_gender = data.get('gender')
    pet_breed = data.get('breed')

    db.pets.insert_one({
        "name": pet_name,
        "age": pet_age,
        "gender": pet_gender,
        "breed": pet_breed
    })
    return jsonify({"message": "Pet added successfully"})

# Remove Pet
@app.route("/removepet", methods=['POST'])
def remove_pet():
    try:
        data = request.json
        pet_id = data.get('id')

        pet_object_id = ObjectId(pet_id)

        result = db.pets.delete_one({"_id": pet_object_id})

        if result.deleted_count == 1:
            return jsonify({"message": "Pet removed successfully"})
        else:
            return jsonify({"error": "Pet not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Fetch Cats
@app.route("/getpets", methods=['GET'])
def get_pets():
    pets = list(db.pets.find({}))
    pets_json = [{'name': pet['name'], 'gender': pet['gender'], 'age': pet['age'], 'breed': pet['breed'], '_id': str(pet['_id'])} for pet in pets]
    return jsonify({"pets": pets_json})


if __name__ == "__main__":
    app.run(debug=True)

