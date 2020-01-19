(function() {
    var questions = [{
      question: "Diketahui sebuah P = { h, e, l, l, o }. Banyaknya himpunan dari bagian P tadi ialah ?",
      choices: [22, 32, 10, 15, 20],
      correctAnswer: 32
    }, {
      question: "Di dalam sebuah kelas tercatat ada 21 orang siswa yang gemar bermain basket,  lalu ada juga 19 orang siswa yang gemar bermain sepak bola, kemudian ada juga 8 orang siswa yang gemar bermain basket dan sepak bola, serta ada juga 14 orang siswa yang tidak gemar olahraga,Maka hitunglah berapa banyak siswa di dalam kelas tersebut ??",
      choices: [56, 76, 46, 11, 10],
      correctAnswer: 46
    }, {
      question: "Perhatikan paragraf dibawah ini! (1) Kisah pembuatan film biasanya melewati proses yang panjang dan rumit. (2) Ide membuat film dan cerita datang dari Castle Production yang bergerak di bidang film animasi sangat bermanfaat (3)Castle cukup berhasil bekerja sama dengan Kementrian Pendidikan dan Kebudayaan untuk menyaring siswa SMK yang memiliki kemampuan untuk membuat gambar. (4) Dari seleksigambar animasi kiriman siswa, Castle memilih lima puluh siswa SMK, tiga diantaranya perempuan, mengikuti pelatihan menggambar animasi lalu memproduksi film animasi. (5) Untuk keperluan itu, Castle mengerahkan animator professional seperti Boy Wahyudi dan Dony Moersito untuk mengajar mereka.Kalimat utama paragraf tersebut terletak pada kalimat nomor…",
      choices: [5, 4, 3, 2, 1],
      correctAnswer: 1
    }, {
      question: "(1) Era globalisasi tidak terbendung lagi. (2) Mobilitas penduduk, barang, dan hewan yang cukup tinggi memiliki dampak negatif terhadap kesehatan. (3) Kasus flu burung yang menghantui Indonesia menjadi peringatan bahwa manusia dan hewan dari luar negeri perlu pengawasan. (4) Busung lapar hanya puncak es dari kondisi gizi buruk yang terabaikan. (5) Sikap menyalahkan rakyat atau pemerintah dalam mengatasai flu burung tidaklah bijaksana?",
      choices: [1, 2, 3, 4, 5],
      correctAnswer: 4
    }, {
      question: "(1) Kondisi hutan Indonesia benar-benar sudah memprihatinkan. (2) Dalam kurun waktu lima puluh tahun, hutan alam Indonesia mengalami penurunan luas sebesar 64 juta hektare. (3) Pembukaan hutan alam di dataran rendah di Sulawesi telah memusnahkan keanekaragaman hayati. (4) Berjuta-juta spesies flora dan fauna musnah sudah. (5) Pembukaan lahan dengan cara membakar hutan telah menambah masalah kerusakan hutan.?",
      choices: [1, 2, 3, 4, 5],
      correctAnswer: 1
    }];
   
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
   
    // Display initial question
    displayNext();
   
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
     
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {       
        return false;
      }
      choose();
     
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
   
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
     
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
   
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
     
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
   
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
   
    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
     
      var header = $('<h2>Pertanyaan ' + (index + 1) + ':</h2>');
      qElement.append(header);
     
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
     
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
     
      return qElement;
    }
   
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
   
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
   
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
       
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
         
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
           
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
   
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
     
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
     
      score.append('Kamu Menjawab ' + numCorrect + ' pertanyaan dari ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();