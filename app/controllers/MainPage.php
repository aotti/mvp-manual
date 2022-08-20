<?php

class MainPage extends Controller {
  public function index() {
    $data['iseng'] = $this->model('Iseng_model')->getIseng();
    $this->view('templates/header');
    $this->view('mainpage/index', $data);
    $this->view('templates/footer');
  }

  public function detail($id) {
    $data['isengDetail'] = $this->model('Iseng_model')->getIsengById($id);
    $this->view('templates/header');
    $this->view('mainpage/detail', $data);
    $this->view('templates/footer');
  }

  public function tambah() {
    // var_dump($_POST);
    // JALANKAN METHOD tambahDataPlayer DI DALAM IF
    if($this->model('Iseng_model')->tambahDataPlayer($_POST) > 0) {
      Flasher::setFlash('berhasil', 'ditambahkan', 'lightgreen');
      header('location:' . BASEURL);
      exit;
    }
    else {
      Flasher::setFlash('gagal', 'ditambahkan', 'salmon');
      header('location:' . BASEURL);
      exit;
    }
  }

  public function hapus($id) {
    // var_dump($_POST);
    // JALANKAN METHOD tambahDataPlayer DI DALAM IF
    if($this->model('Iseng_model')->hapusDataPlayer($id) > 0) {
      Flasher::setFlash('berhasil', 'dihapus', 'lightgreen');
      header('location:' . BASEURL);
      exit;
    }
    else {
      Flasher::setFlash('gagal', 'dihapus', 'salmon');
      header('location:' . BASEURL);
      exit;
    }
  }

  public function getEdit() {
    // echo json_encode($_POST['id']);
    echo json_encode($this->model('Iseng_model')->getIsengById($_POST['id']));
  }

  public function edit() {
    // var_dump($_POST);
    // JALANKAN METHOD tambahDataPlayer DI DALAM IF
    if($this->model('Iseng_model')->editDataPlayer($_POST) > 0) {
      Flasher::setFlash('berhasil', 'diubah', 'lightgreen');
      header('location:' . BASEURL);
      exit;
    }
    else {
      Flasher::setFlash('gagal', 'diubah', 'salmon');
      header('location:' . BASEURL);
      exit;
    }
  }
}

?>
