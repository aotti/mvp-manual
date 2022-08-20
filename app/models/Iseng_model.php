<?php

class Iseng_model {
  private $table = 'playerlist';
  private $db;

  public function __construct() {
    $this->db = new Database;
  }

  public function getIseng() {
    $this->db->query('SELECT * FROM ' . $this->table);
    return $this->db->resultSet();
  }

  public function getIsengById($id) {
    // id=:id ARTINYA UNTUK MENGHINDARI SQL INJECTION
    // echo "$id";
    $this->db->query('SELECT * FROM ' . $this->table . ' WHERE id_player=:id_player');
    $this->db->bind('id_player', $id);
    return $this->db->singleSet();
  }

  public function tambahDataPlayer($dataPlayerBaru) {
    // TIAP BUAT QUERY, WAJIB PAKE SPASI SEBELUM DAN SESUDAH TANDA KUTIP
    // KALO MAU TAMBAH VARIABLE $this->apalah
    // CONTOH "SELECT * FROM (SPASI)" . $THIS->GALER . "(SPASI) WHERE ID = 1"
    $query = "INSERT INTO " . $this->table . " VALUES (null, :nama_player, :petak, :uang)";
    $this->db->query($query);
    $this->db->bind('nama_player', $dataPlayerBaru['namaPlayer']);
    $this->db->bind('petak', $dataPlayerBaru['angkaPetak']);
    $this->db->bind('uang', $dataPlayerBaru['uangPlayer']);

    $this->db->execute();
    return $this->db->dataBerubah();
  }

  public function hapusDataPlayer($id) {
    // TIAP BUAT QUERY, WAJIB PAKE SPASI SEBELUM DAN SESUDAH TANDA KUTIP
    // KALO MAU TAMBAH VARIABLE $this->apalah
    // CONTOH "SELECT * FROM (SPASI)" . $THIS->GALER . "(SPASI) WHERE ID = 1"
    $query = "DELETE FROM " . $this->table . " WHERE id_player=:id_player";
    $this->db->query($query);
    $this->db->bind('id_player', $id);

    $this->db->execute();
    return $this->db->dataBerubah();
  }

  public function editDataPlayer($dataPlayerEdit) {
    // TIAP BUAT QUERY, WAJIB PAKE SPASI SEBELUM DAN SESUDAH TANDA KUTIP
    // KALO MAU TAMBAH VARIABLE $this->apalah
    // CONTOH "SELECT * FROM (SPASI)" . $THIS->GALER . "(SPASI) WHERE ID = 1"
    $query = "UPDATE " . $this->table . " SET nama_player = :nama_player, petak = :petak, uang = :uang WHERE id_player = :id_player";
    $this->db->query($query);
    $this->db->bind('id_player', $dataPlayerEdit['idPlayer']);
    $this->db->bind('nama_player', $dataPlayerEdit['namaPlayer']);
    $this->db->bind('petak', $dataPlayerEdit['angkaPetak']);
    $this->db->bind('uang', $dataPlayerEdit['uangPlayer']);

    $this->db->execute();
    return $this->db->dataBerubah();
  }
}

?>
