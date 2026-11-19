# 명지대학교 데이터사이언스 연구실 홈페이지

순수 정적 HTML/CSS/JS로 만든 연구실 홈페이지입니다. 빌드 과정 없이 파일을 그대로 올리면 됩니다.

## 파일 구성
- `index.html` — 메인(히어로 · Latest News · Research · People · Publications · Lectures · Awards · News · Contact)
- `professor.html` — 김도현 교수 소개(CV)
- `students.html` — 현재 구성원
- `alumni.html` — 졸업생(동문)
- `404.html` — 없는 주소 안내 페이지
- `favicon.png` — 탭 아이콘
- `robots.txt`, `.nojekyll` — 검색/배포용 보조 파일

로고는 각 페이지 안에 포함되어 있어 별도 이미지 파일이 필요 없습니다.

---

## 배포 방법 A — GitHub 웹에서 올리기 (터미널 불필요, 추천)

1. https://github.com 로그인 → 오른쪽 위 **＋ → New repository**
2. **Repository name** 에 정확히 다음처럼 입력 (모두 소문자):
   `본인깃허브아이디.github.io`
   예) 아이디가 `dohyunkim` 이면 → `dohyunkim.github.io`
3. **Public** 선택, 다른 항목은 체크하지 않고 **Create repository**
4. 만들어진 저장소 화면에서 **uploading an existing file** 링크 클릭
   (또는 **Add file → Upload files**)
5. 이 폴더의 **모든 파일을 드래그**해서 올리고 → 아래 **Commit changes**
   - `.nojekyll` 이 드래그로 안 올라가면: **Add file → Create new file** →
     파일명에 `.nojekyll` 입력 → 빈 채로 **Commit** (없어도 동작은 합니다)
6. 상단 **Settings → Pages** 이동
7. **Build and deployment → Source** 를 **Deploy from a branch** 로,
   **Branch** 를 `main` / `/ (root)` 로 두고 **Save**
8. 1~2분 뒤 접속: **https://본인깃허브아이디.github.io**

> 수정할 때: 저장소에서 해당 파일을 열고 연필(✏️) 아이콘으로 편집 후 Commit,
> 또는 같은 방식으로 파일을 다시 업로드하면 됩니다.

---

## 배포 방법 B — git 사용 (터미널)

```bash
# 이 파일들이 있는 폴더에서
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/본인깃허브아이디/본인깃허브아이디.github.io.git
git push -u origin main
```
이후 **Settings → Pages** 에서 위 7~8단계와 동일하게 설정합니다.

---

## 커스터마이즈

### 1) 히어로(첫 화면) 배경을 실제 사진으로
`index.html` 의 `<style>` 안에서 `.hero-bg` 규칙을 찾습니다.
같은 폴더에 `assets` 폴더를 만들고 사진을 `assets/hero.jpg` 로 넣은 뒤, 아래처럼 바꿔주세요.

```css
/* 변경 전 (그라데이션) */
.hero-bg{background:linear-gradient(120deg,#0c1c36 0%,#16356a 55%,#1d4f93 100%);background-size:cover;background-position:center}

/* 변경 후 (사진) */
.hero-bg{background:url('assets/hero.jpg') center/cover}
```
사진이 밝으면 글자가 잘 안 보일 수 있는데, 그때는 `.hero-ov`(어두운 덮개)의 투명도를 조금 더 높이면 됩니다.

### 2) 연구분야 도식을 실제 프로젝트 아키텍처 이미지로
`index.html` 의 Research 영역에서 각 항목의 `<div class="rfig">…</div>` 안 `<svg>…</svg>` 를
다음으로 교체하세요.
```html
<img src="assets/research/01.png" alt="연구 도식" style="width:100%;border-radius:12px">
```
(`assets/research/01.png ~ 04.png` 식으로 넣으면 됩니다.)

### 3) 인물 사진(교수 · 구성원 · 수상 타임라인)
현재는 이니셜 원형 자리표시자입니다. 사진을 쓰려면 해당 원형 요소에 배경 이미지를 지정하고 안의 글자만 비우면 됩니다. 예:
```html
<div class="ph" style="background-image:url('assets/members/최석림.jpg')"></div>
```

### 4) 수상 건수는 자동 계산
"총 N건" 과 상단 Awards 숫자는 타임라인 항목 수를 세어 자동으로 표시됩니다.
수상 카드(`<div class="tlitem …">…</div>`)를 추가/삭제하면 숫자가 알아서 갱신됩니다.

### 5) 논문 목록 더 넣기
메인의 "Selected Papers" 는 대표 논문 위주입니다. 전체 목록(국제 34편·국내 19편)을 넣거나
별도 Publications 페이지를 원하시면 요청해 주세요.

### 6) 다크 모드 · 한국어/영어 토글
모든 페이지 우측 상단에 **KR | EN** 과 해/달 아이콘이 있습니다. 두 선택은 브라우저(`localStorage`)에 저장되어
페이지를 옮겨도 유지되고, 첫 화면이 그려지기 전에 적용됩니다.

| 파일 | 역할 |
| --- | --- |
| `assets/css/site-ui.css` | 토글 버튼 디자인, 다크 모드 색상표(`html[data-theme="dark"]`) |
| `assets/js/site-ui.js` | 테마/언어 적용, 버튼 생성, 문구 치환 |
| `assets/js/i18n-ko-en.js` | 한국어 → English 문구 사전 |

- **색 바꾸기**: 각 페이지 `<style>` 의 색은 `--bg`, `--card`, `--navy`, `--navy-bg`, `--ink`, `--line` 같은 변수로 되어 있습니다.
  라이트 값은 `:root`(페이지 안), 다크 값은 `site-ui.css` 의 `html[data-theme="dark"]` 블록에서 한 번만 고치면 전체에 반영됩니다.
- **영문 문구 추가/수정**: `i18n-ko-en.js` 에서 `"한국어 원문": "English text"` 를 넣거나 고치면 됩니다.
  한국어는 페이지에 보이는 그대로(공백·문장부호 포함) 적어야 합니다. 사전에 없는 문구는 한국어 그대로 표시됩니다.
- 새 페이지를 만들 때는 `<head>` 끝에 아래 두 줄을, `</body>` 앞에 스크립트 두 줄을 넣으면 토글이 함께 동작합니다.

```html
<link rel="stylesheet" href="assets/css/site-ui.css">
<script>(function(){try{var d=document.documentElement,t=localStorage.getItem("dslab-theme");if(t==="dark")d.setAttribute("data-theme","dark");var l=localStorage.getItem("dslab-lang");if(l==="en"){d.setAttribute("lang","en");d.setAttribute("data-lang","en")}else{d.setAttribute("data-lang","ko")}}catch(e){}})();</script>
```

```html
<script src="assets/js/i18n-ko-en.js"></script>
<script src="assets/js/site-ui.js"></script>
```

---

## 나중에 커스텀 도메인 연결
**Settings → Pages → Custom domain** 에 도메인을 입력하고, 도메인 업체(DNS)에서
GitHub Pages 안내대로 레코드를 추가하면 됩니다. (`https://docs.github.com/pages` 참고)

© 2026 Data Science Lab, Myongji University · myongji.data@gmail.com
