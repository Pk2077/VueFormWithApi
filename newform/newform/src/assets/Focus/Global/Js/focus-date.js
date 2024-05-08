var CALENDARTYPE = (function () {
    var private = {
        'NONE': 0,
        'GREGOREAN': 1,
        'HIJRI': 2, // Islamic Calendar (Hijri Calendar)
        'SHAMSI': 3 // Iranian Calendar (Jalali Calendar)
    };

    return {
        get: function (name) { return private[name]; }
    };
})();

var LANGUAGE = (function () {
    var private = {
        'ENGLISH': 0,
        'ARABIC': 1, // Islamic Calendar (Hijri Calendar)
        'FARSI': 2 // Iranian Calendar (Jalali Calendar)
    };

    return {
        get: function (name) { return private[name]; }
    };
})();

var PERSIAN = {
    today: function () {
        var today = null;
        var date = [];

        try {
            today = new persianDate();

            date = PERSIAN.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {PERSIAN.today} " + err.message);
        }

        return (date);
    },

    dayOfWeek: function (iDay, iMonth, iYear) {
        var iValue = 0;
        var date = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]);
            iValue = date.day();
        }
        catch (err) {
            alert("Exception: {PERSIAN.dayOfWeek} " + err.message);
        }

        return (iValue);
    },

    maxDays: function (iMonth, iYear) {
        var iMax = 0;

        try {
            iMax = new persianDate([iYear, iMonth, 1]).daysInMonth();
            //if (iMonth >= 1 && iMonth <= 6) {
            //    iMax = 31;
            //}
            //else if (iMonth >= 7 && iMonth <= 11) {
            //    iMax = 30;
            //}
            //else if (iMonth == 12) {
            //    if (DATE.prototype.isLeapYear(iYear) == true) {
            //        iMax = 29;
            //    }
            //    else {
            //        iMax = 30;
            //    }
            //}
        }
        catch (err) {
            alert("Exception: {PERSIAN.maxDays} " + err.message);
        }

        return (iMax);
    },

    minYear: function () {
        return (1350);
    },

    maxYear: function () {
        return (1450);
    },

    toGregorian: function (iDay, iMonth, iYear) {
        var date = null;
        var dt = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]).toCalendar('gregorian');

            dt = PERSIAN.dateToArray(date);
        }
        catch (err) {
            alert("Exception: {PERSIAN.toGregorian} " + err.message);
        }

        return (dt);
    },

    gregorianToPersian: function (iDay, iMonth, iYear) {
        var date = null;
        var persian = null;
        var dt = null;

        try {
            date = new Date(iYear, iMonth - 1, iDay);
            persian = new persianDate(date);

            dt = PERSIAN.dateToArray(persian);
        }
        catch (err) {
            alert("Exception: {PERSIAN.gregorianToPersian} " + err.message);
        }

        return (dt);
    },

    isLeapYear: function (iYear) {
        var bValue = false;

        try {
            bValue = new persianDate([iYear]).isLeapYear();
        }
        catch (err) {
            alert("Exception: {PERSIAN.isLeapYear} " + err.message);
        }

        return (bValue);
    },

    nextDate: function (iDay, iMonth, iYear) {
        var today = null;
        var date = null;

        try {
            today = PERSIAN.addDays(iDay, iMonth, iYear, 1);
            date = PERSIAN.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {PERSIAN.nextDate} " + err.message);
        }

        return (date);
    },

    previousDate: function (iDay, iMonth, iYear) {
        var today = null;
        var date = null;

        try {
            today = PERSIAN.subtractDays(iDay, iMonth, iYear, 1);
            date = PERSIAN.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {PERSIAN.previousDate} " + err.message);
        }

        return (date);
    },

    addDays: function (iDay, iMonth, iYear, iNoOfDays) { // Returns persian date
        var date = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]).add('days', iNoOfDays);
        }
        catch (err) {
            alert("Exception: {PERSIAN.addDays} " + err.message);
        }

        return (date);
    },

    subtractDays: function (iDay, iMonth, iYear, iNoOfDays) { // Returns persian date
        var date = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]).subtract('days', iNoOfDays);
        }
        catch (err) {
            alert("Exception: {PERSIAN.subtractDays} " + err.message);
        }

        return (date);
    },

    addMonths: function (iDay, iMonth, iYear, iNoOfMonths) { // Returns persian date
        var date = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]).add('months', iNoOfMonths);
        }
        catch (err) {
            alert("Exception: {PERSIAN.addMonths} " + err.message);
        }

        return (date);
    },

    subtractMonths: function (iDay, iMonth, iYear, iNoOfMonths) { // Returns persian date
        var date = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]).subtract('months', iNoOfMonths);
        }
        catch (err) {
            alert("Exception: {PERSIAN.subtractMonths} " + err.message);
        }

        return (date);
    },

    getDate: function (iDay, iMonth, iYear) {
        var date = null;

        try {
            date = new persianDate([iYear, iMonth, iDay]);
        }
        catch (err) {
            alert("Exception: {PERSIAN.getDate} " + err.message);
        }

        return (date);
    },

    dateToArray: function (date) {
        var dt = [];

        try {
            dt.push(date.days()); // Day
            dt.push(date.month()); // Month
            dt.push(date.year()); // Year
            dt.push(date.day()); // Day Of Week
        }
        catch (err) {
            alert("Exception: {PERSIAN.dateToArray} " + err.message);
        }

        return (dt);
    }
};

