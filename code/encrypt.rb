require 'openssl'
cipher = OpenSSL::Cipher.new('aes-256-cbc')
cipher.encrypt # We are encrypting
key = cipher.random_key
iv = cipher.random_iv

encrypted_string = cipher.update ENV["STR"]
encrypted_string << cipher.final
File.write('ruby-encrypted.txt', encrypted_string)

# puts encrypted_string
# puts 'encrypted text:' + encrypted_string
# puts 'key: ' + key
# puts 'iv: ' + iv
