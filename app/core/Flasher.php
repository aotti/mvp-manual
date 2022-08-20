<?php

class Flasher {
  public static function setFlash($pesan, $aksi, $bgcolor) {
    $_SESSION['flash'] = [
      'pesan' => $pesan,
      'aksi' => $aksi,
      'bgcolor' => $bgcolor
    ];
  }

  public static function flash() {
    if(isset($_SESSION['flash'])) {
      echo '<span class="alert_box" style="display: inline; background: '. $_SESSION['flash']['bgcolor'] .'">
              Data player '. $_SESSION['flash']['pesan'] .' '. $_SESSION['flash']['aksi'] .'
            </span>';
      unset($_SESSION['flash']);
    }
  }


}

?>
