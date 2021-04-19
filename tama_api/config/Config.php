<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Auth-User");
	// ini_set('display_errors', '0');
	date_default_timezone_set("Asia/Manila");
	set_time_limit(1000);

  include_once('./models/Auth.php');
  include_once('./models/Get.php');
  include_once('./models/Global.php');
  include_once('./models/Post.php');

	define("DBASE", "tama_db");
	define("USER", "root");
	define("PW", "");
	define("SERVER", "localhost");
	define("CHARSET", "utf8");
	define("SECRET", base64_encode("sampleSecretKey"));

	class Connection {
		protected $connectionString = "mysql:host=".SERVER.";dbname=".DBASE.";charset=".CHARSET;
		protected $options = [
			\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
			\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
			\PDO::ATTR_EMULATE_PREPARES => false
		];

		public function connect() {
			return new \PDO($this->connectionString, USER, PW, $this->options);
		}
	}
?>
