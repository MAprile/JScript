sap.ui.controller("********.view.main", {
oView : null,
    onInit : function() {
        oView = this.getView();
        navigator.geolocation.getCurrentPosition(this.onGeoSuccess, this.onGeoError, {enableHighAccuracy:true});
    },
    onGeoSuccess : function(position) {
        oView.byId("txtLatitude").setText(position.coords.latitude);
        oView.byId("txtLongitude").setText(position.coords.longitude);
        oView.byId("txtAltitude").setText(position.coords.altitude);
    },
    onGeoError : function() {
        console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    },
    onPhotoDataSuccess :  function(imageData) {
        var myImage = oView.byId("myImage");
        myImage.setSrc("data:image/jpeg;base64," + imageData);
    },
    onPhotoURISuccess : function(imageURI) {
        var myImage = oView.byId("myImage");
        myImage.setSrc(imageURI);
    },
    onFail :  function(message) {
    console.log("Failed because: " + message);
    },
    getPhoto : function() {
        var oNav = navigator.camera;
        oNav.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50,
        destinationType: oNav.DestinationType.FILE_URI,
        sourceType: oNav.PictureSourceType.PHOTOLIBRARY });
    },
    capturePhoto : function() {
    var oNav = navigator.camera;
    oNav.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 10, destinationType: oNav.DestinationType.DATA_URL });
    }
});



