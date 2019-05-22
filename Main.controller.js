sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.BMSItaliaOCR_Test.controller.Main", {
		onInit: function () {
			this.oFileUpload = this.getView().byId("fileUploader");
			this.oImage = this.getView().byId("imageId");
		},
		onAfterRendering: function () {
			//console.log("onAfterRending is called");
			// get DOM element of file input
			var fileInput = $("#previewImg")[0]; //var fileInput = document.getElementById("previewImg");
			// attach event of onchange
			fileInput.addEventListener("change", this.onChange);
		},
		onBeforeRendering: function () {
			//console.log("onBeforeRending is called");
		},
		// handle the image file change event
		onChange: function (oEvent) {
			//console.log("onChange is called");
			var input = oEvent.target;
			var reader = new FileReader();
			// get file content
			reader.onload = function () {
				var dataUrl = reader.result;
				// set image area
				var image = $("#image")[0]; //var image =  document.getElementById("image");
				image.src = dataUrl;
			};
			// read content
			reader.readAsDataURL(input.files[0]);
		},
		// call API to classify the image
		scan: function (oEvent) {
			//get file content
			var image = $("#image")[0];
			//get input file information
			var input = $("#previewImg")[0];
			//prepare file for api call
			//KEY - hwHX5ZF4EGlUhw8Ln3ZEpISPUiWeigHb
			//Create JSON Model with URL
			var oModel = new sap.ui.model.json.JSONModel();

			//API Key for API Sandbox
			var sHeaders = {
				"content-type": "multipart/form-data; boundary=---011000010111000001101001",
				"Accept": "application/json",
				"APIKey": "hwHX5ZF4EGlUhw8Ln3ZEpISPUiWeigHb"
			};
			//sending request
			//API endpoint for API sandbox 
			var oData = {
				files: image,
				options: {
					"lang": "en",
					"output_type": "txt",
					"page_seg_mode": "1",
					"model_type": "lstm_standard"
				}
			};
			oModel.loadData("https://sandbox.api.sap.com/ml/ocr/ocr", oData, true, "POST", null, false, sHeaders);
			//You can assign the created data model to a View and UI5 controls can be bound to it. Please refer documentation available at the below link for more information.
			//https://sapui5.hana.ondemand.com/#docs/guide/96804e3315ff440aa0a50fd290805116.html#loio96804e3315ff440aa0a50fd290805116
			//The below code snippet for printing on the console is for testing/demonstration purpose only. This must not be done in real UI5 applications.
			oModel.attachRequestCompleted(function (oEvent) {
				var oData = oEvent.getSource().oData;
				//	console.log(oData);
			});
		}
	});
});