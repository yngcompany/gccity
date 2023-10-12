/*!
 * based YHDCalendar v1.0
 * Docs & License: http://www.yhdatabase.com/
 * (c) 2016 Sonys & Leejr
 * @see /common/yhdcalendar-1.0/*
 */

/*
 * <날짜 포맷>
 * ex)
 * console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
 * console.log(new Date().format("yyyy-MM-dd"));
 * console.log("현재년도 : " + new Date().format("yyyy"));
 * --------------------------------------------------
 * 2016년 08월 10일 am 12시 20분 30초
 * 2016-08-10
 * 현재년도 : 2016
 */
Date.prototype.format = function(f) {
  if (!this.valueOf()) return " ";

  var weekName = ["일", "월", "화", "수", "목", "금", "토"];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear();
          case "yy": return (d.getFullYear() % 1000).zf(2);
          case "MM": return (d.getMonth() + 1).zf(2);
          case "dd": return d.getDate().zf(2);
          case "E": return weekName[d.getDay()];
          case "HH": return d.getHours().zf(2);
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
          case "mm": return d.getMinutes().zf(2);
          case "ss": return d.getSeconds().zf(2);
          case "a/p": return d.getHours() < 12 ? "오전" : "오후";
          default: return $1;
      }
  });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/*
 * <달의 마지막 일자 구하기>
 * ex)
 * console.log(new Date("2016-08-08").getLastDate());
 * ----------------------------------------------------
 * 31
 */
Date.prototype.getLastDate=function(){return new Date(this.getFullYear(),this.getMonth()+1,0).getDate();};


/* 국가지정 공휴일 */
eventDay = new Array();
eventDay["01-01"] = "";
eventDay["03-01"] = "";
eventDay["05-05"] = "";
eventDay["06-06"] = "";
eventDay["08-15"] = "";
eventDay["10-03"] = "";
eventDay["10-09"] = "";
eventDay["12-25"] = "";


/* 공휴일 */
eventChangeDay = new Array();
eventChangeDay["2015-02-18"] = "";
eventChangeDay["2015-02-19"] = "";
eventChangeDay["2015-02-20"] = "";
eventChangeDay["2015-05-25"] = "";
eventChangeDay["2015-08-14"] = "";
eventChangeDay["2015-09-26"] = "";
eventChangeDay["2015-09-27"] = "";
eventChangeDay["2015-09-28"] = "";
eventChangeDay["2015-09-29"] = "";

eventChangeDay["2016-02-07"] = "";
eventChangeDay["2016-02-08"] = "";
eventChangeDay["2016-02-09"] = "";
eventChangeDay["2016-02-10"] = "";
eventChangeDay["2016-05-14"] = "";
eventChangeDay["2016-09-14"] = "";
eventChangeDay["2016-09-15"] = "";
eventChangeDay["2016-09-16"] = "";

eventChangeDay["2017-01-27"] = "";
eventChangeDay["2017-01-28"] = "";
eventChangeDay["2017-01-29"] = "";
eventChangeDay["2017-01-30"] = "";
eventChangeDay["2017-05-03"] = "";
eventChangeDay["2017-10-03"] = "";
eventChangeDay["2017-10-04"] = "";
eventChangeDay["2017-10-05"] = "";

eventChangeDay["2018-01-15"] = "";
eventChangeDay["2018-01-16"] = "";
eventChangeDay["2018-01-17"] = "";
eventChangeDay["2018-05-22"] = "";
eventChangeDay["2018-09-23"] = "";
eventChangeDay["2018-09-24"] = "";
eventChangeDay["2018-09-25"] = "";

eventChangeDay["2019-02-04"] = "";
eventChangeDay["2019-02-05"] = "";
eventChangeDay["2019-02-06"] = "";
eventChangeDay["2019-05-12"] = "";
eventChangeDay["2019-09-12"] = "";
eventChangeDay["2019-09-13"] = "";
eventChangeDay["2019-09-14"] = "";

eventChangeDay["2019-02-04"] = "";
eventChangeDay["2019-02-05"] = "";
eventChangeDay["2019-02-06"] = "";
eventChangeDay["2019-05-12"] = "";
eventChangeDay["2019-09-12"] = "";
eventChangeDay["2019-09-13"] = "";
eventChangeDay["2019-09-14"] = "";

