export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  badge?: string;
  coverUrl: string;
  myComment?: string;
}

export const books: Book[] = [
  // 1. 인덱스 투자 & 자산 배분
  {
    id: "bogle-common-sense",
    title: "모든 주식을 소유하라",
    author: "존 보글 (John C. Bogle)",
    category: "인덱스 투자 & 자산 배분",
    tags: ["인덱스 투자"],
    description: "보글헤드의 바이블. 개별 종목 분석 대신 전체 시장 지수를 저비용 인덱스 펀드로 사서 장기 보유하라는 단순하고 확실한 진리.",
    badge: "👑 인생 도서 (My Favorite)",
    coverUrl: "/books/bogle-common-sense.jpg",
    myComment: "이 책을 다 읽고 너무 큰 감명을 받아서, 바로 다음 날부터 VTI(미국 전체 시장 ETF)를 적립식으로 구매하기 시작했습니다. 인덱스 펀드 투자의 영원한 필독서입니다."
  },
  {
    id: "bogle-stay-the-course",
    title: "Stay the Course",
    author: "존 보글 (John C. Bogle)",
    category: "인덱스 투자 & 자산 배분",
    tags: ["자서전 / 역사"],
    description: "인덱스 펀드의 개척 과정과 투자자를 위해 평생을 바친 보글의 집념 및 뮤추얼 펀드 업계의 혁신 역사를 담은 대작.",
    badge: "👑 인생 도서 (My Favorite)",
    coverUrl: "/books/bogle-stay-the-course.jpg",
    myComment: "존 보글의 투자 철학이 녹아 있는 최고의 서적. 투자 관련 서적이 아니라 그의 일생을 엿볼 수 있고, 돈을 잃는 투자자들에게 뮤추얼 인덱스 펀드라는 선물을 안겨준 일대기입니다."
  },
  {
    id: "magic-pension",
    title: "마법의 연금 굴리기",
    author: "김성일",
    category: "인덱스 투자 & 자산 배분",
    tags: ["한국형 자산배분"],
    description: "한국의 절세 계좌(연금저축, IRP) 시스템 안에서 글로벌 자산 배분 모델을 기계적으로 실천하도록 돕는 실용적인 가이드라인.",
    coverUrl: "/books/magic-pension.jpg",
    myComment: "연금 정책이 바뀔 때마다 꾸준히 개정판을 출시하여 믿음이 가는 책입니다. 한국판 올웨더 포트폴리오를 구성하는 데 필수적인 가이드입니다."
  },
  {
    id: "just-keep-buying",
    title: "저스트 킵 바잉",
    author: "닉 매기울리 (Nick Maggiulli)",
    category: "인덱스 투자 & 자산 배분",
    tags: ["적립식 투자"],
    description: "저축과 투자율의 관계를 방대한 데이터로 분석하여 '시장 하락기든 상승기든 상관없이 자산을 계속 사 모으는 것'의 힘을 증명합니다.",
    badge: "⭐ 추천 도서 (My Recommendation)",
    coverUrl: "/books/just-keep-buying.jpg",
    myComment: "'리밸런싱을 어떻게 팔지 않고 할 수 있지?'라는 깊은 고민에 대한 명쾌한 해답을 준 책입니다. 너무 재미있어서 하루 만에 다 읽었을 정도로 강력하게 추천합니다!"
  },
  {
    id: "future-of-investing",
    title: "투자의 미래",
    author: "제레미 시겔 (Jeremy Siegel)",
    category: "인덱스 투자 & 자산 배분",
    tags: ["장기 투자"],
    description: "성장률이 높은 업종보다 적정 밸류에이션에서 매수하여 지속적으로 배당을 재투자하는 것이 역사적으로 최상의 결과를 냈음을 입증합니다.",
    coverUrl: "/books/future-of-investing.jpg",
    myComment: "기업의 '성장'이 내 계좌의 '수익'을 의미하는 것은 아님을 깨닫게 해준 책입니다. 오히려 고평가로 비싸게 살 확률이 높아 수익률이 낮아질 수 있다는 통찰 덕분에 2022년 하락장에 큰 도움이 되었습니다. 제 포트폴리오에 SCHD(미국 배당성장 ETF)를 꾸준히 담게 만든 핵심적인 논리적 근거가 되었습니다."
  },
  {
    id: "fortunes-formula",
    title: "얼마나 투자할 것인가",
    author: "윌리엄 파운드스톤",
    category: "인덱스 투자 & 자산 배분",
    tags: ["자금 관리"],
    description: "정보이론의 창시자 에드워드 소프와 켈리 공식을 조명하며 기댓값에 따른 최적의 베팅 규모 조절을 통해 자산을 불리는 비법을 다룹니다.",
    coverUrl: "/books/fortunes-formula.jpg"
  },
  {
    id: "giants-portfolio",
    title: "거인의 포트폴리오",
    author: "강환국",
    category: "인덱스 투자 & 자산 배분",
    tags: ["퀀트 / 자산배분"],
    description: "세계 최고 퀀트 투자자들의 자산 배분 전략(올웨더, 모멘텀, 듀얼모멘텀 등)을 한국 실정에 맞게 재해석하여 누구나 따라 할 수 있도록 체계화한 한국 퀀트 투자의 교과서.",
    coverUrl: "/books/giants-portfolio.jpg",
    myComment: "회사 선배가 추천해준 책입니다. 저자가 복잡할 수 있는 투자 방법론과 퀀트 투자를 아주 쉽고 명쾌하게 설명해주어, 투자의 기본 지식을 탄탄하게 쌓는 데 많은 도움이 되었습니다."
  },
  {
    id: "etf-investing",
    title: "주식투자 ETF로 시작하라",
    author: "SYSTDRADER79",
    category: "인덱스 투자 & 자산 배분",
    tags: ["ETF 투자"],
    description: "개별 종목의 위험을 피하고 ETF 중심의 분산 포트폴리오를 구성하는 실전 방법론을 제시. 시장 전체에 투자하는 ETF의 장점을 한국 투자자 눈높이에서 명쾌하게 설명합니다.",
    coverUrl: "/books/etf-investing.jpg",
    myComment: "막연하게 느껴졌던 분산 투자를 국내 상장 ETF로 어떻게 구체화하는지 배울 수 있었습니다. 감정을 배제하고 기계적으로 투자하는 시스템 트레이딩의 마인드를 정립해 준 책으로, 초보 투자자 시절에 특히 좋았던 기억이 납니다."
  },
  {
    id: "infinite-buying",
    title: "미국주식 무한매수법",
    author: "라오어",
    category: "인덱스 투자 & 자산 배분",
    tags: ["적립식 / 미국주식"],
    description: "하락장에 공포 없이 매일 꾸준히 매수하는 '무한매수법'을 체계화한 책. 시장 타이밍을 예측하지 않고 분할 매수를 반복함으로써 평균 단가를 낮추는 전략을 소개합니다.",
    coverUrl: "/books/infinite-buying.jpg",
    myComment: "재미있게 읽었고, 저자의 생각 흐름이 그 당시의 저와 많이 닮아 있어서 크게 공감했던 책입니다. 단순히 주식, ETF, 섹터 자체에 투자하는 것에서 한 걸음 더 나아가, '어떻게(방법론)' 투자할 것인지로 관점을 넓히는 데 큰 도움을 받았습니다."
  },

  // 2. 투자 심리 & 라이프 설계
  {
    id: "love-money",
    title: "돈 뜨겁게 사랑하고 차갑게 다루어라",
    author: "앙드레 코스톨라니",
    category: "투자 심리 & 라이프 설계",
    tags: ["투자 심리"],
    description: "시장의 군중 심리와 역발상 투자의 중요성을 철학적으로 풀어낸 유럽의 전설적인 투자자의 명저. '코스톨라니의 달걀' 이론이 유명합니다.",
    coverUrl: "/books/love-money.jpg",
    myComment: "투자 서적의 명저입니다. 비유가 섞인 그의 투자 논리는 가히 예술의 경지라 할 수 있습니다. 산책하는 개와 주인, 역발상 투자, 코스톨라니의 달걀 모형, 그리고 수면제 이론까지... 잊을 수 없는 통찰을 줍니다."
  },
  {
    id: "same-as-ever",
    title: "Same as Ever (불변의 법칙)",
    author: "모건 하우절 (Morgan Housel)",
    category: "투자 심리 & 라이프 설계",
    tags: ["인간 행동학"],
    description: "급격히 변하는 세상 속에서도 절대로 변하지 않는 인간의 탐욕, 두려움, 스토리의 중요성 등 역사적 행동 본능을 날카롭게 서술합니다.",
    coverUrl: "/books/same-as-ever.jpg",
    myComment: "『돈의 심리학』을 잇는 명저로, 투자 세계의 동화와도 같은 아름다운 에피소드가 가득 찬 책입니다. 새로운 투자 지식이나 아이디어를 얻기보다는 혼란스러운 시장 속에서 '마음의 평온'을 찾고 싶을 때 강력하게 추천합니다."
  },
  {
    id: "wealth-formula",
    title: "부의 공식",
    author: "스콧 갤러웨이 (Scott Galloway)",
    category: "투자 심리 & 라이프 설계",
    tags: ["경제적 자유"],
    description: "단순한 자산 증가를 넘어 집중력, 소비 억제(금욕), 시간, 분산 투자를 조합해 인생에서 원하는 '선택의 자유'를 쟁취하는 공식을 제시합니다.",
    coverUrl: "/books/wealth-formula.jpg"
  },
  {
    id: "death-uncontrollable",
    title: "죽음은 통제할 수 없지만...",
    author: "비탈리 카스넬슨",
    category: "투자 심리 & 라이프 설계",
    tags: ["인생 철학"],
    description: "스토아 철학의 지혜를 가치 투자 및 삶의 태도와 융합하여 의미 있고 회복력 강한 인생을 설계하도록 이끕니다.",
    coverUrl: "/books/death-uncontrollable.jpg"
  },
  {
    id: "nature-of-money",
    title: "돈의 속성",
    author: "김승호",
    category: "투자 심리 & 라이프 설계",
    tags: ["부의 철학"],
    description: "돈을 벌고 지키고 불리는 철학적 사고방식을 삶의 경험에서 우러나온 언어로 풀어낸 책. 돈을 대하는 태도와 마인드셋이 투자 결과를 결정한다는 본질을 꿰뚫습니다.",
    badge: "⭐ 한국 투자 명저",
    coverUrl: "/books/nature-of-money.jpg",
    myComment: "'우리나라에 이런 대단한 분이 계셨다니!'라며 감탄했던 책입니다. 단순히 주식을 사고파는 행위가 아니라, '내가 동업할 위대한 기업을 찾는 것'으로 투자를 재정의하게 되었습니다. 올바른 투자의 기본 개념을 꽉 잡아주는 서적으로 강력하게 추천합니다."
  },

  // 3. 거시 경제 & 거대 트렌드
  {
    id: "if-it-rains-in-brazil",
    title: "브라질에 비가 내리면...",
    author: "피터 나바로",
    category: "거시 경제 & 거대 트렌드",
    tags: ["매크로 분석"],
    description: "날씨, 거시 지표, 금리 같은 매크로 현상이 특정 산업군과 주가에 파동처럼 전파되는 흐름을 인과관계 체계로 파악하는 안목을 줍니다.",
    badge: "⭐ 추천 도서 (My Recommendation)",
    coverUrl: "/books/if-it-rains-in-brazil.jpg",
    myComment: "트럼프의 경제 참모로 잘 알려진 피터 나바로 교수가 2000년대에 쓴 서적입니다. 거시 경제에 대한 정말 놀라운 통찰을 담고 있으며, 가벼운 제목이 아까울 정도로 방대한 매크로 지식과 깊은 생각할 거리를 던져주는 훌륭한 책입니다."
  },
  {
    id: "chip-war",
    title: "칩워 (Chip War)",
    author: "크리스 밀러 (Chris Miller)",
    category: "거시 경제 & 거대 트렌드",
    tags: ["기술 지정학"],
    description: "현대 핵심 자원인 반도체 공급망을 장악하려는 미-중 간의 치열한 기술 지정학 전쟁사와 미래 기술 패권 구도를 명쾌하게 추적합니다.",
    coverUrl: "/books/chip-war.jpg"
  },
  {
    id: "tech-republic",
    title: "기술공화국 선언",
    author: "알렉스 카프, 니콜라스 자미스카",
    category: "거시 경제 & 거대 트렌드",
    tags: ["기술 지정학/안보"],
    description: "AI와 첨단 기술을 민주주의 수호와 국가 안보를 위한 핵심 자산으로 규정하고, 실리콘밸리가 사적 이익 추구에서 벗어나 국가적 책무에 기여해야 함을 철학적으로 역설합니다.",
    coverUrl: "/books/tech-republic.jpg"
  },
  {
    id: "investment-detox",
    title: "문홍철의 투자 디톡스",
    author: "문홍철",
    category: "거시 경제 & 거대 트렌드",
    tags: ["금리/채권 기초"],
    description: "일반 대중과 투자자들 사이에 퍼져 있는 채권과 금리, 환율에 대한 고정관념 및 잘못된 정보들을 명쾌한 팩트로 정화(디톡스)합니다.",
    coverUrl: "/books/investment-detox.jpg"
  },
  {
    id: "exchange-rate-shift",
    title: "환율의 대전환",
    author: "오건영",
    category: "거시 경제 & 거대 트렌드",
    tags: ["외환/환율"],
    description: "환율과 금리를 중심으로 글로벌 매크로 경제의 거대한 흐름을 읽어냅니다. 달러의 움직임과 다양한 매크로 시나리오를 통해 불확실성 속에서도 유연하게 자산을 배분할 수 있는 거시적 통찰력을 제공합니다.",
    coverUrl: "/books/exchange-rate-shift.jpg"
  },
  {
    id: "future-of-economic-war",
    title: "앞으로 3년 경제전쟁의 미래",
    author: "오건영",
    category: "거시 경제 & 거대 트렌드",
    tags: ["매크로 / 달러"],
    description: "달러·금리·유동성의 삼각관계와 연준(Fed) 정책이 글로벌 자산 시장에 미치는 파급 효과를 알기 쉽게 설명. 매크로를 읽는 투자자의 필독서.",
    coverUrl: "/books/future-of-economic-war.jpg"
  },
  {
    id: "buy-dollar",
    title: "나는 주식 대신 달러를 산다",
    author: "박성현",
    category: "거시 경제 & 거대 트렌드",
    tags: ["달러 / 외환"],
    description: "변동성이 큰 주식 대신 달러 자산을 꾸준히 매집하는 전략의 논리와 실천법을 제시. 환율과 기축통화의 힘을 활용하는 독특한 투자 관점을 담고 있습니다.",
    coverUrl: "/books/buy-dollar.jpg"
  },

  // 4. 현금 흐름 & 배당/채권
  {
    id: "dividend-starbucks",
    title: "나는 배당투자로 스타벅스...",
    author: "송민섭 (소울릭)",
    category: "현금 흐름 & 배당/채권",
    tags: ["배당 성장"],
    description: "미국 우량 배당성장주에 장기 투자하여, 일하지 않고도 매달 월급처럼 따뜻한 달러 현금 흐름을 만들어내는 실전 로드맵을 알려줍니다.",
    coverUrl: "/books/dividend-starbucks.jpg"
  },
  {
    id: "income-revolution",
    title: "소득혁명",
    author: "브라이언 페이지",
    category: "현금 흐름 & 배당/채권",
    tags: ["자동 소득"],
    description: "단순한 시간당 노동 소득을 넘어, 자산이 나 대신 스스로 일하게 만드는 '자동 소득(Passive Income)' 파이프라인의 핵심 설계도를 제시합니다.",
    coverUrl: "/books/income-revolution.jpg"
  },
  {
    id: "bond-investing-bible",
    title: "부와 절세를 한번에 잡는 채권투자 바이블",
    author: "마경환",
    category: "현금 흐름 & 배당/채권",
    tags: ["채권 / 절세"],
    description: "개인 투자자가 어려워하는 채권의 매커니즘, 이자율 리스크 관리법 및 절세를 통해 실질 세후 수익을 극대화하는 세부 비법을 전수합니다.",
    coverUrl: "/books/bond-investing-bible.jpg"
  },
  {
    id: "sleeping-salary",
    title: "잠든 사이 월급 버는 미국 배당주 투자",
    author: "소수몽키",
    category: "현금 흐름 & 배당/채권",
    tags: ["미국 배당주"],
    description: "미국 우량 배당주에 꾸준히 투자하여 잠자는 동안에도 달러 배당금을 수령하는 시스템을 만드는 방법을 초보자도 따라 할 수 있도록 친절하게 안내합니다.",
    coverUrl: "/books/sleeping-salary.jpg"
  },
  {
    id: "easy-dividend",
    title: "아마도 가장 쉬운 배당투자 설명서",
    author: "권대경",
    category: "현금 흐름 & 배당/채권",
    tags: ["배당 투자"],
    description: "배당투자의 원리부터 종목 선별 기준, 포트폴리오 구성까지 복잡한 이론을 최대한 쉽고 실용적으로 설명한 국내 배당투자 입문서의 정석.",
    badge: "⭐ 추천 도서 (My Recommendation)",
    coverUrl: "/books/easy-dividend.jpg",
    myComment: "내용도 알차고, 치과의사가 쓴 서적이라 '꼭 경제학 전공이 아니어도 이런 엄청난 통찰을 가질 수 있구나'를 느끼게 해준, 저에게 영향을 가장 많이 준 책 중 하나입니다. 글쓴이의 투자법도 'VTI 적립식 매수'로 매우 심플합니다. 투자 초보자들에게 항상 강력하게 추천합니다!"
  },
  {
    id: "stock-rich-project",
    title: "주식부자 프로젝트",
    author: "채상욱",
    category: "현금 흐름 & 배당/채권",
    tags: ["자산 설계"],
    description: "부동산 애널리스트 출신 저자가 주식과 부동산을 아우르는 부의 설계 전략을 제시. 소득·자산·현금흐름의 삼박자를 맞춰가는 장기 자산 축적 로드맵을 담습니다.",
    coverUrl: "/books/stock-rich-project.jpg"
  },

  // 5. 비즈니스 & 부의 방정식
  {
    id: "zero-to-one",
    title: "Zero to One (제로 투 원)",
    author: "피터 틸 (Peter Thiel)",
    category: "비즈니스 & 부의 방정식",
    tags: ["혁신/창업"],
    description: "모방(1 to N)을 넘어 세상에 없는 완전한 독점적 독창성(0 to 1)을 창조하여 위대한 비즈니스를 만드는 스타트업의 통찰력을 다룹니다.",
    coverUrl: "/books/zero-to-one.jpg"
  },
  {
    id: "equation-of-money",
    title: "돈의 방정식",
    author: "모건 하우절",
    category: "비즈니스 & 부의 방정식",
    tags: ["부의 철학"],
    description: "부의 본질을 꿰뚫는 모건 하우절의 통찰. 부자가 되는 기술보다 부자로 남는 마인드가 중요하며, '소비 통제와 높은 저축률, 그리고 시간의 곱하기'라는 단순한 방정식이 최고의 재무 공식임을 역설합니다.",
    coverUrl: "/books/equation-of-money.jpg"
  },
  {
    id: "value-investing-first",
    title: "가치투자 처음공부",
    author: "이성수",
    category: "비즈니스 & 부의 방정식",
    tags: ["가치 투자"],
    description: "PER, PBR, ROE 같은 기초 재무 지표부터 기업 가치 분석, 저평가 종목 발굴까지 가치투자의 핵심 개념을 처음 배우는 사람도 이해할 수 있게 차근차근 설명합니다.",
    coverUrl: "/books/value-investing-first.jpg"
  }
];
