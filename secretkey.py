import os

SECRET_KEY = os.urandom(24)
print(SECRET_KEY.hex())

JWT_SECRET_KEY = os.urandom(24)
print(JWT_SECRET_KEY.hex())