eventChangeDay["2020-01-24"] = "";
eventChangeDay["2020-01-25"] = "";
eventChangeDay["2020-01-26"] = "";
eventChangeDay["2020-01-27"] = "";
eventChangeDay["2020-04-30"] = "";
eventChangeDay["2020-09-30"] = "";
eventChangeDay["2020-10-01"] = "";
eventChangeDay["2020-10-02"] = "";

eventChangeDay["2021-02-11"] = "";
eventChangeDay["2021-02-12"] = "";
eventChangeDay["2021-02-13"] = "";
eventChangeDay["2021-02-15"] = "";
eventChangeDay["2021-05-19"] = "";
eventChangeDay["2021-09-20"] = "";
eventChangeDay["2021-09-21"] = "";
eventChangeDay["2021-09-22"] = "";


eventChangeDay["2022-01-31"] = "";
eventChangeDay["2022-02-01"] = "";
eventChangeDay["2022-02-02"] = "";
eventChangeDay["2022-05-08"] = "";
eventChangeDay["2022-09-09"] = "";
eventChangeDay["2022-09-10"] = "";
eventChangeDay["2022-09-11"] = "";


eventChangeDay["2023-01-21"] = "";
eventChangeDay["2023-01-22"] = "";
eventChangeDay["2023-01-23"] = "";
eventChangeDay["2023-05-27"] = "";
eventChangeDay["2023-09-28"] = "";
eventChangeDay["2023-09-29"] = "";
eventChangeDay["2023-09-30"] = "";


eventChangeDay["2024-02-9"] = "";
eventChangeDay["2024-02-10"] = "";
eventChangeDay["2024-02-11"] = "";
eventChangeDay["2024-05-15"] = "";
eventChangeDay["2024-09-16"] = "";
eventChangeDay["2024-09-17"] = "";
eventChangeDay["2024-09-18"] = "";


eventChangeDay["2025-01-28"] = "";
eventChangeDay["2025-01-29"] = "";
eventChangeDay["2025-01-30"] = "";
eventChangeDay["2025-05-05"] = "";
eventChangeDay["2025-10-05"] = "";
eventChangeDay["2025-10-06"] = "";
eventChangeDay["2025-10-07"] = "";


eventChangeDay["2026-02-16"] = "";
eventChangeDay["2026-02-17"] = "";
eventChangeDay["2026-02-18"] = "";
eventChangeDay["2026-05-24"] = "";
eventChangeDay["2026-09-24"] = "";
eventChangeDay["2026-09-25"] = "";
eventChangeDay["2026-09-26"] = "";


eventChangeDay["2027-02-06"] = "";
eventChangeDay["2027-02-07"] = "";
eventChangeDay["2027-02-8"] = "";
eventChangeDay["2027-05-13"] = "";
eventChangeDay["2027-09-14"] = "";
eventChangeDay["2027-09-15"] = "";
eventChangeDay["2027-09-16"] = "";


eventChangeDay["2028-01-26"] = "";
eventChangeDay["2028-01-27"] = "";
eventChangeDay["2028-01-28"] = "";
eventChangeDay["2068-05-02"] = "";
eventChangeDay["2028-10-02"] = "";
eventChangeDay["2028-10-03"] = "";
eventChangeDay["2028-10-04"] = "";


eventChangeDay["2029-02-12"] = "";
eventChangeDay["2029-02-13"] = "";
eventChangeDay["2029-02-14"] = "";
eventChangeDay["2029-05-20"] = "";
eventChangeDay["2029-09-21"] = "";
eventChangeDay["2029-09-22"] = "";
eventChangeDay["2029-09-23"] = "";


eventChangeDay["2030-02-02"] = "";
eventChangeDay["2030-02-03"] = "";
eventChangeDay["2030-02-04"] = "";
eventChangeDay["2030-05-09"] = "";
eventChangeDay["2030-09-11"] = "";
eventChangeDay["2030-09-12"] = "";
eventChangeDay["2030-09-13"] = "";


