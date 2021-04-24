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
        INNER JOIN user_tbl ON user_tbl.user_id=collab_member_tbl.user_id";

              if($filter_data != null) {
                  $this->sql .= " WHERE collab_member_tbl.isAccepted=0 AND user_tbl.user_id =  $filter_data";
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
      INNER JOIN collab_room_tbl ON collab_tasks_tbl.collab_room_id=collab_room_tbl.collab_room_id";

            if($filter_data != null) {
                $this->sql .= " WHERE collab_room_tbl.collab_room_id=$filter_data";
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
          INNER JOIN user_tbl ON user_tbl.user_id=collab_member_tbl.user_id";

                if($filter_data != null) {
                    $this->sql .= " WHERE collab_member_tbl.collab_room_id=$filter_data";
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
                        $this->sql .= " WHERE task_tbl.task_isCollab=0 AND task_tbl.user_id=$filter_data";
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


    public function insertOrderDetails($table, $data){
            foreach($data as $x => $x_value) {
			$i = 0; $fields=[]; $values=[];
			foreach ($x_value as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}

			try {
				$ctr = 0;
				$sqlstr="INSERT INTO $table (";
				foreach ($fields as $value) {
					$sqlstr.=$value; $ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					}
				}
				$sqlstr.=") VALUES (".str_repeat("?, ", count($values)-1)."?)";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
                return array("code"=>$code, "errmsg"=>$errmsg);
			}
        }
            return array("code"=>200, "remarks"=>"success");

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
