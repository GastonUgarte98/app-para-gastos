
const form = document.getElementById("transactionForm");
        
        form.addEventListener("submit", function(event) {
           event.preventDefault();
           let transactionFormData = new FormData(form);
           let transactionObj = convertFromDataToTransactionObj(transactionFormData)
           saveTransationObj(transactionObj)
           insertRowTransactionTable(transactionObj);
           form.reset();
        })

        document.addEventListener("DOMContentLoaded", function(event) {
            draw_category()
            let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
            transactionObjArr.forEach (
                function(arrayElement) {
                    insertRowTransactionTable(arrayElement)
                    
                }
            )
        })

        function draw_category(){
            let allCategories = [
                "Alquiler", "Antojo", "Comida", "Gasto", "Diversion", "Transaporte"
            ]
            for(let index =0; index < allCategories.length; index++){
                insertCategory(allCategories[index])
            }
        }   

        function insertCategory(categoryName){
            const selecElement = document.getElementById("transactionCategory")
            let htmlToInsert = `<option> ${categoryName} </option>`
            selecElement.insertAdjacentHTML("beforeend", htmlToInsert)
        }        
    
        function getNewTransactionId(){
            let lastTransactionId = localStorage.getItem("lastTransacionId") || "-1"
            let newTransactionId = JSON.parse(lastTransactionId) + 1;
            localStorage.setItem("lastTransacionId", JSON.stringify(newTransactionId))
            return newTransactionId;
        }

        function convertFromDataToTransactionObj(transactionFormData) {
            let transactionType = transactionFormData.get("transactionType")
            let transactionDescription = transactionFormData.get("transactionDescription")
            let transactionAmount = transactionFormData.get("transactionAmount")
            let transactionCategory = transactionFormData.get("transactionCategory");
            let transactionId = 1;
            return{
                "transactionType": transactionType,
                "transactionDescription": transactionDescription,
                "transactionAmount": transactionAmount,
                "transactionCategory": transactionCategory,
                "transactionId": transactionId
            }
        }
        
        function insertRowTransactionTable(transactionObj){
            let transactionTableRef = document.getElementById("transactionTable");

            let newTransactionRowRef = transactionTableRef.insertRow(-1);
            newTransactionRowRef.setAttribute("data-transaction-id", transactionObj ["transactionId"])

            let newTyeCellRef = newTransactionRowRef.insertCell(0);
           newTyeCellRef.textContent = transactionObj["transactionType"];
           
           newTyeCellRef = newTransactionRowRef.insertCell(1);
           newTyeCellRef.textContent = transactionObj["transactionDescription"];
           
           newTyeCellRef = newTransactionRowRef.insertCell(2);
           newTyeCellRef.textContent = transactionObj["transactionAmount"];
           
           newTyeCellRef = newTransactionRowRef.insertCell(3);
           newTyeCellRef.textContent = transactionObj["transactionCategory"];
           
           let newDeleteCell = newTransactionRowRef.insertCell(4);
           let deleteButton = document.createElement("button");

           deleteButton.textContent = "Eliminar";
           newDeleteCell.appendChild(deleteButton)

           deleteButton.addEventListener("click", (event) => {
                let transactionRow = event.target.parentNode.parentNode;
                let transactionId = transactionRow.getAttribute("data-transaction,id");
                event.target.parentNode.parentNode.remove();
                deleteTransactionObj(transactionId);
           })
        }
        // le paso como parametro el transactionId de la transaccion que quiero liminar
        function deleteTransactionObj(transactionId){
            //obtengo las transaccion de mi "base de datod"
            let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
            //busco el indice / la poscicion de la transaccion que quiero eliminar
            let transactionIndexInArray = transactionObjArr.findIndex(Element => Element.transactionId === transactionId);
            //elimina el elemento de esa poscicion
            transactionObjArr.splice(transactionIndexInArray, 1)
                //convierto de objeto a json
            let transactionArrayJSON = JSON.stringify(transactionObjArr);
            //Guardo mi array de transacion de transaccion en formato JSON en el local storage
            localStorage.setItem("transactionData", transactionArrayJSON)
        }

        function saveTransationObj(transactionObj){
            let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
            myTransactionArray.push(transactionObj);
            let transactionArrayJSON = JSON.stringify(myTransactionArray); // JSON.parse(localStorage.getItem("transactionData")) || 
            localStorage.setItem("transactionData", transactionArrayJSON);
        }
        /*
        primer forma de html y css
          
                    <input id="ingreso" type="radio" name="transactionType" value="Ingreso">
                    <label for="ingreso">Ingreso</label>
                    <input id="egreso" type="radio"name="transactionType" value="Egreso">
                    <label for="egreso">Egreso</label> 
                    
        */ 