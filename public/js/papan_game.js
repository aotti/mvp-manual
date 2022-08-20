let cE = (el)=>{return document.createElement(el)}
let qS = (el)=>{return document.querySelector(el)}
let qSA = (el)=>{return document.querySelectorAll(el)}
let xhrG = new XMLHttpRequest(), waitingPlayer, lastPlayerStand = [],
    winLoc = 'main_page.php', winDelay = 5e3, jp = +qS('#playerjp').value.slice(-1),
    regexKartu = new RegExp(
      // JENIS = \\*bebas-penjara,\\*peng.-rezeki,\\*anti-pajak,\\*nerf-pajak
      '\\*bebas-penjara|\\*peng.-rezeki|\\*anti-pajak|\\*nerf-pajak|\\*dadu-gaming|\\*nerf-parkir|\\*nerf-dadugaming|\\*sad-dadugaming|\\*upgrade-kota|\\*giga-dadugaming', 'g'),
    // bentuk papan, uang start, uang kalah, min rand, max rand
    mods = qS('#getMods').value.split(',');
// 'bebas-penjara,anti-pajak,penghambat-rezeki'.match(/bebas-penjara,(?:penghambat-rezeki,anti-pajak|anti-pajak,penghambat-rezeki)|penghambat-rezeki,(?:bebas-penjara|anti-pajak)/)
// console.log(jp);
// console.log(mods);
let papanGame = qS('#papan_game'),
    docFrag = document.createDocumentFragment();
if(mods[0] == 'persegiPanjangV1')
  persegiPanjangV1();
else if(mods[0] == 'persegiPanjangV2')
  persegiPanjangV2();
else if(mods[0] == 'anggapSegitiga') {
  qS('.feedback_box').style.top = '60px';
  qS('.feedback_box').style.right = '345px';
  qS('.feedback_box').style.height = '200px';
  qS('.feedback_box').style.width = '300px';
  anggapSegitiga();
}
else {
  qS('.feedback_box').style.top = '165px';
  // qS('.feedback_box').style.right = '340px';
  bercabangDua();
}
papanGame.appendChild(docFrag);
// docFrag = document.createDocumentFragment();
// console.log(papanGame.rows[1].cells[1]);

// BUAT KARTU TANAH, KOTA, PENJARA, PARKIR BEBAS
// JIKA GANTI KATA tanah MENJADI kota,
// PERHATIKAN CLASS LAIN DENGAN AWALAN kota
// console.log(mods[3], mods[4]);
let randKutukan = Math.floor(Math.random() * ((+mods[4] + 1) - +mods[3])) + +mods[3],
    hargaKutukan = Math.floor((4e3 * (getLocStorage('jpStorage') != null ? +getLocStorage('jpStorage') : 1) * (getLocStorage('putaran') != null ? +getLocStorage('putaran') : 1)) + (1e4 * (getLocStorage('putaran') != null ? +getLocStorage('putaran') : 1) * (randKutukan / 100))),
    hargaKhusus = (getLocStorage('putaran') != null && +getLocStorage('putaran') > 6 ? 1.2e4 : 0);
    np = [2, 5, 6,
          11, 12, 13,
          18, 19, 21,
          25, 26, 1,
          10, 24, 4, 9,
          16, 17, 22, 28,
          7, 15, 20,
          8, 27,
          3, 14, 23,
          mods[0] == 'bercabangDua' ? '14a' : null,
          mods[0] == 'bercabangDua' ? '15a' : null,
          mods[0] == 'bercabangDua' ? '16a' : null,
          mods[0] == 'bercabangDua' ? '28a' : null,
          mods[0] == 'bercabangDua' ? '1a' : null,
          mods[0] == 'bercabangDua' ? '2a' : null].filter(i=>i),
    gambarPetak = [{[np[0]]:'img/padang'}, {[np[1]]:'img/bengkulu'}, {[np[2]]:'img/pontianak'},
                  {[np[3]]:'img/jakarta'}, {[np[4]]:'img/bekasi'}, {[np[5]]:'img/bandung'},
                  {[np[6]]:'img/ciamis'}, {[np[7]]:'img/jokja'}, {[np[8]]:'img/semarang'},
                  {[np[9]]:'img/maumere'}, {[np[10]]:'img/merauke'}, {[np[11]]:'img/start'},
                  {[np[12]]:'img/penjara'}, {[np[13]]:'img/parkir'}, {[np[14]]:'img/danaUmum'}, {[np[15]]:'img/kesempatan'},
                  {[np[16]]:'img/danaUmum'}, {[np[17]]:'img/kesempatan'}, {[np[18]]:'img/danaUmum'}, {[np[19]]:'img/kesempatan'},
                  {[np[20]]:'img/khusus1'}, {[np[21]]:'img/khusus2'}, {[np[22]]:'img/khusus3'},
                  {[np[23]]:'img/terkutuk1'}, {[np[24]]:'img/terkutuk2'},
                  {[np[29]]:'img/kesempatan'}, {[np[30]]:'img/danaUmum'}, {[np[31]]:'img/kesempatan'}, {[np[32]]:'img/danaUmum'}],
    kartuTanahDll = [{[np[0]]:'kota_padang_tanah_48000'}, {[np[1]]:'kota_bengkulu_tanah_50000'}, {[np[2]]:'kota_pontianak_tanah_62000'},
                    {[np[3]]:'kota_jakarta_tanah_69000'}, {[np[4]]:'kota_bekasi_tanah_71000'}, {[np[5]]:'kota_bandung_tanah_73500'},
                    {[np[6]]:'kota_ciamis_tanah_76000'}, {[np[7]]:'kota_jokja_tanah_83000'}, {[np[8]]:'kota_semarang_tanah_87000'},
                    {[np[9]]:'kota_maumere_tanah_90000'}, {[np[10]]:'kota_merauke_tanah_94000'}, {[np[11]]:'lewat_start_25000'},
                    {[np[12]]:'area_penjara'}, {[np[13]]:'area_parkir'}, {[np[14]]:'kartu_danaUmum'}, {[np[15]]:'kartu_kesempatan'},
                    {[np[16]]:'kartu_danaUmum'}, {[np[17]]:'kartu_kesempatan'}, {[np[18]]:'kartu_danaUmum'}, {[np[19]]:'kartu_kesempatan'},
                    {[np[20]]:`area_khusus1_special_${15000 + hargaKhusus}`}, {[np[21]]:`area_khusus2_special_${25000 + hargaKhusus}`}, {[np[22]]:`area_khusus3_special_${35000 + hargaKhusus}`},
                    {[np[23]]:`area_terkutuk1_cursed_${hargaKutukan}`}, {[np[24]]:`area_terkutuk2_cursed_${hargaKutukan}`},
                    {[np[25]]:'area_normal'}, {[np[26]]:'area_normal'}, {[np[27]]:'area_normal'},
                    {[np[28]]:'area_buff'}, {[np[29]]:'kartu_kesempatan'}, {[np[30]]:'kartu_danaUmum'},
                    {[np[31]]:'kartu_kesempatan'}, {[np[32]]:'kartu_danaUmum'}, {[np[33]]:'area_buff'}];
// console.log(Object.keys(kartuTanahDll[0]));
// console.log(kartuTanahDll[1]);
// console.log(kartuTanahDll[1]['7'] = 'sempak');
// console.log(kartuTanahDll[1]);
// console.log(randKutukan);
// let firstPetak = [].slice.call(qSA('[class^=petak]'));
let firstPetak = qSA('[class^=petak]');
// console.log(firstPetak);
// console.log(firstPetak[0]);
for(let i=0; i<kartuTanahDll.length; i++) {
  let k_tanahDll = cE('span');
  for(let j=0; j<firstPetak.length; j++) {
    if(Object.keys(kartuTanahDll[i])[0] == firstPetak[j].title) {
      // firstPetak[j].style.backgroundImage = `url(${gambarPetak[i]}.jpg)`;
      k_tanahDll.classList.add(Object.values(kartuTanahDll[i])[0]);
      firstPetak[j].appendChild(k_tanahDll);
      break;
    }
  }
  k_tanahDll = null;
}
kartuTanahDll = null;

