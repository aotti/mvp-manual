<h3> Halo Player </h3>
<button type="button" id="tambahPlayer"> Tambah Player </button>
<ol>
  <?php //print_r($data['iseng']);
  foreach ($data['iseng'] as $d) : ?>
  <li>
    <div class="">
      <?= $d['nama_player']; ?>
      <a href="<?= BASEURL; ?>/mainpage/detail/<?= $d['id_player']; ?>"> Detail </a>
      <a href="#" data-id="<?= $d['id_player']; ?>" data-url="<?= BASEURL; ?>" id="editPlayer"> Edit </a>
      <a href="<?= BASEURL; ?>/mainpage/hapus/<?= $d['id_player']; ?>"> Hapus </a>
    </div>
  </li>
  <?php endforeach; ?>
</ol>

<?php Flasher::flash(); ?>

<div class="tambahPlayer_box">
  <form action="<?= BASEURL; ?>/mainpage/tambah" method="post">
    <div class="tpBox_header">
      <h2> Tambah Player Baru </h2>
    </div>
    <div class="tpBox_body">
      <input type="hidden" name="idPlayer">
      <input type="text" name="namaPlayer" maxlength="8" placeholder="masukkan nama player">
      <input type="number" name="angkaPetak" maxlength="2" placeholder="masukkan angka petak">
      <input type="number" name="uangPlayer" maxlength="8" placeholder="masukkan uang">
    </div>
    <div class="tpBox_footer">
      <button type="submit"> Tambah </button>
      <button type="button" id="buttonTutup"> Tutup </button>
    </div>
  </form>
</div>
