sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/VBox",
    "sap/ui/core/theming/Parameters"
], function (Controller, Button, Image, VBox, Parameters) {
    "use strict";

    return Controller.extend("project2.controller.View1", {

        onInit: function () {

            // ===== OPERATOR CODE =====
            let result = "";
            result += "== Operator Results:\n";
            result += "0 == false : " + (0 == false) + "\n";
            result += '"5" == 5 : ' + ("5" == 5) + "\n\n";

            result += "=== Operator Results:\n";
            result += "0 === false : " + (0 === false) + "\n";
            result += '"5" === 5 : ' + ("5" === 5) + "\n\n";

            this.getView().byId("txtResult").setText(result);

            // ===== PROMISE CODE =====
            const myPromise = new Promise((resolve, reject) => {

                let success = true;

                setTimeout(() => {
                    if (success) {
                        resolve("Promise: Data loaded successfully\n");
                    } else {
                        reject("Promise: Error while loading data\n");
                    }
                }, 2000);

            });

            myPromise
                .then(resultPromise => {
                    let currentText = this.getView().byId("txtResult").getText();
                    currentText += resultPromise;
                    this.getView().byId("txtResult").setText(currentText);
                })
                .catch(error => {
                    let currentText = this.getView().byId("txtResult").getText();
                    currentText += error;
                    this.getView().byId("txtResult").setText(currentText);
                });

            // ===== ASYNC CALL =====
            this.example();

            // ===== CREATE IMAGE UI =====
            var oPage = this.getView().byId("page");

            var oVBox = new VBox({
                id: this.createId("imgBox")
            });

            var oButton = this._createTextButton(
                "Open Image",
                "green",
                this.onShowImage.bind(this)
            );

            oVBox.addItem(oButton);
            oPage.addContent(oVBox);
        },

        // ===== BUTTON CREATOR =====
        _createTextButton: function (text, colorType, fnPress) {

            var sColor;

            if (colorType === "green") {
                sColor = "#008000"; // green
            } else if (colorType === "red") {
                sColor = "#FF0000"; // red (changed from red)
            }

            var oBtn = new Button({
                text: text,
                type: "Transparent",
                press: fnPress
            });

            oBtn.addEventDelegate({
                onAfterRendering: function () {
                    this.$().find(".sapMBtnInner").css("color", sColor);
                }
            }, oBtn);

            return oBtn;
        },

        // ===== SHOW IMAGE =====
        onShowImage: function () {

            var oVBox = this.getView().byId("imgBox");
            oVBox.removeAllItems();

            var oOpenBtn = this._createTextButton(
                "Open Image",
                "green",
                this.onShowImage.bind(this)
            );

            var oCloseBtn = this._createTextButton(
                "Close Image",
                "red",
                this.onCloseImage.bind(this)
            );

            var oImage = new Image({
                src: "image/paris.jpg",
                width: "60%",
                height: "100%"
            });

            oVBox.addItem(oOpenBtn);
            oVBox.addItem(oCloseBtn);
            oVBox.addItem(oImage);
        },

        // ===== CLOSE IMAGE =====
        onCloseImage: function () {

            var oVBox = this.getView().byId("imgBox");
            oVBox.removeAllItems();

            var oButton = this._createTextButton(
                "Open Image",
                "green",
                this.onShowImage.bind(this)
            );

            oVBox.addItem(oButton);
        },

        // ===== ASYNC FUNCTION =====
        example: async function () {

            let oView = this.getView();

            let resultText = oView.byId("txtResult").getText();

            resultText += "\nAsync/Await:\nStart\n";
            oView.byId("txtResult").setText(resultText);

            let result = await new Promise((resolve) => {
                setTimeout(() => resolve("Done!\n"), 2000);
            });

            resultText = oView.byId("txtResult").getText();

            resultText += result + "End\n";

            oView.byId("txtResult").setText(resultText);
        }

    });
});