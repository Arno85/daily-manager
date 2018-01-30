<?php
header("Access-Control-Allow-Origin: *");

function saveItems(){

    $json = $_GET['json'];
    if(!empty($json)){
        $file = fopen('items.json','w+');
        fwrite($file, $json);
        fclose($file);
        return true;
    }
    return false;  
}

function loadItems(){
    $file = file_get_contents('items.json');
    return $file;
}

function saveList(){

    $json = $_GET['json'];
    if(!empty($json)){
        $file = fopen('list.json','w+');
        fwrite($file, $json);
        fclose($file);
        return true;
    }
    return false;  
}

function loadList(){
    $file = file_get_contents('list.json');
    return $file;
}

$function = $_GET['f'];
$result = $function();
echo json_encode($result);