var HIJRI = {
    today: function () {
        var today = null;
        var date = [];

        try {
            //now = new Date();
            //now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            //today = Globalize.cultures["ar-SA"].calendars.Hijri.convert.fromGregorian(now_utc);
            //iDay = today[2];
            //iMonth = today[1] + 1;
            //iYear = today[0];


            today = new HijriDate();

            date = HIJRI.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {HIJRI.today} " + err.message);
        }

        return (date);
    },

    dayOfWeek: function (iDay, iMonth, iYear) {
        var iValue = 0;
        var date = null;

        try {
            date = new HijriDate(iYear, iMonth, iDay);
            iValue = date.getDay();
        }
        catch (err) {
            alert("Exception: {HIJRI.dayOfWeek} " + err.message);
        }

        return (iValue);
    },

    maxDays: function (iMonth, iYear) {
        var iMax = 0;
        var date = null;

        try {
            date = new HijriDate(iYear, iMonth, 25);

            do {
                iMax = date.getDate();
                date.addDay();
            } while (iMax < date.getDate());
        }
        catch (err) {
            alert("Exception: {HIJRI.maxDays} " + err.message);
        }

        return (iMax);
    },

    minYear: function () {
        return (1400);
    },

    maxYear: function () {
        return (1500);
    },

    nextDate: function (iDay, iMonth, iYear) {
        var today = null;
        var date = null;

        try {
            today = HIJRI.addDays(iDay, iMonth, iYear, 1);
            date = HIJRI.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {HIJRI.nextDate} " + err.message);
        }

        return (date);
    },

    previousDate: function (iDay, iMonth, iYear) {
        var today = null;
        var date = null;

        try {
            today = HIJRI.subtractDays(iDay, iMonth, iYear, 1);
            date = HIJRI.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {HIJRI.previousDate} " + err.message);
        }

        return (date);
    },

    addDays: function (iDay, iMonth, iYear, iNoOfDays) { // Returns hijri date
        var date = null;

        try {
            date = new HijriDate(iYear, iMonth, iDay);
            date.addDays(iNoOfDays);
        }
        catch (err) {
            alert("Exception: {HIJRI.addDays} " + err.message);
        }

        return (date);
    },

    subtractDays: function (iDay, iMonth, iYear, iNoOfDays) { // Returns hijri date
        var date = null;

        try {
            date = new HijriDate(iYear, iMonth, iDay);
            date.subtractDays(iNoOfDays);
        }
        catch (err) {
            alert("Exception: {HIJRI.subtractDays} " + err.message);
        }

        return (date);
    },

    getDate: function (iDay, iMonth, iYear) {
        var date = null;

        try {
            date = new HijriDate(iYear, iMonth, iDay);
        }
        catch (err) {
            alert("Exception: {HIJRI.getDate} " + err.message);
        }

        return (date);
    },

    dateToArray: function (date) {
        var dt = [];

        try {
            dt.push(date.getDate()); // Day
            dt.push(date.getMonth()); // Month
            dt.push(date.getFullYear()); // Year
            dt.push(date.getDay()); // Day Of Week
        }
        catch (err) {
            alert("Exception: {HIJRI.dateToArray} " + err.message);
        }

        return (dt);
    },

    OLD: {
        // http://www.oriold.uzh.ch/static/hegira.html
        // http://www.islamicity.com/PrayerTimes/defaultHijriConv.asp
        intPart: function (floatNum) {
            if (floatNum < -0.0000001) {
                return Math.ceil(floatNum - 0.0000001)
            }

            return Math.floor(floatNum + 0.0000001)
        },

        gregorianTohijri: function (iDay, iMonth, iYear) {
            var date = [];
            var julianday = null;
            var day = null;
            var month = null;
            var year = null;
            var weekday = null;

            try {
                day = parseInt(iDay)
                month = parseInt(iMonth)
                year = parseInt(iYear)

                if ((year > 1582) || ((year == 1582) && (month > 10)) || ((year == 1582) && (month == 10) && (day > 14))) {
                    julianday = HIJRI.OLD.intPart((1461 * (year + 4800 + HIJRI.OLD.intPart((month - 14) / 12))) / 4)
                                + HIJRI.OLD.intPart((367 * (month - 2 - 12 * (HIJRI.OLD.intPart((month - 14) / 12)))) / 12)
                                - HIJRI.OLD.intPart((3 * (HIJRI.OLD.intPart((year + 4900 + HIJRI.OLD.intPart((month - 14) / 12)) / 100))) / 4)
                                + day - 32075;
                }
                else {
                    julianday = 367 * year - HIJRI.OLD.intPart((7 * (year + 5001 + HIJRI.OLD.intPart((month - 9) / 7))) / 4)
                                + HIJRI.OLD.intPart((275 * month) / 9)
                                + day + 1729777;
                }

                weekday = julianday % 7;
                if (weekday >= 0 && weekday <= 5) {
                    weekday++;
                }
                else {
                    weekday = 0;
                }

                l = julianday - 1948440 + 10632;
                n = HIJRI.OLD.intPart((l - 1) / 10631);
                l = l - 10631 * n + 354;
                j = (HIJRI.OLD.intPart((10985 - l) / 5316)) * (HIJRI.OLD.intPart((50 * l) / 17719)) + (HIJRI.OLD.intPart(l / 5670)) * (HIJRI.OLD.intPart((43 * l) / 15238));
                l = l - (HIJRI.OLD.intPart((30 - j) / 15)) * (HIJRI.OLD.intPart((17719 * j) / 50)) - (HIJRI.OLD.intPart(j / 16)) * (HIJRI.OLD.intPart((15238 * j) / 43)) + 29;
                month = HIJRI.OLD.intPart((24 * l) / 709);
                day = l - HIJRI.OLD.intPart((709 * month) / 24);
                year = 30 * n + j - 30;

                date.push(day);
                date.push(month);
                date.push(year);
                date.push(weekday);
            }
            catch (err) {
                err.message = "Exception: {HIJRI.OLD.gregorianTohijri} " + err.message;
                throw err;
            }

            return (date);
        },

        hijriTogregorian: function (iDay, iMonth, iYear) {
            var date = [];
            var julianday = null;
            var day = null;
            var month = null;
            var year = null;
            var weekday = null;

            try {
                day = parseInt(iDay)
                month = parseInt(iMonth)
                year = parseInt(iYear)

                julianday = HIJRI.OLD.intPart((11 * year + 3) / 30) + 354 * year + 30 * month - HIJRI.OLD.intPart((month - 1) / 2) + day + 1948440 - 385;

                weekday = julianday % 7;
                if (weekday >= 0 && weekday <= 5) {
                    weekday++;
                }
                else {
                    weekday = 0;
                }

                if (julianday > 2299160) {
                    l = julianday + 68569;
                    n = HIJRI.OLD.intPart((4 * l) / 146097);
                    l = l - HIJRI.OLD.intPart((146097 * n + 3) / 4);
                    i = HIJRI.OLD.intPart((4000 * (l + 1)) / 1461001);
                    l = l - HIJRI.OLD.intPart((1461 * i) / 4) + 31;
                    j = HIJRI.OLD.intPart((80 * l) / 2447);
                    day = l - HIJRI.OLD.intPart((2447 * j) / 80);
                    l = HIJRI.OLD.intPart(j / 11);
                    month = j + 2 - 12 * l;
                    year = 100 * (n - 49) + i + l;
                }
                else {
                    j = julianday + 1402;
                    k = HIJRI.OLD.intPart((j - 1) / 1461);
                    l = j - 1461 * k;
                    n = HIJRI.OLD.intPart((l - 1) / 365) - HIJRI.OLD.intPart(l / 1461);
                    i = l - 365 * n + 30;
                    j = HIJRI.OLD.intPart((80 * i) / 2447);
                    day = i - HIJRI.OLD.intPart((2447 * j) / 80);
                    i = HIJRI.OLD.intPart(j / 11);
                    month = j + 2 - 12 * i;
                    year = 4 * k + n + i - 4716;
                }

                date.push(day);
                date.push(month);
                date.push(year);
                date.push(weekday);
            }
            catch (err) {
                err.message = "Exception: {HIJRI.OLD.hijriTogregorian} " + err.message;
                throw err;
            }

            return (date);
        },

        getMaxDayOfMonth: function (iMonth, iYear) {
            var iMax = 0;
            var date = [];

            try {
                date = HIJRI.OLD.hijriTogregorian(29, iMonth, iYear);
                date = date = GREGOREAN.nextDate(date[0], date[1], date[2]);
                date = HIJRI.OLD.gregorianTohijri(date[0], date[1], date[2]);
                if (date[0] == 1) {
                    iMax = 29;
                }
                else {
                    iMax = date[0];
                }
            }
            catch (err) {
                err.message = "Exception: {HIJRI.OLD.getMaxDayOfMonth} " + err.message;
                throw err;
            }

            return (iMax);
        }
    }
};

