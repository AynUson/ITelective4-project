<?php
require_once("./config/Config.php");

$db = new Connection();
$pdo = $db->connect();
$gm = new GlobalMethods($pdo);
$auth = new Auth($pdo);

if (isset($_REQUEST['request'])) {
  $req = explode('/', rtrim(($_REQUEST['request']), '/'));
} else {
  $req = array("errorcatcher");
}

switch ($_SERVER['REQUEST_METHOD']) {


  case 'POST':
    switch ($req[0]) {
        //SELECT
      case 'task':
        if (count($req) > 1) {
          echo json_encode($gm->select($req[0].'_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->select($req[0].'_tbl', null), JSON_PRETTY_PRINT);
        }
        break;




        //INSERT
      case 'tbl name':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("tbl name" . $req[0], $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;



        //UPDATE
      case 'updating':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("tbl name", $d,'task_id='.$req[1]), JSON_PRETTY_PRINT);
        break;
        //DELETE??
    }
    break;

  default:
    http_response_code(403);
    echo "Please contact the Systems Administrator.";
    break;
}
