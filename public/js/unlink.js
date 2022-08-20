let map = {},
    kCode = null,
    win_iframe = document.querySelector('iframe');
win_iframe.contentWindow.onload = (wi)=>{
  // let w = wi.target;
  // console.log(win_iframe.ajax_get());
  // console.log(ev);
  win_iframe.contentWindow.onkeydown = (ev)=>{
    // console.log(ev);
    // console.log(ev.type);
    // c = 67, b = 66, g = 71, 9 = 57, 0 = 48
    kCode = ev.key;
    map[kCode] = true;
    // console.log(map);
    if(Object.keys(map)[0] == '0' && Object.keys(map)[1] == '9' && Object.keys(map)[2] == 'c') {
      // console.log('bawah');
      wi.target.querySelector('.reset_file').style.display = 'block';
    }
    else if(Object.keys(map)[0] == '0' && Object.keys(map)[1] == 'm' && Object.keys(map)[2] == 'd') {
      wi.target.querySelector('.setting_mods').style.display = 'block';
    }
    // console.log(Object.keys(map)[0]);
  }

  win_iframe.contentWindow.onkeyup = (ev)=>{
    kCode = ev.key;
    // map[kCode] = false;
    // if(map[kCode] == false)
      // console.log('atas');
    map = {};
    // console.log(map);
  }
}
