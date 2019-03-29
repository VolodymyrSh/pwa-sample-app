// Setting the date field to the current date
let today = new Date().toISOString().substr(0, 10);
document.getElementById("problemDate").value = today;

// Getting the user's location
var locationButton = document.getElementById("locationButton");
// var geocoder = new google.maps.Geocoder();


function initializeNewReport() {
    // getLocation();

    document.getElementById("title").focus;
}

function getLocation() {
    var platform = new H.service.Platform({
        "app_id": "APP-ID-HERE",
        "app_code": "APP-CODE-HERE"
    });
    // var geocoder = platform.getGeocodingService();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

        // position => {
        //     geocoder.reverseGeocode({
        //         mode: "retrieveAddresses",
        //         maxresults: 1,
        //         prox: position.coords.latitude + "," + position.coords.longitude
        //     }, data => {
        //         alert("The nearest address to your location is:\n" + data.Response.View[0].Result[0].Location.Address.Label);
        //     }, error => {
        //         console.error(error);
        //     });
        // });
    } else {
        locationButton.innerHTML = "Geolocation is not supported by this browser.";
    }

    return false;
}

function showPosition(position) {
    locationButton.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;


    // var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true&language=" + "en";
    // $.ajax({
    //     type: 'GET',
    //     url: url,
    //     success: function(data) {
    //         alert(JSON.stringify(data));
    //     }
    // });
    // var geocoder = new google.maps.Geocoder();
    // var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    // if (geocoder) {
    //     geocoder.geocode({
    //         'latLng': latLng
    //     }, function(results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             console.log(results[0].formatted_address);
    //         } else {
    //             console.log("Geocoding failed: " + status);
    //         }
    //     });
    // }
    return false;
}

var cameraOpen = false;

function uploadPhoto() {
    var preview = document.getElementById('imageResult');
    debugger;
    var file = document.getElementById("imageUpload").files[0];
    var reader = new FileReader();

    reader.onload = (function(theFile) {
        return function(e) {
            document.getElementById('imageResult').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="50" />'].join('');
            document.getElementById("myCamera").style.height = 0;
            document.getElementById("cameraButton").value = "Open Camera";
            Webcam.reset();
            cameraOpen = false;
        };
    })(file);

    if (file) {
        reader.readAsDataURL(file);
    }

    return false;
}

// Helper method to decide on opening the camera or taking a picture
function camera() {
    if (cameraOpen) {
        takePicture();
    } else {
        openCamera();
    }
}

function openCamera() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 1080
    });

    Webcam.attach(document.getElementById("myCamera"));
    document.getElementById("cameraButton").value = "Take Picture";
    cameraOpen = true;
}

function takePicture() {
    // take snapshot and get image data
    Webcam.snap(function(data_uri) {
        // display results in page
        document.getElementById('imageResult').innerHTML = '<img src="' + data_uri + '"/>';
    });
    Webcam.reset();
    document.getElementById("myCamera").style.height = 0;
    document.getElementById("cameraButton").value = "Open Camera";
    document.getElementById("imageUpload").value = "";

    cameraOpen = false;
}