let semuaKotaDll = qSA('[class^=kota], [class^=kartu], [class^=area], [class^=lewat]'),
    teksKotaDll = [ {[np[0]]:'Kota Padang Rp 48.000'}, {[np[1]]:'Kota Bengkulus Rp 50.000'}, {[np[2]]:'Kota Pontianac Rp 62.000'},
                    {[np[3]]:'Kota Jakarta Rp 69.000'}, {[np[4]]:'Kota Bekasih Rp 71.000'}, {[np[5]]:'Kota Bandung Rp 73.500'},
                    {[np[6]]:'Kota Ciamis Rp 76.000'}, {[np[7]]:'Kota Jokjakarta Rp 83.000'}, {[np[8]]:'Kota Semarang Rp 87.000'},
                    {[np[9]]:'Kota Maumere Rp 90.000'}, {[np[10]]:'Kota Merauke Rp 94.000'}, {[np[11]]:'Imagine lewat start..'},
                    {[np[12]]:'Masuk Penjara Bos!'}, {[np[13]]:'Imagine bebas parkir..'}, {[np[14]]:'Kartu Dana Umum'}, {[np[15]]:'Kartu Kesempatan'},
                    {[np[16]]:'Kartu Dana Umum'}, {[np[17]]:'Kartu Kesempatan'}, {[np[18]]:'Kartu Dana Umum'}, {[np[19]]:'Kartu Kesempatan'},
                    {[np[20]]:`Kota khusus-1 Rp ${(15000 + hargaKhusus).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}, {[np[21]]:`Kota khusus-2 Rp ${(25000 + hargaKhusus).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}, {[np[22]]:`Kota khusus-3 Rp ${(35000 + hargaKhusus).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`},
                    {[np[23]]:`Kota terkutuk-1 Rp ${hargaKutukan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}, {[np[24]]:`Kota terkutuk-2 Rp ${hargaKutukan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`},
                    {[np[29]]:'Kartu Kesempatan'}, {[np[30]]:'Kartu Dana Umum'}, {[np[31]]:'Kartu Kesempatan'}, {[np[32]]:'Kartu Dana Umum'}];
// console.log(semuaKotaDll);
// let hm_temp = qS('#playerHarta').value.split('|').filter((v,i,arr) => {return (arr.map(v=>{return v.split(',')[0]}).lastIndexOf(v.split(',')[0]) == i ? v : false)});
let syncUserData = qS('#uKocokDadu').value.split('|').filter(item => item).sort().reverse(),
    urutanPlayer = syncUserData.join('|').split(/\||\d+,/).filter(i=>i),
    prevPlayerPos = qS('#playerPos').value.split('|').filter(item => item),
    urutanPrevPlayer = prevPlayerPos.slice(-(jp-1)).join('|').split(/\||,pos\d+/).filter(i=>i),
    playerNow = syncUserData[prevPlayerPos.length%jp] != null ? syncUserData[prevPlayerPos.length%jp].split(',')[1] : null,
    playerNow2 = null,
    hartaMilik = qS('#playerHarta').value.split('|').filter((v,i,arr) => {return (arr.map(v=>{return v.split(',')[0]}).lastIndexOf(v.split(',')[0]) == i ? v : false)}),
    playerList = qS('.player_list'),
    cekSebaris_1 = [], cekSebaris_2 = [],
    kotaSebaris = [new RegExp('.padang|.bengkulu|.pontianak', 'g'), new RegExp('.jakarta|.bekasi|.bandung', 'g'),
                  new RegExp('.ciamis|.jokja|.semarang', 'g'), new RegExp('.maumere|.merauke', 'g')];
// console.log(hartaMilik);
// console.log(hartaMilik.map(v=>{ return v.split(',')[1].split('uang')[1] }).reduce((prev, curr)=>{ return (Math.abs(curr - 0) < Math.abs(prev - 0) ? curr : prev) }));
// console.log(kotaSebaris);
// console.log(prevPlayerPos);
// console.log(urutanPlayer);
// console.log(urutanPrevPlayer);
// console.log( urutanPrevPlayer.map(v=>{return v}).indexOf(playerNow) );
// console.log(playerNow);
// hm_temp.filter((v,i,arr) => {return (arr.map(v=>{return v.split(',')[0]}).lastIndexOf(v.split(',')[0]) == i ? v : false)});
// console.log( hm_temp.filter((v,i,arr) => {return (arr.map(v=>{return v.split(',')[0]}).lastIndexOf(v.split(',')[0]) == i ? v : false)}) );
// console.log(hm_temp);
for(let i=0; i<hartaMilik.length; i++) {
  for(let j=0; j<kotaSebaris.length; j++) {
    // for(let k=0; k<hartaMilik)
    // console.log(hartaMilik[i].split(',')[2].split(/\*tanah|-1rumah|-2rumah|1hotel/));
    let sebarisTemp = hartaMilik[i].split(',')[2].split(/\*tanah|-1rumah|-2rumah|1hotel/);
    sebarisTemp.splice(0,0,';');
    // console.log(sebarisTemp.join(''));
    if(sebarisTemp.join('').match(kotaSebaris[j])) {
      cekSebaris_1.push(sebarisTemp.join('').match(kotaSebaris[j]));
      // console.log(sebarisTemp.join('').match(kotaSebaris[j]));
      // console.log(kotaSebaris);
    }
  }
}
// console.log(cekSebaris_1);
for(let i=0; i<cekSebaris_1.length; i++) {
  if(cekSebaris_1[i].length == 3) {
    // console.log(cekSebaris_1[i]);
    cekSebaris_2.push(cekSebaris_1[i]);
  }
  else if(cekSebaris_1[i].length == 2 && cekSebaris_1[i].join('').match(kotaSebaris[3])) {
    // console.log(cekSebaris_1[i]);
    cekSebaris_2.push(cekSebaris_1[i]);
  }
}
// console.log(cekSebaris_2);

for(let i=0; i<semuaKotaDll.length; i++) {
  // console.log(semuaKotaDll[i].parentElement.title);
  for(let x in teksKotaDll) {
    if(semuaKotaDll[i].parentElement.title == Object.keys(teksKotaDll[x])[0])
      semuaKotaDll[i].innerText = Object.values(teksKotaDll[x])[0];
  }
  // semuaKotaDll[i].parentElement.style.backgroundImage = `url(${gambarPetak[i]}.jpg)`;
  for(let y in gambarPetak) {
    if(semuaKotaDll[i].parentElement.title == Object.keys(gambarPetak[y])[0])
      inputGambar(i, cE('img'), `${Object.values(gambarPetak[y])[0]}.jpg`);
  }
  for(let j=0; j<hartaMilik.length; j++) {
    let userHM = hartaMilik[j].split(',')[0],
        kotaHM = hartaMilik[j].split(',')[2].split(';').filter(item => item),
        specialHM = hartaMilik[j].split(',')[3].split(';').filter(item => item);
        // k_HMprop = kotaHM.map(v=>{return v.split('*')[1]})[0],
        // k_HMcity = kotaHM.map((v,i,arr)=>{return v.split('*')[0]})[0],
        // k_HMcheck = semuaKotaDll[i].classList[0].includes(kotaHM.map(v=>{return v.split('*')[0]})),
        // k_HMcheck = false,
        // kotaClass = semuaKotaDll[i].classList[0];
    // console.log(kotaHM);
    // console.log(specialHM);
    // console.log(k_HMprop);
    // console.log(k_HMcity);
    // console.log( kotaHM.map(v=>{return v}).forEach(v=>{ console.log(v); }) );
    kotaHM.map(v=>{return v}).forEach((v,idx,ar)=>{
      // console.log(v);
      // console.log(ar);
      // console.log(ar.join(';').split(/\*/));
      // "merauke*tanah-1rumah;jakarta*tanah;bandung*tanah".split(/\*tanah|-1rumah|-2rumah|1hotel/).join('')
      // let k_HMcity = v.split('*')[0];
          // k_HMprop = v.split('*')[1];
      // console.log(k_HMcity);
      if(semuaKotaDll[i].classList[0].includes(v.split('*')[0])) {
        // cekSebaris_2[idx] = v.split('*')[0];
        // console.log(v);
        // console.log(ar.join(';').split(/\*tanah|-1rumah|-2rumah|1hotel/).join(''));
        // k_HMcheck = true;
        let //propDataLen = v.split('*')[1].split('-').length,
            propDataset = v.split('*')[1].split('-')[v.split('*')[1].split('-').length-1],
            kotaTeks = semuaKotaDll[i].innerText.split(' '),
            propTeks = null,
            pajakLebih = 0;
        // console.log(propDataset);
    		// GANTI PAKAI PERSEN UNTUK VALUE pajakLebih
        // console.log(cekSebaris_2.map(v=>{return v.join('')}));
        // console.log(cekSebaris_2.map(v=>{return v.join('')}).toString().match(v.split('*')[0]));
        if(cekSebaris_2.map(v=>{return v.join('')}) != null && cekSebaris_2.map(v=>{return v.join('')}).toString().match(v.split('*')[0])) {
          pajakLebih = .25;
          // console.log('pajak lebih');
        }
        let jenisProp = (()=>{
              if(propDataset == 'tanah') {
                propTeks = `(${userHM})`;
                return '1rumah';
              }
              else if(propDataset == '1rumah') {
                propTeks = '\u{1F3E0}';
                return '2rumah';
              }
              else if(propDataset == '2rumah') {
                propTeks = '\u{1F3E0} \u{1F3E0}';
                return '2rumah1hotel';
              }
              else if(propDataset == '2rumah1hotel') {
                propTeks = '\u{1F3E0} \u{1F3E0} \u{1F3E8}';
                return 'komplek';
              }
            })(),
            hargaProp = (()=>{
              let tempHarga = +semuaKotaDll[i].classList[0].split('_')[3];
              if(propDataset == 'tanah')
                return (tempHarga + (tempHarga * .10) + (tempHarga * pajakLebih));
              else if(propDataset == '1rumah')
                return (tempHarga + (tempHarga * .20) + (tempHarga * pajakLebih));
              else if(propDataset == '2rumah')
                return (tempHarga + (tempHarga * .30) + (tempHarga * pajakLebih));
              else if(propDataset == '2rumah1hotel')
                return (tempHarga + (tempHarga * .40) + (tempHarga * pajakLebih));
            })();
        // console.log(jenisProp);
        semuaKotaDll[i].classList.remove(semuaKotaDll[i].classList[0]);
        semuaKotaDll[i].classList.add(`kota_${v.split('*')[0]}_${jenisProp}_${hargaProp}_${userHM}`);
        semuaKotaDll[i].title = `${userHM} - Rp ${hargaProp}`;
        semuaKotaDll[i].innerText = `${kotaTeks[0]} ${kotaTeks[1]}
                                      ${propTeks}`;
        // console.log(semuaKotaDll[i]);
        userHM = null; kotaHM = null;
        propDataset = null; kotaTeks = null;
        jenisProp = null; hargaProp = null; pajakLebih = null;
      }
    });
    // console.log(k_HMcheck);
    // let tes1 = kotaHM.map(v=>{return v.split('*')[0]});
    // console.log( kotaHM.map((v,i)=>{return v.split('*')[0]}) );
    // console.log(tes1.forEach(v=>{ return v; }));
    specialHM.map(v=>{return v}).forEach((v,idx,ar)=>{
      // console.log(v.split('*')[0]);
      if(semuaKotaDll[i].classList[0].includes(v.split('*')[0])) {
        // console.log(semuaKotaDll[i]);
        // console.log(userHM);
        let specialTeks = semuaKotaDll[i].innerText.split(' '),
            jenisProp = 'special',
            hargaProp = +semuaKotaDll[i].classList[0].split('_')[3];
        semuaKotaDll[i].classList.remove(semuaKotaDll[i].classList[0]);
        semuaKotaDll[i].classList.add(`area_${v.split('*')[0]}_${jenisProp}_${hargaProp}_${userHM}`);
        semuaKotaDll[i].title = `${userHM} - Rp ${hargaProp}`;
        semuaKotaDll[i].innerText = `${specialTeks[0]} ${specialTeks[1]} (${userHM})`;
        userHM = null; kotaHM = null;
        specialTeks = null; jenisProp = null; hargaProp = null;
      }
    });
  }
}
// semuaKotaDll = null;
teksKotaDll = null;
// console.log(firstPetak[7]);
let playerPajak = qS('#playerPajak').value.split('|').filter(item => item).slice(-1)[0];
    // penginjakPJ, penerimaPJ, uangPJ, statusPJ;
// console.log(playerPajak);
if(playerPajak != null) {
  let penginjakPJ = playerPajak.split(',')[0].split('pelaku')[1],
      penerimaPJ = playerPajak.split(',')[1].split('pemilik')[1],
      uangPJ = +playerPajak.split(',')[2],
      statusPJ = playerPajak.split(',')[3];
  // console.log(penginjakPJ, penerimaPJ, uangPJ, statusPJ);
  if(getLocStorage('username') == penerimaPJ && statusPJ == 'status0') {
    // console.log('terima pajak');
    qS('.feedback_box').style.opacity = '1';
    qS('.feedback_box').children[0].innerText += `Uang pajak diterima (Rp ${(uangPJ+'').replace(/\B(?=(\d{3})+(?!\d))/g, ".")})\n`;
    let hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
        kotaSaya = getLocStorage('hartaAnda').split(',')[2],
        kotaSpecial = getLocStorage('hartaAnda').split(',')[3],
        terimaUangPJ = hartaUang + uangPJ;
    setLocStorage('hartaAnda', (`${penerimaPJ},uang${terimaUangPJ},${kotaSaya},${kotaSpecial}`));
    hartaUang = null; kotaSaya = null; terimaUangPJ = null;
    ajax_post(null, 'papan_game.php', `terimaPajak=1`);
    // waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
  }
  penginjakPJ = null; penerimaPJ = null; uangPJ = null; statusPJ = null;
}

let playertf = qS('#playertf').value.split('|').filter(item => item).slice(-2);
    // pengirimTF, penerimaTF, uangTF, statusTF;
// console.log(playertf);
if(playertf != null) {
  // console.log(playertf);
  for(let i=0; i<playertf.length; i++) {
    // console.log(pengirimTF);
    let pengirimTF = playertf[i].split(',')[0].split('dari')[1],
        penerimaTF = playertf[i].split(',')[1].split('kepada')[1],
        // uangTF = +playertf[i].split(',')[2].replace(/(?<=\d+)\./g, ''),
        uangTF = +playertf[i].split(',')[2],
        statusTF = playertf[i].split(',')[3];
    // console.log(penerimaTF, statusTF);
    if(getLocStorage('username') == penerimaTF && statusTF == 'status0') {
      // console.log('diterima');
      // regex uang = /(?<=uang)\d+/
      qS('.feedback_box').style.opacity = '1';
      qS('.feedback_box').children[0].innerText += `Uang transfer diterima (Rp ${(uangTF+'').replace(/\B(?=(\d{3})+(?!\d))/g, ".")})\n`;
      let hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
          kotaSaya = getLocStorage('hartaAnda').split(',')[2],
          kotaSpecial = getLocStorage('hartaAnda').split(',')[3],
          terimaUangTF = hartaUang + uangTF;
      setLocStorage('hartaAnda', (`${penerimaTF},uang${terimaUangTF},${kotaSaya},${kotaSpecial}`));
      hartaUang = null; kotaSaya = null; terimaUangTF = null;
      ajax_post(null, 'papan_game.php', `terimaTransfer=1`);
    }
    pengirimTF = null; penerimaTF = null; uangTF = null; statusTF = null;
  }
}

let notifDaduKartu = qS('#playerDaduKartu').value.split('_').filter(i=>i);
if(notifDaduKartu != '') {
  qS('.feedback_box').style.opacity = '1';
  qS('.feedback_box').children[0].innerText += `[${notifDaduKartu[0]}] dapat kartu = ${notifDaduKartu[1]}\n`;
  ajax_post(null, 'papan_game.php', `daduKartu=reset`);
}

for(let i=0; i<hartaMilik.length; i++) {
  let listSP_1 = cE('span'),
      listSP_2 = cE('span');
  if(getLocStorage('username') != null && getLocStorage('username') == hartaMilik[i].split(',')[0]) {
    listSP_1.style.background = 'lightblue';
    listSP_2.style.background = 'lightblue';
    daftarPlayer(i, listSP_1, listSP_2, getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1]);
  }
  else
    daftarPlayer(i, listSP_1, listSP_2, hartaMilik[i].split(',')[1].split('uang')[1]);
  playerList.appendChild(listSP_1);
  playerList.appendChild(listSP_2);
  listSP_1 = null; listSP_2 = null;
}

// UNTUK MENENTUKAN playerNow VERSI 2
for(let up of urutanPlayer) {
  // let upCounter = 0;
  // console.log(urutanPrevPlayer.map(v=>{return v}).indexOf(up));
  if(urutanPrevPlayer.map(v=>{return v}).indexOf(up) == -1)
    playerNow2 = up;
  // for(let uvp of urutanPrevPlayer) {
  //   if(up != uvp) {
  //     upCounter++;
  //     // console.log(upCounter);
  //     if(upCounter == (jp-1))
  //       playerNow2 = up;
  //   }
  // }
}
// console.log(playerNow2, playerNow == playerNow2);
// console.log(urutanPrevPlayer, urutanPrevPlayer[urutanPrevPlayer.length-1]);
// console.log(getLocStorage('username'));

// CEK BERAPA PLAYER YANG UANGNYA < -200.000
let hmCounter = 0;
for(let hm of hartaMilik) {
  // console.log(hm);
  if(+hm.split(',')[1].split('uang')[1] >= -mods[2]) {
    lastPlayerStand.push(hm.split(',')[0]);
  }
  else if(+hm.split(',')[1].split('uang')[1] < -mods[2]) {
    // console.log( prevPlayerPos.slice(-jp).map(v=>{return v}).indexOf(playerNow) );
    let pLoser1 = prevPlayerPos.slice(-jp).map(v=>{return v.split(',')[0]}).indexOf(playerNow2),
        pLoser2 = urutanPrevPlayer.map(v=>{return v}).indexOf(playerNow2),
        pAlive = hartaMilik.map(v=>{ return v.split(',')[1].split('uang')[1] }).reduce((prev, curr)=>{ return (Math.abs(curr - 0) < Math.abs(prev - 0) ? curr : prev) });
    // console.log(prevPlayerPos.slice(-jp)[0].split(',')[0], hm.split(',')[0], playerNow2);
    // console.log(hm.split(',')[0] == playerNow2);
    // console.log(prevPlayerPos.slice(-jp), hm.split(',')[0], playerNow2, pLoser1);
    // console.log(prevPlayerPos.slice(-jp).map(v=>{return v.split(',')[0]}).indexOf(playerNow2));
    // console.log(pAlive, +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1]);
    // console.log(getLocStorage('username') == pAlive, hm.split(',')[0] == playerNow2 , getLocStorage('dadu_'+prevPlayerPos.slice(-jp)[pLoser1].split(',')[0]).split('_')[1] == playerNow2 , pLoser2 == -1);
    if(+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] == pAlive) {
      // KONDISI IF
      // 1 PLAYER YG AKAN MENGIRIM ajax_post
      // USERENAME PLAYER hartaMilik DISESUAIKAN DGN playerNow2
      // SESUAIKAN USERNAME PLAYER LAIN DGN playerNow2
      // UNTUK MEMASTIKAN URUTAN PLAYER YG JALAN TIDAK SALAH
      if(hmCounter == 0 && hm.split(',')[0] == playerNow2 && getLocStorage('dadu_'+prevPlayerPos.slice(-jp)[pLoser1].split(',')[0]).split('_')[1] == playerNow2 && pLoser2 == -1) {
        // console.log(playerNow2, prevPlayerPos.slice(-jp)[pLoser1].split(',')[1].split('pos')[1]);
        // setLocStorage('hartaAnda', (`${playerNow2},uang${+hm.split(',')[1].split('uang')[1]},kosong,empty`));
        ajax_post(null, 'papan_game.php', `playerPos=${playerNow2},pos${prevPlayerPos.slice(-jp)[pLoser1].split(',')[1].split('pos')[1]}&harta=${playerNow2},uang${+hm.split(',')[1].split('uang')[1]},kosong,empty`);
        // setTimeout(()=>{window.location = winLoc}, 3e3);
        hmCounter += 1;
      }
    }
    else {
      let pAlive2 = hartaMilik.map(v=>{ return v.match(pAlive) }).filter(i=>i)[0].input.split(',')[0];
      // console.log(pAlive, pAlive2);
      if(hmCounter == 0 && hm.split(',')[0] == playerNow2 && getLocStorage('username') == pAlive2 && getLocStorage('dadu_'+prevPlayerPos.slice(-jp)[pLoser1].split(',')[0]).split('_')[1] == playerNow2 && pLoser2 == -1) {
        // console.log(playerNow2, prevPlayerPos.slice(-jp)[pLoser1].split(',')[1].split('pos')[1]);
        ajax_post(null, 'papan_game.php', `playerPos=${playerNow2},pos${prevPlayerPos.slice(-jp)[pLoser1].split(',')[1].split('pos')[1]}&harta=${playerNow2},uang${+hm.split(',')[1].split('uang')[1]},kosong,empty`);
        hmCounter += 1;
      }
      pAlive2 = null;
    }
    pLoser1 = null; pLoser2 = null; pAlive = null;
  }
}
hartaMilik = null;
playerList = null;
setLocStorage('jpStorage', lastPlayerStand.length);
// console.log(lastPlayerStand);

let infoArea = cE('div'),
    // infoFrag = document.createDocumentFragment(),
    userNameSP = cE('span'),
    userName = cE('input'),
    acakDaduSP = cE('span'),
    acakDadu = cE('button'),
    acakDaduTeks = cE('div'),
    acakGiliranSP = cE('span'),
    acakGiliran = cE('button'),
    giliranTeks = cE('div'),
    urutanGiliran = cE('span'),
    tombolMulai = cE('button'),
    tombolMulaiSP = cE('span'),
    putaranTeks = cE('span'),
    putaranBuff = cE('span'),
    paksaStartSP = cE('span'),
    paksaStart = cE('button');
infoArea.classList.add('infoArea');
putaranTeks.innerText = (getLocStorage('putaran') == null ? 'putaran ' : `putaran ${getLocStorage('putaran')} `);
putaranBuff.classList.add('putaranBuff');
putaranBuff.dataset.buff = `[Bonus Uang Kalo Lewat Start] putaran > 6 = uang +40% putaran > 14 = uang +80%`;
putaranBuff.innerText = '\u{2615}';
userName.type = 'text';
userName.placeholder = 'Username';
userName.maxLength = '8';
userNameSP.classList.add('userName');
userNameSP.appendChild(userName);
urutanGiliran.classList.add('urutanGiliran');
urutanGiliran.innerText = 'urutan';
tombolMulai.disabled = true;
paksaStart.disabled = true;

// acakDaduSP.appendChild(dadu3D(cE('div'), cE('div'), cE('div')));

putaranTeks.appendChild(putaranBuff);
infoArea.appendChild(putaranTeks);
infoGame(paksaStartSP, paksaStart, null, null, 'paksaStart', 'Paksa Mulai');
infoArea.appendChild(userNameSP);
infoGame(tombolMulaiSP, tombolMulai, null, null, 'tombolMulai', 'Mulai');
infoGame(acakDaduSP, acakDadu, acakDaduTeks, dadu3D(cE('div'), cE('div'), cE('div')), 'acakDadu', 'Kocok Dadu');
infoGame(acakGiliranSP, acakGiliran, giliranTeks, null, 'acakGiliran', 'Kocok Giliran');
infoArea.appendChild(urutanGiliran);
// infoArea.appendChild(docFrag);
papanGame.appendChild(infoArea);
// docFrag = null;

let localUser = getLocStorage('username');
    //syncUserData = qS('#uKocokDadu').value.split('|').filter(item => item);
// console.log(localUser);
// console.log(syncUserData.length);
// syncUserData.sort();
// syncUserData.reverse();
if(syncUserData.length == jp) {
  // ### COBA PAKAI cE('div') DAN cE('img') SAJA, DARIPADA playerDiv
  createPlayer(cE('div'), cE('img'), 'img/bulet.png', 'stick1', syncUserData[0].split(',')[1], 'pdiv');
  createPlayer(cE('div'), cE('img'), 'img/kotak.png', 'stick2', syncUserData[1].split(',')[1], 'pdiv');
  syncUserData[2] != null ? createPlayer(cE('div'), cE('img'), 'img/segitiga.png', 'stick3', syncUserData[2].split(',')[1], 'pdiv') : null;
  syncUserData[3] != null ? createPlayer(cE('div'), cE('img'), 'img/diamond.png', 'stick4', syncUserData[3].split(',')[1], 'pdiv') : null;
  syncUserData[4] != null ? createPlayer(cE('div'), cE('img'), 'img/tabung.png', 'stick5', syncUserData[4].split(',')[1], 'pdiv') : null;
}
// else if(syncUserData.length > jp)
//   setLocStorage('jp', syncUserData.length);
// createPlayer(playerDiv3, playerShape3, 'img/diamond.png', 'stick3');
// createPlayer(playerDiv4, playerShape4, 'img/segitiga.png', 'stick4');
// playerDiv = null; playerShape = null;
// playerDiv2 = null; playerShape2 = null;
// playerDiv3 = null; playerShape3 = null;

if(syncUserData.length > 1 && localUser != null && getLocStorage('paksaMulai') == null) {
  qS('.feedback_box').style.opacity = '1';
  qS('.feedback_box').children[0].innerText += "Jika ingin bermain < 5 player, klik 'Paksa Mulai'\n";
  paksaStart.disabled = false;
  paksaStart.onclick = (ev)=>{
    paksaStart.disabled = true;
    setLocStorage('paksaMulai', 'true');
    ajax_post(null, 'papan_game.php', `paksaMulai=${localUser},memaksa`);
    waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
  }
}
else if(getLocStorage('paksaMulai') != null)
  paksaStart.style.display = 'none';

// KOCOK GILIRAN, SETELAH DAPAT ANGKA, MASUKKAN KE DATABES
if(localUser == null) {
  acakGiliran.disabled = false;
  acakGiliran.onclick = ()=>{
    waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
    // console.log(userName.value.length);
    if(/^[a-zA-Z]+$/.test(userName.value) && userName.value.length > 3) {
      userName.style.boxShadow = '';
      userName.disabled = true;
      acakGiliran.disabled = true;
      let daduGiliran = Math.floor(Math.random() * (10001 - 1000)) + 1000;
      ajax_post(daduGiliran, 'papan_game.php', `giliran=${daduGiliran},${userName.value}`);
      daduGiliran = null;
    }
    else {
      qS('.feedback_box').style.opacity = '1';
      qS('.feedback_box').children[0].innerText = "Harus 4-8 huruf dan tidak boleh ada spasi\n";
      userName.value = '';
      userName.placeholder = '4-8 Huruf!';
      userName.style.boxShadow = '0 0 10px crimson';
    }
  }
}
else if(localUser != null && getLocStorage('dadu_'+localUser) == null) {
  // console.log('localUser != null');
  acakGiliran.disabled = true;
  urutanGiliran.innerText = 'Menunggu player lain..';
  waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
  ajax_get();
}

// BUAT KONDISI IF AGAR BISA KLIK TOMBOL acakDadu
let //prevPlayerPos = qS('#playerPos').value.split('|').filter(item => item),
    // prevTimer = prevPlayerPos[prevPlayerPos.length-1] != null ? prevPlayerPos[prevPlayerPos.length-1].split(',')[2] : null,
    // nextTurn = prevPlayerPos.length%2,
    // playerNow = syncUserData[prevPlayerPos.length%jp] != null ? syncUserData[prevPlayerPos.length%jp].split(',')[1] : null,
    // getLocStorage('dadu_'+localUser) = getLocStorage('dadu_'+localUser),
    allPlayer = qSA('.pdiv');
// console.log(prevPlayerPos);
// console.log(nextTurn);
// console.log('giliran: '+playerNow);
// console.log(allPlayer);
// console.log(getLocStorage('dadu_'+localUser) != null);
// console.log(getLocStorage('gameStatus'));
if(getLocStorage('gameStatus') == null) {
  tombolMulai.onclick = ()=>{
    tombolMulai.disabled = true;
    setLocStorage('gameStatus', 'berjalan');
    setLocStorage('putaran', 1);
    setLocStorage('hartaAnda', (`${localUser},uang${mods[1]},kosong,empty`));
    setLocStorage('tempMoveChance', 100);
    ajax_post(null, 'papan_game.php', `klikMulai=${localUser},mulai&harta=${getLocStorage('hartaAnda')}`);
    // window.location = winLoc;
    waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
  }
}
else {
  acakGiliran.disabled = true;
  tombolMulai.style.display = 'none';
}

let playerReady = qS('#playerReady').value.split('|').filter(item => item),
    playerfs = qS('#playerfs').value.split('|').filter(item => item);
// console.log(playerReady);
if(playerfs.length > 1 && playerfs.length == syncUserData.length && getLocStorage('gameStatus') == null) {
  // console.log('memaksa');
  clearInterval(waitingPlayer);
  let bw = 12;
  // setTimeout(()=>{urutanGiliran.innerText = `${playerfs.length} player memaksa \u{1F435}\n`}, 1e3);
  waitingPlayer = setInterval(()=>{
    if(bw == 0) {
      // clearInterval(waitingPlayer);
      // setLocStorage('jp', playerfs.length);
      ajax_post(null, 'papan_game.php', `gantiJP=${playerfs.length}`);
      waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
    }
    else
      urutanGiliran.innerText += '\u{1F34C}';
    bw -= 3;
  }, winDelay-2e3);
}

if(readyCondition() && getLocStorage('gameStatus') == null) {
  tombolMulai.disabled = false;
  urutanGiliran.innerText = 'Menunggu player lain klik Mulai..';
  waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
}
else if(readyCondition() && getLocStorage('gameStatus') != null) {
  urutanGiliran.innerText = 'Menunggu player lain klik Mulai..';
  waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
}
else if(playerReady.length == jp) {
  if(getLocStorage('dadu_'+localUser) != null && lastPlayerStand.length == 1) {
    qS('#pGameSelesai').play();
    urutanGiliran.innerText = `Game Selesai\nPemenang: ${lastPlayerStand[0]}`;
  }
  else if(getLocStorage('dadu_'+localUser) != null && lastPlayerStand.length > 1) {
    // for(let i in prevPlayerPos.slice(-jp))
    //   console.log(prevPlayerPos.slice(-jp)[i]);
    if(prevPlayerPos.length > 0) {
      // console.log(playerNow);
      // console.log(prevPlayerPos[prevPlayerPos.length-2].split(',')[1].split('pos')[1]);
      // console.log(prevPlayerPos[prevPlayerPos.length-2].split(',')[0]);
      let prevMid = prevPlayerPos.slice(-jp);
          // prevPlayer = prevPlayerPos[prevPlayerPos.length-2].split(',');
      // console.log(prevMid);
      for(let i=0; i<allPlayer.length; i++) {
        // PAKAI FOR LAGI UNTUK MENCOCOKAN allPlayer[i].id DENGAN prevMid[i].split(',')[0]
        for(let j=0; j<prevMid.length; j++) {
          if(allPlayer[i].id == prevMid[j].split(',')[0]) {
            // console.log(allPlayer[i]);
            for(let k=0; k<firstPetak.length; k++) {
              if(firstPetak[k].title == prevMid[j].split(',')[1].split('pos')[1])
                firstPetak[k].appendChild(allPlayer[i]);
            }
          }
        }
      }
      // console.log(prevTimer);
      // LALU setLocStorage = true UNTUK PLAYER SELANJUTNYA
      // CEK localStorage JIKA ADA VALUE 'penjara'
      // setLocStorage('dadu_'+prevPlayer, 'false_'+prevPlayer);
      // if(cekKartu(playerNow) != null) {
        if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/penjara\d+/)) {
          // console.log('penjara');
          urutanGiliran.innerText = `"anda di penjara, poin ${poinPenjara(playerNow)}"`;
          setLocStorage('dadu_'+playerNow, `true_${playerNow}_penjara${poinPenjara(playerNow)}`);
        }
        else if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu)) {
          // console.log('punya kartu');
          setLocStorage('dadu_'+playerNow, `true_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')}`);
        }
        else {
          // console.log('tak punya kartu');
          setLocStorage('dadu_'+playerNow, `true_${playerNow}`);
        }
      // }
    }
    userName.value = localUser;
    userName.disabled = true;
    userName.style.boxShadow = '0 0 10px blue';
    // console.log(+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1]);
    if(getLocStorage('dadu_'+localUser).includes(playerNow) && +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] >= -mods[2]) {
      // console.log('giliran kaw');
      qS('#pTurnAudio').play();
      // qS('#playerAudio').click();
      acakDaduTeks.style.background = 'lightgreen';
      acakDaduTeks.innerText = 'Giliran anda.';
      // if(+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] < -mods[2]) {
      //   // console.log('anda kalah');
      //
      //   // setLocStorage('hartaAnda', (`${localUser},uang-200001,kosong`));
      //   // kocokDaduClick(0);
      //   // acakDadu.click();
      // }
      if(getLocStorage('awtoKocokDadu') != null && getLocStorage('awtoKocokDadu') == 'otomatis') {
        kocokDaduClick(null);
        setTimeout(()=>{acakDadu.click()}, 800);
      }
      else
        kocokDaduClick(null);
      // console.log('Giliran anda.');
      // console.log(qS('audio'));
    }
    else if(getLocStorage('dadu_'+localUser).includes(localUser)) {
      // console.log('Belum giliran');
      acakDaduTeks.style.background = 'orange';
      acakDaduTeks.innerText = 'Belum giliran..';
      // console.log(getLocStorage('dadu_'+localUser).includes('penjara'));
      waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
    }
  }
}

