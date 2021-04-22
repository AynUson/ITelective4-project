<?php
require_once("./config/Config.php");

$db = new Connection();
$pdo = $db->connect();
$gm = new GlobalMethods($pdo);
$auth = new Auth($pdo);
$post = new Post($pdo);

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
          echo json_encode($gm->exec_query($req[0] . '_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->exec_query($req[0] . '_tbl', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'shop':
        if (count($req) > 1) {
          echo json_encode($post->shop($req[0] . '_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->shop($req[0] . '_tbl', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'user':
        if (count($req) > 1) {
          echo json_encode($gm->exec_query($req[0] . '_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->exec_query($req[0] . '_tbl', null), JSON_PRETTY_PRINT);
        }
        break;
      case 'showCollabJoin':
        if (count($req) > 1) {
          echo json_encode($post->selectCollabJoin($req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->selectCollabJoin(null), JSON_PRETTY_PRINT);
        }
        break;
      case 'showCollabTasks':
        if (count($req) > 1) {
          echo json_encode($post->collabTaskJoin($req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->collabTaskJoin(null), JSON_PRETTY_PRINT);
        }
        break;
      case 'showCollabMembers':
        if (count($req) > 1) {
          echo json_encode($post->collabMembersJoin($req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->collabMembersJoin(null), JSON_PRETTY_PRINT);
        }
        break;
      case 'task_category':
        if (count($req) > 1) {
          echo json_encode($post->tasksCategory($req[0] . '_tbl'), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->tasksCategory($req[0] . '_tbl'), JSON_PRETTY_PRINT);
        }
        break;
      case 'viewCategory':
        if (count($req) > 1) {
          echo json_encode($post->viewCategory($req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->viewCategory(null), JSON_PRETTY_PRINT);
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
        echo json_encode($gm->update("tbl name", $d, 'task_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
        //DELETE??
    }
    break;

  default:
    http_response_code(403);
    echo "Please contact the Systems Administrator.";
    break;
}