var GREGOREAN = {
    today: function () {
        var now = null;
        var now_utc = null;
        var date = [];

        try {
            now = new Date();
            now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

            date = GREGOREAN.dateToArray(now_utc);
        }
        catch (err) {
            alert("Exception: {GREGOREAN.today} " + err.message);
        }

        return (date);
    },

    dayOfWeek: function (iDay, iMonth, iYear) {
        var iValue = 0;
        var date = null;

        try {
            date = new Date(iYear, iMonth - 1, iDay);
            iValue = date.getDay();
        }
        catch (err) {
            alert("Exception: {GREGOREAN.dayOfWeek} " + err.message);
        }

        return (iValue);
    },

    maxDays: function (iMonth, iYear) {
        var iMax = 0;

        try {
            switch (iMonth) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    iMax = 31;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    iMax = 30;
                    break;
                case 2:
                    if (GREGOREAN.isLeapYear(iYear) == true) {
                        iMax = 29;
                    }
                    else {
                        iMax = 28;
                    }
                    break;
            }
        }
        catch (err) {
            alert("Exception: {GREGOREAN.maxDays} " + err.message);
        }

        return (iMax);
    },

    minYear: function () {
        return (1900);
    },

    maxYear: function () {
        return (2050);
    },

    nextDate: function (iDay, iMonth, iYear) {
        var today = null;
        var date = null;

        try {
            if (iDay < GREGOREAN.maxDays(iMonth, iYear)) {
                iDay++;
            }
            else {
                iDay = 1;
                if (iMonth < 12) {
                    iMonth++;
                }
                else {
                    iMonth = 1;
                    iYear++;
                }
            }
            today = GREGOREAN.getDate(iDay, iMonth, iYear);
            date = GREGOREAN.dateToArray(today);
        }
        catch (err) {
            alert("Exception: {GREGOREAN.nextDate} " + err.message);
        }

        return (date);
    },

    addDays: function (iDay, iMonth, iYear, iNoOfDays) { // Returns date object
        var jsDate = null;
        var thisUTC = null;

        try {
            jsDate = new Date(iYear, iMonth - 1, iDay, 0, 0, 0, 0);

            // https://michiel.wordpress.com/2008/11/24/the-javascript-date-object-and-how-to-add-days-to-a-date-variable/
            thisUTC = jsDate.getTimezoneOffset();
            jsDate.setTime(jsDate.getTime() + iNoOfDays * 86400000);
            if (thisUTC != jsDate.getTimezoneOffset()) {
                jsDate.setTime(jsDate.getTime() + (jsDate.getTimezoneOffset() - thisUTC) * 60000);
            }
        }
        catch (err) {
            alert("Exception: {GREGOREAN.addDays} " + err.message);
        }

        return (jsDate);
    },

    subtractDays: function (iDay, iMonth, iYear, iNoOfDays) {
        var jsDate = null;

        try {
            jsDate = new Date(iYear, iMonth - 1, iDay, 0, 0, 0, 0);
            jsDate.setDate(jsDate.getDate() - iNoOfDays);
        }
        catch (err) {
            alert("Exception: {HIJRI.subtractDays} " + err.message);
        }

        return (jsDate);
    },


    addMonths: function (iDay, iMonth, iYear, iNoOfMonths) { // Returns date object
        var iMaxDays = 0;
        var date = null;

        try {
            jsDate = new Date(iYear, iMonth - 1, iDay, 0, 0, 0, 0);

            jsDate.setDate(1);
            jsDate.setMonth(jsDate.getMonth() + iNoOfMonths);

            iMaxDays = GREGOREAN.maxDays(jsDate.getMonth() + 1, jsDate.getFullYear());

            jsDate.setDate(Math.min(iDay, iMaxDays));
        }
        catch (err) {
            alert("Exception: {GREGOREAN.addMonths} " + err.message);
        }

        return (jsDate);
    },

    isLeapYear: function (iYear) {
        try {
            if (iYear <= 0) {
                return (false);
            }

            if ((iYear % 400) == 0 || ((iYear % 4) == 0 && (iYear % 100) != 0)) {
                return (true);
            }
        }
        catch (err) {
            alert("Exception: {GREGOREAN.isLeapYear} " + err.message);
        }

        return (false);
    },

    getDate: function (iDay, iMonth, iYear) {
        var date = null;

        try {
            date = new Date(iYear, iMonth - 1, iDay);
        }
        catch (err) {
            alert("Exception: {GREGOREAN.getDate} " + err.message);
        }

        return (date);
    },

    dateToArray: function (date) {
        var dt = [];

        try {
            dt.push(date.getDate()); // Day
            dt.push(date.getMonth() + 1); // Month
            dt.push(date.getFullYear()); // Year
            dt.push(date.getDay()); // Day Of Week
        }
        catch (err) {
            alert("Exception: {GREGOREAN.dateToArray} " + err.message);
        }

        return (dt);
    }
};

