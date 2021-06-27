var app = new Vue({
    el: '#wrap',
    data: {
      visible: false,
      visible1: false,
      prazdnichny: [new Date("2021-05-01"), new Date("2021-05-09")],
      messsge:"",
    },
    methods: {
      countRabbits: function () {
        this.visible1 = false;
        let n = 0;
        let count = (new Date(moment($("#to").val(), "DD.MM.YYYY").format("YYYY-MM-DD"))).getTime() - (new Date(moment($("#from").val(), "DD.MM.YYYY").format("YYYY-MM-DD"))).getTime();
        count = (count / (1000 * 3600 * 24))+1;
        console.log(count);
        if (count > 6 && count < 21) {
          this.visible = false;
          this.prazdnichny.forEach(function (item, i, arr) {
            console.log(item);
            console.log(new Date(moment(new Date($("#from").val()), "DD.MM.YYYY").format("YYYY-MM-DD")));
            if (item >= new Date(moment($("#from").val(), "DD.MM.YYYY").format("YYYY-MM-DD")) && item <= new Date(moment($("#to").val(), "DD.MM.YYYY").format("YYYY-MM-DD"))) {
              n = n + 1;
            }
          });
          if (n > 0) {
            $("#to").datepicker("setDate", new Date(moment($("#to").val(), "DD.MM.YYYY").add(n, 'days').format("YYYY-MM-DD")));
          }
        } else {
          this.messsge = "Допустим диапозон от 7 до 20 дней включительно."
          this.visible = true;
          return;
        }
        this.visible1 = true;
        this.messsge = "Выбран период с " + $("#from").val() + " по " + $("#to").val() + ". Кол-во дней: " + (count+n) + ", из них праздничных:" + n;
      }
    },
    created: function () {
      $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        altFormat: "yy-mm-dd"
      };
      $.datepicker.setDefaults($.datepicker.regional['ru']);

      $(()=> {
        $("#from").datepicker({
          maxDate: new Date("2021-12-31"),
          minDate: new Date("2021-01-01"),
          beforeShowDay: function (date) {
            if ((date.getDate() == 1 && date.getMonth() == 4) || (date.getDate() == 9 && date.getMonth() == 4)) {
              return [true, 'odd'];
            }
            if ((date.getDate() >= 21 && date.getMonth() == 4) && (date.getDate() <= 27 && date.getMonth() == 4)) {
              return [true, 'odd1'];
            }
            return [true, ''];
          },
          onSelect: (date)=> {
            this.visible1 = false;
            let a = moment(date, "DD.MM.YYYY").format("YYYY-MM-DD");
            date = new Date(a)
            if ((date.getDate() >= 21 && date.getMonth() == 4) && (date.getDate() <= 27 && date.getMonth() == 4)) {
              this.visible=true;
              this.messsge= "Выбор дат с 21.05 по 27.05 запрещен";
              $("#from").datepicker("setDate", "");
              $("#from").blur();
            }else{
              this.visible=false;
            }
          },
        });
        $("#to").datepicker({
          maxDate: new Date("2021-12-31"),
          minDate: new Date("2021-01-01"),
          beforeShowDay: function (date) {
            if ((date.getDate() == 1 && date.getMonth() == 4) || (date.getDate() == 9 && date.getMonth() == 4)) {
              return [true, 'odd'];
            }
            if ((date.getDate() >= 21 && date.getMonth() == 4) && (date.getDate() <= 27 && date.getMonth() == 4)) {
              return [true, 'odd1'];
            }
            return [true, ''];
          },
          onSelect: (date) => {
            this.visible1 = false;
            let a = moment(date, "DD.MM.YYYY").format("YYYY-MM-DD");
            date = new Date(a)
            if ((date.getDate() >= 21 && date.getMonth() == 4) && (date.getDate() <= 27 && date.getMonth() == 4)) {
              this.visible=true;
              this.messsge= "Выбор дат с 21.05 по 27.05 запрещен";
              $("#to").datepicker("setDate", "");
              $("#to").blur();
            }else{
              this.visible=false;
            }
          },
        });

      });
    },
  });
