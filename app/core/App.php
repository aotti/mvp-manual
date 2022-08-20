<?php

class App {
  protected $controller = 'MainPage';
  protected $method = 'index';
  protected $params = [];

  public function __construct() {
    // echo "Mantap";
    // MEMASUKKAN PARAMETER YG SUDAH DI FILTER KE VARIABLE
    $url = $this->parseURL();
    // var_dump($url);

    // CONTROLLER
    // MENCOCOKAN ELEMEN $url PERTAMA DENGAN
    // FILE CONTROLLER YG KITA BUAT
    if(file_exists('../app/controllers/' . (isset($url[0]) ? $url[0] : $url) . '.php')) {
      // var_dump($this->controller);
      $this->controller = $url[0];
      unset($url[0]);
    }
    // var_dump($url);
    require_once '../app/controllers/' . $this->controller . '.php';
    $this->controller = new $this->controller;

    // METHOD
    // MENCOCOKAN ELEMEN $url KEDUA DENGAN
    // PUBLIC FUNCTION DI CONTROLLER YG KITA BUAT
    if(isset($url[1])) {
      if(method_exists($this->controller, $url[1])) {
        $this->method = $url[1];
        unset($url[1]);
      }
    }
    // var_dump($url);

    // PARAMS
    // ELEMEN YG TERSISA DIANGGAP SEBAGAI PARAMETER
    // var_dump($url);
    if(!empty($url)) {
      $this->params = array_values($url);
    }

    // JALANKAN CONTROLLER DAN METHOD SERTA PARAMS (JIKA PARAMS ADA)
    call_user_func_array([$this->controller, $this->method], $this->params);
  }

  public function parseURL() {
    // isset($_REQUEST['url']) BERGUNA UNTUK MENGAMBIL PARAMETER
    // YANG ADA DI URL, LALU DI FILTER AGAR HANYA TEKS YG DIAMBIL
    if(isset($_REQUEST['url'])) {
      // MENGHAPUS / DI AKHIR URL
      $url = rtrim($_REQUEST['url'], '/');
      // UNTUK FILTER URL DARI SIMBOL/KARAKTER ASING
      $url = filter_var($url, FILTER_SANITIZE_URL);
      // SPLIT
      $url = explode('/', $url);
      return $url;
    }
  }
}

?>
