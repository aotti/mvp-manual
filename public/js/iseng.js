// let tpBox = document.querySelector('#tambahPlayer');
// tpBox.addEventListener('click', (ev)=>{
//   document.querySelector('.tambahPlayer_box').style.display = 'block';
// });
let qS = (el)=>{return document.querySelector(el)}

document.onclick = (ev)=>{
  if(ev.target.id == 'tambahPlayer') {
    qS('.tambahPlayer_box').style.display = 'block';
    qS('.tpBox_header h2').innerText = 'Tambah Player Baru';
    qS('.tpBox_footer button[type=submit]').innerText = 'Tambah';
    qS('input[name=idPlayer]').value = null;
    qS('input[name=namaPlayer]').value = null;
    qS('input[name=angkaPetak]').value = null;
    qS('input[name=uangPlayer]').value = null;
  }
  else if(ev.target.id == 'buttonTutup') {
    qS('.tambahPlayer_box').style.display = 'none';
  }
  else if(ev.target.id == 'editPlayer') {
    qS('.tambahPlayer_box').style.display = 'block';
    qS('.tpBox_header h2').innerText = 'Edit Player';
    qS('.tpBox_footer button[type=submit]').innerText = 'Simpan';

    const ajax = new XMLHttpRequest,
          p_id = `id=${ev.target.dataset.id}`,
          p_url = ev.target.dataset.url;
    // console.log(p_id);
    // console.log(p_url);
    qS('.tambahPlayer_box form').action = `${p_url}/mainpage/edit`;
    ajax.onload = ()=>{
      // console.log(ajax.response, JSON.parse(ajax.response));
      qS('input[name=idPlayer]').value = JSON.parse(ajax.response).id_player;
      qS('input[name=namaPlayer]').value = JSON.parse(ajax.response).nama_player;
      qS('input[name=angkaPetak]').value = JSON.parse(ajax.response).petak;
      qS('input[name=uangPlayer]').value = JSON.parse(ajax.response).uang;
    }
    ajax.open('POST', `${p_url}/mainpage/getEdit`);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(p_id);
  }
  else
    return;
}
