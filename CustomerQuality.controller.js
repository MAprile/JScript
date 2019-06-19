sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel"
], function(jQuery, Fragment, Controller, Filter, JSONModel) {
	"use strict";

	return Controller.extend("com.bmsCustomerQuality.controller.main", {
		inputId: "",

		onInit: function() {
			// set explored app's demo model on this sample
			var oModel = this.getView().getModel();
			this.getView().setModel(oModel);
		},
		/*	- CONTROLLO LUNGHEZZA CARATTERI - */
		handleLiveChange: function(oEvent) {
			var oTextArea = oEvent.getSource(),
				iValueLength = oTextArea.getValue().length,
				iMaxLength = oTextArea.getMaxLength(),
				sState = iValueLength > iMaxLength ? "Warning" : "None";
			oTextArea.setValueState(sState);
		},
		/*	- FUNZIONI PER PRESA DATI DEL CAMPO KUNNR COL SEARCH HELP - */
		handleValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment("com.bmsCustomerQuality.view.Dialog", this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sInputValue)]);
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sValue);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleValueHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var customerInput = this.getView().byId(this.inputId);
				customerInput.setValue(oSelectedItem.getDescription());
			}
			evt.getSource().getBinding("items").filter([]);
		}

	});
});