import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 네이버 API 키 (환경 변수 또는 실행 시 전달받음)
const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET 환경변수가 필요합니다.");
  process.exit(1);
}

const booksDataPath = path.join(__dirname, '../docs/books/booksData.ts');
const publicBooksDir = path.join(__dirname, '../docs/public/books');

// 디렉토리 생성
if (!fs.existsSync(publicBooksDir)) {
  fs.mkdirSync(publicBooksDir, { recursive: true });
}

// booksData.ts 파싱 로직 (간단한 정규식 기반)
let booksDataContent = fs.readFileSync(booksDataPath, 'utf8');

// 책 제목 추출 및 API 요청
async function fetchAndDownloadCovers() {
  const titleRegex = /id:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;
  let match;
  const books = [];

  while ((match = titleRegex.exec(booksDataContent)) !== null) {
    books.push({ id: match[1], title: match[2] });
  }

  console.log(`총 ${books.length}권의 책 표지를 다운로드합니다...`);

  for (const book of books) {
    console.log(`[검색 중] ${book.title}...`);
    
    try {
      const imageUrl = await searchNaverBookAPI(book.title);
      if (imageUrl) {
        const imagePath = path.join(publicBooksDir, `${book.id}.jpg`);
        await downloadImage(imageUrl, imagePath);
        console.log(`✅ 다운로드 완료: ${book.id}.jpg`);
        
        // booksData.ts 내용 업데이트 (coverUrl 교체)
        const replaceRegex = new RegExp(`(id:\\s*"${book.id}"[\\s\\S]*?coverUrl:\\s*")[^"]+(")`, 'g');
        booksDataContent = booksDataContent.replace(replaceRegex, `$1/books/${book.id}.jpg$2`);
      } else {
        console.log(`⚠️ 표지를 찾을 수 없습니다: ${book.title}`);
      }
    } catch (e) {
      console.error(`❌ 오류 발생 (${book.title}):`, e.message);
    }
    
    // API rate limit을 피하기 위해 약간의 대기
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // 최종 변경된 파일 저장
  fs.writeFileSync(booksDataPath, booksDataContent, 'utf8');
  console.log("🎉 모든 표지 다운로드 및 booksData.ts 업데이트가 완료되었습니다!");
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
            resolve(json.items[0].image); // 네이버 책 검색 API의 이미지 URL 필드
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

fetchAndDownloadCovers();
