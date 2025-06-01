# 📦 supabase.md  
## Ana Tablolar

---

### ## users  
Kullanıcı (freelancer) bilgilerini içeren ana tablo  
**Gerekli Alanlar:**  
- id (Primary Key, UUID)  
- name  
- email (unique)  
- password_hash  
- role (enum: admin, user)  
- created_at (timestamp)  
- updated_at (timestamp)  
- is_active (boolean)  

---

### ## clients  
Freelancer’ın çalıştığı müşteri bilgileri  
**Gerekli Alanlar:**  
- id (Primary Key, UUID)  
- user_id (Foreign Key → users.id)  
- name  
- email  
- company_name  
- phone (opsiyonel)  
- address  
- notes (opsiyonel)  
- created_at  
- updated_at  

---

### ## invoices  
Oluşturulan faturaların kaydı  
**Gerekli Alanlar:**  
- id (Primary Key, UUID)  
- client_id (Foreign Key → clients.id)  
- user_id (Foreign Key → users.id)  
- invoice_number (unique, string)  
- status (enum: draft, sent, paid, overdue)  
- due_date (timestamp)  
- issue_date (timestamp)  
- total_amount (decimal)  
- currency (default: USD, enum: USD, EUR, TRY)  
- notes (opsiyonel)  
- created_at  
- updated_at  

---

### ## invoice_items  
Her faturaya ait hizmet satırları (kalemler)  
**Gerekli Alanlar:**  
- id (Primary Key, UUID)  
- invoice_id (Foreign Key → invoices.id)  
- description  
- quantity  
- unit_price  
- total (quantity * unit_price)  
- created_at  
- updated_at  

---

### ## contracts  
Hazırlanan sözleşmelerin kaydı  
**Gerekli Alanlar:**  
- id (Primary Key, UUID)  
- user_id (Foreign Key → users.id)  
- client_id (Foreign Key → clients.id)  
- title  
- content (rich text or markdown)  
- contract_date (timestamp)  
- status (enum: draft, active, expired, terminated)  
- signed_pdf_url (opsiyonel)  
- created_at  
- updated_at  

---

## 🔗 İlişkiler  
- Her `user` birden fazla `client`, `invoice` ve `contract` oluşturabilir.  
- Her `client`, bir kullanıcıya (freelancer) aittir.  
- Her `invoice`, bir kullanıcı ve bir müşteriye aittir.  
- Her `contract`, bir kullanıcı ve bir müşteriye aittir.  
- `invoice_items` tablosu `invoice` ile one-to-many ilişkilidir.

---

## ✅ Ek Gereksinimler  
- Tüm tablolarda `created_at` ve `updated_at` alanları otomatik timestamp olmalı  
- Soft delete için `is_deleted` boolean eklenebilir  
- Erişim kuralları Supabase RLS (Row-Level Security) ile sağlanmalı  
- Her kullanıcının sadece kendi verilerine erişmesini sağlayan RLS politikaları tanımlanmalı  
- Hesaplar arası veri sızıntısını engellemek için tüm select/update/delete işlemleri `user_id = auth.uid()` kuralına bağlı olmalı

---

## 📄 PDF ve Metadata  
- PDF çıktıları Supabase Storage'da saklanabilir  
- `contracts` ve `invoices` tablolarına `pdf_url` alanı eklenebilir  
- Her PDF için UUID kullanılarak benzersiz dosya adı atanmalı  
- Dosya yükleme işlemi sırasında storage policy: `user_id = auth.uid()` olacak şekilde sınırlanmalı

---

İstersen bu yapıyı Supabase CLI ile otomatik kurabilecek SQL scriptine de çevirebilirim. Ya da Notion'a taşıyabileceğin sadeleştirilmiş bir versiyon istersen hemen hazırlayabilirim. Hangisini istersin?
