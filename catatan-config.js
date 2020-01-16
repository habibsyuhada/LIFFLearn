function loadCatatan() {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app = '<table class="table table-striped d-block d-md-table text-nowrap">';
            data_app += '<thead>' +
                '<th class="text-center">Nama Peminjam</th>' +
                '<th class="text-center">Judul Buku</th>' +
                '<th class="text-center">Penerbit</th>' +
                '<th class="text-center">Tahun Terbit</th>' +
                '<th class="text-center">Tanggal Pinjam</th>' +
                '<th class="text-center">Tanggal Pengembalian</th>' +
                '<th class="text-center">Action</th>' +
                '</thead> <tbody>';
 
            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].nama + ' </td>' +
                    '<td>' + list_data[i].judul + ' </td>' +
                    '<td>' + list_data[i].penerbit + ' </td>' +
                    '<td>' + list_data[i].tahun + ' </td>' +
                    '<td>' + list_data[i].tgl_pinjam + ' </td>' +
                    '<td>' + list_data[i].tgl_kembali + ' </td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a> ' +
                    '<a class="btn btn-info btn-small" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id_data + '\')">Lihat</a> ' +
                    '<a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id_data + '\')">Edit</a></td>';
                data_app += '</tr>';
            }
 
            data_app += '</tbody></table>';
 
        }
        else {
            data_app = "Data Kosong";
        }
 
 
        $('#list-catatan').html(data_app);
        $('#list-catatan').hide();
        $('#list-catatan').fadeIn(100);
    }
}
 
function editData(id) {
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#enama").val(list_data[i].nama);
                $("#ejudul").val(list_data[i].judul);
                $("#epenerbit").val(list_data[i].penerbit);
                $("#etahun").val(list_data[i].tahun);
                $("#etgl_pinjam").val(list_data[i].tgl_pinjam);
                $("#etgl_kembali").val(list_data[i].tgl_kembali);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-data');
 
    }
 
}
 
function lihatData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#lnama").val(list_data[i].nama);
                $("#ljudul").val(list_data[i].judul);
                $("#lpenerbit").val(list_data[i].penerbit);
                $("#ltahun").val(list_data[i].tahun);
                $("#ltgl_pinjam").val(list_data[i].tgl_pinjam);
                $("#ltgl_kembali").val(list_data[i].tgl_kembali);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');
 
    }
}
 
 
function simpanData() {
    nama = $('#nama').val();
    judul = $('#judul').val();
    penerbit = $('#penerbit').val();
    tahun = $('#tahun').val();
    tgl_pinjam = $('#tgl_pinjam').val();
    tgl_kembali = '';

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Log: Insert Data Nama: "+nama+", Judul Buku:"+judul
        }]).then(function() {
            // alert('Catatan Tersimpan');
        }).catch(function(error) {
            alert('Something Wrong!');
        });
    }
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'judul': judul, 'penerbit': penerbit, 'tahun': tahun, 'tgl_pinjam': tgl_pinjam, 'tgl_kembali': tgl_kembali });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-catatan');
 
    return false;
}
 
function simpanEditData() {
    id_data = $('#eid_data').val();
    nama = $('#enama').val();
    judul = $('#ejudul').val();
    penerbit = $('#epenerbit').val();
    tahun = $('#etahun').val();
    tgl_pinjam = $('#etgl_pinjam').val();
    tgl_kembali = $('#etgl_kembali').val();

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Log: Update Data Nama: "+nama+", Judul Buku:"+judul
        }]).then(function() {
            // alert('Catatan Tersimpan');
        }).catch(function(error) {
            alert('Something Wrong!');
        });
    }
 
    list_data.push({ 'id_data': id_data, 'nama': nama, 'judul': judul, 'penerbit': penerbit, 'tahun': tahun, 'tgl_pinjam': tgl_pinjam, 'tgl_kembali': tgl_kembali });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-catatan');
 
    return false;
}
 
function hapusData(id) {
    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Log: Delete Data ID: "+id
        }]).then(function() {
            // alert('Catatan sudah dihapus');
        }).catch(function(error) {
            alert('Something Wrong!');
        });
    }
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
 
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
 
        localStorage.setItem('list_data', JSON.stringify(list_data));
        loadCatatan();
    }
}
 
 
function gantiMenu(menu) {
    if (menu == "list-catatan") {
        loadCatatan();
        var d = new Date();
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = d.getDate().toString();
        var strDate = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
        // console.log(strDate);
        $('#tgl_pinjam').val(strDate);
        document.getElementById('scanQrField').textContent = "";
        document.getElementById('form-data').reset();

        $('#tambah-catatan').hide();
        $('#list-catatan').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    }
    else if (menu == "tambah-catatan") {
        $('#tambah-catatan').fadeIn();
        $('#list-catatan').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
        $('#lihat-data').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
    }
}
