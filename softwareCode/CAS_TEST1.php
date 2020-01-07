<?php
// This is a prototype test of a centarl authentication server, which this php file will be the main element. However depending on the course of the project this file might not be the only test of a cas element.

date_default_timezone_set("UTC");

if (file_exists("test_data.json"))
{
    $JSON_paitents = json_decode(file_get_contents("test_data.json"));
}
else
{
    echo "cant find file";
}

if(empty($_GET)){
    echo "Nothing in the _GET";
    die;
}

//Validate the keys for the get query.
$keys = array_keys($_GET);
$client_no = 0;
$paitent_no = 0;
$date = date("d.m.y");

if(array_key_exists('client_no', $_GET))
{
    $client_no = $_GET['client_no'];
}

if(array_key_exists('paitent_no', $_GET))
{
    $paitent_no = $_GET['paitent_no'];
}

//Check if client key is valid against list of clients.

//Check if there is a paient with perscription waiting in file. This is a json file for development but in practise might be a SQL database.
foreach($JSON_paitents->records as $record)
{
    if($record->id == $paitent_no)
    {
        echo "Located paient";
        
        foreach($record->perscrips as $perscription)
        {
            if($perscription->date == $date)
            {
                echo "Valid Perscription found";
                $printable = json_encode($perscription, JSON_PRETTY_PRINT);
                echo $printable;
            }
        }
    }
}

?>
