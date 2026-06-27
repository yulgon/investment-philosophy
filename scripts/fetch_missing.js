import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

const targets = [
  { id: 'bogle-stay-the-course', query: '스테이 더 코스 존 보글' },
  { id: 'same-as-ever', query: '불변의 법칙 모건 하우절' },
  { id: 'chip-war', query: '칩워 크리스 밀러' },
  { id: 'investment-detox', query: '투자 디톡스 문홍철' },
  { id: 'zero-to-one', query: '제로 투 원 피터 틸' }
];

const publicBooksDir = path.join(__dirname, '../docs/public/books');
const booksDataPath = path.join(__dirname, '../docs/books/booksData.ts');
let booksDataContent = fs.readFileSync(booksDataPath, 'utf8');

async function run() {
  for (const target of targets) {
    console.log(`[검색 중] ${target.query}...`);
    try {
      const imageUrl = await searchNaverBookAPI(target.query);
      if (imageUrl) {
        const imagePath = path.join(publicBooksDir, `${target.id}.jpg`);
        await downloadImage(imageUrl, imagePath);
        console.log(`✅ 다운로드 완료: ${target.id}.jpg`);
        
        // booksData.ts 내용 업데이트 (coverUrl 교체)
        const replaceRegex = new RegExp(`(id:\\s*"${target.id}"[\\s\\S]*?coverUrl:\\s*")[^"]+(")`, 'g');
        booksDataContent = booksDataContent.replace(replaceRegex, `$1/books/${target.id}.jpg$2`);
      } else {
        console.log(`⚠️ 표지를 찾을 수 없습니다: ${target.query}`);
      }
    } catch (e) {
      console.error(`❌ 오류 발생 (${target.query}):`, e.message);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  fs.writeFileSync(booksDataPath, booksDataContent, 'utf8');
  console.log("🎉 재검색 완료!");
}

function searchNaverBookAPI(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'openapi.naver.com',
      path: `/v1/search/book.json?query=${encodeURIComponent(query)}&display=1`,
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.items && json.items.length > 0) {
            resolve(json.items[0].image);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download image. Status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

run();
