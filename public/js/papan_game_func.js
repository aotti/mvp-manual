function urutanPetak(baris, kolom, petak, i, j, u, huruf) {
  petak.classList.add(`petak${u}`);
  // petak.innerText = 'baris:'+i+' kolom:'+j+' urutan:'+u;
  petak.title = u + (huruf == null ? '' : huruf);
  kolom.appendChild(petak);
  baris.appendChild(kolom);
}

function inputGambar(i, imgEl, src) {
  imgEl.src = src;
  imgEl.style.position = 'absolute';
  imgEl.style.opacity = '.7';
  imgEl.style.width = '100px';
  docFrag.appendChild(imgEl);
  semuaKotaDll[i].parentElement.insertBefore(docFrag, semuaKotaDll[i].parentElement.children[0]);
}

function createPlayer(pDiv, pShape, gmbr, cls, id, cls2) {
  pShape.src = gmbr;
  pShape.classList.add(cls);
  pDiv.id = id;
  pDiv.classList.add(cls2);
  pDiv.appendChild(pShape);
  (mods[0] == 'persegiPanjangV2' ? firstPetak[18].appendChild(pDiv) : (firstPetak[33] != null ? firstPetak[33].appendChild(pDiv) : firstPetak[27].appendChild(pDiv)));
}

function infoGame(buttonSP, buttonCE, teksCE, animasiCE, buttonCls, buttonTeks) {
  buttonCE.innerText = buttonTeks;
  buttonSP.classList.add(buttonCls);
  buttonSP.appendChild(buttonCE);
  (teksCE == null ? null : buttonSP.appendChild(teksCE));
  (animasiCE == null ? null : buttonSP.appendChild(animasiCE));
  docFrag.appendChild(buttonSP);
  infoArea.appendChild(docFrag);
}

function dadu3D(divGame, divCont, divDice) {
  for(let i=0; i<6; i++) {
    let diceSide = cE('div'),
        u = null;
    for(let j=0; j<6; j++) {
      let diceDot = cE('div');
      if(i == 0 && j < 1) {
        // u = j + 1;
        diceSide.id = 'dice-one-side-one';
        diceSide.classList.add('side', 'one');
        // ######## TAK BOLEH PAKE SPASI, DIPISAH PAKE KOMA
        diceDot.classList.add(`dot`, `one-${j + 1}`);
        diceSide.appendChild(diceDot);
      }
      else if(i == 1 && j < 2) {
        diceSide.id = 'dice-one-side-two';
        diceSide.classList.add('side', 'two');
        diceDot.classList.add(`dot`, `two-${j + 1}`);
        diceSide.appendChild(diceDot);
      }
      else if(i == 2 && j < 3) {
        diceSide.id = 'dice-one-side-three';
        diceSide.classList.add('side', 'three');
        diceDot.classList.add(`dot`, `three-${j + 1}`);
        diceSide.appendChild(diceDot);
      }
      else if(i == 3 && j < 4) {
        diceSide.id = 'dice-one-side-four';
        diceSide.classList.add('side', 'four');
        diceDot.classList.add(`dot`, `four-${j + 1}`);
        diceSide.appendChild(diceDot);
      }
      else if(i == 4 && j < 5) {
        diceSide.id = 'dice-one-side-five';
        diceSide.classList.add('side', 'five');
        diceDot.classList.add(`dot`, `five-${j + 1}`);
        diceSide.appendChild(diceDot);
      }
      else if(i == 5 && j < 6) {
        diceSide.id = 'dice-one-side-six';
        diceSide.classList.add('side', 'six');
        diceDot.classList.add(`dot`, `six-${j + 1}`);
        diceSide.appendChild(diceDot);
      }
    }
    docFrag.appendChild(diceSide);
    diceSide = null;
  }
  divDice.id = 'dice1';
  divDice.classList.add('dice', 'dice-one');
  divCont.classList.add('container');
  divGame.classList.add('game');
  divDice.appendChild(docFrag);
  divCont.appendChild(divDice);
  divGame.appendChild(divCont);
  return divGame;
}

function inputRange(spanText, theInput, percent, minus) {
  spanText.innerText = (minus == true ? -Math.abs(theInput.value) : theInput.value) + percent;
  theInput.onchange = (ev)=>{
    spanText.innerText = (minus == true ? -Math.abs(ev.target.value) : ev.target.value) + percent;
  }
}

