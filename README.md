# Do-It

## 소개
이 프로젝트는 Next.js와 TypeScript를 사용하여 만든 To-Do 앱입니다. 사용자는 할 일을 추가, 수정, 삭제할 수 있으며, 할 일 항목에 메모와 이미지를 첨부할 수 있습니다.

## 설치 및 실행

1. 프로젝트 클론
    ```sh
    git clone https://github.com/bagoye/Do-It
    cd do-it
    ```

2. 의존성 설치
    ```sh
    npm install
    ```

3. 개발 서버 실행
    ```sh
    npm run dev
    ```

4. 브라우저에서 `http://localhost:3000`을 열어 앱에 접근

## 주요 기능

- 할 일 추가
- 할 일 수정 (메모 및 이미지 첨부)
- 할 일 삭제
- 진행 중 및 완료된 할 일 구분
- 무한 스크롤로 할 일 목록 조회

## 폴더 구조

- `src/app`: Next.js 앱 디렉토리 및 페이지 컴포넌트
- `src/components/common`: 재사용 가능한 공용 컴포넌트
- `src/components/todo`: To-Do 관련 컴포넌트
- `src/styles`: 글로벌 스타일 및 테마 설정
- `src/utils`: API 호출 관련 함수
- `src/types.ts`: 타입 정의 파일

## API

- **할 일 목록**
  - `GET /api/{tenantId}/items`
  - `POST /api/{tenantId}/items`
  - `GET /api/{tenantId}/items/{itemId}`
  - `PATCH /api/{tenantId}/items/{itemId}`
  - `DELETE /api/{tenantId}/items/{itemId}`

- **이미지 업로드**
  - `POST /api/{tenantId}/images/upload`
