from flask import Flask, request, jsonify
from pymongo import MongoClient
import os 

app = Flask(__name__)

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

    # Insert user data into MongoDB
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

        # Check if user exists in the database
        user = db.users.find_one({"email": user_email, "password": user_password})
    
        if user:
            print("Email:", user_email)
            print("Password:", user_password)
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=True)

