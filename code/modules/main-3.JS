const csvConverter = require('./module-3.js')().parse

const csvString = `id,first_name,last_name,email,gender,ip_address
1,Rivi,Farguhar,rfarguhar0@arizona.edu,Female,246.93.153.167
2,Grannie,Randall,grandall1@sbwire.com,Male,57.52.197.66
3,Martyn,Top,mtop2@aboutads.info,Male,169.178.102.45
4,Teresa,Feldheim,tfeldheim3@latimes.com,Female,254.95.146.119
5,Lanie,Southcott,lsouthcott4@macromedia.com,Female,157.245.62.246
6,Kiley,Somerfield,ksomerfield5@t.co,Male,49.131.82.88
7,Margaretta,Camilio,mcamilio6@google.it,Female,218.214.222.23
8,Ashla,Griffitts,agriffitts7@w3.org,Female,110.172.54.8
9,Sawyer,Ghidotti,sghidotti8@weibo.com,Male,245.187.178.210
10,Allin,Bernadot,abernadot9@latimes.com,Male,15.162.216.199`

console.log(csvConverter(csvString))
