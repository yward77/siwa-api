module.exports = {
  async afterCreate(event) {
    const { result } = event; // هنا يوجد تفاصيل الطلب الجديد

    // دعنا نطبع رقم الطلب في الـ Terminal للتأكد أن الكود يعمل
    console.log('تم إنشاء طلب جديد برقم:', result.id);

    // سنقوم بإضافة كود الإرسال هنا لاحقاً
  },
};