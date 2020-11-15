# Flag API
this is a flag API currently in αlpha

# Use Case
The main usage intention for this flag API is to simply have an endpoint for a  <img src="image.svg"> html. or any other information helpful to users in JSON object form related to maps.

The API endpoint can be use by any program that can work with images, SVGs, URLs, or JSONs

# Use
You can use this API in the way you use most APIs, I will give some examples.
# Why are the documents the way they are?
```
People don't want to know how to do things line by line...
They just want big chunks of example code that works with minimal changing.
                                                                         -Shyaboi
```

# cURL Usage
You can use this api with simple cURL requests.

To get the full code of a .svg file your cURL request should look like the example below;
```
curl https://openflags.net/api/usa/colorado
```
The output of the request will look something similar to the example below;
```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200">
<!-- Created per specification at http://www.50states.com/flag/coflag.htm by Robert Fleming -->
 <rect width="1800" height="1200" fill="#002868"/>
 <rect width="1800" height="400" y="400" fill="white"/>
 <!-- 76 + 180*sqrt(55)/36 ~= 113.1 -->
 <path d="M1130.81,750A400,400 0 1,1 1130.81,450L760,600Z" fill="#bf0a30"/>
 <circle cx="760" cy="600" r="200" fill="gold"/>
</svg>
```

### Download via cURL
If you want to download the file locally via cURL, your cURL request should look like the example below;
```
curl https://openflags.net/usa/region/colorado.svg -o coloradoflag.svg
```
The cURL will download the file in the current working directory, and give it the name following the "-o"
### cURL JSON
If you want to generate a JSON response to your cURL, cURL request should look like the example below;
```
curl https://openflags.net/api/usa/colorado
```
This will generate a JSON response similar to the example below;
```
flagInfo":[{"_id":"5f51ca2c7cf1026aa0a50f95","directLink":"https://openflags.net/usa/region/colorado.svg","quickLink":"colorado.svg","region":"colorado","country":"usa"}]
```
# Javascript Fetch Usage
To use a Javascript fetch request to get information into your JS code. you can make a similar request as the example below;
```
fetch('https://openflags.net/api/usa/colorado')
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  The data variable alone will return many objects from the server. The response will be similat to the example below;
  ```
  {flagInfo: Array(1)}
flagInfo: Array(1)
0:
country: "usa"
directLink: "https://openflags.net/usa/region/colorado.svg"
quickLink: "colorado.svg"
region: "colorado"
_id: "5f51ca2c7cf1026aa0a50f95"
__proto__: Object
length: 1
__proto__: Array(0)
__proto__: Object
```
Currently most flag responses will only  return 1 position in the array, so it is safe to simply use data.flagInfo[0] with 0 in the array index. you can make a similar request as the example below;
```
  fetch('https://openflags.net/api/usa/colorado')
  .then(response => response.json())
  .then(data => console.log(data.flagInfo[0]));
  The data.flagInfo[0] will return a JSON object from the input and desired region, and country.
  ```
  The response will be a JSON obeject similar to the example below;
  ```
  {_id: "5f51ca2c7cf1026aa0a50f95", directLink: "https://openflags.net/usa/region/colorado.svg", quickLink: "colorado.svg", region: "colorado", country: "usa"}
country: "usa"
directLink: "https://openflags.net/usa/region/colorado.svg"
quickLink: "colorado.svg"
region: "colorado"
_id: "5f51ca2c7cf1026aa0a50f95"
__proto__: Object
```
### Objects in the JSON object
You can call the parameters inside the object with dot notation, similar to the example below;
```
fetch('https://openflags.net/api/usa/colorado')
  .then(response => response.json())
  .then(data => {
      const flagPicLink =  data.flagInfo[0].directLink
      console.log(flagPicLink)
    });
```
Setting a variable to after the flagInfo[0] obeject inside the flagInfo object will allow you to use any of the values in the object. In the above example, the response will simply be a string with a direct link to a SVG image; see below;
```
"https://openflags.net/usa/region/colorado.svg"
```
# Node.JS Usage
### http module Usage
To use Flag API with the standard Node library and not download any dependencies, or extra packages, follow the example bellow.
```
const https = require('https');

https.get('https://openflags.net/api/usa/colorado', (response) => {
  let data = '';

  // called when a data chunk is received.
  response.on('data', (chunk) => {
   data = JSON.parse(chunk)
    console.log(data)
  });

  // called when the complete response is received.
  response.on('end', () => {
    console.log(data);
  });

}).on("error", (error) => {
  console.log("Error: " + error.message);
});
```
  The data variable alone will return an object with an array of objects from the server. The response will be similat to the example below;
  ```
{
  flagInfo: [
    {
      _id: '5f51ca2c7cf1026aa0a50f95',
      directLink: 'https://openflags.net/usa/region/colorado.svg',
      quickLink: 'colorado.svg',
      region: 'colorado',
      country: 'usa'
    }
  ]
}
```

Currently most flag responses will only  return 1 position in the array, so it is safe to simply use data.flagInfo[0] with 0 in the array index to get the data from the main flagInfo object. you can make a similar request as the example below;

```
const https = require('https');

https.get('https://openflags.net/api/usa/colorado', (response) => {
  let data = '';

  // called when a data chunk is received.
  response.on('data', (chunk) => {
   data = JSON.parse(chunk)
    console.log(data.flagInfo[0])
  });

  // called when the complete response is received.
  response.on('end', () => {
    console.log(data.flagInfo[0]);
  });

}).on("error", (error) => {
  console.log("Error: " + error.message);
});
```
Running this code will return only a single flag JSON object, such as the example below;
```
ghgf
```
With dot notation on the JSON object of flagInfo[0] you can request specific items in the object, such as the example below;

```
const https = require('https');

https.get('https://openflags.net/api/usa/colorado', (response) => {
  let data = '';

  // called when a data chunk is received.
  response.on('data', (chunk) => {
   data = JSON.parse(chunk)
    console.log(data.flagInfo[0].directLink)
  });

  // called when the complete response is received.
  response.on('end', () => {
    console.log(data.flagInfo[0].directLink);
  });

}).on("error", (error) => {
  console.log("Error: " + error.message);
});
```
With 'directLink' after the data.flagInfo[0].directLink, the response from the API server will be the contects of dirctLink object, which is a String, such as the example below;
```
"https://openflags.net/usa/region/colorado.svg"
```
# JQuery Usage
to use the api with JQuery, you can make a simple GET request, such as the example below;
```
$.get( "https://openflags.net/rando", function( data ) {
 console.log(data)
 })
 ```
 The 'data' will be an object or a string depending on which endpoints you hit. In the example aboves case, the result would be a string containing a direct link of a random flag .svg file.
 
 # Python Usage
 ## Request Module

The simplest way to use Open Flags API with Python is with the requests module. First install it with;
```
pip install requests
```
Then in your python app, setup your GET request such as the code below;
```
import requests

response = requests.get("https://openflags.net/api/usa/california")

data = response.json()

print(data)
```
The result will be a python list such as below;
```
{'flagInfo': [{'_id': '5f7e5591a46a711d00667b40', 'directLink': 'https://openflags.net/usa/region/california.svg', 'quickLink': 'california.svg', 'region': 'california', 'country': 'usa'}]}
```


# Contribution 
Until I have more than myself working on this, I will need you to please contact me directly at
<br />
https://ianss.dev/contact or admin@mailpoem.com To contribute to the Open Flags API project.
<br />
I look forward to working with you ( ͡° ͜ʖ ͡°)