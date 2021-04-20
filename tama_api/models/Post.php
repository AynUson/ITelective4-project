<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

    function selectCollabJoin($filter_data) {

			$this->sql = "SELECT *
            from tbl_clinic_supplies
            LEFT JOIN tbl_clinic_medicines on tbl_clinic_medicines.med_id = tbl_clinic_supplies.med_id
            LEFT JOIN tbl_clinic_med_suppliers on tbl_clinic_med_suppliers.supplier_id = tbl_clinic_supplies.supplier_id";

            if($filter_data != null) {
                $this->sql .= " WHERE supply_id=$filter_data";
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

    function selectCheckupJoin($filter_data) {

			$this->sql = "SELECT tbl_clinic_checkups.appointment_id,
            tbl_clinic_checkups.patient_id,
            tbl_clinic_checkups.medOrder_id,
            tbl_clinic_checkups.hprof_id,
            tbl_clinic_checkups.fld_amount,
            tbl_profiling_residents.res_id,
            tbl_profiling_residents.res_lname,
            tbl_profiling_residents.res_mname,
            tbl_profiling_residents.res_fname,
            tbl_profiling_residents.res_ext,
            tbl_profiling_residents.res_gender,
            tbl_clinic_healthprofs.hprof_lname,
            tbl_clinic_healthprofs.hprof_fname,
            tbl_clinic_healthprofs.hprof_mname,
            tbl_clinic_checkups.fld_startTime,
            tbl_clinic_checkups.fld_endTime,
            tbl_clinic_checkups.fld_inProgress,
            tbl_clinic_checkups.fld_symptoms,
            tbl_clinic_checkups.fld_findings,
            tbl_clinic_checkups.fld_remarks,
            tbl_clinic_checkups.fld_isDeleted,
            tbl_clinic_checkups.checkup_id
            from tbl_clinic_checkups
            LEFT JOIN tbl_clinic_healthprofs on tbl_clinic_healthprofs.hprof_id = tbl_clinic_checkups.hprof_id
            LEFT JOIN tbl_profiling_residents on tbl_profiling_residents.res_id = tbl_clinic_checkups.patient_id
            LEFT JOIN tbl_clinic_appointments on tbl_clinic_appointments.appointment_id = tbl_clinic_checkups.appointment_id";

            if($filter_data != null) {
                $this->sql .= " WHERE checkup_id=$filter_data";
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
				'prepared_by'=>'Jason Paul Cruz, Developer',
				"timestamp"=>date_create());
		}
    }
?>