// MENU ITEM DI DALAM SETTING
if(getLocStorage('hartaAnda') != null) {
  // OPSI LEAVE GAME
  qS('.leaveGame').onclick = ()=>{
    if(confirm('Yakin mau udahan?')) {
      if(acakDaduTeks.innerText == 'Giliran anda.') {
        setLocStorage('hartaAnda', (`${localUser},uang-900001,kosong,empty`));
        qS('.feedback_box').style.opacity = '1';
        qS('.feedback_box').children[0].innerText += 'sebelum close tab, kocok dadu dan tunggu sampai giliran anda selesai\n';
      }
      else
        alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Gk bisa kalo masih giliran kaw..`);
    }
    qS('.setting_menu').style.display = 'none';
  }
  // OPSI DAFTAR KOTA
  qS('.myCityList').onclick = (ev)=>{
    if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*upgrade-kota/))
      qS('.myCityUpgrade').disabled = false;
    function daftarKotaSaia(el, cls, teks) {
      el.classList.add(cls);
      el.innerText = teks;
      docFrag.appendChild(el);
    }
    // console.log(ev.target.classList);
    if(ev.target.classList[0] == 'myCityList') {
      if(getLocStorage('hartaAnda').split(',')[2] != 'kosong') {
        for(let i=0; i<getLocStorage('hartaAnda').split(',')[2].split(';').filter(i=>i).length; i++) {
          for(let j=0; j<firstPetak.length; j++) {
            if(firstPetak[j].children[1] != null && getLocStorage('hartaAnda').split(',')[2] != '' && firstPetak[j].children[1].classList[0].includes(getLocStorage('hartaAnda').split(',')[2].split(';')[i].split('*')[0])) {
              // console.log(firstPetak[j].children[0].innerText);
              let cityDiv = cE('div');
              cityDiv.classList.add('myCityItem');
              daftarKotaSaia(cE('i'), 'myCityItem_c', `Kota ${firstPetak[j].children[1].classList[0].split('_')[1]}`);
              // console.log(firstPetak[j].children[1].classList[0]);
              daftarKotaSaia(cE('i'), 'myCityItem_c', `Rp ${firstPetak[j].children[1].classList[0].split('_')[3].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`);
              daftarKotaSaia(cE('button'), 'myCityItem_c', `Jual`);
              cityDiv.appendChild(docFrag);
              qS('.myCityBox').insertBefore(cityDiv, qS('.myCityBox').firstChild);
              cityDiv = null;
            }
          }
        }
      }
      qS('.myCityBox').style.display = 'block';
    }
    // JIKA KLIK TOMBOL JUAL
    else if(ev.target.classList[0] == 'myCityItem_c' && ev.target.nodeName == 'BUTTON') {
      // console.log('tombol jual');
      // console.log(ev.target.previousSibling.previousSibling.innerText.split(' ')[1]);
      if(getLocStorage('jualKota') == null || getLocStorage('jualKota') == 'belum') {
        if(confirm(`Yakin mau jual Kota ${ev.target.previousSibling.previousSibling.innerText.split(' ')[1]}?\nPaling dapet duit ${ev.target.previousSibling.innerText} doang..`)) {
          // console.log('Anda mengdapat uang!');
          let hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
              kotaSpecial = getLocStorage('hartaAnda').split(',')[3],
              sisaKota = [],
              hasilJual = hartaUang + +ev.target.previousSibling.innerText.split(' ')[1].replace(/(?<=\d+)\./g, '');
          for(let i=0; i<getLocStorage('hartaAnda').split(',')[2].split(';').length; i++) {
            if(!getLocStorage('hartaAnda').split(',')[2].split(';')[i].includes(ev.target.previousSibling.previousSibling.innerText.split(' ')[1]))
              sisaKota[i] = getLocStorage('hartaAnda').split(',')[2].split(';')[i];
          }
          // console.log(sisaKota.filter(item=>item).join(';'));
          setLocStorage('jualKota', 'sudah');
          setLocStorage('hartaAnda', `${localUser},uang${hasilJual},${(sisaKota.filter(item=>item).join(';') == '' ? 'kosong' : sisaKota.filter(item=>item).join(';'))},${kotaSpecial}`);
          ajax_post(null, 'papan_game.php', `harta=${getLocStorage('hartaAnda')}`);
          setTimeout(()=>{window.location = winLoc}, 2e3);
          // window.location = winLoc;
          hartaUang = null; sisaKota = null; hasilJual = null;
        }
      }
      else if(getLocStorage('jualKota') == 'sudah')
        alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Tunggu putaran selanjutnya!`);
    }
    else if(ev.target.classList[0] == 'myCityUpgrade') {
      function refreshPage() {
        clearInterval(waitingPlayer);
        waitingPlayer = setInterval(()=>{
          window.location = winLoc;
          acakDadu.disabled = false;
        }, winDelay);
      }
      // console.log(prevPlayerPos);
      qS('.myCityUpgrade').disabled = true;
      if(confirm('[\u{2755}] Jika Anda setuju ingin upgrade:\n1. Pastikan sudah punya kota\n2. Uang cukup untuk upgrade\n3. Kalo tak sesuai 2 syarat di atas, nanti kartu hilang jangan nangis')) {
        qS('.feedback_box').style.opacity = '1';
        qS('.feedback_box').children[0].innerText += "kartu upgrade kota terpakai\n";
        setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*upgrade-kota'))}`);
        let listUpgrade = [], randomUpgrade, bw = 9,
            tempLokasi = getLocStorage('hartaAnda').split(',')[2],
            playerMove = (()=>{
              for(let i in prevPlayerPos.slice(-jp)) {
                if(prevPlayerPos.slice(-jp)[i].split(',')[0] == playerNow)
                  return prevPlayerPos.slice(-jp)[i].split(',')[1].split('pos')[1];
              }
            })();
        // console.log(playerMove);
        // console.log(tempLokasi);
        for(let i=0; i<tempLokasi.split(';').filter(i=>i).length; i++) {
          // console.log( tempLokasi.split(';')[i].split('*')[0] );
          for(let j=0; j<semuaKotaDll.length; j++) {
            if(semuaKotaDll[j].classList[0].includes(tempLokasi.split(';')[i].split('*')[0])) {
              // console.log(semuaKotaDll[j].parentElement.firstChild.data);
              listUpgrade.push(semuaKotaDll[j].classList[0]);
            }
          }
        }
        // console.log(listUpgrade);
        randomUpgrade = Math.floor(Math.random() * listUpgrade.length);
        if(listUpgrade.length > 0) {
          qS('#pMasukLokasi').play();
          waitingPlayer = setInterval(()=>{
            if(bw == 0) {
              qS('.confirm_box').style.display = 'none';
              ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
              refreshPage();
            }
            else {
              // console.log(listUpgrade[randomUpgrade]);
              yesNoWhenBuyCity(qS('.confirm_box').children[1], qS('.confirm_box').children[2], listUpgrade[randomUpgrade], bw,
                                `Mau upgrade Kota ${listUpgrade[randomUpgrade].split('_')[1]} dengan harga Rp ${listUpgrade[randomUpgrade].split('_')[3].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}? `,
                                qS('.confirm_box'), playerMove, refreshPage, 'kota');
              bw -= 1;
            }
          }, 1e3);
        }
        else {
          // qS('.confirm_box').style.display = 'none';
          kartuAlertInfo(qS('.confirm_box'), 'Kaw tak punya kota...\n\u{1F435} \u{1F34C}');
          // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
          refreshPage();
        }
      }
    }
    else if(ev.target.classList[0] == 'myCityBox' || ev.target.classList[0] == 'myCityItem' || ev.target.classList[0] == 'myCityItem_c' || ev.target.classList[0] == 'myCityButton')
      return;
    else {
      qS('.myCityBox').style.display = 'none';
      qS('.setting_menu').style.display = 'none';
      while(qS('.myCityBox').firstChild && qS('.myCityBox').firstChild.classList != null && qS('.myCityBox').firstChild.classList[0] != 'myCityButton')
        qS('.myCityBox').removeChild(qS('.myCityBox').firstChild);
    }
  }
  // OPSI TRANSFER
  qS('.transferUang').onclick = (ev)=>{
    function transferCB(el, val, teks, mainEL) {
      // console.log(val);
      el.value = val;
      el.innerText = (isNaN(teks) ? teks : `Rp ${(teks+'').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`);
      mainEL.appendChild(el);
    }
    // BUKA TUTUP BOX TRANSFER UANG
    if(ev.target.classList[0] == 'transferUang')
      qS('.transferBox').style.display = 'block';
    else if(ev.target.classList[0] == 'transferTutup') {
      qS('.transferBox').style.display = 'none';
      qS('.setting_menu').style.display = 'none';
      while(qS('.transferBox').firstChild && qS('.transferBox').firstChild.classList != null && qS('.transferBox').firstChild.classList[0] != 'transferButton')
        qS('.transferBox').removeChild(qS('.transferBox').firstChild);
    }

    if(acakDaduTeks.innerText == 'Giliran anda.') {
      if(qS('.userTFCB').children.length == 0) {
        qS('.transferInfo').innerText = 'Rp ' + (()=>{
          if(getLocStorage('transferStack') != null) {
            if(+getLocStorage('transferStack') < 35000)
              return '15.000 ~ 35.000 [50%]';
            else if(+getLocStorage('transferStack') < 50000)
              return '35.000 ~ 50.000 [80%]';
            else
              return '50.000 ~ 75.000 [100%]';
          }
          else
            return '15.000 ~ 35.000';
        })();
        qS('.transferStack').innerText = (getLocStorage('transferStack') == null ? 0 : `Rp ${getLocStorage('transferStack').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`)
        for(let up of urutanPlayer) {
          if(up != localUser)
            transferCB(cE('option'), up, up, qS('.userTFCB'));
        }
        for(let ua of [15e3, 35e3, 5e4])
          transferCB(cE('option'), ua, ua, qS('.uangTFCB'));
      }
      // JIKA KLIK TOMBOL KIRIM
      // console.log(ev.target);
      else if(ev.target.classList[0] == 'transferKirim' && (getLocStorage('transferStatus') == null || getLocStorage('transferStatus') == 'belum')) {
        // console.log(ev.target.previousElementSibling.previousElementSibling.value);
        ev.target.disabled = true;
        if(getLocStorage('transferStack') == null)
          setLocStorage('transferStack', +ev.target.previousElementSibling.value);
        else {
          (+getLocStorage('transferStack') >= 75000 ?
            setLocStorage('transferStack', +ev.target.previousElementSibling.value)
            :
            setLocStorage('transferStack', (+getLocStorage('transferStack') + +ev.target.previousElementSibling.value))
          );
        }
        let hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
            kotaSaya = getLocStorage('hartaAnda').split(',')[2],
            kotaSpecial = getLocStorage('hartaAnda').split(',')[3],
            kirimUang = hartaUang - +ev.target.previousElementSibling.value,
            kartuTF = null,
            tfStack = +getLocStorage('transferStack');
        // console.log(tfStack);
        if(kirimUang > 0) {
          // 15K - 35K
          if(tfStack > 0 && tfStack < 35000) {
            kartuTF = transferBonus(null, [21], [51],
                          ['kartu dadu gaming', 'kartu nerf parkir'],
                          ['*dadu-gaming', '*nerf-parkir']);
          }
          // 35K - 50K
          else if(tfStack >= 35000 && tfStack < 50000) {
            kartuTF = transferBonus('yes', [21, 21], [41, 41],
                          ['kartu nerf dadu gaming', 'kartu dadu gaming', 'kartu nerf pajak', 'kartu penghambat rezeki'],
                          ['*nerf-dadugaming', '*dadu-gaming', '*nerf-pajak', '*peng.-rezeki']);
          }
          // 50K - 75K
          else if(tfStack >= 50000 && tfStack <= 75000) {
            kartuTF = transferBonus('yes', [61, 76], [101, 101],
                          ['kartu nerf dadu gaming', 'kartu giga dadu gaming', 'upgrade 1 kota random', 'kartu anti pajak'],
                          ['*nerf-dadugaming', '*giga-dadugaming', '*upgrade-kota', '*anti-pajak']);
          }
          qS('.feedback_box').style.opacity = '1';
          qS('.feedback_box').children[0].innerText += `sedang mengirim uang, tunggu sampai notif hilang\n\n[Bonus 1] ${(kartuTF[0] == null ? 'tak ada' : kartuTF[0])}\n[Bonus 2] ${(kartuTF[1] == null ? 'tak ada' : kartuTF[1])}`;
          setLocStorage('hartaAnda', (`${localUser},uang${kirimUang},${kotaSaya},${kotaSpecial}`));
          // console.log(hartaUang);
          // console.log(kirimUang);
          hartaUang = null; kotaSaya = null; kirimUang = null;
          // docFrag = null;
          // console.log(ev.target.classList);
          // console.log(v.id);
          setLocStorage('transferStatus', 'sudah');
          ajax_post(null, 'papan_game.php', `transferUang=dari${localUser},kepada${ev.target.previousElementSibling.previousElementSibling.value},${+ev.target.previousElementSibling.value},status0`);
          // clearInterval(waitingPlayer);
          // waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
          setTimeout(()=>{window.location = winLoc}, winDelay);
        }
        else
          alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Mau ngirim uang ghoib, bang?`);
      }
      else if(ev.target.classList[0] == 'transferUang' || ev.target.classList[0] == 'transferBox' || ev.target.classList[0] == 'transferItem' || ev.target.classList[0] == 'userTFCB' || ev.target.classList[0] == 'uangTFCB' || ev.target.classList[0] == 'transferTutup')
        return;
      else if(getLocStorage('transferStatus') == 'sudah')
        alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Tunggu putaran selanjutnya!`);
    }
    else
      alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Cuma boleh kalaw lagi giliran anda dan belum kocok dadu.. #NoDebat`);
  }
  // OPSI SERANG PLAYER
  qS('.serangPlayer').onclick = ()=>{
    alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

belum ada fiturnya gays... \u{1F639}\nnext apdet lah ya, amb males mengcoding \u{1F640}`);
  }
  // OPSI AWTO KOCOK DADU
  if(getLocStorage('awtoKocokDadu') != null && getLocStorage('awtoKocokDadu') == 'otomatis')
    qS('#awtoKocokDadu').checked = true;
  qS('#awtoKocokDadu').disabled = false;
  qS('#awtoKocokDadu').onclick = (ev)=>{
    // console.log(ev.target.checked);
    if(ev.target.checked == true) {
      setLocStorage('awtoKocokDadu', 'otomatis');
      acakDadu.click();
    }
    else
      setLocStorage('awtoKocokDadu', 'manual');
  }
}

// KLIK TOMBOL SETTING
qS('.setting_button').onclick = ()=>{
  // console.log(qS('.setting_menu').style.display);
  if(qS('.setting_menu').style.display == 'none' || qS('.setting_menu').style.display == '')
    qS('.setting_menu').style.display = 'block';
  else {
    qS('.myCityBox').style.display = 'none';
    qS('.setting_menu').style.display = 'none';
    while(qS('.myCityBox').firstChild && qS('.myCityBox').firstChild.classList != null && qS('.myCityBox').firstChild.classList[0] != 'myCityButton')
      qS('.myCityBox').removeChild(qS('.myCityBox').firstChild);
  }
}

qS('#cekPlayer').onclick = ()=>{
  alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

[Player Ingfo]\nmax player               > ${jp} butir\nplayer bergabung   > ${qS('#uKocokDadu').value}\nbentuk player          > Player 1 = O | Player 2 = \u{25A2}\n                                      Player 3 = \u{25B3} | Player 4 = \u{25C7}\n                                      Player 5 = pokoknya tabung`);
}

