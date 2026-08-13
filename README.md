## https://study-step.vercel.app
### 그간 공부해서 메모장, 노트에 옮겨 놓았던 기록들 간단한 웹사이트로 정리하여 개발
#### 코딩테스트 연습 src/app/test/solution.ts

### Google Analytics 4 설정

GA4 속성에서 웹 데이터 스트림을 만든 뒤 측정 ID(`G-`로 시작)를 Vercel 프로젝트의 환경 변수에 등록합니다.

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

로컬에서 확인하려면 `.env.example`을 참고해 `.env.local`에 같은 환경 변수를 추가합니다. 설정하지 않은 환경에서는 Google Analytics 스크립트를 불러오지 않습니다.