var DATE = function () { }

DATE.prototype.getMinYear = function (iCalendarType) {
    var iValue = 0;

    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            iValue = HIJRI.minYear();
            break;
        case CALENDARTYPE.get('SHAMSI'):
            iValue = PERSIAN.minYear();
            break;
        default:
            iValue = GREGOREAN.minYear();
            break;
    }

    return (iValue);
};

DATE.prototype.getMaxYear = function (iCalendarType) {
    var iValue = 0;

    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            iValue = HIJRI.maxYear();
            break;
        case CALENDARTYPE.get('SHAMSI'):
            iValue = PERSIAN.maxYear();
            break;
        default:
            iValue = GREGOREAN.maxYear();
            break;
    }

    return (iValue);
};

DATE.prototype.isLeapYear = function (iYear) {
    return (GREGOREAN.isLeapYear(iYear));
};

DATE.prototype.getMonthNames = function (iCalendarType, iLanguageId) {
    var arrData = [];

    iLanguageId = FConvert.toInt(iLanguageId);
    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            arrData = ["مُحَرَّم", "صَفَر", "رَبيع الأوّل", "رَبيع الثاني", "جُمادى الأولى", "جُمادى الثانية", "رَجَب", "شَعْبان", "رَمَضان", "شَوّال", "ذو القَعْدة", "ذو الحِجّة"];
            break;
        case CALENDARTYPE.get('SHAMSI'):
            arrData = ["فروردین", "اردیبهشت", "خرداد", "تیر", "امرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
            break;
        default: // GREGOREAN
            switch (iLanguageId) {
                case LANGUAGE.get("ARABIC"):
                    arrData = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
                    break;
                default:
                    arrData = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    break;
            }
            break;
    }

    return (arrData);
};