qS('#cekMods').onclick = ()=>{
  alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

[Mods Ingfo]\nbentuk papan > ${mods[0]}\nuang start        > Rp ${mods[1]}\nuang kalah      > Rp -${mods[2]}\nrand kutukan  > ${mods[3]}-${mods[4]}%\ncabang %        > ${mods[5]}%`);
}

qS('#clearStorage').onclick = ()=>{
  if(confirm(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

[\u{2755}] Tombol 'Reset Storage' akan menghapus data anda, jangan diklik kalo lagi main!\nJika ingin berhenti main, klik \u{2699} (di player list) lalu pilih 'Udahan dulu'`)) {
    localStorage.clear();
    setTimeout(()=>{window.location = winLoc}, 500);
  }
}

qS('#hardRefresh').onclick = ()=>{
  if(confirm(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Yakin mau hard refresh? ya bole aja sih..`)) {
    window.location.reload(true);
    // setTimeout(()=>{window.location = winLoc}, 500);
  }
}

qS('#resetYes').onclick = ()=>{
  qS('.reset_file').style.display = 'none';
  ajax_post(null, 'papan_game.php', 'resetFile=true');
  waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
}
qS('#resetNo').onclick = ()=>{
  qS('.reset_file').style.display = 'none';
}

inputRange(qS('.uangStart'), qS('#uangStart'), '', false);
inputRange(qS('.uangKalah'), qS('#uangKalah'), '', true);
inputRange(qS('.minRand'), qS('#minRand'), '%', false);
inputRange(qS('.maxRand'), qS('#maxRand'), '%', false);
inputRange(qS('.branchP'), qS('#branchP'), '%', false);

qS('#saveMods').onclick = ()=>{
  // console.log(qSA('.mod_bentukPapan'));
  // console.log(qSA('input[type=range]'));
  let bPapan = (()=>{
    for(let i in qSA('.mod_bentukPapan')) {
      if(qSA('.mod_bentukPapan')[i].checked == true)
        return qSA('.mod_bentukPapan')[i].value;
    }
  })(),
  rangeInputs = (()=>{
    let ranges = [];
    for(let j in qSA('input[type=range]')) {
      if(qSA('input[type=range]')[j].id == 'uangStart')
        ranges.push(qSA('input[type=range]')[j].value);
      else if(qSA('input[type=range]')[j].id == 'uangKalah')
        ranges.push(qSA('input[type=range]')[j].value);
      else if(qSA('input[type=range]')[j].id == 'minRand')
        ranges.push(qSA('input[type=range]')[j].value);
      else if(qSA('input[type=range]')[j].id == 'maxRand')
        ranges.push(qSA('input[type=range]')[j].value);
      else if(qSA('input[type=range]')[j].id == 'branchP')
        ranges.push(qSA('input[type=range]')[j].value);
    }
    return ranges;
  })();
  // console.log(bPapan);
  // console.log(rangeInputs);
  qS('.setting_mods').style.display = 'none';
  ajax_post(null, 'papan_game.php', `editMods=${bPapan},${rangeInputs[0]},${rangeInputs[1]},${rangeInputs[2]},${rangeInputs[3]},${rangeInputs[4]}`);
  waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
}

qS('#cancelMods').onclick = ()=>{
  qS('.setting_mods').style.display = 'none';
}

qSA('summary').forEach((v,i,ar)=>{
  if(getLocStorage('details') != null && getLocStorage('details') == v.parentElement.id) {
    v.parentElement.open = true;
    // console.log(v.parentElement.id);
  }
  else if(getLocStorage('details') != null && getLocStorage('details') != v.parentElement.id)
    v.parentElement.open = false;
  v.parentElement.children[0].onclick = (ev)=>{
    // for(let i of qSA('.breakLine'))
    //   i.appendChild(cE('br'));
    alert(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄

${ev.target.parentElement.innerText}`);
  }
  v.onclick = (ev)=>{
    // console.log(v.parentElement.children[0]);
    // alert(v.parentElement.innerText);
    if(ev.target == v) {
      for(let i=0; i<ar.length; i++) {
        if(ar[i] != v)
          ar[i].parentElement.open = false;
        else
          setLocStorage('details', ar[i].parentElement.id);
      }
    }
  }
});

