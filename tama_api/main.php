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
      case 'collab_room':
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
      case 'showCollabJoin2':
        if (count($req) > 1) {
          echo json_encode($post->selectCollabJoinAccepted($req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->selectCollabJoinAccepted(null), JSON_PRETTY_PRINT);
        }
        break;
        case 'showCollabJoin3':
          if (count($req) > 1) {
            echo json_encode($post->selectCollabJoinReq($req[1]), JSON_PRETTY_PRINT);
          } else {
            echo json_encode($post->selectCollabJoinReq(null), JSON_PRETTY_PRINT);
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
      case 'collabmemshow':
        if (count($req) > 1) {
          echo json_encode($post->collabMembersShow($req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($post->collabMembersShow(null), JSON_PRETTY_PRINT);
        }
        break;




        //INSERT
      case 'createTask':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("task_tbl", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;
      case 'createCollab':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("collab_room_tbl", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;
      case 'initCollabMem':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("collab_member_tbl", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;
      case 'collabtask':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->insert("collab_tasks_tbl", $d), JSON_PRETTY_PRINT);
        return array("data" => $d);
        break;



        //UPDATE
      case 'acceptCollab':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("collab_member_tbl", $d, 'member_rec_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
      case 'doneTask':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("task_tbl", $d, 'task_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
      // case 'deleteTask':
      //   $d = json_decode(file_get_contents("php://input"));
      //   echo json_encode($gm->update("task_tbl", $d, 'task_id=' . $req[1]), JSON_PRETTY_PRINT);
      //   break;
      case 'updateUser':
        $d = json_decode(file_get_contents("php://input"));
        echo json_encode($gm->update("user_tbl", $d, 'user_id=' . $req[1]), JSON_PRETTY_PRINT);
        break;
        //DELETE
      case 'deleteTask':
        if (count($req) > 1) {
          echo json_encode($gm->delete('task_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->delete('task_tbl', null), JSON_PRETTY_PRINT);
        }
      case 'deleteCollabTask':
        if (count($req) > 1) {
          echo json_encode($gm->delete('collab_tasks_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->delete('collab_tasks_tbl', null), JSON_PRETTY_PRINT);
        }
      case 'deleteCollabReq':
        if (count($req) > 1) {
          echo json_encode($gm->delete('collab_member_tbl', $req[1]), JSON_PRETTY_PRINT);
        } else {
          echo json_encode($gm->delete('collab_member_tbl', null), JSON_PRETTY_PRINT);
        }


    }
    break;

  default:
    http_response_code(403);
    echo "Please contact the Systems Administrator.";
    break;
}
