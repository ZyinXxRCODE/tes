// Memilih elemen input pencarian, baris tabel, dan heading tabel
const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// Menambahkan event listener ke input pencarian untuk memicu fungsi pencarian
search.addEventListener('input', searchTable);

// Fungsi untuk melakukan pencarian pada tabel
function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(), // Mendapatkan teks dari setiap baris tabel dan mengonversinya ke huruf kecil
            search_data = search.value.toLowerCase(); // Mendapatkan teks pencarian dan mengonversinya ke huruf kecil

        // Menyembunyikan baris yang tidak cocok dengan pencarian dengan menambahkan atau menghapus kelas 'hide'
        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);

        // Menetapkan animasi penundaan untuk muncul/menyembunyikan baris
        row.style.setProperty('--delay', i / 25 + 's');
    })

    // Memberikan warna latar belakang yang berbeda untuk baris yang muncul setelah pencarian
    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// Menambahkan event listener ke setiap heading tabel untuk memicu fungsi pengurutan
table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        // Menghapus kelas 'active' dari semua heading tabel
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active'); // Menambahkan kelas 'active' pada heading yang diklik

        // Menghapus kelas 'active' dari semua sel dalam kolom tabel
        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active'); // Menambahkan kelas 'active' pada sel dalam kolom yang sesuai
        })

        // Mengubah ikon panah pada heading untuk menunjukkan arah pengurutan
        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true; // Mengubah arah pengurutan untuk heading berikutnya

        // Memanggil fungsi untuk mengurutkan tabel berdasarkan kolom tertentu
        sortTable(i, sort_asc);
    }
})

// Fungsi untuk mengurutkan tabel berdasarkan kolom tertentu
function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(), // Mendapatkan teks dari sel dalam kolom pada baris pertama
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase(); // Mendapatkan teks dari sel dalam kolom pada baris kedua

        // Mengurutkan baris berdasarkan teks dalam sel kolom, secara alfabetis
        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row)); // Memasukkan baris yang diurutkan ke dalam tabel
}