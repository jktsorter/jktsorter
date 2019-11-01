﻿﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Team J",
  "Team K3",
  "Team T",
  "Academy Class A",
  "Class B (empty)",
  "Graduates",
  "Generasi 1",
  "Generasi 2",
  "Generasi 3",
  "Generasi 4",
  "Generasi 5",
  "Generasi 6",
  "Generasi 7",
  "Generasi 8"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Ariella Callista Ichwan",    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "J/ariel.jpg"],
  [1, "Aurel Mayori",         [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "J/aurel_mayori.jpg"],
  [1, "Azizi Asadel",      [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "J/azizi_asadel.jpg"],
  [1, "Cindy Hapsari Maharani Pujiantoro Putri",     [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "J/cindy_hapsari.jpg"],
  [1, "Diani Amalia",          [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "J/diani.jpg"],
  [1, "Eve Antoinette Ichwan",        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "J/eve_antoinette.jpg"], 
  [1, "Feni Fitriyanti",        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/feni_fitriyanti.jpg"],
  [1, "Fransiska Saraswati Puspa Dewi",          [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/fransisca_saraswati_puspa_dewi.jpg"],
  [1, "Frieska Anastasia Laksani",        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "J/frieska_anastasia_laksani.jpg"], 
  [1, "Gabriella Margareth W.",        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "J/gabriella.jpg"], 
  [1, "Ni Made Ayu Vania Aurellia",      [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/made_ayu_vania_aurellia.jpg"],   
  [1, "Michelle Christo Kusnadi",     [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/michelle_christo_kusnadi.jpg"],
  [1, "Nadila Cindi Wantari",          [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "J/nadila_cindi_wantari.jpg"],
  [1, "Riska Amelia Putri",        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "J/riska_amelia_putri.jpg"],
  [1, "Rona Ariesta Anggraeni",       [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "J/rona_ariesta_anggraeni.jpg"],
  [1, "Sania Julia Montolalu",       [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "J/sania_julia.jpg"],
  
  [1, "Anastasya Narwastu Tety Handuran",         [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0], "K3/anastasya_narwastu_tety_handuran.jpg"],  
  [1, "Angelina Christy W.",       [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/angelina_christy.jpg"],  
  [1, "Anindita Rahma Cahyadi",    [0,1,1,0,0,0,0,0,1,0,0,0,0,0,0], "K3/aninditha_rahma_cahyadi.jpg"],  
  [1, "Beby Chaesara Anadila",       [0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "K3/beby_chaseara_anadila.jpg"],
  [1, "Gita Sekar Andarini",       [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0], "K3/gita_sekar_andarini.jpg"],
  [1, "Helisma Mauludzunia Putri",     [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/helisma_putri.jpg"], 
  [1, "Jennifer Rachel Natasya",    [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "K3/jennifer_rachel_natasya.jpg"],
  [1, "Kandiya Rafa Maulidita",     [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0], "K3/kandiya_rafa_maulidita.jpg"],
  [1, "M.G.N. Desy. P.G.",        [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "K3/maria_genoveva_natalia_desy_purnamasari_gunawan.jpg"],
  [1, "Mutiara Azzahra",          [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/mutiara_azzahra.jpg"],
  [1, "Nurhayati",        [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0], "K3/nurhayati.jpg"],
  [1, "Ratu Vienny Fitrilya",       [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "K3/ratu_vienny_fitrilya.jpg"],
  [1, "Shani Indira Natio",         [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "K3/shani_indira_natio.jpg"],
  [1, "Shania Gracia",        [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "K3/shania_gracia.jpg"],
  [1, "Viviyona Apriani",       [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "K3/viviyona_apriani.jpg"],
  [1, "Yessica Tamara",      [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/yessica_cintaku.jpg"],
  
  [1, "Adhisty Zara Kusumawardhani",      [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/adhisty_zara.jpg"],
  [1, "Adriani Elisabeth",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/adriani_elizabeth.jpg"],
  [1, "Ayana Shahab",      [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0], "T/ayana_shahab.jpg"],
  [1, "Fidly Imanda Azzahra",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/fidly_immanda_azzahra.jpg"],
  [1, "Gabriel Angelina",           [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0], "T/gabriel_angelina.jpg"],
  [1, "Gabryela Marcelina",      [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/gabryela_marcelina.jpg"],
  [1, "Hasyakyla Utami Kusumawardhani",           [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/haskyla_utami.jpg"],
  [1, "Jinan Safa Safira",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/jinan_safa_safira.jpg"],
  [1, "Melati Putri Rahel Sesilia",      [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/melati_putri_rahel.jpg"],
  [1, "Nabila Fitriana",           [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0], "T/nabila_fitriana.jpg"],
  [1, "Puti Nadhira Azalia",           [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/puti_nadhira.jpg"],
  [1, "Rinanda Syahputri",           [0,0,1,0,0,0,0,0,0,0,0,1,0,0,0], "T/rinanda.jpg"],
  [1, "Sonia Natalia",           [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0], "T/sonia_natalia.jpg"],
  [1, "Syahfira Angela Nurhaliza",      [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0], "T/syahfira_angela_nurhaliza.jpg"],
  [1, "Tan Zhi Hui Celine",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/tan_zhi_hui_celine.jpg"],
  [1, "Thalia Ivanka Elizabeth Frederik",           [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0], "T/thalia_ivanka_elizabeth.jpg"],
  
  [1, "Aiko Harumi",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Aiko_Harumi.jpg"],
  [1, "Amaninah Afiqah",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/amaninah_afiqah.jpg"],
  [1, "Amira Fatin",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/amira_fatin.jpg"],
  [1, "Cindy Nugroho",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/cindy_nugroho.jpg"],
  [1, "Cornelia Vanisa",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/cornelia_vanisa.jpg"],
  [1, "Devytha Maharani",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/devytha_maharani.jpg"],
  [1, "Dhea Angelia",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Dhea_Angelia.jpg"],
  [1, "Eriena Kartika",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/eriena.jpg"],
  [1, "Febi Komaril",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Febi.jpg"],
  [1, "Febrina Diponegoro",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/febrina.jpg"],
  [1, "Febriola Sinambela",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/febriola_sinambela.jpg"],
  [1, "Fiony Alveria Tantri",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/fiony.jpg"],
  [1, "Flora Shafiq",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/flora.jpg"],
  [1, "Freyana Shifa Jayawardhana",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/freija.jpg"],
  [1, "Gabriella Stevany H.",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/gabriella_vany.jpg"],
  [1, "Jessica Chandra",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Jessica_chandra.jpg"],
  [1, "Jesslyn Callista",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Jesslyn_callista.jpg"],
  [1, "Keisya Ramadhani",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/keisya.jpg"],
  [1, "Lulu Salsabila",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/lululululu.jpg"],
  [1, "Pamela Krysanthe",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/pamela.jpg"],
  [1, "Nyimas Ratu Rafa",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/ratu.jpg"],
  [1, "Reva Adriana",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/reva_p.jpg"],
  [1, "Reva Fidela",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/reva_f.jpg"],
  [1, "Salma Annisa",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/salma_p.jpg"],
  [1, "Shalza Grasita",           [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], "AcademyA/shalza.jpg"],
  [1, "Umega Maulana Sinambela",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/umega.jpg"],
  [1, "Viona Fadrin",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/vivi.jpg"],
  [1, "Zahra Nur",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/zahra.jpg"],
  
  [1, "Allisa Astri",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/allisa_astri.jpg"],
  [1, "Allisa Galliamova",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/mova.jpg"],
  [1, "Cleopatra",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/cleo.jpg"],
  [1, "Cindy Gulla",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/cigul.jpg"],
  [1, "Delima Rizky",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/delima.jpg"],
  [1, "Devi Kinal Putri",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/kinal.jpg"],
  [1, "Diasta Priswarini",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/diasta.jpg"],
  [1, "Fahira",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/fahira.jpg"],
  [1, "Ghaida Farisya",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/prank.jpg"],
  [1, "Intania Pratama Ilham",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/intania.jpg"],
  [1, "Jessica Vania Widjaja",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/jeje.jpg"],
  [1, "Jessica Veranda Tanumihardja",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/ve.jpg"],
  [1, "Melody Nurramdhani Laksani",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/melody.jpg"],
  [1, "Nabilah Ratna Ayu Azalia",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/nabilah.jpg"],
  [1, "Neneng Rosediana",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/ochi.jpg"],
  [1, "Rena Nozawa",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/rena.jpg"],
  [1, "Rezky Wiranti Dhike",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/dhike.jpg"],
  [1, "Rica Leyona",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/rica.jpg"],
  [1, "Sendy Ariani",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/sendy.jpg"],
  [1, "Shania Junianatha",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/shanju.jpg"],
  [1, "Siti Gayatri",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/siti_gayatri.png"],
  [1, "Sonya Pandarmawan",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/sonya.jpg"],
  [1, "Stella Cornelia",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/stella.jpg"],
  [1, "Alicia Chanzia Ayu Kumaseh",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/acak.jpg"],
  [1, "Althea Callista",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/althea.jpg"],
  [1, "Annisa Athia Zainun Faqiah",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/turnpoint.jpg"],
  [1, "Cindy Dea Yuvia",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/cindy_yuvia.jpg"],
  [1, "Della Delila",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/della_delila.jpg"],
  [1, "Dellia Erdita",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/dellia.jpg"],
  [1, "Dena Siti Rohyati",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/dena.jpg"],
  [1, "Dwi Putri Bonita",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/uty.jpg"],
  [1, "Fakhriyani Shafariyanti",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/shafa.jpg"],
  [1, "Intar Putri Kariina",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/karin.jpg"],
  [1, "Jennifer Hanna Sutiono",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/hanna.jpg"],
  [1, "Lidya Maulida Djuhandar",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/lidya.jpg"],
  [1, "Nadhifa Karimah",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/nadhifa.jpg"],
  [1, "Natalia",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/natalia.jpg"],
  [1, "Noella Sisterina",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/noella.jpg"],
  [1, "Novinta Dhini Soetopo",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/nobi.jpg"],
  [1, "Nurhalima Oktavianti",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/halimah.jpg"],
  [1, "Octi Sevpin",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/octi.jpg"],
  [1, "Olivia Robberecht",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/olivia.jpg"],
  [1, "Priscillia Sari Dewi",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/sisil.jpg"],
  [1, "Riskha Fairunissa",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/riskha_fairunissa.jpg"],
  [1, "Saktia Oktapyani",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/saktia_oktapyani.jpg"],
  [1, "Shinta Naomi Prasetya",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/shinta_naomi.jpg"],
  [1, "Sinka Juliani Prasetya",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/sinka_juliani.jpg"],
  [1, "Thalia",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/thalia.jpg"],
  [1, "Alycia Ferryana",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/cia.jpg"],
  [1, "Amanda Dwi Arista",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/manda.jpg"],
  [1, "Andela Yuwono",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/andela.jpg"],
  [1, "Anggie Putri Kurniasari",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/anggie.jpg"],
  [1, "Ayu Safira Oktaviani",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/ayu_safira_oktaviani.jpg"],
  [1, "Chikita Ravenska Mamesah",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/chikita.jpg"],
  [1, "Elaine Hartanto",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/elaine.jpg"],
  [1, "Farina Yogi Devani",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/farina.jpg"],
  [1, "Indah Permata Sari",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/indah_permata.jpg"],
  [1, "Kezia Putri Andinta",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/kei.jpg"],
  [1, "Martha Graciela",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/martha_graciela.jpg"],
  [1, "Milenia Christien Glory Gunawan",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/milen.jpg"],
  [1, "Nadhifa Salsabila",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/nadse.jpg"],
  [1, "Nina Hamidah",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/nina_hamidah.jpg"],
  [1, "Pipit Ananda",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/pipit.jpg"],
  [1, "Putri Farin Kartika",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/farin.jpg"],
  [1, "Rizka Khalila",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/yukka.jpg"],
  [1, "Shaffa Nabila",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/shaffa_nabila.jpg"],
  [1, "Sofia Meifaliani",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/sofia.jpg"],
  [1, "Stephanie Pricilla Indarto Putri",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/stephanie_pricilla_indarto_putri.jpg"],
  [1, "Triarona Kusuma",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/tya.jpg"],
  [1, "Yansen Indiani",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/cesen.jpg"],
  [1, "Zebi Magnolia Fawwaz",           [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "grads/zebi.jpg"],
  [1, "Christi Chriselle",           [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], "grads/christi.jpg"],
  [1, "Jessica Berliana Ekawardani",           [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], "grads/jessicaberliana.jpg"],
  [1, "Made Devi Ranita Ningtara",           [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], "grads/made_devi_ranita.jpg"],
  [1, "Sri Lintang",           [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], "grads/sri_lintang.jpg"],
  [1, "Zahra Yuriva Dermawan",           [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], "grads/yuriva.jpg"],
  [1, "Mega Suryani",           [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], "grads/mega_suryani.jpg"],
  [1, "Anggita Destiana Dewi",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/anggita_destiana.jpg"],
  [1, "Citra Ayu Pranajaya Wibrado",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/citra.jpg"],
  [1, "Chintya Hanindhitakirana Wirawan",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/chintya.jpg"],
  [1, "Elizabeth Gloria Setiawan",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/glori.jpg"],
  [1, "Helma Sonya",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/helma_sonya.jpg"],
  [1, "Regina Angelina",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/regina.jpg"],
  [1, "Rissanda Putri Tuarissa",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/rissanda_putri.jpg"],
  [1, "Ruth Damayanti Sitanggang",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/ruth.jpg"],
  [1, "Violeta Burhan",           [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0], "grads/violeta_burhan.jpg"],
  [1, "Amanda Priscella Solichin",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/amandapricella.jpg"],
  [1, "Denise Caroline",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/denise.jpg"],
  [1, "Erika Ebisawa Kuswan",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/erika.jpg"],
  [1, "Erika Sintia",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/erikasintia.jpg"],
  [1, "Graciella Ruth Wiranto",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/wiranto.jpg"],
  [1, "Jihan Miftahul Jannah",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/jihanmiftahul.jpg"],
  [1, "Putri Cahyaning Anggraini",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/riri.jpg"],
  [1, "Callista Lea",           [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0], "grads/callista.jpg"],
  [1, "Kanya Caya",           [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0], "grads/kanya_caya.jpg"],
  [1, "Rifa Permatasari",           [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0], "grads/rifa.jpg"],
  [1, "Aki Takajo",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/akicha.jpg"],
  [1, "Haruka Nakagawa",           [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0], "grads/haruka.jpg"],
  [1, "Saya Kawamoto",           [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], "grads/sayaya.jpg"],
  [1, "Rina Chikano",           [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], "grads/chikarina.jpg"],
];
