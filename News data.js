/* =========================================================================
   DSLAB 뉴스 데이터 (news.html 목록 + news-detail.html 상세가 공유)
   -------------------------------------------------------------------------
   ▶ 뉴스를 추가/수정할 때는 이 배열만 고치면, 목록·상세·홈이 함께 반영됩니다.
   ▶ 새 항목은 보통 맨 위(최신)에 추가하세요.

   각 항목 필드
     id      : 주소에 쓰이는 고유 이름 (영문/숫자/하이픈, 띄어쓰기 금지)
               예) news-detail.html?id=recruit-2026
     cat     : "News" 또는 "Award"
     date    : 표시용 날짜 (예: "2026.06.02")
     title   : 제목
     badge   : (선택) 제목 옆 배지 텍스트. 없으면 "" 로 두세요.
     summary : 목록 카드에 보이는 짧은 소개
     body    : 상세 페이지 본문 (HTML 사용 가능)
   ========================================================================= */
window.NEWS = [
  {
    id: "recruit-2026",
    cat: "News",
    date: "2026.06.02",
    title: "2026학년도 학부연구생 모집",
    badge: "",
    summary: "데이터사이언스 연구실(DSLAB)에서 학부연구생을 모집합니다. 데이터마이닝·머신러닝·그래프 신경망·추천 시스템 등에 관심 있는 학부생을 환영합니다. 지원서 마감 6/30(화)까지.",
    body: `
      <p>데이터사이언스 연구실(DSLAB)에서 함께 연구할 학부연구생을 모집합니다. 데이터마이닝·머신러닝·그래프 신경망·추천 시스템 등에 관심 있는 학부생의 많은 지원 바랍니다.</p>

      <h3>모집 대상</h3>
      <p>(2026년 1학기 포함) 데이터마이닝을 기수강한 학부 3학년·4학년</p>

      <h3>우대 사항</h3>
      <p>본교 대학원 지원 희망자 우대</p>

      <h3>지원 사항</h3>
      <ul>
        <li>국내외 학술대회 참석 지원</li>
        <li>연구논문 작성 및 데이터 분석 경진대회 참여 지원</li>
        <li>프로젝트에 연구원으로 참여 및 연구비 지원</li>
        <li>데이터 분석 서버 및 LLM 등 연구자원 지원</li>
      </ul>

      <h3>지원 방법</h3>
      <p>‘지원서’를 다운로드 받아 작성한 후, 아래 이메일로 <b>6월 30일(화)</b>까지 제출해 주세요.</p>
      <ul>
        <li>지원서 다운로드: <a href="https://bit.ly/3x2lndE" target="_blank" rel="noopener">https://bit.ly/3x2lndE</a> (로그인 없이 다운로드 가능)</li>
        <li>지원서 제출 이메일: <a href="mailto:myongji.data@gmail.com">myongji.data@gmail.com</a></li>
      </ul>
      <p class="btnrow"><a class="dlbtn" href="https://bit.ly/3x2lndE" target="_blank" rel="noopener">지원서 다운로드 &rarr;</a></p>

      <h3>문의</h3>
      <p>데이터사이언스 연구실 (<a href="index.html">DataScienceLAB.kr</a>) 또는 <a href="mailto:myongji.data@gmail.com">myongji.data@gmail.com</a></p>
    `
  },
  {
    id: "join-parkjunsu-2026",
    cat: "News",
    date: "2026.01.19",
    title: "박준수 학생 학부연구생 합류",
    badge: "",
    summary: "DSLAB에 새롭게 참여하게 되었습니다. 진심으로 환영합니다.",
    body: `<p>박준수 학생이 데이터사이언스 연구실(DSLAB)에 학부연구생으로 새롭게 참여하게 되었습니다. 진심으로 환영합니다.</p>`
  },
  {
    id: "join-kimmujin-2025",
    cat: "News",
    date: "2025.10.30",
    title: "김무진 학생 학부연구생 합류",
    badge: "",
    summary: "DSLAB에 새롭게 참여하게 되었습니다. 진심으로 환영합니다.",
    body: `<p>김무진 학생이 데이터사이언스 연구실(DSLAB)에 학부연구생으로 새롭게 참여하게 되었습니다. 진심으로 환영합니다.</p>`
  },
  {
    id: "recruit-2025",
    cat: "News",
    date: "2025.09.15",
    title: "데이터사이언스 학부연구생 모집",
    badge: "",
    summary: "데이터마이닝 기수강 학부 3학년 대상. 학술대회 참석·연구비·분석 서버 등 지원. 지원서 9/26(금)까지.",
    body: `<p>데이터마이닝을 기수강한 학부 3학년을 대상으로 학부연구생을 모집하였습니다. 국내외 학술대회 참석, 연구비, 데이터 분석 서버 등을 지원하며, 지원서는 9월 26일(금)까지 접수하였습니다.</p>`
  },
  {
    id: "join-ahnjaeguk-2025",
    cat: "News",
    date: "2025.09.01",
    title: "안재국 학생 학부연구생 합류",
    badge: "",
    summary: "DSLAB에 새롭게 참여하게 되었습니다. 진심으로 환영합니다.",
    body: `<p>안재국 학생이 데이터사이언스 연구실(DSLAB)에 학부연구생으로 새롭게 참여하게 되었습니다. 진심으로 환영합니다.</p>`
  },
  {
    id: "award-grrc-2025",
    cat: "Award",
    date: "2025.06",
    title: "GRRC 2025 생산시스템 운영최적화 경진대회 대상",
    badge: "",
    summary: "이관형·김호중 학생이 GRRC 2025 생산시스템 운영최적화 경진대회에서 대상을 수상하였습니다.",
    body: `<p>이관형·김호중 학생이 GRRC 2025 생산시스템 운영최적화 경진대회에서 <b>대상</b>을 수상하였습니다. 진심으로 축하합니다!</p>`
  },
  {
    id: "award-yonsei-2025",
    cat: "Award",
    date: "2025.05.12",
    title: "디지털 헬스케어 해커톤 우수상(3등)",
    badge: "",
    summary: "윤수아·김경은·김호중·이관형 학생이 용인세브란스 해커톤에서 수상하였습니다.",
    body: `<p>윤수아·김경은·김호중·이관형 학생이 용인세브란스 디지털 헬스케어 해커톤에서 <b>우수상(3등)</b>을 수상하였습니다. 진심으로 축하합니다!</p>`
  },
  {
    id: "degree-2025",
    cat: "News",
    date: "2025.02.17",
    title: "배경열(박사)·최기정(석사) 학위 취득",
    badge: "",
    summary: "각각 박사·석사 학위를 취득하였습니다. 진심으로 축하드립니다!",
    body: `<p>배경열 연구원이 박사 학위를, 최기정 연구원이 석사 학위를 취득하였습니다. 그동안의 노고에 감사드리며, 새로운 출발을 진심으로 축하드립니다!</p>`
  },
  {
    id: "join-kimhojung-2025",
    cat: "News",
    date: "2025.01.01",
    title: "김호중 학생 학부연구생 합류",
    badge: "",
    summary: "DSLAB에 새롭게 참여하게 되었습니다. 진심으로 환영합니다.",
    body: `<p>김호중 학생이 데이터사이언스 연구실(DSLAB)에 학부연구생으로 새롭게 참여하게 되었습니다. 진심으로 환영합니다.</p>`
  },
  {
    id: "award-teaching-2023",
    cat: "Award",
    date: "2023.02",
    title: "김도현 교수, 명지대학교 교육상 수상",
    badge: "",
    summary: "김도현 교수가 명지대학교 교육상을 수상하였습니다.",
    body: `<p>김도현 교수가 명지대학교 <b>교육상</b>을 수상하였습니다.</p>`
  },
  {
    id: "award-ksqm-2022",
    cat: "Award",
    date: "2022.05",
    title: "한국품질경영학회 춘계학술대회 우수발표 논문상",
    badge: "",
    summary: "안영근·김도현이 「그래프 신경망 기반 다변량 시계열 이상치 탐지 알고리즘」으로 우수발표 논문상을 수상하였습니다.",
    body: `<p>안영근·김도현이 「그래프 신경망 기반 다변량 시계열 이상치 탐지 알고리즘」으로 한국품질경영학회 춘계학술대회에서 <b>우수발표 논문상</b>을 수상하였습니다.</p>`
  },
  {
    id: "award-lgai-2020",
    cat: "Award",
    date: "2020.08",
    title: "LG AI 해커톤 우수상(2등)",
    badge: "",
    summary: "박민영·안영근 학생이 「AI 활용 블럭장난감 제조공정 최적화」로 LG AI 해커톤에서 우수상(2등)을 수상하였습니다.",
    body: `<p>박민영·안영근 학생이 「AI 활용 블럭장난감 제조공정 최적화」로 LG AI 해커톤에서 <b>우수상(2등)</b>을 수상하였습니다.</p>`
  },
  {
    id: "award-informs-2018",
    cat: "Award",
    date: "2018.06",
    title: "INFORMS International Conference 최우수 포스터상",
    badge: "",
    summary: "조은지·이승연·김도현이 「Inner Product based Deep Neural Networks」로 최우수 포스터상을 수상하였습니다.",
    body: `<p>조은지·이승연·김도현이 「Inner Product based Deep Neural Networks」로 INFORMS International Conference에서 <b>최우수 포스터상</b>을 수상하였습니다.</p>`
  }
];