// #######################################################
// ########## BAGIAN BAWAH INI WAJIB OBFUSCATE ###########
// ########## BAGIAN BAWAH INI WAJIB OBFUSCATE ###########
// ########## BAGIAN BAWAH INI WAJIB OBFUSCATE ###########
// #######################################################
// console.log(qSA('.header_game > span > span'));
for(let i of qSA('.header_game > span > span, .putaranBuff')) {
  i.onclick = ()=>{
    function keysMod(keyName, keyType, count) {
      if(getLocStorage(keyName) == null)
        setLocStorage(keyName, 1);
      else if(i.innerText == keyType)
        setLocStorage(keyName, (+getLocStorage(keyName) + 1));
      if(+getLocStorage(keyName) == count)
        alert(`${keyName} aktif`);
    }
    // console.log(i.innerText, '\u{1F3E8}');
    if(i.innerText == '\u{1F3E8}')
      keysMod('key1', '\u{1F3E8}', 4);
    else if(i.innerText == '\u{1F3E0}')
      keysMod('key2', '\u{1F3E0}', 5);
    else if(i.innerText == '\u{2615}')
      keysMod('key3', '\u{2615}', 6);

    if(getLocStorage('key1') == 4 && getLocStorage('key2') == 5 && getLocStorage('key3') == 6) {
      qS('.mods_confirm').style.display = 'block';
      localStorage.removeItem('key1');
      localStorage.removeItem('key2');
      localStorage.removeItem('key3');
    }

    // RESET FILE
    if(i.id == 'resetHp') {
      if(getLocStorage('resetHp') == null)
        setLocStorage('resetHp', 1);
      else if(+getLocStorage('resetHp') < 6)
        setLocStorage('resetHp', (+getLocStorage('resetHp') + 1));
      if(+getLocStorage('resetHp') == 6) {
        if(confirm('Yakin ingin reset semua file?')) {
          ajax_post(null, 'papan_game.php', 'resetFile=true');
          waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
          localStorage.removeItem('resetHp');
        }
        else
          localStorage.removeItem('resetHp');
      }
    }
  }
}

