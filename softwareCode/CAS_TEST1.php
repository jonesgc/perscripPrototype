<?php
// This is a prototype test of a centarl authentication server, which this php file will be the main element. However depending on the course of the project this file might not be the only test of a cas element.

date_default_timezone_set("UTC")

if (file_exists("test_data.json"))
{
    $JSON = file_get_contents("test_data.json")
}
else
{
    echo "cant find file"
}

?>
