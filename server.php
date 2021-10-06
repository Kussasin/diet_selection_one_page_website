<?php
$_POST = json_decode(file_get_contents("php://input"),true);//дешифровка Json формата
echo var_dump($_POST);