qS('.mods_confirm > input').onclick = (ev)=>{
  // console.log(ev.target);
  if(ev.target.value == `${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}`) {
    qS('.mods_confirm').style.display = 'none';
    qS('.setting_mods').style.display = 'block';
  }
}

// CARA ALTERNATIF

// for(let i=0; i<30; i++) {
//   let petak = cE('div');
//   if((i > 6 && i < 11) || (i > 12 && i < 17) || (i > 18 && i < 23)) {
//     petak.classList.add('p99');
//     papanGame.appendChild(petak);
//   }
//   else {
//     petak.classList.add('p'+(i+1));
//     petak.innerText = 'urutan:'+(i+1);
//     papanGame.appendChild(petak);
//   }
// }


// qS('#resetHp').onclick = (ev)=>{
//   // console.log(ev.detail);
//   if(getLocStorage('resetHp') == null)
//     setLocStorage('resetHp', 1);
//   else if(+getLocStorage('resetHp') < 6)
//     setLocStorage('resetHp', (+getLocStorage('resetHp') + 1));
//   if(+getLocStorage('resetHp') == 6) {
//     if(confirm('Yakin ingin reset semua file?')) {
//       ajax_post(null, 'papan_game.php', 'resetFile=true');
//       waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
//       localStorage.removeItem('resetHp');
//     }
//     else
//       localStorage.removeItem('resetHp');
//   }
//   // setTimeout(()=>{localStorage.removeItem('resetHp')}, 800);
// }