function daftarPlayer(i, listSP_1, listSP_2, uangStorage) {
  let posTitle = prevPlayerPos.slice(-jp)[prevPlayerPos.map(v=>{ return v.split(',')[0] }).indexOf(hartaMilik[i].split(',')[0])];
  // console.log(posTitle);
  if(getLocStorage('dadu_'+hartaMilik[i].split(',')[0]) != null && cekKartu(hartaMilik[i].split(',')[0]) != null && cekKartu(hartaMilik[i].split(',')[0]).match(regexKartu)) {
    listSP_1.id = hartaMilik[i].split(',')[0];
    listSP_1.innerText = (i == 0 ? `${i+1}. ${hartaMilik[i].split(',')[0]} \u{1F3C3}` : `${i+1}. ${hartaMilik[i].split(',')[0]}`);
    if(posTitle != null)
      listSP_1.title = `petak ${posTitle.split(',pos')[1]}`;
    // console.log(prevPlayerPos.slice(-jp)[prevPlayerPos.map(v=>{ return v.split(',')[0] }).indexOf(hartaMilik[i].split(',')[0])].split(',pos')[1]);
    listSP_2.innerText = `Rp ${uangStorage.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    listSP_2.classList.add('kartuBuffDebuff');
    listSP_2.title = `${cekKartu(hartaMilik[i].split(',')[0]).replace(/,/g, '\n').replace(/-/g, ' ')}`;
  }
  else {
    listSP_1.id = hartaMilik[i].split(',')[0];
    listSP_1.innerText = listSP_1.innerText = (i == 0 ? `${i+1}. ${hartaMilik[i].split(',')[0]} \u{1F3C3}` : `${i+1}. ${hartaMilik[i].split(',')[0]}`);
    // console.log(prevPlayerPos.map(v=>{ return v.split(',')[0] }).indexOf(hartaMilik[i].split(',')[0]));
    // console.log(prevPlayerPos.slice(-jp)[prevPlayerPos.map(v=>{ return v.split(',')[0] }).indexOf(hartaMilik[i].split(',')[0])].split(',pos')[1]);
    if(posTitle != null)
      listSP_1.title = `petak ${posTitle.split(',pos')[1]}`;
    listSP_2.innerText = `Rp ${uangStorage.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
}

// function transferOptions(tf_el, tf_cls, tf_text) {
//   tf_el = cE('div');
//   tf_el.classList.add(tf_cls);
//   tf_el.innerText = tf_text;
//   docFrag.appendChild(tf_el);
//   tf_el = null;
// }

function transferBonus(bonus2nd, minTF, maxTF, cardTFteks, cardTFmatch) {
  let chanceTF = Math.random() * 100,
      k_TF1 = null, k_TF2 = null;
  if(chanceTF < minTF[0]) {
    k_TF1 = cardTFteks[0];
    kartuMatching(cardTFmatch[0]);
  }
  else if(chanceTF >= minTF[0] && chanceTF < maxTF[0]) {
    k_TF1 = cardTFteks[1];
    kartuMatching(cardTFmatch[1]);
  }
  if(bonus2nd != null) {
    chanceTF = Math.random() * 100;
    if(chanceTF < minTF[1]) {
      k_TF2 = cardTFteks[2];
      kartuMatching(cardTFmatch[2]);
    }
    else if(chanceTF >= minTF[1] && chanceTF < maxTF[1]) {
      k_TF2 = cardTFteks[3];
      kartuMatching(cardTFmatch[3]);
    }
  }
  return [k_TF1, k_TF2];
}

function setLocStorage(name, value) { localStorage.setItem(name, value); }

function getLocStorage(name) { return localStorage.getItem(name); }

function sekaliJalan(getUser) {
  // console.log('sekaliJalan');
  for(let i=0; i<getUser.length; i++) {
    if(getUser[i].split(',')[0] == Math.max(getUser[0].split(',')[0]))
      setLocStorage('dadu_'+getUser[i].split(',')[1], 'true_'+getUser[i].split(',')[1]);
    else
      setLocStorage('dadu_'+getUser[i].split(',')[1], 'false_'+getUser[i].split(',')[1]);
  }
  tombolMulai.disabled = false;
}

function ajax_get() {
  if(localUser == null)
    setLocStorage('username', userName.value);
  xhrG.onload = ()=>{
    // console.log(xhrG.response);
    let getUser = xhrG.response.split('|').filter(item => item);
    // console.log(getUser[0].split(','));
    // console.log(jp);
    // JIKA SAAT PROSES PAKSA MULAI ADA PLAYER YG JOIN
    // MAKA TAMBAH JUMLAH MAX PLAYER
    // if(getUser.length > jp)
    //   ajax_post(null, 'papan_game.php', `gantiJP=${getUser.length}`);
    // DATA JUMLAH PLAYER DI FILE & DI HTML HARUS SESUAI
    if(getUser.length == jp && syncUserData.length == jp) {
      if(getLocStorage('paksaMulai') == null)
        setLocStorage('paksaMulai', 'telat join');
      paksaStart.style.display = 'none';
      getUser.sort();
      getUser.reverse();
      // console.log(getUser);
      let no_urut = (()=>{
        let temp_urut = [];
        for(let i=0; i<jp; i++) {
          if(i > 0)
            temp_urut[i] = `\nUrutan ${i+1}: ${getUser[i].split(',')[1]} - ${getUser[i].split(',')[0]}`;
          else
            temp_urut[i] = `Urutan ${i+1}: ${getUser[i].split(',')[1]} - ${getUser[i].split(',')[0]}`;
        }
        return temp_urut.join('');
      })();
      qS('.feedback_box').style.opacity = '1';
      qS('.feedback_box').children[0].innerText += "klik 'Mulai' untuk memulai game (jangan refresh/reload halaman!)\n";
      urutanGiliran.innerText = `${jp} player redy to lose..
                                ${no_urut}`;
      clearInterval(waitingPlayer);
      qS('#pReadySemua').play();
      // console.log(Math.max(getUser[0].split(',')[0]));
      sekaliJalan(getUser);
      // tombolMulai.disabled = false;
    }
    else if(getUser.length < jp) {
      if(getLocStorage('paksaMulai') == null)
        urutanGiliran.innerText = `${getUser.length} player joined..\n${playerfs.length} player memaksa \u{1F435}\n`;
      else
        urutanGiliran.innerText = `${getUser.length} player joined..\n${playerfs.length} player memaksa \u{1F435}\n`;
    }
    else if(getUser.length > jp)
      ajax_post(null, 'papan_game.php', `gantiJP=${getUser.length}`);
    else
      urutanGiliran.innerText = 'Ada kesalahan!';
  }
  xhrG.open('GET', 'playerjoin.txt');
  xhrG.send();
}

function ajax_post(daduGiliran, file, pesanPost) {
  xhrG.onload = ()=>{
    // console.log(xhrG.response);
    if(daduGiliran != null)
      giliranTeks.innerText = 'Angka: '+daduGiliran;
    if(xhrG.response == 'nama sudah dipakai')
      alert("nama sudah dipakai, silahkan pakai nama lain");
    else if(xhrG.response != 'max player!' && pesanPost.includes('giliran='))
      ajax_get();
    // else if() {
    //   urutanGiliran.innerText = 'Uang pajak diterima';
    // }
    // else if() {
    //   urutanGiliran.innerText = 'Uang transfer diterima';
    // }
    else if(pesanPost.includes('playerRePos=') || pesanPost.includes('beliKota=') || pesanPost.includes('terimaPajak') || pesanPost.includes('terimaTransfer'))
      return;
    else
      urutanGiliran.innerText = 'Game sedang berlangsung..';
  }
  // PARAMETER AJAX (file.php, pesanPost)
  xhrG.open('POST', file);
  xhrG.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhrG.send(pesanPost);
}

function readyCondition() {
  return playerReady.length > 0 && playerReady.length < jp;
}

function kocokDaduClick(angka) {
  // console.log(angka);
  acakDadu.onclick = ()=>{
    clearInterval(waitingPlayer);
    // console.log(localUser);
    acakDadu.disabled = true;
    for(let i=0; i<allPlayer.length; i++) {
      if(allPlayer[i].id == playerNow) {
        // console.log(allPlayer[i]);
        playerTurn(allPlayer[i], angka);
        break;
      }
    }
  }
}

function playerTurn(thisPlayer, a_dadu) {
  // console.log(a_dadu);
  // console.log(thisPlayer.parentElement.classList[0].split('petak')[1]);
  let playerPetak = thisPlayer.parentElement.classList[0].split('petak')[1],
      dadu_animasi = qS('#dice1'),
      playerDadu = a_dadu || Math.floor(Math.random() * 6) + 1,
      // playerDadu = a_dadu || 3,
      tempMoveChance = (mods[0] == 'bercabangDua' ? (getLocStorage('tempMoveChance') != null ? +getLocStorage('tempMoveChance') : setLocStorage('tempMoveChance', (Math.random() * 100))) : null),
      playerMove = (()=>{
        let tempPMove = (+playerPetak + playerDadu) % 28 == 0 ? 28 : ((+playerPetak + playerDadu) % 28);
        // (+playerPetak + playerDadu) % 28 == 0 ? 28 : ((+playerPetak + playerDadu) % 28)+'a'
        if(mods[0] == 'bercabangDua' && +getLocStorage('tempMoveChance') < (+mods[5] + 1) && (tempPMove == 1 || tempPMove == 2 || tempPMove == 14 || tempPMove == 15 || tempPMove == 16 || tempPMove == 28)) {
          // console.log('pmove a');
          return tempPMove+'a';
        }
        else {
          // console.log('pmove');
          return tempPMove;
        }
      })(),
      tempMove = 0, tMove = 0,
      moveDelay = 0,
      footsteps = setInterval(()=>{(moveDelay < 2 ? moveDelay++ : moving())}, 500),
      konfirmasi_box = qS('.confirm_box');
  // console.log(playerPetak);
  // console.log('dadu:'+playerDadu);
  // console.log(playerMove);
  // console.log(Math.round(+getLocStorage('tempMoveChance')));
  giliranTeks.innerText = `Cabang: ${Math.round(+getLocStorage('tempMoveChance'))}`;
  if(playerDadu <= 6) {
    dadu_animasi.style.visibility = 'visible';
    for(let i=1; i<=6; i++) {
      dadu_animasi.classList.remove(`show-${i}`);
      if(i == playerDadu)
        dadu_animasi.classList.add(`show-${i}`);
    }
  }
  else
    acakDaduTeks.innerText = 'Angka dadu: '+playerDadu;
  // console.log(getLocStorage('dadu_'+playerNow).includes('penjara'));
  function moving() {
    function daduPlayerFalse() {
      if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu))
        setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')}`);
      // else if(getLocStorage('dadu_'+playerNow).match(/\*bebas-penjara/) || getLocStorage('dadu_'+playerNow).match(/\*peng.-rezeki/))
      //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${getLocStorage('dadu_'+playerNow).split('_')[2]}`);
      else
        setLocStorage('dadu_'+playerNow, 'false_'+playerNow);
    }
    // REGEX UNTUK CEK ANGKA AKUMULASI = /.*penjara1|.*penjara[1-9]\d/
    if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/penjara\d+/)) {
      clearInterval(footsteps);
      let plusPenjara = poinPenjara(playerNow) + playerDadu;
      // JIKA SYARAT TERPENUHI, HAPUS VALUE 'penjara'
      if(poinPenjara(playerNow) == 1 || poinPenjara(playerNow) >= 6) {
        // console.log('uda bebas');
        qS('.feedback_box').style.opacity = '1';
        qS('.feedback_box').children[0].innerText += 'putaran selanjutnya bisa jalan dan kartu buff/debuff kembali';
        setLocStorage('dadu_'+playerNow, `false_${playerNow}_${getLocStorage('tempKartu')}`);
        // localStorage.removeItem('tempKartu');
      }
      else {
        // console.log('blm bebas');
        setLocStorage('dadu_'+playerNow, `false_${playerNow}_penjara${plusPenjara}`);
      }
      // console.log(poinPenjara(playerNow));
      // console.log(getLocStorage('dadu_'+playerNow));
      ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerPetak}&harta=${getLocStorage('hartaAnda')}`);
      // console.log('anda dipenjara');
      waitingPlayer = setInterval(()=>{
        window.location = winLoc;
        acakDadu.disabled = false;
      },winDelay);
    }
    else {
      // console.log(tMove);
      tempMove = +playerPetak + (tMove+1);
      // console.log(+playerPetak, tempMove);
      let //lewatStart = +getLocStorage('putaran'),
          // ambilHarta = getLocStorage('hartaAnda'),
          tempMove2 = '',
          dapat25k = null,
          uangLewat = null,
          tempLokasi = getLocStorage('hartaAnda').split(',')[2],
          tempSpecial = getLocStorage('hartaAnda').split(',')[3];
      for(let i=0; i<firstPetak.length; i++) {
        if(mods[0] == 'bercabangDua') {
          // console.log(tempMoveChance);
          if(+getLocStorage('tempMoveChance') < (+mods[5] + 1) && (tempMove%28 == 0 || tempMove%28 == 1 || tempMove%28 == 2 || tempMove%28 == 14 || tempMove%28 == 15 || tempMove%28 == 16))
            tempMove2 = 'a';
          if(firstPetak[i].title == (tempMove%28 == 0 ? 28+tempMove2 : (tempMove%28)+tempMove2))
            firstPetak[i].appendChild(thisPlayer);
          // if(getLocStorage('tempMoveChance') != null && tempMove%28 < 14 && tempMove%28 > 16)
          //   localStorage.removeItem('tempMoveChance');
        }
        else {
          if(firstPetak[i].title == (tempMove%28 == 0 ? 28 : tempMove%28))
            firstPetak[i].appendChild(thisPlayer);
        }
      }
      // JIKA LEWAT START ATAU PETAK 1
      // ##### UNTUK PETAK 1A BUAT TERPISAH DARI PETAK 1 START
      // ##### PETAK 1A HANYA MENAMBAH PUTARAN, TAPI BEDA BUFF
      if((tempMove%28)+tempMove2 == 1+tempMove2) {
        function uangLewatStart(duit) {
          if(+getLocStorage('putaran') > 14) {
            uangLewat = duit + (duit * .8);
            dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
          }
          else if(+getLocStorage('putaran') > 6) {
            uangLewat = duit + (duit * .4);
            dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
          }
          else {
            uangLewat = duit;
            dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
          }
        }
        if((tempMove%28)+tempMove2 == 1) {
          if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*peng.-rezeki/)) {
            qS('.feedback_box').style.opacity = '1';
            qS('.feedback_box').children[0].innerText += 'kartu penghambat rezeki terpakai\n';
            setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*peng.-rezeki'))}`);
            uangLewatStart(5e3);
            // if(+getLocStorage('putaran') > 14) {
            //   uangLewat = 5e3 + (5e3 * .8);
            //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
            // }
            // else if(+getLocStorage('putaran') > 6) {
            //   uangLewat = 5e3 + (5e3 * .4);
            //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
            // }
            // else {
            //   uangLewat = 5e3;
            //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
            // }
          }
          // else if(getLocStorage('dadu_'+playerNow).match(/\*peng.-rezeki/)) {
          //   setLocStorage('dadu_'+playerNow, `false_${playerNow}`);
          //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + 5000;
          // }
          else {
            // if((tempMove%28)+tempMove2 == 1)
              uangLewatStart(25e3);
            // if(+getLocStorage('putaran') > 14) {
            //   uangLewat = 25000 + (25000 * .8);
            //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
            // }
            // else if(+getLocStorage('putaran') > 6) {
            //   uangLewat = 25000 + (25000 * .4);
            //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
            // }
            // else {
            //   uangLewat = 25000;
            //   dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
            // }
          }
        }
        else {
          uangLewat = 0;
          dapat25k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + uangLewat;
        }
        qS('.feedback_box').style.opacity = '1';
        qS('.feedback_box').children[0].innerText += `lewat start +Rp ${uangLewat}\n`;
        setLocStorage('putaran', (+getLocStorage('putaran')+1));
        setLocStorage('transferStatus', 'belum');
        setLocStorage('jualKota', 'belum');
        // console.log(dapat25k);
        setLocStorage('hartaAnda', (`${localUser},uang${dapat25k},${tempLokasi},${tempSpecial}`));
        // console.log(getLocStorage('hartaAnda'));
      }
      else if((tempMove%28)+tempMove2 == '2a' || (tempMove%28)+tempMove2 == '14a') {
        qS('#pAreaBuff').play();
        function phaseBuff(phs, bfBonusT, bfBonusF, n1, n2) {
          if(phs >= n1[0] && phs < n2[0]) {
            let buffUang5k = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + (5e3 * +getLocStorage('putaran'));
            bfBonusT.push(`dapat uang 5k * jumlah putaran \u{1F60E}`);
            // setLocStorage('hartaAnda', (`${localUser},uang${buffUang5k},${tempLokasi},${tempSpecial}`));
            bfBonusF.push(buffUang5k);
          }
          // KARTU UPGRADE KOTA
          else if(phs >= n1[1] && phs < n2[1]) {
            bfBonusT.push('kartu upgrade kota \u{1F60F}');
            // kartuMatching('*upgrade-kota');
            bfBonusF.push('*upgrade-kota');
          }
          // KARTU NERF DADU / NERF PAJAK
          else if(phs >= n1[2] && phs < n2[2]) {
            let daduPajak = ['*nerf-dadugaming', '*nerf-pajak'],
                daduPajakRand = Math.floor(Math.random() * 2);
            bfBonusT.push(`kartu nerf ${(daduPajakRand == 0 ? 'dadu gaming' : 'pajak')} \u{1F60E}`);
            // kartuMatching(daduPajak[daduPajakRand]);
            bfBonusF.push(daduPajak[daduPajakRand]);
          }
          // KARTU BEBAS PENJARA
          else if(phs >= n1[3] && phs < n2[3]) {
            bfBonusT.push('kartu bebas penjara \u{1F605}');
            // kartuMatching('*bebas-penjara');
            bfBonusF.push('*bebas-penjara');
          }
        }
        let phase1 = Math.random() * 51,
            phase2 = (Math.random() * 49) + 51,
            buffBonusT = [], buffBonusF = [];
        phaseBuff(phase1, buffBonusT, buffBonusF, [0, 16, 21, 41], [16, 21, 41, 51]);
        phaseBuff(phase2, buffBonusT, buffBonusF, [51, 71, 76, 91], [70, 76, 91, 100]);
        if(buffBonusF.length > 0) {
          for(let bBF of buffBonusF)
            (isNaN(bBF) ? kartuMatching(bBF) : setLocStorage('hartaAnda', (`${localUser},uang${bBF},${tempLokasi},${tempSpecial}`)));
        }
        // console.log(buffBonusT);
        qS('.feedback_box').style.opacity = '1';
        qS('.feedback_box').children[0].innerText += `lewat petak buff\n[Bonus 1] ${buffBonusT[0]}\n[Bonus 2] ${buffBonusT[1]}\n`;
      }
      tMove++;
      if(tMove == playerDadu) {
        function refreshPage() {
          clearInterval(waitingPlayer);
          waitingPlayer = setInterval(()=>{
            window.location = winLoc;
            acakDadu.disabled = false;
            if(getLocStorage('daduKartu') != null)
              localStorage.removeItem('daduKartu');
          }, winDelay);
        }
        // acakDadu.disabled = false;
        clearInterval(footsteps);
        // console.log(tempMove%28);
        // BUAT KONDISI UNTUK MENGHAPUS getLocStorage('tempMoveChance')
        // SETELAH KELUAR DARI PETAK BERCABANG
        // AGAR VALUE playerMove TIDAK MENJADI ERROR
        // #################################################
        if(getLocStorage('tempMoveChance') != null && (tempMove%28 > 3 && tempMove%28 < 13) || (tempMove%28 > 17 && tempMove%28 < 27)) {
          // console.log(getLocStorage('tempMoveChance'));
          localStorage.removeItem('tempMoveChance');
        }
        // console.log(getLocStorage('tempMoveChance'));
        // console.log(playerNow);
        // if(getLocStorage('dadu_'+playerNow).match(/\*bebas-penjara/))
        //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*bebas-penjara`);
        daduPlayerFalse();
        if(cekKartu(playerNow) != null) {
          // let daduGaming = null;
          function allDaduGaming(rgx, teks, daduGaming, uang, plusMin) {
            qS('.feedback_box').style.opacity = '1';
            qS('.feedback_box').children[0].innerText += `${teks}\n`;
            (plusMin == 'plus' ?
              daduGaming = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + (uang * playerDadu)
              :
              daduGaming = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] - (uang * playerDadu)
            );
            setLocStorage('hartaAnda', (`${localUser},uang${daduGaming},${tempLokasi},${tempSpecial}`));
            setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], rgx)}`);
          }
          if(cekKartu(playerNow).match(/\*giga-dadugaming/))
            allDaduGaming(new RegExp('\\*giga-dadugaming'), 'kartu giga dadu gaming terpakai', null, (1e4 + 3e3 * jp), 'plus');
          else if(cekKartu(playerNow).match(/\*dadu-gaming/))
            allDaduGaming(new RegExp('\\*dadu-gaming'), 'kartu dadu gaming terpakai', null, 1e4, 'plus');
          else if(cekKartu(playerNow).match(/\*nerf-dadugaming/))
            allDaduGaming(new RegExp('\\*nerf-dadugaming'), 'kartu nerf dadu gaming terpakai', null, 5e3, 'plus');
          else if(cekKartu(playerNow).match(/\*sad-dadugaming/))
            allDaduGaming(new RegExp('\\*sad-dadugaming'), 'kartu sad dadu gaming terpakai', null, 5e3, 'min');
          // daduGaming = null;
        }
        let regexBeli = new RegExp('.*tanah.\\d+.|.*1rumah.\\d+.'+localUser+'|.*2rumah.\\d+.'+localUser+'|.*2rumah1hotel.\\d+.'+localUser),
            regexPajak = new RegExp('.*1rumah.\\d+.*|.*2rumah.\\d+.*|.*2rumah1hotel.\\d+.*|.*komplek.\\d+.*'),
            prevSib = thisPlayer.previousSibling,
            // prevSib2 = prevSib.previousSibling,
            prevSibObj = {};
        Object.defineProperties(prevSibObj,{
          pSib : {enumerable: true, value: prevSib},
          pSib2 : {enumerable: true, get: function(){return this.pSib != null ? this.pSib.previousSibling : null}},
          pSib3 : {enumerable: true, get: function(){return this.pSib2 != null ? this.pSib2.previousSibling : null}},
          pSib4 : {enumerable: true, get: function(){return this.pSib3 != null ? this.pSib3.previousSibling : null}},
          pSib5 : {enumerable: true, get: function(){return this.pSib4 != null ? this.pSib4.previousSibling : null}}
        });
        // console.log(Object.values(prevSibObj));
            // prevSib = thisPlayer.previousSibling,
            // prevSib2 = prevSib.previousSibling,
            // prevSib3 = prevSib2 != null ? prevSib2.previousSibling : null,
            // prevSib4 = prevSib3 != null ? prevSib3.previousSibling : null,
            // prevSib5 = prevSib4 != null ? prevSib4.previousSibling : null,
        let masukLokasi_1 = ifEnterSlot(Object.values(prevSibObj), regexBeli),
            // masukLokasi_2 = ifEnterSlot(null, prevSib2, regexBeli),
            masukPenjara_1 = ifEnterSlot(Object.values(prevSibObj), 'area_penjara'),
            // masukPenjara_2 = ifEnterSlot(null, prevSib2, 'area_penjara'),
            masukParkir_1 = ifEnterSlot(Object.values(prevSibObj), 'area_parkir'),
            // masukParkir_2 = ifEnterSlot(null, prevSib2, 'area_parkir');
            masukKartu = ifEnterSlot(Object.values(prevSibObj), 'kartu'),
            masukPajak = ifEnterSlot(Object.values(prevSibObj), regexPajak),
            masukKutukan = ifEnterSlot(Object.values(prevSibObj), 'cursed'),
            masukSpecial = ifEnterSlot(Object.values(prevSibObj), 'special'),
            masukNormal = ifEnterSlot(Object.values(prevSibObj), 'area_normal');
            // prevSib.classList != null && prevSib.classList[0].match(regexPajak) != null && !prevSib.classList[0].match(regexPajak)[0].includes(localUser) || prevSib2 != null && prevSib2.classList != null && prevSib2.classList[0].match(regexPajak) != null && !prevSib2.classList[0].match(regexPajak)[0].includes(localUser);
            // console.log(!ifEnterSlot(prevSib, null, localUser));
            // console.log(prevSib, prevSib2, prevSib3);
            // console.log( (prevSib.classList != null && prevSib.classList[0].match(regexPajak) != null && !prevSib.classList[0].match(regexPajak)[0].includes(localUser)) || (prevSib2 != null && prevSib2.classList != null && prevSib2.classList[0].match(regexPajak) != null && !prevSib2.classList[0].match(regexPajak)[0].includes(localUser)) );
        if(masukLokasi_1 != null && masukLokasi_1[0] && +getLocStorage('putaran') > 1) {
          qS('#pMasukLokasi').play();
          // console.log(prevSib.classList[0]);
          let lokasi = masukLokasi_1[1],
              namaLokasi = lokasi.innerText.match(/kota.*(?=\s)/gi)[0],
              namaProp2 = lokasi.classList[0].split('_')[2],
              hargaProp2 = lokasi.classList[0].split('_')[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
              // UBAH ISI KONFIRMASI TEKS
              konfirmasi_teks = `Apa anda ingin membeli ${namaProp2} di ${(namaLokasi.includes('Rp') ? namaLokasi.split(' Rp')[0] : namaLokasi)} Rp ${hargaProp2}? `,
              tombol_yes = konfirmasi_box.children[1],
              tombol_no = konfirmasi_box.children[2],
              bw = 9;
          waitingPlayer = setInterval(()=>{
            if(bw == 0) {
              ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
              konfirmasi_box.style.display = 'none';
              refreshPage();
            }
            else {
              yesNoWhenBuyCity(tombol_yes, tombol_no, lokasi, bw, konfirmasi_teks, konfirmasi_box, playerMove, refreshPage, 'kota');
              bw -= 1;
            }
          }, 1e3);
        }
        else if(masukPenjara_1 != null && masukPenjara_1[0] && +getLocStorage('putaran') > 1) {
          qS('#pMasukPenjara').play();
          if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*bebas-penjara/)) {
            if(confirm(`Yakin mau pake kartu bebas penjara?`)) {
              // console.log('kartu bebas');
              qS('.feedback_box').style.opacity = '1';
              qS('.feedback_box').children[0].innerText += 'kartu bebas penjara terpakai\n';
              setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*bebas-penjara'))}`);
            }
            else {
              qS('.feedback_box').style.opacity = '1';
              qS('.feedback_box').children[0].innerText += 'kartu buff/debuff disita :^)\n';
              setLocStorage('tempKartu', cekKartu(playerNow));
              setLocStorage('dadu_'+playerNow, `false_${playerNow}_penjara0`);
            }
          }
          else {
            // console.log('h3h3');
            // console.log(thisPlayer);
            qS('.feedback_box').style.opacity = '1';
            qS('.feedback_box').children[0].innerText += 'kartu buff/debuff disita :^)\n';
            setLocStorage('tempKartu', cekKartu(playerNow));
            setLocStorage('dadu_'+playerNow, `false_${playerNow}_penjara0`);
          }
          ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
          // ajax_post(null, 'papan_game.php', `harta=${getLocStorage('hartaAnda')}`);
          refreshPage();
          // waitingPlayer = setInterval(()=>{
          //   window.location = winLoc;
          //   acakDadu.disabled = false;
          // },winDelay);
        }
        else if(masukParkir_1 != null && masukParkir_1[0] && +getLocStorage('putaran') > 1) {
          qS('#pMasukParkir').play();
          // console.log('parkir');
          function parkirStatus(nerfParkir) {
            let bw = 9;
            for(let i=0; i<28; i++) {
              if(i == 9 || i == 23)
                continue;
              let btn_noPetak = cE('button');
              btn_noPetak.classList.add('btn_noPetak');
              btn_noPetak.style.width = '35px';
              btn_noPetak.innerText = (i+1);
              if(nerfParkir != null && nerfParkir.map(v=>{return v}).indexOf(i) != -1)
                btn_noPetak.disabled = true;
              konfirmasi_box.appendChild(btn_noPetak);
              btn_noPetak = null;
            }
            konfirmasi_box.children[1].style.display = 'none';
            konfirmasi_box.children[2].style.display = 'none';
            konfirmasi_box.style.top = '35%';
            waitingPlayer = setInterval(()=>{
              if(bw == 0) {
                konfirmasi_box.style.display = 'none';
                ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
                refreshPage();
              }
              else {
                konfirmasi_box.children[0].innerText = 'Pilih nomor tujuan - ' + bw;
                konfirmasi_box.style.display = 'block';
                // let no_p = qSA('.btn_noPetak');
                qSA('.btn_noPetak').forEach(v=>{
                  // console.log(v);
                  v.onclick = (ev)=>{
                    if(confirm(`Yakin mau ke petak ${ev.target.innerText}?`)) {
                      clearInterval(waitingPlayer);
                      // console.log(konfirmasi_box.lastChild);
                      while(konfirmasi_box.lastChild && konfirmasi_box.lastChild.nodeName == 'BUTTON')
                        konfirmasi_box.removeChild(konfirmasi_box.lastChild);
                      // console.log(ev.target.innerText);
                      konfirmasi_box.children[0].innerText += `\n*menuju nomor ${ev.target.innerText}*`;
                      // if(15 % +ev.target.innerText == 15) {
                      //   // console.log(+ev.target.innerText - 15);
                      //   playerTurn(thisPlayer, (+ev.target.innerText - 15));
                      // }
                      // else {
                      //   // console.log(+ev.target.innerText + 3);
                      //   playerTurn(thisPlayer, (+ev.target.innerText + 3));
                      // }
                      if(+ev.target.innerText > +thisPlayer.parentElement.classList[0].split('petak')[1])
                        playerTurn(thisPlayer, (+ev.target.innerText - +thisPlayer.parentElement.classList[0].split('petak')[1]));
                      else
                        playerTurn(thisPlayer, ((+ev.target.innerText + 28) - +thisPlayer.parentElement.classList[0].split('petak')[1]));
                    }
                  }
                });
                bw -= 1;
              }
            }, 1e3);
          }
          if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*nerf-parkir/)) {
            qS('.feedback_box').style.opacity = '1';
            qS('.feedback_box').children[0].innerText += 'kartu nerf parkir terpakai\n';
            let nerfArray = [];
            for(let i=0; i<13; i++) {
              // if(i == 9 || i == 23)
              //   continue;
              nerfArray.push(Math.floor(Math.random() * 28));
            }
            parkirStatus(nerfArray);
            nerfArray = null;
            setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*nerf-parkir'))}`);
          }
          else
            parkirStatus(null);
        }
        else if(masukKartu != null && masukKartu[0]) {
          // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
          // let tipeKartu = masukKartu[1];
          // console.log(tipeKartu.classList[0]);
          if(masukKartu[1].classList[0] == 'kartu_danaUmum')
            kartuDanaUmum(konfirmasi_box, thisPlayer, playerMove, tempLokasi, tempSpecial, refreshPage);
          else
            kartuKesempatan(konfirmasi_box, thisPlayer, playerMove, tempLokasi, tempSpecial, refreshPage);
          // waitingPlayer = setInterval(()=>{
          //   window.location = winLoc;
          //   acakDadu.disabled = false;
          // },winDelay);
        }
        else if(masukPajak != null && masukPajak[0] && +getLocStorage('putaran') > 1) {
          qS('#pMasukPajak').play();
          // console.log('anda kena pajak');
          function bayarPajak(nerfPajak) {
            let lokasi = masukPajak[1],
                lokasiPajak = lokasi.innerText.match(/kota.*(?=\s)/gi)[0],
                pemilik = lokasi.classList[0].split('_')[4],
                hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
                biayaPajak = Math.floor(+lokasi.classList[0].split('_')[3] - (+lokasi.classList[0].split('_')[3] * nerfPajak)),
                hargaProp2 = biayaPajak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                sisaUang = hartaUang - biayaPajak;
            konfirmasi_box.children[0].innerText = `Anda terkena pajak dari ${lokasiPajak} sebesar Rp ${hargaProp2} \u{1F60E}`;
            konfirmasi_box.children[1].style.display = 'none';
            konfirmasi_box.children[2].style.display = 'none';
            konfirmasi_box.style.display = 'block';
            // console.log(lokasi.classList[0].split('_')[4]);
            setLocStorage('hartaAnda', (`${localUser},uang${sisaUang},${tempLokasi},${tempSpecial}`));
            ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}&kenaPajak=pelaku${playerNow},pemilik${pemilik},${biayaPajak},status0`);
          }
          if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*anti-pajak/)) {
            if(confirm(
`█▀▀ ▄▀█ █▀▄▀█ █▀▀ █▀█ ▄▀█ █░█ █▀ █▀▀ █▀▄
█▄█ █▀█ █░▀░█ ██▄ █▀▀ █▀█ █▄█ ▄█ ██▄ █▄▀

Mau pake kartu anti pajak? kalo tidak, ntar kartu nerf pajak yang dipake (kalo punya)`)) {
              qS('.feedback_box').style.opacity = '1';
              qS('.feedback_box').children[0].innerText += 'kartu anti pajak terpakai\n';
              setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*anti-pajak'))}`);
              ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
            }
            else {
              if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*nerf-pajak/)) {
                qS('.feedback_box').style.opacity = '1';
                qS('.feedback_box').children[0].innerText += 'kartu nerf pajak terpakai\n';
                setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*nerf-pajak'))}`);
                bayarPajak(.35);
              }
              else
                bayarPajak(0);
            }
          }
          else if(cekKartu(playerNow) != null && cekKartu(playerNow).match(/\*nerf-pajak/)) {
            qS('.feedback_box').style.opacity = '1';
            qS('.feedback_box').children[0].innerText += 'kartu nerf pajak terpakai\n';
            setLocStorage('dadu_'+playerNow, `false_${playerNow}${sisaKartu([], new RegExp('\\*nerf-pajak'))}`);
            bayarPajak(.35);
          }
          else
            bayarPajak(0);
          // &kenaPajak=pelaku${playerNow},pemilik${pemilik},${hargaProp2},status0
          // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}&kenaPajak=pelaku${playerNow},pemilik${pemilik},${hargaProp2},status0`);
          refreshPage();
          // waitingPlayer = setInterval(()=>{
          //   window.location = winLoc;
          //   acakDadu.disabled = false;
          // },winDelay);
        }
        else if(masukKutukan != null && masukKutukan[0]) {
          qS('#pKutukan').play();
          // console.log(masukKutukan[1]);
          let lokasi = masukKutukan[1],
              hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
              biayaKutukan = +lokasi.classList[0].split('_')[3],
              hargaProp2 = biayaKutukan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
              sisaUang = hartaUang - biayaKutukan,
              chanceKutukan = Math.random() * 100,
              kartuKutukan = null;
          if(chanceKutukan < 21) {
            kartuKutukan = 'kartu sad dadu gaming';
            kartuMatching('*sad-dadugaming');
          }
          konfirmasi_box.children[0].innerText = `Anda terkena kutukan sebesar Rp ${hargaProp2}\n\n[Kutukan] ${(kartuKutukan == null ? 'tak ada' : 'kartu sad dadu gaming')}`;
          konfirmasi_box.children[1].style.display = 'none';
          konfirmasi_box.children[2].style.display = 'none';
          konfirmasi_box.style.display = 'block';
          chanceKutukan = null; kartuKutukan = null;
          setLocStorage('hartaAnda', (`${localUser},uang${sisaUang},${tempLokasi},${tempSpecial}`));
          ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
          // waitingPlayer = setInterval(()=>{
          //   window.location = winLoc;
          //   acakDadu.disabled = false;
          // },winDelay);
          refreshPage();
        }
        else if(masukSpecial != null && masukSpecial[0] && +getLocStorage('putaran') > 1) {
          if(masukSpecial[1].classList[0].split('_')[4] == null) {
            qS('#pMasukLokasi').play();
            // console.log(masukSpecial[1].innerText);
            let lokasi = masukSpecial[1],
                namaLokasi = lokasi.innerText.match(/kota.*(?=\s)/gi)[0],
                // namaProp2 = lokasi.classList[0].split('_')[2],
                hargaProp2 = lokasi.classList[0].split('_')[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                // UBAH ISI KONFIRMASI TEKS
                konfirmasi_teks = `Apa anda ingin membeli ${(namaLokasi.includes('Rp') ? namaLokasi.split(' Rp')[0] : namaLokasi)} Rp ${hargaProp2}? `,
                tombol_yes = konfirmasi_box.children[1],
                tombol_no = konfirmasi_box.children[2],
                bw = 9;
            waitingPlayer = setInterval(()=>{
              if(bw == 0) {
                ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
                konfirmasi_box.style.display = 'none';
                refreshPage();
              }
              else {
                yesNoWhenBuyCity(tombol_yes, tombol_no, lokasi, bw, konfirmasi_teks, konfirmasi_box, playerMove, refreshPage, 'special');
                bw -= 1;
              }
            }, 1e3);
          }
          else {
            let uangPlusOrMin = null,
                chanceSpecial = Math.random() * 100,
                kartuSpecial = null;
            if(masukSpecial[1].classList[0].split('_')[4] == localUser) {
              qS('#pKhususBuff').play();
              // console.log(chanceSpecial);
              if(chanceSpecial < 21) {
                kartuSpecial = 'kartu nerf dadu gaming';
                kartuMatching('*nerf-dadugaming');
              }
              kartuAlertInfo(konfirmasi_box, `Anda mendapat uang Rp ${+masukSpecial[1].classList[0].split('_')[3]}\n\n[Bonus] ${(kartuSpecial == null ? 'tak ada' : kartuSpecial)}`);
              uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + +masukSpecial[1].classList[0].split('_')[3];
              uangTambahKurang(uangPlusOrMin, playerMove, tempLokasi, tempSpecial, refreshPage, null);
            }
            else if(masukSpecial[1].classList[0].split('_')[4] != localUser) {
              qS('#pKhususDebuff').play();
              kartuAlertInfo(konfirmasi_box, `Anda terkena pajak sebesar Rp ${+masukSpecial[1].classList[0].split('_')[3]}`);
              uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] - +masukSpecial[1].classList[0].split('_')[3];
              uangTambahKurang(uangPlusOrMin, playerMove, tempLokasi, tempSpecial, refreshPage, null);
            }
            uangPlusOrMin = null; chanceSpecial = null; kartuSpecial = null;
            // refreshPage();
          }
        }
        else if(masukNormal != null && masukNormal[0]) {
          let chances = Math.random() * 100,
              normalBonus = null,
              petakNormal = [3, 14, 23],
              nextNormal = null;
          // MAJU 1 LANGKAH, (chances >= 16 && chances < 31) || (chances >= 71 && chances < 81)
          if((chances >= 16 && chances < 31) || (chances >= 71 && chances < 81)) {
            normalBonus = 'maju 1 langkah \u{1F60E}';
            playerTurn(thisPlayer, 1);
          }
          // MAJU 2 LANGKAH, (chances >= 31 && chances < 41) || (chances >= 66 && chances < 71)
          else if((chances >= 31 && chances < 41) || (chances >= 66 && chances < 71)) {
            normalBonus = 'maju 2 langkah \u{1F60E}';
            playerTurn(thisPlayer, 2);
          }
          // KARTU NERF DADU GAMING, chances >= 41 && chances < 51
          else if(chances >= 41 && chances < 51) {
            normalBonus = 'kartu nerf dadu gaming \u{1F631}';
            kartuMatching('*nerf-dadugaming');
            ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
            refreshPage();
          }
          // KARTU SAD DADU GAMING, chances >= 51 && chances < 59
          else if(chances >= 51 && chances < 59) {
            normalBonus = 'kartu sad dadu gaming \u{1F639}';
            kartuMatching('*sad-dadugaming');
            ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
            refreshPage();
          }
          // PINDAH KE PETAK NORMAL LAIN 1F640, chances >= 59 && chances < 66
          else if(chances >= 59 && chances < 66) {
            normalBonus = 'pergi ke area normal selanjutnya \u{1F640}';
            nextNormal = petakNormal[(petakNormal.map(v=>{ return v }).indexOf(playerMove)+1)%3];
            // console.log(nextNormal, playerMove);
            if(nextNormal > +thisPlayer.parentElement.classList[0].split('petak')[1])
              playerTurn(thisPlayer, (nextNormal - +thisPlayer.parentElement.classList[0].split('petak')[1]));
            else
              playerTurn(thisPlayer, ((nextNormal + 28) - +thisPlayer.parentElement.classList[0].split('petak')[1]));
          }
          else {
            normalBonus = 'mohon bersabar dan jangan menangis';
            ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
            refreshPage();
          }
          konfirmasi_box.children[0].innerText = normalBonus;
          konfirmasi_box.children[1].style.display = 'none';
          konfirmasi_box.children[2].style.display = 'none';
          konfirmasi_box.style.display = 'block';
          // refreshPage();
        }
        else {
          ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${playerMove}&harta=${getLocStorage('hartaAnda')}`);
          // waitingPlayer = setInterval(()=>{
          //   window.location = winLoc;
          //   acakDadu.disabled = false;
          // },winDelay);
          refreshPage();
        }
        // console.log(getLocStorage('hartaAnda'));
        // waitingPlayer = setInterval(()=>{
        //   window.location = winLoc;
        //   acakDadu.disabled = false;
        // },winDelay);
      }
    }
  }
}

function ifEnterSlot(all_pSib, rgx) {
  // console.log(all_pSib);
  for(let i=0; i<all_pSib.length; i++) {
    // console.log('all_pSib');
    if(String(rgx).includes('komplek')) {
      if(all_pSib[i] != null && all_pSib[i].classList[0] != null && all_pSib[i].classList[0].match(rgx) != null && !all_pSib[i].classList[0].match(rgx)[0].includes(localUser))
        return [all_pSib[i].classList[0].match(rgx), all_pSib[i]];
    }
    else {
      if(all_pSib[i] != null && all_pSib[i].classList[0] != null && all_pSib[i].classList[0].match(/kota_|area_|kartu|cursed/)) {
        // console.log('masuk');
        return [all_pSib[i].classList[0].match(rgx), all_pSib[i]];
      }
    }
  }
  // else if(all_pSib2 != null)
  //   return all_pSib2 != null && all_pSib2.classList != null && all_pSib2.classList[0].match(rgx);
}

function poinPenjara(ign) {
  return +getLocStorage('dadu_'+ign).split('_')[2].split('penjara')[1];
}

function ifBuyCity(myCity, city, property) {
  if(myCity.includes('kosong') || myCity.includes('empty')) {
    return `${city}*${property}`;
  }
  else if(myCity.includes(city)) {
    let cariKota = myCity.split(';'),
        tempProp1, tempProp2 = [];
        // propBaru;
    for(let i=0; i<cariKota.length; i++) {
      if(cariKota[i].includes(city)) {
        tempProp1 = cariKota[i].split('');
        tempProp1.splice(tempProp1.length, 0, `-${property}`);
      }
      else
        tempProp2[i] = cariKota[i];
    }
    // propBaru = `${tempProp1.join('')};${tempProp2.flat().filter(item => item).join(';')}`;
    return `${tempProp1.join('')};${tempProp2.flat().filter(item => item).join(';')}`;
    // ssss,uang100000,jakarta*tanah;bandung*tanah
  }
  else if(!myCity.includes(city)) {
    // let kotaBaru = `${myCity};${city}*${property}`;
    return `${myCity};${city}*${property}`;
  }
}

function yesNoWhenBuyCity(btn_yes, btn_no, loc, bw, cfrm_teks, cfrm_box, plyrMv, refreshPage, cityORspc) {
  btn_yes.style.display = 'inline';
  btn_no.style.display = 'inline';
  btn_yes.style.width = '60px';
  btn_no.style.width = '60px';
  btn_yes.innerText = 'Beli';
  btn_no.innerText = 'Males';
  cfrm_box.children[0].innerText = cfrm_teks + bw;
  cfrm_box.style.top = '50%';
  cfrm_box.style.display = 'block';
  btn_yes.onclick = ()=>{
    cfrm_box.style.display = 'none';
    let hartaUang = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1],
        kotaSaya = getLocStorage('hartaAnda').split(',')[2],
        kotaSpecial = getLocStorage('hartaAnda').split(',')[3],
        hargaKota = (loc.classList != null ? +loc.classList[0].split('_')[3] : +loc.split('_')[3]),
        sisaUang = null,
        // ifBuyCity( kota yg dimiliki, kota baru, jenis property )
        lokasiBeli = ifBuyCity((cityORspc == 'kota' ? kotaSaya : kotaSpecial), (loc.classList != null ? loc.classList[0].split('_')[1] : loc.split('_')[1]), (loc.classList != null ? loc.classList[0].split('_')[2] : loc.split('_')[2]));
    if(hargaKota <= hartaUang) {
      qS('.feedback_box').style.opacity = '1';
      qS('.feedback_box').children[0].innerText += 'gaming moment :^)\n';
      sisaUang = hartaUang - hargaKota;
      setLocStorage('hartaAnda', (`${localUser},uang${sisaUang},${(cityORspc == 'kota' ? lokasiBeli : kotaSaya)},${(cityORspc == 'kota' ? kotaSpecial : lokasiBeli)}`));
      ajax_post(null, 'papan_game.php', `beliKota=${getLocStorage('hartaAnda')}`);
    }
    else {
      qS('.feedback_box').style.opacity = '1';
      qS('.feedback_box').children[0].innerText += 'gk punya duit belagu \u{1F620}\n';
    }
    // KIRIM DATA username & posisi KE papan_game.php
    if(getLocStorage('daduKartu') != null)
      ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    else
      ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    refreshPage();
  }
  // JIKA TIDAK MEMBELI
  btn_no.onclick = ()=>{
    if(getLocStorage('daduKartu') != null)
      ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    else
      ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    // urutanGiliran.innerText = 'misqueen binggo kaw..';
    qS('.feedback_box').style.opacity = '1';
    qS('.feedback_box').children[0].innerText += 'misqueen binggo kaw..\n';
    cfrm_box.style.display = 'none';
    refreshPage();
  }
}

function buttonConfBox(confBox, theCard, btnDisplay, rgx1, rgx2) {
  confBox.children[1].style.display = btnDisplay;
  confBox.children[2].style.display = btnDisplay;
  confBox.children[1].style.width = 'max-content';
  confBox.children[2].style.width = 'max-content';
  if(theCard != null) {
    confBox.children[1].innerText = theCard[0].replace(/(?<=\d+)\./g, '').match(rgx1);
    confBox.children[2].innerText = theCard[1].match(rgx2);
  }
  confBox.style.top = '40%';
}

function kartuAlertInfo(cfrm_box, cardPick) {
  buttonConfBox(cfrm_box, null, 'none', null, null);
  cfrm_box.children[0].innerText = cardPick;
  cfrm_box.style.display = 'block';
}

function uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, dk_info) {
  setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc},${tmpSpc}`));
  uangPlusOrMin = null;
  if(dk_info == null)
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
  else
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
  refreshPage();
}

