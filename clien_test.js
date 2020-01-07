//This javascript file is used as a test to validate certain CAS functions and overrall system design, however in a better developed system this JS file might not be used in favor of a different method.



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

//Test send button used for debugging certain functions in this file.
function testButton(){
    console.log("TEST");
    validatePerscription(1, 1);
}