DATE.prototype.getWeekDaysName = function (iLanguageId) {
    var arrData = [];

    switch (iLanguageId) {
        case LANGUAGE.get("ARABIC"):
            arrData = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
            //arrData = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعه", "السبت"];
            break;
        case LANGUAGE.get("FARSI"):
            arrData = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "آدینه", "شنبه"];
            break;
        default:
            arrData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            break;
    }

    return (arrData);
};

DATE.prototype.getDayFromFocusDate = function (iFocusDate) {
    var value = 0;

    try {
        value = (iFocusDate & 0xFF);
    }
    catch (err) {
        alert("Exception: {getDayFromFocusDate} " + err.message);
    }

    return (value);
};

DATE.prototype.getMonthFromFocusDate = function (iFocusDate) {
    var value = 0;

    try {
        value = ((iFocusDate >> 8) & 0xFF);
    }
    catch (err) {
        alert("Exception: {getMonthFromFocusDate} " + err.message);
    }

    return (value);
};

DATE.prototype.getYearFromFocusDate = function (iFocusDate) {
    var value = 0;

    try {
        value = (iFocusDate >> 16);
    }
    catch (err) {
        alert("Exception: {getYearFromFocusDate} " + err.message);
    }

    return (value);
};

DATE.prototype.getYearFromFocusDateTime = function (datetime) {
    var value = 0;

    try {
        value = (datetime / Math.pow(2, 33)) & 0xfffe;
    }
    catch (err) {
        alert("Exception: {getYearFromFocusDateTime} " + err.message);
    }

    return (value);
};

DATE.prototype.convertIntoFocusDate = function (iDay, iMonth, iYear) {
    var iFocusDate = 0;

    try {
        iFocusDate = iYear << 16 | iMonth << 8 | iDay;
    }
    catch (err) {
        alert("Exception: {convertIntoFocusDate} " + err.message);
    }

    return (iFocusDate);
};

DATE.prototype.convertIntoFocusDateTime = function (iYear, iMonth, iDay, iHour, iMinute, iSecond) {
    var datetime = 0;
    var d = 0;

    try {
        datetime = (iYear * Math.pow(2, 33)) + (iMonth * Math.pow(2, 25)) + (iDay * Math.pow(2, 17)) + (iHour * Math.pow(2, 12)) + (iMinute * Math.pow(2, 6)) + iSecond;
    }
    catch (err) {
        alert("Exception: {convertIntoFocusDateTime} " + err.message);
    }

    return (datetime);
};

