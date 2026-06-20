const nodemailer = require('nodemailer');

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    // تأكد من مسار البيانات (في حال كانت داخل entry أو مباشرة)
    const data = result.entry || result;

    // 1. تجهيز قائمة المنتجات (تحويل المصفوفة إلى جدول HTML)
    const itemsList = (data.items && Array.isArray(data.items)) 
      ? data.items.map(item => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${item.name || 'منتج'}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.price || 0}</td>
        </tr>
      `).join('') 
      : '<tr><td colspan="2">لا توجد منتجات</td></tr>';

    // 2. إعداد المرسل (تأكد من وضع كلمة مرور التطبيق الصحيحة)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yazanward3@gmail.com',
        pass: 'uywj fyic pejq biyr' // تأكد من حذف المسافات إذا وجدت
      }
    });

    // 3. إرسال الإيميل
    try {
      await transporter.sendMail({
        from: '"متجر Infintycode" <yazanward3@gmail.com>',
        to: 'yazanward756@gmail.com',
        subject: `طلب جديد #${data.id || 'N/A'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">تم استلام طلب جديد!</h2>
            <div style="margin-bottom: 20px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
              <p><strong>العميل:</strong> ${data.name || 'غير معروف'}</p>
              <p><strong>رقم الهاتف:</strong> ${data.phone || 'غير متوفر'}</p>
              <p><strong>العنوان:</strong> ${data.address || 'غير متوفر'}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #333; color: #fff;">
                  <th style="padding: 10px;">اسم المنتج</th>
                  <th style="padding: 10px;">السعر</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            <p style="font-size: 20px; text-align: right; margin-top: 20px;">
              <strong>الإجمالي: </strong> ${data.total || 0}
            </p>
          </div>
        `
      });
      console.log('تم إرسال إيميل الطلب بنجاح:', data.id);
    } catch (err) {
      console.error('خطأ أثناء إرسال الإيميل:', err);
    }
  },
};