eventChangeDay["2031-01-22"] = "";
eventChangeDay["2031-01-23"] = "";
eventChangeDay["2031-01-24"] = "";
eventChangeDay["2031-05-28"] = "";
eventChangeDay["2031-09-30"] = "";
eventChangeDay["2031-10-01"] = "";
eventChangeDay["2031-10-02"] = "";


eventChangeDay["2032-02-10"] = "";
eventChangeDay["2032-02-11"] = "";
eventChangeDay["2032-02-12"] = "";
eventChangeDay["2032-05-16"] = "";
eventChangeDay["2032-09-18"] = "";
eventChangeDay["2032-09-19"] = "";
eventChangeDay["2032-09-20"] = "";


eventChangeDay["2033-01-30"] = "";
eventChangeDay["2033-01-31"] = "";
eventChangeDay["2033-02-01"] = "";
eventChangeDay["2033-05-06"] = "";
eventChangeDay["2033-09-07"] = "";
eventChangeDay["2033-09-08"] = "";
eventChangeDay["2033-09-09"] = "";


eventChangeDay["2034-02-18"] = "";
eventChangeDay["2034-02-19"] = "";
eventChangeDay["2034-02-20"] = "";
eventChangeDay["2034-05-25"] = "";
eventChangeDay["2034-09-26"] = "";
eventChangeDay["2034-09-27"] = "";
eventChangeDay["2034-09-28"] = "";


eventChangeDay["2035-02-07"] = "";
eventChangeDay["2035-02-08"] = "";
eventChangeDay["2035-02-09"] = "";
eventChangeDay["2035-05-15"] = "";
eventChangeDay["2035-09-15"] = "";
eventChangeDay["2035-09-16"] = "";
eventChangeDay["2035-09-17"] = "";


eventChangeDay["2036-01-27"] = "";
eventChangeDay["2036-01-28"] = "";
eventChangeDay["2036-01-29"] = "";
eventChangeDay["2036-05-03"] = "";
eventChangeDay["2036-10-03"] = "";
eventChangeDay["2036-10-04"] = "";
eventChangeDay["2036-10-05"] = "";


eventChangeDay["2037-02-14"] = "";
eventChangeDay["2037-02-15"] = "";
eventChangeDay["2037-02-16"] = "";
eventChangeDay["2037-05-22"] = "";
eventChangeDay["2037-09-23"] = "";
eventChangeDay["2037-09-24"] = "";
eventChangeDay["2037-09-25"] = "";


eventChangeDay["2038-02-03"] = "";
eventChangeDay["2038-02-04"] = "";
eventChangeDay["2038-02-05"] = "";
eventChangeDay["2038-05-11"] = "";
eventChangeDay["2038-09-12"] = "";
eventChangeDay["2038-09-13"] = "";
eventChangeDay["2038-09-14"] = "";


eventChangeDay["2039-01-23"] = "";
eventChangeDay["2039-01-24"] = "";
eventChangeDay["2039-01-25"] = "";
eventChangeDay["2039-04-30"] = "";
eventChangeDay["2039-10-01"] = "";
eventChangeDay["2039-10-02"] = "";
eventChangeDay["2039-10-03"] = "";


eventChangeDay["2040-02-11"] = "";
eventChangeDay["2040-02-12"] = "";
eventChangeDay["2040-02-13"] = "";
eventChangeDay["2040-05-18"] = "";
eventChangeDay["2040-09-20"] = "";
eventChangeDay["2040-09-21"] = "";
eventChangeDay["2040-09-22"] = "";


eventChangeDay["2041-02-01"] = "";
eventChangeDay["2041-02-02"] = "";
eventChangeDay["2041-02-03"] = "";
eventChangeDay["2041-05-07"] = "";
eventChangeDay["2041-09-09"] = "";
eventChangeDay["2041-09-10"] = "";
eventChangeDay["2041-09-11"] = "";


eventChangeDay["2042-01-21"] = "";
eventChangeDay["2042-01-22"] = "";
eventChangeDay["2042-01-23"] = "";
eventChangeDay["2042-05-26"] = "";
eventChangeDay["2042-09-27"] = "";
eventChangeDay["2042-09-28"] = "";
eventChangeDay["2042-09-29"] = "";