DATE.prototype.addDays = function (iFocusDate, iNoOfDays, iCalendarType) {
    var date = null;
    var iDay = 0;
    var iMonth = 0;
    var iYear = 0;

    iDay = DATE.prototype.getDayFromFocusDate(iFocusDate);
    iMonth = DATE.prototype.getMonthFromFocusDate(iFocusDate);
    iYear = DATE.prototype.getYearFromFocusDate(iFocusDate);

    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            date = HIJRI.addDays(iDay, iMonth, iYear, iNoOfDays);
            date = HIJRI.dateToArray(date);
            //date = HIJRI.OLD.hijriTogregorian(iDay, iMonth, iYear);
            //date = new Date(date[2], date[1] - 1, date[0], 0, 0, 0, 0);
            //date = DATE.prototype.add(date, iNoOfDays);
            //date = HIJRI.OLD.gregorianTohijri(date.getDate(), date.getMonth(), date.getFullYear());
            //iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1] + 1, date[2]);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
        case CALENDARTYPE.get('SHAMSI'):
            date = PERSIAN.addDays(iDay, iMonth, iYear, iNoOfDays);
            date = PERSIAN.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
        default:
            date = GREGOREAN.addDays(iDay, iMonth, iYear, iNoOfDays);
            date = GREGOREAN.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
    }

    return (iFocusDate);
};

DATE.prototype.subtractDays = function (iFocusDate, iNoOfDays, iCalendarType) {
    var date = null;
    var iDay = 0;
    var iMonth = 0;
    var iYear = 0;

    iDay = DATE.prototype.getDayFromFocusDate(iFocusDate);
    iMonth = DATE.prototype.getMonthFromFocusDate(iFocusDate);
    iYear = DATE.prototype.getYearFromFocusDate(iFocusDate);

    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            date = HIJRI.subtractDays(iDay, iMonth, iYear, iNoOfDays);
            date = HIJRI.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
        case CALENDARTYPE.get('SHAMSI'):
            date = PERSIAN.subtractDays(iDay, iMonth, iYear, iNoOfDays);
            date = PERSIAN.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
        default:
            date = GREGOREAN.subtractDays(iDay, iMonth, iYear, iNoOfDays);
            date = GREGOREAN.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
    }

    return (iFocusDate);
};


DATE.prototype.addMonths = function (iFocusDate, iNoOfMonths, iCalendarType) {
    var iDay = 0;
    var iMonth = 0;
    var iYear = 0;
    var date = null;

    iDay = DATE.prototype.getDayFromFocusDate(iFocusDate);
    iMonth = DATE.prototype.getMonthFromFocusDate(iFocusDate);
    iYear = DATE.prototype.getYearFromFocusDate(iFocusDate);

    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            break;
        case CALENDARTYPE.get('SHAMSI'):
            date = PERSIAN.addMonths(iDay, iMonth, iYear, iNoOfMonths);
            date = PERSIAN.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
        default:
            date = GREGOREAN.addMonths(iDay, iMonth, iYear, iNoOfMonths);
            date = GREGOREAN.dateToArray(date);
            iFocusDate = DATE.prototype.convertIntoFocusDate(date[0], date[1], date[2]);
            break;
    }

    return (iFocusDate);
};

DATE.prototype.getDayOfWeek = function (iFocusDate, iCalendarType) {
    var iDay = 0;
    var iMonth = 0;
    var iYear = 0;
    var iValue = 0;

    iDay = DATE.prototype.getDayFromFocusDate(iFocusDate);
    iMonth = DATE.prototype.getMonthFromFocusDate(iFocusDate);
    iYear = DATE.prototype.getYearFromFocusDate(iFocusDate);

    switch (iCalendarType) {
        case CALENDARTYPE.get('HIJRI'):
            iValue = HIJRI.dayOfWeek(iDay, iMonth, iYear);
            break;
        case CALENDARTYPE.get('SHAMSI'):
            iValue = PERSIAN.dayOfWeek(iDay, iMonth, iYear);
            break;
        default:
            iValue = GREGOREAN.dayOfWeek(iDay, iMonth, iYear);
            break;
    }

    return (iValue);
};

DATE.prototype.maxDays = function (iFocusDate, iCalendarType) {
    var iMax = 0;
    var iMonth = 0;
    var iYear = 0;

    try {
        iMonth = DATE.prototype.getMonthFromFocusDate(iFocusDate);
        iYear = DATE.prototype.getYearFromFocusDate(iFocusDate);

        iCalendarType = FConvert.toInt(iCalendarType);
        switch (iCalendarType) {
            case CALENDARTYPE.get('HIJRI'):
                //iMax = HIJRI.OLD.getMaxDayOfMonth(iMonth, iYear);
                iMax = HIJRI.maxDays(iMonth, iYear);
                break;
            case CALENDARTYPE.get('SHAMSI'):
                iMax = PERSIAN.maxDays(iMonth, iYear);
                break;
            default:
                iMax = GREGOREAN.maxDays(iMonth, iYear);
                break;
        }
    }
    catch (err) {
        alert("Exception: {DATE.prototype.maxDays} " + err.message);
    }

    return (iMax);
};

