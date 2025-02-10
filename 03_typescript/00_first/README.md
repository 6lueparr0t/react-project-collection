# TypeScript 실행 및 컴파일

---

## 1. 프로젝트 설정

### 1.1 Node.js 및 npm 확인

```sh
node -v
npm -v
```

---

## 2. TypeScript 및 실행 도구 설치

### 2.1 TypeScript 설치

```sh
npm install -g typescript tsx
npx tsc [파일이름] # 컴파일
npx tsx [파일이름] # 실행
```

---

## 3. TypeScript 코드 작성

### 3.1 `test.ts` 파일 작성

`test.ts` 파일을 생성

```ts
console.log("Hello, TypeScript with tsx!");
```

---

## 4. TypeScript 실행 및 컴파일

### 4.1 TypeScript 파일 실행 (`tsx` 사용)

```sh
npx tsx test.ts
```

---

## 5 TypeScript 컴파일 (`tsc` 사용)

TypeScript 파일을 JavaScript로 변환

```sh
npx tsc
```

### 5.1 컴파일된 파일 실행

컴파일된 JavaScript 파일 실행

```sh
node test.js
```
