<?php
	class GlobalMethods {
		protected $pdo;

		public function __construct(\PDO $pdo) {
      //accepts variable named pdo of type PDO; the db itself
			$this->pdo = $pdo;
		}

		public function select($table, $filter_data) {
			$sql = "SELECT * FROM $table ";

			if ($filter_data != null && $table == "tbl_profiling_residents") {
				$this->sql .= " WHERE res_id=$filter_data";
			}
			$data = array(); $errmsg = ""; $code = 0;
			try {
				if ($res = $this->pdo->query($sql)->fetchAll()) {
					foreach ($res as $rec) {
						array_push($data, $rec);
						$res = null; $code = 200;
					}
				}
			} catch(\PDOException $e) {
				$errmsg = $e->getMessage(); $code = 401;
			}
			return $this->sendPayload($data, "success", $errmsg, $code);
      //
		}

		public function insert($table, $data) {
			$i = 0;
			$fields=[];
			$values=[];

			foreach($data as $key => $value) {

				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr="INSERT INTO $table(";
				foreach ($fields as $value) {
					$sqlstr.=$value;
					$ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					}
				}
				$sqlstr.=") VALUES (".str_repeat("?, ", count($values)-1)."?)";
				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return $this->select("$table", null);
			}
			catch(\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg, "data"=>$data, "values"=>$values);
		}

		public function update($table, $data, $conditionStringPassed) {
			$fields=[];
			$values=[];
			$setStr = "";

			foreach($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr="UPDATE $table SET ";
				foreach ($data as $key => $value) {
					$sqlstr.="$key=?";
					$ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					}
				}
				$sqlstr.=" WHERE ".$conditionStringPassed;
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
			return  array(
				"status"=>$status,
				"payload"=>$payload,
				"timestamp"=>date_create());
      // return $payload;

      //Cinomment ko muna para magmatch ung ginagamit na data ng table sa documentation,
      //Andami kasing binabato na data nitong payload. di ko alam kung pano specific lang na part ung gagalawin TY

		}
	}
?>
