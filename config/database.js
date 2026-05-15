module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'), // هنا يقرأ من متغير البيئة
      // أو ربما تجد الرابط القديم مكتوباً هنا مباشرة (Hardcoded)!
    },
  },
});