DATE.prototype.getDateDiffInDays = function (iFocusDate1, iFocusDate2) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var utc1 = null;
    var utc2 = null;

    try {
        // Discard the time and time-zone information.
        utc1 = Date.UTC(DATE.prototype.getYearFromFocusDate(iFocusDate1),
                        DATE.prototype.getMonthFromFocusDate(iFocusDate1) - 1,
                        DATE.prototype.getDayFromFocusDate(iFocusDate1));

        utc2 = Date.UTC(DATE.prototype.getYearFromFocusDate(iFocusDate2),
                        DATE.prototype.getMonthFromFocusDate(iFocusDate2) - 1,
                        DATE.prototype.getDayFromFocusDate(iFocusDate2));

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    catch (err) {
        err.message = "Exception: {getDateDiffInDays} " + err.message;
        throw err;
    }
};

// Returns focus date
DATE.prototype.today = function (iCalendarType) {
    var iDate = 0;
    var today = null;

    try {
        today = FOCUSDATETIME.getTodayDate(iCalendarType);
        iDate = DATE.prototype.convertIntoFocusDate(today[0], today[1], today[2]);
    }
    catch (err) {
        alert("Exception: {DATE.prototype.today} " + err.message);
    }

    return (iDate);
};

var FOCUSDATETIME = new function () {
    this.getTodayDate = function (iCalendarType) {
        var date = [];
        var today = null;

        try {
            switch (iCalendarType) {
                case CALENDARTYPE.get('HIJRI'):
                    date = HIJRI.today();
                    //today = new Date();
                    //date = HIJRI.OLD.gregorianTohijri(today.getDate(), today.getMonth() + 1, today.getFullYear());
                    break;
                case CALENDARTYPE.get('SHAMSI'):
                    date = PERSIAN.today();
                    break;
                default:
                    date = GREGOREAN.today();
                    break;
            }
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME.getTodayDate} " + err.message;
            throw err;
        }

        return (date);
    },

    this.getDate = function (iCalendarType, iYear, iMonth, iDay) {
        var date = [];
        var today = null;

        try {
            switch (iCalendarType) {
                case CALENDARTYPE.get('HIJRI'):
                    today = HIJRI.getDate(iDay, iMonth, iYear);
                    date = HIJRI.dateToArray(today);

                    //date = HIJRI.OLD.hijriTogregorian(iDay, iMonth, iYear);
                    //today = new Date(date[2], date[1], date[0]);
                    //date = HIJRI.OLD.gregorianTohijri(today.getDate(), today.getMonth(), today.getFullYear());
                    break;
                case CALENDARTYPE.get('SHAMSI'):
                    today = PERSIAN.getDate(iDay, iMonth, iYear);
                    date = PERSIAN.dateToArray(today);
                    break;
                default:
                    today = GREGOREAN.getDate(iDay, iMonth, iYear);
                    date = GREGOREAN.dateToArray(today);
                    break;
            }
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME.getDate} " + err.message;
            throw err;
        }

        return (date);
    },

    this.getNextDate = function (iCalendarType, iYear, iMonth, iDay) {
        var date = [];
        var today = null;

        try {
            switch (iCalendarType) {
                case CALENDARTYPE.get('HIJRI'):
                    date = HIJRI.nextDate(iDay, iMonth, iYear);

                    //if (iDay < this.getMaxDayOfMonth(iMonth, iYear, iCalendarType)) {
                    //    iDay++;
                    //}
                    //else {
                    //    iDay = 1;
                    //    if (iMonth < 12) {
                    //        iMonth++;
                    //    }
                    //    else {
                    //        iMonth = 1;
                    //        iYear++;
                    //    }
                    //}

                    //date = HIJRI.OLD.hijriTogregorian(iDay, iMonth, iYear);
                    //date = HIJRI.OLD.gregorianTohijri(date[0], date[1], date[2]);
                    break;
                case CALENDARTYPE.get('SHAMSI'):
                    date = PERSIAN.nextDate(iDay, iMonth, iYear);
                    break;
                default:
                    date = GREGOREAN.nextDate(iDay, iMonth, iYear);
                    break;
            }
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME::getNextDate} " + err.message;
            throw err;
        }

        return (date);
    },

    this.getDayofWeekofFirstDay = function (iCurrentDay, iDayOfWeek) {
        try {
            while (iCurrentDay > 7) {
                iCurrentDay -= 7;
            }

            while (iCurrentDay > 1) {
                iCurrentDay--;
                if (iDayOfWeek > 0) {
                    iDayOfWeek--;
                }
                else {
                    iDayOfWeek = 6;
                }
            }
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME::getDayofWeekofFirstDay} " + err.message;
            throw err;
        }

        return (iDayOfWeek);
    },

    this.getMaxDayOfMonth = function (iMonth, iYear, iCalenderType) {
        var iMax = 0;
        var iCalType = 0;

        try {
            if (FCommon.UI.isValidObject(iCalenderType) == false) {
                iCalType = CALENDARTYPE.get('GREGOREAN');
            }
            else {
                iCalType = iCalenderType;
            }

            switch (iCalType) {
                case CALENDARTYPE.get('HIJRI'):
                    iMax = HIJRI.maxDays(iMonth, iYear);
                    //iMax = HIJRI.OLD.getMaxDayOfMonth(iMonth, iYear);
                    break;
                case CALENDARTYPE.get('SHAMSI'):
                    iMax = PERSIAN.maxDays(iMonth, iYear);
                    break;
                default:
                    iMax = GREGOREAN.maxDays(iMonth, iYear);
                    break;
            }
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME::getMaxDayOfMonth} " + err.message;
            throw err;
        }

        return (iMax);
    },

    this.formatDate = function (dt, format, iCalendarType, iLanguageId) { // http://www.codeproject.com/Articles/11011/JavaScript-Date-Format
        var arrMonthName = null;
        var arrDayName = null;
        var value = null;

        try {
            if (FCommon.UI.isValidObject(iCalendarType) == true) {
                arrMonthName = DATE.prototype.getMonthNames(iCalendarType, iLanguageId);
                arrDayName = DATE.prototype.getWeekDaysName(iLanguageId);
            }
            else {
                arrMonthName = DATE.prototype.getMonthNames(CALENDARTYPE.get('GREGOREAN'), iLanguageId);
                arrDayName = DATE.prototype.getWeekDaysName(iLanguageId);
            }

            value = format.replace(/(yyyy|mmmm|mmm|mm|m|dddd|ddd|dd|d|hh|nn|ss|a\/p)/gi,
                function ($1) {
                    switch ($1.toLowerCase()) {
                        case 'yyyy':
                            return dt.getFullYear();
                        case 'mmmm':
                            return arrMonthName[dt.getMonth()];
                        case 'mmm':
                            return arrMonthName[dt.getMonth()].substr(0, 3);
                        case 'mm':
                            return COMMON.prototype.zeroPadLeft(dt.getMonth() + 1, 2);
                        case 'm':
                            return dt.getMonth() + 1;
                        case 'dddd':
                            return arrDayName[d.getDay()];
                        case 'ddd':
                            return arrDayName[d.getDay()].substr(0, 3);
                        case 'dd':
                            return COMMON.prototype.zeroPadLeft(dt.getDate(), 2);
                        case 'd':
                            return dt.getDate();
                            //case 'hh': return ((h = d.getHours() % 12) ? h : 12).zf(2);
                            //case 'nn': return d.getMinutes().zf(2);
                            //case 'ss': return d.getSeconds().zf(2);
                            //case 'a/p': return d.getHours() < 12 ? 'a' : 'p';
                    }
                }
            );
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME.formatDate} " + err.message;
            throw err;
        }

        return (value);
    },

    this.isValidDatePart = function (iCalendarType, iDay, iMonth, iYear, bShowError) {
        var iMinYear = 0;
        var iMaxYear = 0;
        var bResult = false;

        try {
            if (isNaN(iMonth) == true || iMonth < 1 || iMonth > 12) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert('Invalid month.');
                }

                return (false);
            }
            iMinYear = DATE.prototype.getMinYear(iCalendarType);
            iMaxYear = DATE.prototype.getMaxYear(iCalendarType);

            if (isNaN(iYear) == true || iYear < iMinYear || iYear > iMaxYear) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert('Invalid year.');
                }

                return (false);
            }

            if (isNaN(iDay) == true || iDay < 0 || iDay > FOCUSDATETIME.getMaxDayOfMonth(iMonth, iYear, iCalendarType)) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert('Invalid day.');
                }

                return (false);
            }

            bResult = true;
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME.isValidDatePart} " + err.message;
            throw err;
        }

        return (bResult);
    },

    this.convertIntoTime = function (iHour, iMinute, iSecond) {
        var iValue = 0;

        try {
            iValue = iHour << 16 | iMinute << 8 | iSecond;
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME.convertIntoTime} " + err.message;
            throw err;
        }

        return (iValue);
    },

    this.getTimeParts = function (iTime) {
        var iValue = 0;
        var data = [];

        try {
            data.push((iTime & 0xFF0000) >> 16); // Hour
            data.push((iTime & 0xFF00) >> 8); // Minute
            data.push((iTime & 0xFF)); // Second
        }
        catch (err) {
            err.message = "Exception: {FOCUSDATETIME::getTimeParts} " + err.message;
            throw err;
        }

        return (data);
    },

    this.getCurrentTime = function () {
        var d = new Date();
        var value = 0;

        value = this.convertIntoTime(d.getHours(), d.getMinutes(), d.getSeconds());

        return (value);
    },

    this.dummy = function () { };
}();

