<?php

class Database {
  private $host = DB_HOST;
  private $user = DB_USER;
  private $pass = DB_PASS;
  private $db_name = DB_NAME;

  public function __construct() {
    // data source name
    $dsn = 'mysql:host='.$this->host.';dbname='.$this->db_name;
    $option = [
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ];
    try {
      $this->dbh = new PDO($dsn, $this->user, $this->pass, $option);
    } catch (PDOException $e) {
      die($e->getMessage());
    }
  }

  public function query($query) {
    $this->statement = $this->dbh->prepare($query);
  }

  public function bind($param, $value, $type = null) {
    if(is_null($type)) {
      switch(true) {
        case is_int($value) :
            $type = PDO::PARAM_INT;
            break;
        case is_bool($value) :
            $type = PDO::PARAM_BOOL;
            break;
        case is_null($value) :
            $type = PDO::NULL;
            break;
        default :
            $type = PDO::PARAM_STR;
      }
    }
    $this->statement->bindValue($param, $value, $type);
  }

  public function execute() {
    $this->statement->execute();
  }
  // AMBIL DATA SEMUA 
  public function resultSet() {
    $this->execute();
    return $this->statement->fetchAll(PDO::FETCH_ASSOC);
  }
  // AMBIL DATA 1 BARIS
  public function singleSet() {
    $this->execute();
    return $this->statement->fetch(PDO::FETCH_ASSOC);
  }

  public function dataBerubah() {
    return $this->statement->rowCount();
  }
}

?>
