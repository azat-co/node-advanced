import os
str = os.environ['STR'] 
import hashlib
hash_object = hashlib.sha512(str.encode())
hex_dig = hash_object.hexdigest()
print(hex_dig)