const { Resend } = require('resend');
const resend = new Resend('re_dqrSNe63_CeVXzW1TnK9GoLzN6oxQHUw4'); 

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const data = result.entry || result;

    const itemsList = (data.items && Array.isArray(data.items)) 
      ? data.items.map(item => `<tr><td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td><td style="padding: 10px; border: 1px solid #ddd;">${item.price}</td></tr>`).join('') 
      : '<tr><td colspan="2">لا توجد منتجات</td></tr>';

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: 'yazanward756@gmail.com',
        subject: `طلب جديد #${data.id}`,
        html: `
          <div style="font-family: Arial; padding: 20px;">
            <h2 style="color: #333;">طلب جديد من: ${data.name || 'عميل'}</h2>
            
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>رقم الهاتف:</strong> ${data.phone || 'غير متوفر'}</p>
              <p style="margin: 5px 0;"><strong>العنوان:</strong> ${data.address || 'غير متوفر'}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #eee;">
                  <th style="padding: 10px; border: 1px solid #ddd;">المنتج</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">السعر</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            <p style="font-size: 18px; margin-top: 20px;"><strong>الإجمالي: ${data.total || 0}</strong></p>
          </div>
        `
      });
      console.log('تم الإرسال عبر Resend بنجاح مع بيانات العميل');
    } catch (err) {
      console.error('خطأ في Resend:', err);
    }
  },
};