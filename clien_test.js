//This javascript file is used as a test to validate certain CAS functions and overrall system design, however in a better developed system this JS file might not be used in favor of a different method.

function Perscription(id, name, date, pname, weight){
    this.id = id;
    this.name = name;
    this.date = date;
    this.pname = pname;
    this.weight = weight;
}

//The idea behind this function is to send a request to the cas server for validation and infomation on a perscription.
//To be validated - the perscription, the client and paitent.
//To be provided - perscription_id.
//Once provided the perscription_id can be used by the client machine to find a box that matches the perscription and open it.
function validatePerscription(client_no, paitent_no){
    
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                document.getElementById("textarea").innerHTML =  xmlhttp.responseText;
            }
            else if (xmlhttp.status == 400){
                console.log("ERROR 400 in ajax request - validatePerscription");
            }
            else {
                console.log("ERROR in ajax request - validatePerscription");
            }
        }
    };

    xmlhttp.open("GET", "softwareCode/CAS_TEST1.php?" +"client_no=" + client_no + "&" + "paitent_no=" + paitent_no,  true);
    xmlhttp.send();
}

//This function would be called when the client unit is powered on for the first time during setup or when a perscription transaction is completed. This serves as a way of getting the data for what perscriptions should be where.
// Sending: client_no - used to verify that the requester is a valid client unit.
// Sending: available_spaces - tells the CAS server how many spaces in the unit are free and can be filled with a perscription.
// Returns: completed_list - a list of perscriptions that are complete and ready to be picked up, this would be used in a function to tell the paitient that the perscription is ready. 
function requestPerscriptions(client_no, available_spaces){

    var completed_list = [[]];
    var xmlhttp = new XMLHttpRequest();
    var available_spaces = getSpaces();

    xmlhttp.onreadystatechange = function () {

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                document.getElementById("textarea").innerHTML =  xmlhttp.responseText;
            }
            else if (xmlhttp.status == 400){
                console.log("ERROR 400 in ajax request - requestPerscription");
            }
            else {
                console.log("ERROR in ajax request - requestPerscription");
            }
        }
    };

    xmlhttp.open("GET", "softwareCode/CAS_TEST1.php?" +"client_no=" + client_no + "&" + "available_spaces=" + available_spaces,  true);
    xmlhttp.send();

    return completed_list;
}

//Test send button used for debugging certain functions in this file.
function testButton(){
    console.log("TEST");
    validatePerscription(1, 1);
}

//Test getSpaces button, since this file would ideally be embedded into the system of the client unit it would have direct access to the boxes on the unit. However for this test this function is used to provide the data.
function getSpaces(){
    var spaces = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];

    //For this test the client unit is made of a 5x5 grid of boxes.
    for (outerIndex = 0; outerIndex < 5; outerIndex++) {
        for (innerIndex = 0; innerIndex < 5; innerIndex++) {
           spaces[outerIndex][innerIndex] = null;
           console.log("0");

           if(outerIndex == 3){
                spaces[outerIndex][innerIndex] = new Perscription(33, "premadeTest", "09.01.2020", "yues", 0.333)
                
            }
        }
    }

    console.debug ("%o", spaces);
    return spaces;
}