// // MEMBUAT TOMBOL DROPDOWN UNTUK TRANSFER UANG
// // console.log( qSA('.player_list > span[id]') );
// qSA('.player_list > span[id]').forEach(v=>{
//   // console.log(v.id, localUser);
//   if(v.id != localUser) {
//     // console.log(v.id);
//     v.onclick = (ev)=>{
//       if(acakDaduTeks.innerText == 'Giliran anda.') {
//         waitingPlayer = setInterval(()=>{window.location = winLoc}, 1500);
//         // console.log(ev.target);
//         // console.log(ev.target.id);
//         // console.log(ev.target.closest());
//         let tf_div = cE('div'), tf_child;
//         tf_div.classList.add('transferSetting');
//         // tf_child.classList.add('50000');
//         // tf_child.innerText = 'Kirim 50k';
//         // docFrag.appendChild(tf_child);
//         // transferOptions(tf_child, 'transferHeading', 'Transfer Uang');
//         transferOptions(tf_child, '25000', 'Kirim 25.000');
//         transferOptions(tf_child, '40000', 'Kirim 40.000');
//         transferOptions(tf_child, '65000', 'Kirim 65.000');
//         tf_div.appendChild(docFrag);
//         // console.log(tf_div);
//         // console.log(ev.target);
//         if(ev.target == v && ev.target.id != localUser && getLocStorage('transferStatus') != 'sudah') {
//           ev.target.appendChild(tf_div);
//           // setTimeout(()=>{(v.children[0] != null ? v.removeChild(v.children[0]) : null)},winDelay);
//         }
//         // BUAT KONDISI AGAR BISA TRANSFER HANYA 1x TIAP PUTARAN
//         else if(v.children[0] != null && getLocStorage('transferStatus') == null || getLocStorage('transferStatus') == 'belum') {
//           // console.log(isNaN(+ev.target.classList[0]) ? 0 : +ev.target.classList[0]);
//           // console.log(+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1]);
//           while(v.firstChild)
//             v.removeChild(v.firstChild);
//           // console.log(v);
//           // console.log(v.children[0]);
//           // v.removeChild(v.children[0]);
//           let hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
//               kotaSaya = getLocStorage('hartaAnda').split(',')[2],
//               kotaSpecial = getLocStorage('hartaAnda').split(',')[3],
//               kirimUang = hartaUang - (isNaN(+ev.target.classList[0]) ? 0 : +ev.target.classList[0]),
//               kartuTF = null;
//           if(kirimUang > 0) {
//             if(+ev.target.classList[0] == 25000) {
//               kartuTF = transferBonus(null, [21], [51],
//                             ['kartu nerf dadu gaming', 'kartu nerf parkir'],
//                             ['*nerf-dadugaming', '*nerf-parkir']);
//             }
//             else if(+ev.target.classList[0] == 40000) {
//               kartuTF = transferBonus('yes', [21, 21], [41, 41],
//                             ['kartu nerf dadu gaming', 'kartu dadu gaming', 'kartu nerf pajak', 'kartu penghambat rezeki'],
//                             ['*nerf-dadugaming', '*dadu-gaming', '*nerf-pajak', '*peng.-rezeki']);
//             }
//             else if(+ev.target.classList[0] == 65000) {
//               kartuTF = transferBonus('yes', [51, 76], [101, 101],
//                             ['kartu dadu gaming', 'kartu anti pajak', 'upgrade 1 kota random', 'kartu nerf pajak'],
//                             ['*dadu-gaming', '*anti-pajak', '*upgrade-kota', '*nerf-pajak']);
//             }
//             qS('.feedback_box').style.opacity = '1';
//             qS('.feedback_box').children[0].innerText += `sedang mengirim uang, tunggu sampai notif hilang\n\n[Bonus 1] ${(kartuTF[0] == null ? 'tak ada' : kartuTF[0])}\n[Bonus 2] ${(kartuTF[1] == null ? 'tak ada' : kartuTF[1])}`;
//             setLocStorage('hartaAnda', (`${localUser},uang${kirimUang},${kotaSaya},${kotaSpecial}`));
//             // console.log(hartaUang);
//             // console.log(kirimUang);
//             hartaUang = null; kotaSaya = null; kirimUang = null;
//             docFrag = null;
//             // console.log(ev.target.classList);
//             // console.log(v.id);
//             setLocStorage('transferStatus', 'sudah');
//             ajax_post(null, 'papan_game.php', `transferUang=dari${localUser},kepada${v.id},${+ev.target.classList[0]},status0`);
//             clearInterval(waitingPlayer);
//             // waitingPlayer = setInterval(()=>{window.location = winLoc}, winDelay);
//             setTimeout(()=>{window.location = winLoc}, winDelay);
//           }
//           else
//             alert('Mau ngirim uang ghoib, bang?');
//         }
//         else if(getLocStorage('transferStatus') == 'sudah')
//           alert('Tunggu putaran selanjutnya!');
//         tf_div = null;
//       }
//       else
//         alert('Cuma boleh kalaw lagi giliran anda dan belum kocok dadu.. #NoDebat');
//     }
//   }
// });
