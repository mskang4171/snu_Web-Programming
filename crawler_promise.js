// Promise를 사용한 crawler

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

/*
데이터를 가져와서
cheerio로 분석해서
타이틀만 뽑아온다.
'.notice.title' => selector key
*/

const getNotices = () => {
  const url = "https://cba.snu.ac.kr/notice";
  return fetch(url)
    .then((res) => res.buffer())
    .then((buf) => {
      const strContents = Buffer.from(buf);
      const body = iconv.decode(strContents, "euc-kr").toString();
      // 한글로 된 웹사이트 중 일부는 utf-8이 아닌 euc-kr로 encoding되어있어 변환하는 과정이 필욯하다.
      const titleTexts = [];

      const $ = cheerio.load(body);
      const titleBoxes = $(".notice.title"); // .notice.title class를 가진 부분만 뽑아온다.
      for (let i = 0; i < titleBoxes.length; i++) {
        const titleText = $(titleBoxes[i]).text();
        titleTexts.push(titleText);
      }
      return titleTexts;
    });
};

getNotices().then((res) => console.log(res));
