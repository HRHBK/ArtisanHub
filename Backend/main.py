from flask import request, jsonify
from config import app, db
from models import Artisan, Customer, Product
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/register-artisan', methods=["POST"])
def register():
    """Register a new artisan
    ---
    tags:
      - Authentication
    description: Register a new artisan with name, email, telephone and password
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - artisan_name
            - artisan_email
            - artisan_tel
            - password
          properties:
            artisan_name:
              type: string
              example: "John Doe"
            artisan_email:
              type: string
              example: "john@example.com"
            artisan_tel:
              type: string
              example: "+1234567890"
            password:
              type: string
              example: "securepassword123"
    responses:
      200:
        description: Artisan registered successfully
        schema:
          type: object
          properties:
            access_token:
              type: string
              description: JWT access token
      400:
        description: Validation error
        schema:
          type: object
          properties:
            message:
              type: string
              example: "email already exists"
      500:
        description: Internal server error
    """
        
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 400
    
    artisan_name = request.json.get('artisan_name')
    artisan_email = request.json.get('artisan_email')

    check_artisan_name = db.session.execute(db.select(Artisan).where(Artisan.name==artisan_name)).scalar()
    check_artisan_email = db.session.execute(db.select(Artisan).where(Artisan.email==artisan_email)).scalar()

    if check_artisan_email:
        return jsonify({
            "message":"email already exists"
        })
    
    if check_artisan_name:
        return jsonify({
            "message":"name already exists"
        })
    
    # creating a new artisan 
    artisan = Artisan(
        name = artisan_name,
        email = artisan_email,
        tel = request.json.get('artisan_tel'),
        password = generate_password_hash(
            request.json.get("password"),
            method="pbkdf2:sha256", 
            salt_length=8
        )
    )

    with app.app_context():
        db.session.add(artisan)
        db.session.commit()
    
    access_token = create_access_token(identity=artisan_name)

    return jsonify(access_token=access_token), 200


@app.route('/login-artisan', methods=["POST"])
def login():

    """Authenticate an artisan
    ---
    tags:
      - Authentication
    description: Login an existing artisan with email and password
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - email
            - password
          properties:
            email:
              type: string
              example: "john@example.com"
            password:
              type: string
              example: "securepassword123"
    responses:
      200:
        description: Login successful
        schema:
          type: object
          properties:
            access_token:
              type: string
              description: JWT access token
      401:
        description: Unauthorized
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Incorrect password"
      404:
        description: Not found
        schema:
          type: object
          properties:
            message:
              type: string
              example: "User does not exist"
      500:
        description: Internal server error
    """

    artisan_email = request.json.get("email")
    password = request.json.get("password")

    with app.app_context():
        check_artisan = db.session.execute(db.select(Artisan).where(Artisan.email==artisan_email)).scalar()

        if not check_artisan:
            return jsonify({"message": "User does not exit"}), 401

        if check_artisan and not check_password_hash(check_artisan.password, password):
            return jsonify({"message": "Incorrect password"}), 401
        
        if check_artisan and check_password_hash(check_artisan.password, password):
            access_token = create_access_token(identity=artisan_email)
            return jsonify(access_token=access_token), 200
        
@app.route('/view-all-products', methods=['GET'])
def view_products():

    """Get all products
    ---
    tags:
      - Products
    description: Retrieve a list of all available products
    produces:
      - application/json
    responses:
      200:
        description: A list of products
        schema:
          type: object
          properties:
            products:
              type: array
              items:
                $ref: '#/definitions/Product'
      500:
        description: Internal server error
    """

    all_products = db.session.execute(db.select(Product)).scalars.all()

    if len(all_products) > 0:
        return jsonify({
            "products":[product.to_json() for product in all_products]
            }), 200
    
    return jsonify(products="No product exists"), 404

@app.route('/view-product/<prod_id:int>', methods=["GET"])
def view_product(prod_id):

    product = db.get_or_404(Product, prod_id)

    if product:
        return jsonify({
            "product": product.to_json()
        }), 200
    
    return jsonify(product="product not found"), 404

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5002)