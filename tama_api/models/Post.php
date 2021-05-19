<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

    function selectCollabJoinAccepted($filter_data) {

			$this->sql = "SELECT * FROM collab_room_tbl
      INNER JOIN collab_member_tbl ON collab_room_tbl.collab_room_id=collab_member_tbl.collab_room_id
      INNER JOIN user_tbl ON user_tbl.user_id=collab_member_tbl.user_id";

            if($filter_data != null) {
                $this->sql .= " WHERE collab_member_tbl.isAccepted=1 AND user_tbl.user_id =  $filter_data";
            }

            $data = array(); $code = 0; $msg= ""; $remarks = "";
            try {
                if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                    foreach ($res as $rec) { array_push($data, $rec);}
                    $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                }
            } catch (\PDOException $e) {
                $msg = $e->getMessage(); $code = 401; $remarks = "failed";
            }
            return $this->sendPayload($data, $remarks, $msg, $code);
        }
      function selectCollabJoinReq($filter_data) {

        $this->sql = "SELECT * FROM collab_room_tbl
        INNER JOIN collab_member_tbl ON collab_room_tbl.collab_room_id=collab_member_tbl.collab_room_id
        INNER JOIN user_inventory_tbl ON collab_room_tbl.user_id=user_inventory_tbl.user_id
        INNER JOIN shop_tbl ON user_inventory_tbl.item_id=shop_tbl.item_id";

              if($filter_data != null) {
                  $this->sql .= " WHERE collab_member_tbl.isAccepted=0 AND collab_member_tbl.user_id =  $filter_data AND user_inventory_tbl.isEquiped = 1 AND shop_tbl.item_category_id = 3";
              }

              $data = array(); $code = 0; $msg= ""; $remarks = "";
              try {
                  if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                      foreach ($res as $rec) { array_push($data, $rec);}
                      $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                  }
              } catch (\PDOException $e) {
                  $msg = $e->getMessage(); $code = 401; $remarks = "failed";
              }
              return $this->sendPayload($data, $remarks, $msg, $code);
          }

    function selectCollabJoin($filter_data) {

			$this->sql = "SELECT * FROM collab_room_tbl
      INNER JOIN collab_member_tbl ON collab_room_tbl.collab_room_id=collab_member_tbl.collab_room_id
      INNER JOIN user_tbl ON user_tbl.user_id=collab_member_tbl.user_id";

            if($filter_data != null) {
                $this->sql .= " WHERE user_tbl.user_id =  $filter_data";
            }

            $data = array(); $code = 0; $msg= ""; $remarks = "";
            try {
                if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                    foreach ($res as $rec) { array_push($data, $rec);}
                    $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                }
            } catch (\PDOException $e) {
                $msg = $e->getMessage(); $code = 401; $remarks = "failed";
            }
            return $this->sendPayload($data, $remarks, $msg, $code);
        }

    function collabTaskJoin($filter_data) {

			$this->sql = "SELECT * FROM task_tbl
      INNER JOIN collab_tasks_tbl ON task_tbl.task_id=collab_tasks_tbl.task_id
      INNER JOIN collab_room_tbl ON collab_tasks_tbl.collab_room_id=collab_room_tbl.collab_room_id
      INNER JOIN user_tbl ON user_tbl.user_id=task_tbl.user_id";

            if($filter_data != null) {
                $this->sql .= " WHERE task_tbl.task_isDone=0 AND collab_room_tbl.collab_room_id=$filter_data";
            }

            $data = array(); $code = 0; $msg= ""; $remarks = "";
            try {
                if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                    foreach ($res as $rec) { array_push($data, $rec);}
                    $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                }
            } catch (\PDOException $e) {
                $msg = $e->getMessage(); $code = 401; $remarks = "failed";
            }
            return $this->sendPayload($data, $remarks, $msg, $code);
        }

      function collabTaskDone($filter_data) {

        $this->sql = "SELECT * FROM task_tbl
        INNER JOIN collab_tasks_tbl ON task_tbl.task_id=collab_tasks_tbl.task_id
        INNER JOIN collab_room_tbl ON collab_tasks_tbl.collab_room_id=collab_room_tbl.collab_room_id
        INNER JOIN user_tbl ON user_tbl.user_id=collab_tasks_tbl.doneBy";

              if($filter_data != null) {
                  $this->sql .= " WHERE task_tbl.task_isDone=1 AND task_tbl.task_isCollab=1 AND collab_room_tbl.collab_room_id=$filter_data";
              }

              $data = array(); $code = 0; $msg= ""; $remarks = "";
              try {
                  if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                      foreach ($res as $rec) { array_push($data, $rec);}
                      $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                  }
              } catch (\PDOException $e) {
                  $msg = $e->getMessage(); $code = 401; $remarks = "failed";
              }
              return $this->sendPayload($data, $remarks, $msg, $code);
          }
        function taskDone($filter_data, $filter_data2) {

          $this->sql = "SELECT * FROM task_tbl";

                if($filter_data != null) {
                    $this->sql .= " WHERE task_isDone=1 AND task_isCollab=0 AND  user_id=$filter_data AND category_id=$filter_data2";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }
        function taskCateg($filter_data, $filter_data2) {

          $this->sql = "SELECT * FROM task_tbl";

                if($filter_data != null) {
                    $this->sql .= " WHERE task_isDone=0 AND task_isCollab=0 AND user_id=$filter_data AND category_id=$filter_data2";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }


        function collabMembersJoin($filter_data) {

          $this->sql = "SELECT * FROM collab_member_tbl
          INNER JOIN collab_room_tbl ON collab_member_tbl.collab_room_id=collab_room_tbl.collab_room_id
          INNER JOIN user_tbl ON user_tbl.user_id=collab_member_tbl.user_id
          INNER JOIN user_inventory_tbl ON user_tbl.user_id=user_inventory_tbl.user_id
          INNER JOIN shop_tbl ON user_inventory_tbl.item_id=shop_tbl.item_id";

                if($filter_data != null) {
                    $this->sql .= " WHERE collab_member_tbl.collab_room_id=$filter_data AND user_inventory_tbl.isEquiped = 1 AND shop_tbl.item_category_id = 3";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }

        function collabMembersShow($filter_data) {

          $this->sql = "SELECT DISTINCT user_tbl.user_name,user_tbl.user_id, collab_member_tbl.collab_room_id, collab_member_tbl.isAccepted from user_tbl INNER JOIN collab_member_tbl ON user_tbl.user_id=collab_member_tbl.user_id";

                if($filter_data != null) {
                    $this->sql .= " WHERE collab_member_tbl.collab_room_id =$filter_data";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }

          function getRecId($filter_data,$filter_data2) {

            $this->sql = "SELECT * FROM collab_member_tbl ";

                  if($filter_data != null) {
                      $this->sql .= " WHERE collab_room_id =$filter_data AND user_id=$filter_data2";
                  }

                  $data = array(); $code = 0; $msg= ""; $remarks = "";
                  try {
                      if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                          foreach ($res as $rec) { array_push($data, $rec);}
                          $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                      }
                  } catch (\PDOException $e) {
                      $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                  }
                  return $this->sendPayload($data, $remarks, $msg, $code);
              }

        function usernCheck($filter_data) {

          $this->sql = "SELECT * FROM user_tbl ";

                if($filter_data != null) {
                    $this->sql .= " WHERE user_name = '$filter_data'";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }
          function emailCheck($filter_data) {

            $this->sql = "SELECT * FROM user_tbl ";

                  if($filter_data != null) {
                      $this->sql .= " WHERE user_email = '$filter_data'";
                  }

                  $data = array(); $code = 0; $msg= ""; $remarks = "";
                  try {
                      if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                          foreach ($res as $rec) { array_push($data, $rec);}
                          $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                      }
                  } catch (\PDOException $e) {
                      $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                  }
                  return $this->sendPayload($data, $remarks, $msg, $code);
              }



        function tasksCategory($table) {

            $this->sql = "SELECT * FROM $table";

                    $data = array(); $code = 0; $msg= ""; $remarks = "";
                    try {
                        if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                            foreach ($res as $rec) { array_push($data, $rec);}
                            $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                        }
                    } catch (\PDOException $e) {
                        $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                    }
                    return $this->sendPayload($data, $remarks, $msg, $code);
                }
            function shop($table) {

              $this->sql = "SELECT * FROM $table";

                      $data = array(); $code = 0; $msg= ""; $remarks = "";
                      try {
                          if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                              foreach ($res as $rec) { array_push($data, $rec);}
                              $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                          }
                      } catch (\PDOException $e) {
                          $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                      }
                      return $this->sendPayload($data, $remarks, $msg, $code);
                  }

        function viewCategory($filter_data) {

            $this->sql = "SELECT * FROM `task_tbl` INNER JOIN task_category_tbl ON task_tbl.category_id=task_category_tbl.category_id";

                    if($filter_data != null) {
                        $this->sql .= " WHERE task_tbl.task_isDone=0 AND task_tbl.task_isCollab=0 AND task_tbl.user_id=$filter_data";
                    }

                    $data = array(); $code = 0; $msg= ""; $remarks = "";
                    try {
                        if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                            foreach ($res as $rec) { array_push($data, $rec);}
                            $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                        }
                    } catch (\PDOException $e) {
                        $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                    }
                    return $this->sendPayload($data, $remarks, $msg, $code);
    }

    function getUserwIcon($filter_data) {

      $this->sql = "SELECT * FROM user_tbl INNER JOIN user_inventory_tbl ON user_tbl.user_id=user_inventory_tbl.user_id INNER JOIN shop_tbl ON user_inventory_tbl.item_id=shop_tbl.item_id WHERE user_inventory_tbl.isEquiped = 1 AND shop_tbl.item_category_id = 3";

              if($filter_data != null) {
                  $this->sql .= " WHERE task_tbl.task_isDone=0 AND task_tbl.task_isCollab=0 AND task_tbl.user_id=$filter_data";
              }

              $data = array(); $code = 0; $msg= ""; $remarks = "";
              try {
                  if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                      foreach ($res as $rec) { array_push($data, $rec);}
                      $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                  }
              } catch (\PDOException $e) {
                  $msg = $e->getMessage(); $code = 401; $remarks = "failed";
              }
              return $this->sendPayload($data, $remarks, $msg, $code);
}
    function checkIfCreator($filter_data) {

      $this->sql = "SELECT * FROM `collab_room_tbl`";

              if($filter_data != null) {
                  $this->sql .= " WHERE collab_room_id=$filter_data";
              }

              $data = array(); $code = 0; $msg= ""; $remarks = "";
              try {
                  if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                      foreach ($res as $rec) { array_push($data, $rec);}
                      $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                  }
              } catch (\PDOException $e) {
                  $msg = $e->getMessage(); $code = 401; $remarks = "failed";
              }
              return $this->sendPayload($data, $remarks, $msg, $code);
          }
        function getEquipedItems($filter_data) {

          $this->sql = "SELECT * FROM user_inventory_tbl INNER JOIN shop_tbl ON user_inventory_tbl.item_id=shop_tbl.item_id";

                if($filter_data != null) {
                    $this->sql .= " WHERE user_inventory_tbl.user_id =$filter_data AND user_inventory_tbl.isEquiped = 1";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }
        function getOwnedItem($filter_data) {

          $this->sql = "SELECT * FROM user_inventory_tbl INNER JOIN shop_tbl ON user_inventory_tbl.item_id=shop_tbl.item_id";

                if($filter_data != null) {
                    $this->sql .= " WHERE user_inventory_tbl.user_id =$filter_data";
                }

                $data = array(); $code = 0; $msg= ""; $remarks = "";
                try {
                    if ($res = $this->pdo->query($this->sql)->fetchAll()) {
                        foreach ($res as $rec) { array_push($data, $rec);}
                        $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
                    }
                } catch (\PDOException $e) {
                    $msg = $e->getMessage(); $code = 401; $remarks = "failed";
                }
                return $this->sendPayload($data, $remarks, $msg, $code);
            }

      public function delete($table, $filter_data,$filter_data2) {

        $this->sql = "DELETE FROM $table";

        if($filter_data != null && $table == "task_tbl") {
          $this->sql .= " WHERE  task_id=$filter_data";
        }
        if($filter_data != null && $table == "collab_tasks_tbl") {
          $this->sql .= " WHERE  task_id=$filter_data";
        }
        if($filter_data != null  && $table == "collab_member_tbl") {
          $this->sql .= " WHERE  member_rec_id=$filter_data ";
        }
        if($filter_data != null && $table == "user_tbl") {
          $this->sql .= " WHERE user_id=$filter_data";
        }

        $data = array(); $code = 0; $msg= ""; $remarks = "";
        try {
          if ($res = $this->pdo->query($this->sql)->fetchAll()) {
            foreach ($res as $rec) { array_push($data, $rec);}
            $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
          }
        } catch (\PDOException $e) {
          $msg = $e->getMessage(); $code = 401; $remarks = "failed";
        }
        return $this->sendPayload($data, $remarks, $msg, $code);
      }
    public function disband($table, $filter_data) {

      $this->sql = "DELETE FROM $table";

      if($filter_data != null) {
        $this->sql .= " WHERE  collab_room_id=$filter_data";
      }

      $data = array(); $code = 0; $msg= ""; $remarks = "";
      try {
        if ($res = $this->pdo->query($this->sql)->fetchAll()) {
          foreach ($res as $rec) { array_push($data, $rec);}
          $res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
        }
      } catch (\PDOException $e) {
        $msg = $e->getMessage(); $code = 401; $remarks = "failed";
      }
      return $this->sendPayload($data, $remarks, $msg, $code);
    }

    public function unEquip($table, $data, $conditionStringPassed, $conditionStringPassed2) {
			$fields=[];
			$values=[];
			$setStr = "";

			foreach($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr="UPDATE $table INNER JOIN shop_tbl ON user_inventory_tbl.item_id=shop_tbl.item_id SET ";
				foreach ($data as $key => $value) {
					$sqlstr.="$key=?";
					$ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					}
				}
				$sqlstr.=" WHERE ".$conditionStringPassed." AND ".$conditionStringPassed2;
				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");
			}
			catch(\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}


    public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Ayn Gandhi V. Uson, Developer',
				"timestamp"=>date_create());
		}
    }
?>
