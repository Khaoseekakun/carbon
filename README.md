# Carbon

ระบบเว็บแอปพลิเคชันที่พัฒนาโดยใช้ **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma** และ **Radix UI**  
โปรเจกต์นี้ออกแบบมาเพื่อรองรับการสร้าง UI ที่ทันสมัย ปรับแต่งได้ และตอบสนองเร็ว พร้อมทั้งมีโครงสร้างสำหรับฟูลสแต็กแบบครบวงจร

## 🚀 ฟีเจอร์หลัก

- ⚡ ใช้เฟรมเวิร์ก [Next.js 13](https://nextjs.org/)
- 🎨 ตกแต่งด้วย [Tailwind CSS](https://tailwindcss.com/) และชุดคอมโพเนนต์จาก Radix UI
- 🌙 รองรับโหมดมืด (Dark Mode) ด้วย `next-themes`
- 🔐 รองรับระบบยืนยันตัวตนแบบ JWT
- 🧩 มีคอมโพเนนต์สำเร็จรูปมากมาย เช่น `cmdk`, `lucide-react`
- 📊 แสดงผลกราฟและข้อมูลด้วย `Recharts`
- ⚙️ แบบฟอร์มตรวจสอบข้อมูลด้วย `React Hook Form` และ `Zod`
- 🧠 เชื่อมต่อฐานข้อมูลผ่าน `Prisma ORM`

## 🧰 เทคโนโลยีที่ใช้

- **เฟรมเวิร์ก**: Next.js 13  
- **ภาษา**: TypeScript  
- **ส่วนติดต่อผู้ใช้**: Tailwind CSS + Radix UI  
- **ฝั่งเซิร์ฟเวอร์**: Prisma ORM  
- **ระบบยืนยันตัวตน**: JSON Web Tokens (JWT)  
- **แบบฟอร์ม**: React Hook Form + Zod

## 🛠️ วิธีติดตั้งและใช้งาน

### 1. โคลนโปรเจกต์

```bash
git clone https://github.com/Khaoseekakun/carbon.git
cd carbon
````

### 2. ติดตั้งแพ็กเกจ

```bash
bun install
# หรือใช้ npm
npm install
```

### 3. ตั้งค่าไฟล์ .env

```bash
cp .env.example .env
```

### 4. ตั้งค่าฐานข้อมูล

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. เริ่มรันโปรเจกต์

```bash
bun run dev
# หรือ
npm run dev
```

แล้วเปิดเบราว์เซอร์ที่ `http://localhost:3000`

## 📁 โครงสร้างโปรเจกต์

```
carbon/
├── app/
├── components/
├── hooks/
├── lib/
├── prisma/
├── public/
├── types/
├── .env
├── tailwind.config.ts
└── package.json
```

## 👥 ผู้ร่วมพัฒนา

* [@Khaoseekakun](https://github.com/Khaoseekakun) — หัวหน้าโครงงาน
* [@Kllopxn](https://github.com/kllopxn) - ผู้ร่วมโครงงาน

```
