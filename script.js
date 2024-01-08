/******w**************

    Assignment 4 Javascript
    Name:Navjit Singh
    Date:18/02/2023
    Description: USing fetch api to get json

*********************/



window.onload = function(){
    let form = document.getElementById('find');
    form.addEventListener('submit', async (event) =>{
        event.preventDefault();

        let text = document.getElementById('input_data').value;
        let result = document.getElementById("result");
        if((text.trim()).length == 0){
            result.innerHTML='    No Result found(Search a weekday)!!!!'
            return;
         }

        //build API
        const api = `https://data.winnipeg.ca/resource/6rcy-9uik.json?`+ `$where=lower(collection_day) LIKE lower('%${text}%') OR lower(combined_address) LIKE lower('%${text}%')`
        +`&$LIMIT=100`;

        let encodedURL = encodeURI(api);

        //call API
        try{
            let response = await fetch(encodedURL);
            let data = await response.json();
           display(data);
        }catch(error){
            console.error(error);
        }

});
}



let display = (data) => {

    let result = document.getElementById("result");

    // if no data found show the error
    if(!data.length){
        result.innerHTML= "No result found";
        return;
    }

    result.innerHTML = '';
    let table = document.createElement("table");
    let tHead = document.createElement("thead");
    let tableRow= document.createElement("tr");


    //appending the elements
    result.appendChild(table);
    table.appendChild(tHead);
    tHead.appendChild(tableRow);

   // Headings
    let headers=["Day", "Address"];
    headers.forEach(value=> {
        let th = document.createElement("th");
        th.innerHTML = value;
        tableRow.appendChild(th);

    });

    //Data to be printed

    data.forEach(garbage =>{

        let tBody = document.createElement("tBody");
        let tableRow= document.createElement("tr");
        table.appendChild(tableRow);
        const values = [garbage.collection_day, garbage.combined_address];
        values.forEach(part =>{
            const td=document.createElement("td");
            td.innerHTML= part;
            tableRow.appendChild(td);

        });



    });


}