eventChangeDay["2043-02-09"] = "";
eventChangeDay["2043-02-10"] = "";
eventChangeDay["2043-02-11"] = "";
eventChangeDay["2043-05-16"] = "";
eventChangeDay["2043-09-16"] = "";
eventChangeDay["2043-09-17"] = "";
eventChangeDay["2043-09-18"] = "";


eventChangeDay["2044-01-29"] = "";
eventChangeDay["2044-01-30"] = "";
eventChangeDay["2044-01-31"] = "";
eventChangeDay["2044-05-05"] = "";
eventChangeDay["2044-10-04"] = "";
eventChangeDay["2044-10-05"] = "";
eventChangeDay["2044-10-06"] = "";


eventChangeDay["2045-02-16"] = "";
eventChangeDay["2045-02-17"] = "";
eventChangeDay["2045-02-18"] = "";
eventChangeDay["2045-05-24"] = "";
eventChangeDay["2045-09-24"] = "";
eventChangeDay["2045-09-25"] = "";
eventChangeDay["2045-09-26"] = "";


eventChangeDay["2046-02-05"] = "";
eventChangeDay["2046-02-06"] = "";
eventChangeDay["2046-02-07"] = "";
eventChangeDay["2046-05-13"] = "";
eventChangeDay["2046-09-14"] = "";
eventChangeDay["2046-09-15"] = "";
eventChangeDay["2046-09-16"] = "";


eventChangeDay["2047-01-25"] = "";
eventChangeDay["2047-01-26"] = "";
eventChangeDay["2047-05-02"] = "";
eventChangeDay["2047-10-03"] = "";
eventChangeDay["2047-10-04"] = "";
eventChangeDay["2047-10-05"] = "";


eventChangeDay["2048-02-13"] = "";
eventChangeDay["2048-02-14"] = "";
eventChangeDay["2048-02-15"] = "";
eventChangeDay["2048-05-20"] = "";
eventChangeDay["2048-09-21"] = "";
eventChangeDay["2048-09-22"] = "";
eventChangeDay["2048-09-23"] = "";


eventChangeDay["2049-02-01"] = "";
eventChangeDay["2049-02-02"] = "";
eventChangeDay["2049-02-03"] = "";
eventChangeDay["2049-05-09"] = "";
eventChangeDay["2049-09-10"] = "";
eventChangeDay["2049-09-11"] = "";
eventChangeDay["2049-09-12"] = "";


eventChangeDay["2050-01-22"] = "";
eventChangeDay["2050-01-23"] = "";
eventChangeDay["2050-01-24"] = "";
eventChangeDay["2050-05-28"] = "";
eventChangeDay["2050-09-29"] = "";
eventChangeDay["2050-09-30"] = "";
eventChangeDay["2050-10-01"] = "";


eventChangeDay["2051-02-10"] = "";
eventChangeDay["2051-02-11"] = "";
eventChangeDay["2051-02-12"] = "";
eventChangeDay["2051-05-17"] = "";
eventChangeDay["2051-09-18"] = "";
eventChangeDay["2051-09-19"] = "";
eventChangeDay["2051-09-20"] = "";


eventChangeDay["2052-01-31"] = "";
eventChangeDay["2052-02-01"] = "";
eventChangeDay["2052-02-02"] = "";
eventChangeDay["2052-05-06"] = "";
eventChangeDay["2052-09-06"] = "";
eventChangeDay["2052-09-07"] = "";
eventChangeDay["2052-09-08"] = "";


eventChangeDay["2053-02-18"] = "";
eventChangeDay["2053-02-19"] = "";
eventChangeDay["2053-02-20"] = "";
eventChangeDay["2053-05-25"] = "";
eventChangeDay["2053-09-25"] = "";
eventChangeDay["2053-09-26"] = "";
eventChangeDay["2053-09-27"] = "";


eventChangeDay["2054-02-07"] = "";
eventChangeDay["2054-02-08"] = "";
eventChangeDay["2054-02-09"] = "";
eventChangeDay["2054-05-15"] = "";
eventChangeDay["2054-09-15"] = "";
eventChangeDay["2054-09-16"] = "";
eventChangeDay["2054-09-17"] = "";