function cekKartu(user) {
  return getLocStorage('dadu_'+user).split('_')[2];
}

function kartuMatching(teks) {
  if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(new RegExp(`\\${teks}`)) == null)
    setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},${teks}`);
  else if(cekKartu(playerNow) == null)
    setLocStorage('dadu_'+playerNow, `false_${playerNow}_${teks}`);
}

function sisaKartu(s_kartu, rgx) {
  // let s_kartu = [];
  for(let i=0; i<cekKartu(playerNow).split(',').length; i++) {
    if(!cekKartu(playerNow).split(',')[i].match(rgx))
      s_kartu[i] = cekKartu(playerNow).split(',')[i];
  }
  if(s_kartu.length > 0)
    return `_${s_kartu.filter(i=>i).join(',')}`;
  else
    return '';
}

// REPLACE UNTUK ANGKA JIKA ADA TITIK
// replace(/(?<=\d+)\./g, '')
function kartuDanaUmum(cfrm_box, plyr, plyrMv, tmpLoc, tmpSpc, refreshPage) {
  qS('#pDanaUmum').play();
  let chances = Math.random() * 100,
      cardList, cardPick, uangPlusOrMin, bw = 9;
  if(chances < 9) {
    cardList = ['Gaji bulanan sudah cair, anda mendapatkan 160.000',
                'Bayar tagihan listrik & air 100.000',
                'Menjual 1 kota yang dimiliki (acak)'];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  // chances >= 9 && chances < 25
  else if(chances >= 9 && chances < 25) {
    cardList = ['Bayar rumah sakit 50.000',
                'Debt collector datang ke rumah, bayar hutang 60.000',
                'Gilang si baik hati memberi anda uang 5.000',
                'Kartu anti pajak \u{1F60E}',
                'Pilih kota anda yang ingin dituju'
              ];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  // chances >= 25 && chances < 51
  else if(chances >= 25 && chances < 51) {
    cardList = ['Gilang sang hecker meretas akun bank anda dan kehilangan uang 20.000',
                'Kartu penghambat rezeki \u{1F5FF}',
                'Mobil anda rusak, bayar biaya perbaikan 35.000',
                'Kartu nerf pajak 35%',
                'Anda mendapat uang 20.000 dikali jumlah angka pada koin yang dipilih'
              ];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  // chances >= 51 && chances < 95
  else if(chances >= 51 && chances < 95) {
    cardList = ['Hadiah dari bank, anda mendapatkan 40.000',
                'Anda mendapat warisan 65.000',
                'Anda ulang tahun hari ini, dapat 15.000 dari tiap player'];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  else if(chances >= 95 && chances < 100)
    cardList = ['Kartu upgrade kota'];
  // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  cardPick = cardList[Math.floor(Math.random()*cardList.length)];
  chances = null; cardList = null;
  // console.log(cardPick);
  kartuAlertInfo(cfrm_box, cardPick);
  // ajax_post(null, 'papan_game.php', `daduKartu=${playerNow}_${plyrDadu}_${cardPick}`);
  setLocStorage('daduKartu', `${playerNow}_${cardPick}`);
  if(cardPick.toLowerCase().match(/kartu.penghambat.rezeki/)) {
    kartuMatching('*peng.-rezeki');
    // if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(/\*peng.-rezeki/) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},*peng.-rezeki`);
    // // else if(getLocStorage('dadu_'+playerNow).match(/\*bebas-penjara|\*anti-pajak/))
    // //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*bebas-penjara,*peng.-rezeki`);
    // else if(cekKartu(playerNow) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*peng.-rezeki`);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/kartu.anti.pajak/)) {
    kartuMatching('*anti-pajak');
    // if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(/\*anti-pajak/) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},*anti-pajak`);
    // else if(cekKartu(playerNow) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*anti-pajak`);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/kartu.nerf.pajak/)) {
    kartuMatching('*nerf-pajak');
    // if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(/\*nerf-pajak/) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},*nerf-pajak`);
    // else if(cekKartu(playerNow) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*nerf-pajak`);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/kartu.upgrade.kota/)) {
    kartuMatching('*upgrade-kota');
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/koin.yang.dipilih/)) {
    // console.log('pilih koin');
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }
    function buatKoin(i, koin, koinR) {
      koin.type = 'button';
      koin.classList.add('koin_'+koinR[i]);
      koin.value = '???';
      cfrm_box.appendChild(koin);
    }
    cfrm_box.children[1].style.display = 'none';
    cfrm_box.children[2].style.display = 'none';
    let koinArr = [1,2,3];
    shuffle(koinArr);
    for(let i=0; i<3; i++)
      buatKoin(i, cE('input'), koinArr);
    koinArr = null;
    waitingPlayer = setInterval(()=>{
      if(bw == 0) {
        cfrm_box.style.display = 'none';
        ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
        refreshPage();
      }
      else {
        cfrm_box.children[0].innerText = `${cardPick} - ${bw}`;
        bw -= 1;
      }
    }, 1e3);
    qSA('[class^=koin]').forEach((v,i,ar)=>{
      v.onclick = (ev)=>{
        for(let x=0; x<ar.length; x++) {
          ar[x].disabled = true;
          ar[x].value = ar[x].classList[0].match(/\d/)[0];
        }
        ev.target.value = ev.target.classList[0].match(/\d/)[0];
        uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + (+ev.target.value * 2e4);
        uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
      }
    });
  }
  else if(cardPick.toLowerCase().match('dari.tiap.player')) {
    uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + (+cardPick.replace(/(?<=\d+)\./g, '').match(/\d+/) * (syncUserData.length-1));
    // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
    // uangPlusOrMin = null;
    // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
  }
  else if(cardPick.toLowerCase().match(/dapat|memberi.anda/)) {
    // kartuAlertInfo(cfrm_box, cardPick);
    uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + +cardPick.replace(/(?<=\d+)\./g, '').match(/\d+/);
    // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
    // uangPlusOrMin = null;
    // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    // refreshPage();
    uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
  }
  else if(cardPick.toLowerCase().match(/bayar|kehilangan.uang/)) {
    // kartuAlertInfo(cfrm_box, cardPick);
    uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] - +cardPick.replace(/(?<=\d+)\./g, '').match(/\d+/);
    // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
    // uangPlusOrMin = null;
    // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    // refreshPage();
    uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
  }
  else if(cardPick.toLowerCase().match(/jual.1.kota/)) {
    let listJual = [], listTakJual = [], jualRandom;
    for(let i=0; i<tmpLoc.split(';').filter(i=>i).length; i++) {
      // console.log( tmpLoc.split(';')[i].split('*')[0] );
      for(let j=0; j<semuaKotaDll.length; j++) {
        if(semuaKotaDll[j].classList[0].includes(tmpLoc.split(';')[i].split('*')[0])) {
          // console.log(semuaKotaDll[j].parentElement.firstChild.data);
          listJual.push(`${semuaKotaDll[j].classList[0].split('_')[1]},${semuaKotaDll[j].classList[0].split('_')[3]}`);
        }
      }
    }
    // console.log(listJual);
    jualRandom = Math.floor(Math.random()*listJual.length);
    // console.log(jualRandom, listJual);
    if(listJual.length > 0) {
      for(let i=0; i<tmpLoc.split(';').filter(i=>i).length; i++) {
        if(tmpLoc.split(';')[i].includes(listJual[jualRandom].split(',')[0]))
          uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + +listJual[jualRandom].split(',')[1];
        else
          listTakJual.push(tmpLoc.split(';')[i]);
      }
      // console.log(listTakJual);
      cfrm_box.children[0].innerText = `${cardPick}\n\n"kota ${listJual[jualRandom].split(',')[0]} terjual"`;
      setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${(listTakJual.length > 0 ? listTakJual.join(';') : 'kosong')},${tmpSpc}`));
      uangPlusOrMin = null;
    }
    else
      cfrm_box.children[0].innerText = `${cardPick}\n\n"awokawok gk punya kota"`;
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/pilih.kota.anda/)) {
    let listKota = [];
    function pushListKota(kotaORkhusus, list_k) {
      for(let i=0; i<kotaORkhusus.split(';').filter(i=>i).length; i++) {
        // console.log( kotaORkhusus.split(';')[i].split('*')[0] );
        for(let j=0; j<semuaKotaDll.length; j++) {
          if(semuaKotaDll[j].classList[0].includes(kotaORkhusus.split(';')[i].split('*')[0])) {
            // console.log(semuaKotaDll[j].parentElement.firstChild.data);
            list_k.push(semuaKotaDll[j].parentElement.title);
          }
        }
      }
    }
    pushListKota(tmpLoc, listKota);
    pushListKota(tmpSpc, listKota);
    // for(let i=0; i<tmpLoc.split(';').filter(i=>i).length; i++) {
    //   // console.log( tmpLoc.split(';')[i].split('*')[0] );
    //   for(let j=0; j<semuaKotaDll.length; j++) {
    //     if(semuaKotaDll[j].classList[0].includes(tmpLoc.split(';')[i].split('*')[0])) {
    //       // console.log(semuaKotaDll[j].parentElement.firstChild.data);
    //       listKota.push(semuaKotaDll[j].parentElement.title);
    //     }
    //   }
    // }
    // console.log(listKota);
    for(let i=0; i<listKota.length; i++) {
      let l_kota = cE('button');
      l_kota.classList.add('listKota');
      l_kota.style.width = '35px';
      l_kota.innerText = listKota[i];
      cfrm_box.appendChild(l_kota);
      l_kota = null;
    }
    listKota = null;
    cfrm_box.children[1].style.display = 'none';
    cfrm_box.children[2].style.display = 'none';
    waitingPlayer = setInterval(()=>{
      if(bw == 0) {
        // console.log(playerNow, plyrMv);
        cfrm_box.style.display = 'none';
        ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
        refreshPage();
      }
      else {
        cfrm_box.children[0].innerText = `${cardPick} - ${bw}`;
        bw -= 1;
      }
    }, 1e3);
    qSA('.listKota').forEach(v=>{
      v.onclick = (ev)=>{
        // console.log(+plyr.parentElement.classList[0].split('petak')[1]);
        clearInterval(waitingPlayer);
        while(cfrm_box.lastChild && cfrm_box.lastChild.nodeName == 'BUTTON')
          cfrm_box.removeChild(cfrm_box.lastChild);
        cfrm_box.children[0].innerText += `\n*menuju nomor ${ev.target.innerText}*`;
        // if(13 % +ev.target.innerText == 13)
        //   playerTurn(plyr, (+ev.target.innerText - 13));
        // else
        //   playerTurn(plyr, (+ev.target.innerText + 5));
        if(+ev.target.innerText > +plyr.parentElement.classList[0].split('petak')[1])
          playerTurn(plyr, (+ev.target.innerText - +plyr.parentElement.classList[0].split('petak')[1]));
        else
          playerTurn(plyr, ((+ev.target.innerText + 28) - +plyr.parentElement.classList[0].split('petak')[1]));
      }
    });
  }
  // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
  // uangPlusOrMin = null;
  // ############ TIDAK BOLEH ADA refreshPage DI PALING BAWAH #############
  // ############ TIDAK BOLEH ADA refreshPage DI PALING BAWAH #############
  // ############ TIDAK BOLEH ADA refreshPage DI PALING BAWAH #############
  // refreshPage();
}
// console.log(getLocStorage('hartaAnda'));
// console.log(getLocStorage('dadu_'+getLocStorage('username')));
function kartuKesempatan(cfrm_box, plyr, plyrMv, tmpLoc, tmpSpc, refreshPage) {
  qS('#pKesempatan').play();
  let chances = Math.random() * 100,
      cardList, cardPick, uangPlusOrMin, bw = 9;
  if(chances < 9) {
    cardList = ['Anda tertangkap basah korupsi, masuk penjara dan denda 90% dari total uang',
                'Anda mendapatkan uang kaget sebanyak 200.000',
                'Kartu bebas penjara'
              ];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  // chances >= 9 && chances < 25
  else if(chances >= 9 && chances < 25) {
    cardList = ['Menuju kota punya orang lain',
                'Gilang menjatuhkan ichi ochanya, anda harus mundur 3 langkah untuk mengembalikannya',
                'Adu nasib, masuk parkir bebas atau masuk penjara',
                'Kartu nerf parkir sabeb',
                'Gempa bumi, 1 bangunan roboh #menangid'
              ];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  // chances >= 25 && chances < 51
  else if(chances >= 25 && chances < 51) {
    cardList = ['Renovasi rumah, bayar 30% dari total uang',
                'Anda lari dikejar biawak, mundur 2 langkah',
                'Pilih maju sampai start atau ambil kartu dana umum',
                'Kartu dadu gaming \u{1F633}',
                'Upgrade 1 kota yang anda miliki (acak)'
              ];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  // chances >= 51 && chances < 95
  else if(chances >= 51 && chances < 95) {
    cardList = ['Kaki anda tersandung, maju 1 langkah',
                'Anda menemukan uang 30.000 di kantong celana',
                'Anda menemukan uang 50.000 di jalan, ambil uang atau maju 2 langkah'];
    // console.log(cardList[Math.floor(Math.random()*cardList.length)]);
  }
  else if(chances >= 95 && chances < 100)
    cardList = ['Kartu upgrade kota'];
  cardPick = cardList[Math.floor(Math.random()*cardList.length)];
  chances = null; cardList = null;
  // console.log(cardPick);
  kartuAlertInfo(cfrm_box, cardPick);
  // ajax_post(null, 'papan_game.php', `daduKartu=${playerNow}_${plyrDadu}_${cardPick}`);
  setLocStorage('daduKartu', `${playerNow}_${cardPick}`);
  if(cardPick.toLowerCase().match(/(?<!parkir.bebas).atau/)) {
    // console.log('atau biasa');
    // let cp = cardPick.split('atau');
    // console.log(cp[0].match(/\d+/));
    // console.log(cp[1].match(/\d+/));
    if(cardPick.split('atau')[1].match(/maju...langkah/))
      buttonConfBox(cfrm_box, cardPick.split('atau'), 'inline', /uang.\d+/, /maju...langkah/);
    else if(cardPick.split('atau')[1].match(/ambil.kartu/))
      buttonConfBox(cfrm_box, cardPick.split('atau'), 'inline', /maju.sampai.start/, /ambil.kartu.dana.umum/);
    // BUAT setInterval LALU JIKA WAKTU HABIS, AWTO CLICK SALAH SATU BUTTON
    waitingPlayer = setInterval(()=>{
      if(bw == 0) {
        cfrm_box.children[Math.floor(Math.random()*(2-1))+1].click();
        // refreshPage();
      }
      else {
        cfrm_box.children[0].innerText = `${cardPick} - ${bw}`;
        cfrm_box.style.display = 'block';
        bw -= 1;
      }
    }, 1e3);
    // TOMBOL PERTAMA
    cfrm_box.children[1].onclick = (ev)=>{
      clearInterval(waitingPlayer);
      cfrm_box.style.display = 'none';
      if(ev.target.innerText.match(/uang.\d+/)) {
        // console.log(ev.target.innerText.match(/\d+/));
        uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + +ev.target.innerText.match(/\d+/);
        // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
        // uangPlusOrMin = null;
        // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
        // refreshPage();
        uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
      }
      else if(ev.target.innerText.match(/maju.sampai.start/)) {
        // console.log(plyr.parentElement.classList[0].split('petak')[1]);
        playerTurn(plyr, ((1 + 28) - +plyr.parentElement.classList[0].split('petak')[1]));
      }
    }
    // TOMBOL KEDUA
    cfrm_box.children[2].onclick = (ev)=>{
      clearInterval(waitingPlayer);
      cfrm_box.style.display = 'none';
      if(ev.target.innerText.match(/maju...langkah/)) {
        // console.log(ev.target.innerText.match(/\d+/));
        playerTurn(plyr, +ev.target.innerText.match(/\d+/));
      }
      else if(ev.target.innerText.match(/ambil.kartu.dana.umum/)) {
        // console.log(ev.target.innerText.match(/ambil.kartu.dana.umum/));
        kartuDanaUmum(cfrm_box, plyr, plyrMv, tmpLoc, tmpSpc, refreshPage);
        // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
        // refreshPage();
      }
    }
  }
  else if(cardPick.toLowerCase().match(/masuk.penjara.dan.denda.\d+%/)) {
    // kartuAlertInfo(cfrm_box, cardPick);
    uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] - (+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] * +cardPick.match(/\d+/) / 100);
    setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc},${tmpSpc}`));
    uangPlusOrMin = null;
    // playerTurn(plyr, (19 - +plyr.parentElement.classList[0].split('petak')[1]));
    if(10 > +plyr.parentElement.classList[0].split('petak')[1]) {
      // PETAK TUJUAN - POSISI PLAYER
      playerTurn(plyr, (10 - +plyr.parentElement.classList[0].split('petak')[1]));
    }
    else {
      // (PETAK TUJUAN + TOTAL PETAK) - POSISI PLAYER
      playerTurn(plyr, ((10 + 28) - +plyr.parentElement.classList[0].split('petak')[1]));
    }
  }
  else if(cardPick.toLowerCase().match(/maju...langkah/)) {
    // console.log(cardPick);
    // console.log(cardPick.match(/\d+/));
    // kartuAlertInfo(cfrm_box, cardPick);
    playerTurn(plyr, +cardPick.match(/\d+/));
  }
  else if(cardPick.toLowerCase().match(/mundur...langkah/)) {
    // kartuAlertInfo(cfrm_box, cardPick);
    let mundurPos = +plyr.parentElement.classList[0].split('petak')[1] - +cardPick.match(/\d+/);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${mundurPos}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    mundurPos = null;
    refreshPage();
  }
  else if(cardPick.toLowerCase().replace(/(?<=\d+)\./g, '').match(/menemukan.uang.\d+|uang.kaget/)) {
    // console.log(cardPick);
    // console.log(cardPick.match(/\d+/));
    // kartuAlertInfo(cfrm_box, cardPick);
    uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] + +cardPick.replace(/(?<=\d+)\./g, '').match(/\d+/);
    // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
    // uangPlusOrMin = null;
    // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
  }
  else if(cardPick.toLowerCase().match(/bayar.\d+%/)) {
    // kartuAlertInfo(cfrm_box, cardPick);
    uangPlusOrMin = +getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] - (+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1] * +cardPick.match(/\d+/) / 100);
    // setLocStorage('hartaAnda', (`${localUser},uang${uangPlusOrMin},${tmpLoc}`));
    // uangPlusOrMin = null;
    // ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}`);
    uangTambahKurang(uangPlusOrMin, plyrMv, tmpLoc, tmpSpc, refreshPage, 'dk_info');
  }
  else if(cardPick.toLowerCase().match(/kartu.bebas.penjara/)) {
    kartuMatching('*bebas-penjara');
    // if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(/\*bebas-penjara/) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},*bebas-penjara`);
    // else if(cekKartu(playerNow) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*bebas-penjara`);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/kartu.dadu.gaming/)) {
    kartuMatching('*dadu-gaming');
    // if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(/\*dadu-gaming/) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},*dadu-gaming`);
    // else if(cekKartu(playerNow) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*dadu-gaming`);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/kartu.nerf.parkir/)) {
    kartuMatching('*nerf-parkir');
    // if(cekKartu(playerNow) != null && cekKartu(playerNow).match(regexKartu).join(',').match(/\*nerf-parkir/) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_${cekKartu(playerNow).match(regexKartu).join(',')},*nerf-parkir`);
    // else if(cekKartu(playerNow) == null)
    //   setLocStorage('dadu_'+playerNow, `false_${playerNow}_*nerf-parkir`);
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/kartu.upgrade.kota/)) {
    kartuMatching('*upgrade-kota');
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/adu.nasib/)) {
    let adu_lokasi = [10, 24],
        adu_nasib = Math.floor(Math.random()*2);
    if(adu_lokasi[adu_nasib] > +plyr.parentElement.classList[0].split('petak')[1]) {
      // PETAK TUJUAN - POSISI PLAYER
      playerTurn(plyr, (adu_lokasi[adu_nasib] - +plyr.parentElement.classList[0].split('petak')[1]));
    }
    else {
      // (PETAK TUJUAN + TOTAL PETAK) - POSISI PLAYER
      playerTurn(plyr, ((adu_lokasi[adu_nasib] + 28) - +plyr.parentElement.classList[0].split('petak')[1]));
    }
  }
  else if(cardPick.toLowerCase().match(/gempa.bumi/)) {
    let listRoboh = [], listTakRoboh = [], robohRandom;
    for(let i=0; i<tmpLoc.split(';').length; i++) {
      // console.log( tmpLoc.split(';')[i].split('*')[0] );
      for(let j=0; j<semuaKotaDll.length; j++) {
        if(semuaKotaDll[j].classList[0].includes(tmpLoc.split(';')[i].split('*')[0])) {
          // console.log(semuaKotaDll[j].parentElement.firstChild.data);
          listRoboh.push(semuaKotaDll[j].classList[0].split('_')[1]);
        }
      }
    }
    // console.log(listRoboh);
    robohRandom = Math.floor(Math.random()*listRoboh.length);
    // console.log(robohRandom);
    if(listRoboh.length > 0) {
      for(let i=0; i<tmpLoc.split(';').length; i++) {
        // console.log(tmpLoc.split(';').length);
        if(tmpLoc.split(';')[i].includes(listRoboh[robohRandom]) && tmpLoc.split(';')[i].split('*')[1].split('-')[tmpLoc.split(';')[i].split('*')[1].split('-').length-1] != 'tanah') {
          // console.log('bukan tanah');
          // console.log(tmpLoc.split(';')[i]);
          listTakRoboh.push(tmpLoc.split(';')[i].match(new RegExp(`.*(?=-${tmpLoc.split(';')[i].split('*')[1].split('-')[tmpLoc.split(';')[i].split('*')[1].split('-').length-1]})`))[0]);
        }
        else
          listTakRoboh.push(tmpLoc.split(';')[i]);
      }
      // console.log(listTakRoboh);
      cfrm_box.children[0].innerText = `${cardPick}\n\n"1 rumah dari kota ${listRoboh[robohRandom].split(',')[0]} roboh \u{1F691}"`;
      setLocStorage('hartaAnda', (`${localUser},uang${+getLocStorage('hartaAnda').match(/uang.\d*/)[0].split('uang')[1]},${listTakRoboh.join(';')},${tmpSpc}`));
      // uangPlusOrMin = null;
    }
    else
      cfrm_box.children[0].innerText = `${cardPick}\n\n"beli rumah lah.."`;
    ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
    refreshPage();
  }
  else if(cardPick.toLowerCase().match(/upgrade.1.kota/)) {
    let listUpgrade = [], randomUpgrade;
    for(let i=0; i<tmpLoc.split(';').filter(i=>i).length; i++) {
      // console.log( tmpLoc.split(';')[i].split('*')[0] );
      for(let j=0; j<semuaKotaDll.length; j++) {
        if(semuaKotaDll[j].classList[0].includes(tmpLoc.split(';')[i].split('*')[0])) {
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
          cfrm_box.style.display = 'none';
          ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
          refreshPage();
        }
        else {
          yesNoWhenBuyCity(cfrm_box.children[1], cfrm_box.children[2], listUpgrade[randomUpgrade], bw,
                            `${cardPick}\nMau upgrade kota ${listUpgrade[randomUpgrade].split('_')[1]} dgn harga Rp ${listUpgrade[randomUpgrade].split('_')[3].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}? `,
                            cfrm_box, plyrMv, refreshPage, 'kota');
          bw -= 1;
        }
      }, 1e3);
    }
    else {
      // cfrm_box.style.display = 'none';
      cfrm_box.children[0].innerText += '\n\nimagine tak punya kota';
      ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
      refreshPage();
    }
  }
  else if(cardPick.toLowerCase().match(/kota.punya.orang/)) {
    let listKota = [], bw = 4;
    // for(let i=0; i<tmpLoc.split(';').length; i++) {
      // console.log( tmpLoc.split(';')[i].split('*')[0] );
      for(let j=0; j<semuaKotaDll.length; j++) {
        if(semuaKotaDll[j].classList[0].split('_')[4] != null && semuaKotaDll[j].classList[0].split('_')[4] != localUser) {
          // console.log(semuaKotaDll[j].classList[0].split('_')[4]);
          // console.log(semuaKotaDll[j].parentElement.firstChild.data);
          listKota.push(semuaKotaDll[j].parentElement.title);
        }
      }
    // }
    // console.log(listKota);
    for(let i=0; i<listKota.length; i++) {
      let l_kota = cE('button');
      l_kota.classList.add('listKota');
      l_kota.style.width = '35px';
      l_kota.disabled = true;
      l_kota.innerText = listKota[i];
      cfrm_box.appendChild(l_kota);
      l_kota = null;
    }
    cfrm_box.children[1].style.display = 'none';
    cfrm_box.children[2].style.display = 'none';
    waitingPlayer = setInterval(()=>{
      if(bw == 0) {
        if(listKota.length > 0) {
          // cfrm_box.style.display = 'none';
          bw = Math.floor(Math.random()*listKota.length)+3;
          // console.log(bw);
          listKota = null;
          // console.log(Math.floor(Math.random()*listKota.length)+3);
          cfrm_box.children[bw].disabled = false;
          // console.log(cfrm_box.children[bw].innerText);
          cfrm_box.children[bw].click();
        }
        else {
          // console.log(playerNow, plyrMv);
          ajax_post(null, 'papan_game.php', `playerPos=${playerNow},pos${plyrMv}&harta=${getLocStorage('hartaAnda')}&daduKartu=${getLocStorage('daduKartu')}`);
          refreshPage();
        }
      }
      else {
        cfrm_box.children[0].innerText = `${cardPick} (sedang memilih) - ${bw}`;
        bw -= 1;
      }
    }, 1e3);
    qSA('.listKota').forEach(v=>{
      // if(bw == 0) {
        v.onclick = (ev)=>{
          // console.log('klik kota orang');
          clearInterval(waitingPlayer);
          while(cfrm_box.lastChild && cfrm_box.lastChild.nodeName == 'BUTTON')
            cfrm_box.removeChild(cfrm_box.lastChild);
          cfrm_box.children[0].innerText += `\n*menuju nomor ${ev.target.innerText}*`;
          // console.log(cfrm_box.children[0].innerText);
          if(+ev.target.innerText > +plyr.parentElement.classList[0].split('petak')[1]) {
            // PETAK TUJUAN - POSISI PLAYER
            playerTurn(plyr, (+ev.target.innerText - +plyr.parentElement.classList[0].split('petak')[1]));
          }
          else {
            // (PETAK TUJUAN + TOTAL PETAK) - POSISI PLAYER
            playerTurn(plyr, ((+ev.target.innerText + 28) - +plyr.parentElement.classList[0].split('petak')[1]));
          }
        }
      // }
    });
  }
  // ############ TIDAK BOLEH ADA refreshPage DI PALING BAWAH #############
  // ############ TIDAK BOLEH ADA refreshPage DI PALING BAWAH #############
  // ############ TIDAK BOLEH ADA refreshPage DI PALING BAWAH #############
  // refreshPage();
}
