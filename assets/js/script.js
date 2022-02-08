//Country codes for loop
        //var CountryCodes = [ "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW" ];
        var CountryCodes = [ "CN", "IN", "US", "ID", "PK", "BR", "NG", "BD", "RU", "MX", "JP", "ET", "PH", "EG", "VN", "CD", "TR", "IR", "DE", "TH", "GB", "FR", "IT", "TZ", "ZA", "MM", "KE", "KR", "CO", "ES" ];

        //Fetches the CALENDARIFIC API
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '');
        var mm = String(today.getMonth() + 1).padStart(2, '');
        var yyyy = today.getFullYear();

        //for (var i = 0; i < CountryCodes.length; i++) {
        CountryCodes.forEach(function(element) { 
            async function fetchData() {
                const countryCode = `${element.toLowerCase()}`;
            const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=9482cbc8381d91c591e0818d55fcc0aa976b1b75&country=${element}&day=${dd}&month=${mm}&year=${yyyy}/json`)
            const holidays = await response.json();
            const JSONstr = JSON.stringify(holidays);

            if( JSONstr != `{"meta":{"code":200},"response":{"holidays":[]}}` ) { 
            var JSONlength = JSONstr.length;
            const JSONprocess = JSONstr.substring(21, JSONlength - 1);
            const JSONstrBrack = `{ ${JSONprocess} }`;
            const parseStr = JSON.parse(JSONstrBrack);
    
            console.log(parseStr);
            var obj = parseStr;
            var card = document.getElementById("cardfetch");
            obj.response.holidays.forEach(function(element) {
    
                //turns API numeric day into day with suffix
                if (element.date.datetime.day == 1) { var holidayDay = `${element.date.datetime.day}st`; }
                if (element.date.datetime.day == 2) { var holidayDay = `${element.date.datetime.day}nd`;  }
                if (element.date.datetime.day == 3) { var holidayDay = `${element.date.datetime.day}rd`;  }
                if (element.date.datetime.day >= 4 && element.date.datetime.day <= 20) { var holidayDay = `${element.date.datetime.day}th`;  }
                if (element.date.datetime.day == 21) { var holidayDay = `${element.date.datetime.day}st`;  }
                if (element.date.datetime.day == 22) { var holidayDay = `${element.date.datetime.day}nd`;  }
                if (element.date.datetime.day == 23) { var holidayDay = `${element.date.datetime.day}rd`;  }
                if (element.date.datetime.day >= 24 && element.date.datetime.day <= 30) { var holidayDay = `${element.date.datetime.day}th`;  }
                if (element.date.datetime.day == 31) { var holidayDay = `${element.date.datetime.day}st`;  }

                async function fetchPopData() {
                const response = await fetch(`https://world-population.p.rapidapi.com/population?country_name=${element.country.name}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "world-population.p.rapidapi.com",
                    "x-rapidapi-key": "1cc1b0ddadmsh76d08e585573bdep1ac552jsn72b71c928203"
                }})
            const population = await response.json();
            const JSONstr = JSON.stringify(population);
            var JSONlength = JSONstr.length;
            const JSONprocess = JSONstr.substring(18, JSONlength - 1);
            console.log(JSONprocess);
            const pop = JSONprocess;
            const obj = JSON.parse(pop);
            var CountryName = obj.country_name;
            var CountryPopulation = String(obj.population).replace(/(.)(?=(\d{3})+$)/g,'$1,');
            var CountryRanking = obj.ranking;
            const WorldShare = Math.floor(obj.world_share);

            //turns API numeric month into month name
            var holidayMonth = "";

                if (element.date.datetime.month == 1) { var holidayMonth = "January"; }
                if (element.date.datetime.month = 2) { var holidayMonth = "Feburary"; }
                if (element.date.datetime.month == 3) { var holidayMonth = "March"; }
                if (element.date.datetime.month == 4) { var holidayMonth = "April"; }
                if (element.date.datetime.month == 5) { var holidayMonth = "May"; }
                if (element.date.datetime.month == 6) { var holidayMonth = "June"; }
                if (element.date.datetime.month == 7) { var holidayMonth = "July"; }
                if (element.date.datetime.month == 8) { var holidayMonth = "August"; }
                if (element.date.datetime.month == 9) { var holidayMonth = "September"; }
                if (element.date.datetime.month == 10) { var holidayMonth = "October"; }
                if (element.date.datetime.month == 11) { var holidayMonth = "November"; }
                if (element.date.datetime.month == 12) { var holidayMonth = "December"; }
    
            //Starts the record handoff to HTML
            card.insertAdjacentHTML('beforeend', `
            <div class="card sticky-action">
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"><h4>${element.name}</h4><i class="material-icons right">more_vert</i></span>
              <h5>Celebrated In: ${element.country.name}<br>
            ${element.type} on ${holidayMonth} ${holidayDay}</h5>
            <p>${element.description}</p><br>
            <p>${element.country.name} has a population of ${CountryPopulation}<br>World Ranking by population is ${obj.ranking}<br>${WorldShare}% of the World celebrates this holiday</p>
            </div>
            <div class="card-action">
              <a id="learnMore" class="orange lighten-3 white-text col s2 hoverable" style="padding: .8rem" href="#">Learn More</a>
              <a id="saveBtn" class="teal darken-3 white-text col s2 hoverable" style="padding: .8rem;" href="#">Save to My Calendar</a>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
          </div>`); }

            fetchPopData(); })}}
            fetchData(); })