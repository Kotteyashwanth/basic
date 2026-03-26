sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
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
                }, 3000);

            });

            myPromise
                .then(resultPromise => {

                    // Always get latest UI text
                    let currentText = this.getView().byId("txtResult").getText();

                    currentText += resultPromise;

                    this.getView().byId("txtResult").setText(currentText);
                })
                .catch(error => {

                    let currentText = this.getView().byId("txtResult").getText();

                    currentText += error;

                    this.getView().byId("txtResult").setText(currentText);
                });

            // ===== CALL ASYNC FUNCTION =====
            this.example();
        },

        // ===== ASYNC FUNCTION =====
        example: async function () {

            let oView = this.getView();

            //  Get latest text
            let resultText = oView.byId("txtResult").getText();

            resultText += "\nAsync/Await:\nStart\n";
            oView.byId("txtResult").setText(resultText);

            let result = await new Promise((resolve) => {
                setTimeout(() => resolve("Done!\n"), 3000);
            });

            // Get latest again before updating
            resultText = oView.byId("txtResult").getText();

            resultText += result + "End\n";

            oView.byId("txtResult").setText(resultText);
        }

    });
});