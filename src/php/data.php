<?php
header("Access-Control-Allow-Origin: *");

define ('PATH', '../../data/');

function saveItems(){

    $json = $_GET['json'];
    if(!empty($json)){
        $file = fopen(PATH . 'items.json','w+');
        fwrite($file, $json);
        fclose($file);
        return true;
    }
    return false;  
}

function loadItems(){
    $file = file_get_contents(PATH . 'items.json');
    return $file;
}

function saveList(){

    $json = $_GET['json'];
    if(!empty($json)){
        $file = fopen(PATH . 'list.json','w+');
        fwrite($file, $json);
        fclose($file);
        return true;
    }
    return false;  
}

function loadList(){
    $file = file_get_contents(PATH . 'list.json');
    return $file;
}

$function = $_GET['f'];
$result = $function();
echo $result;