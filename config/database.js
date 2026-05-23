module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      // إضافة الـ SSL هي المفتاح لمنع خطأ Aggregate Error
      ssl: {
        rejectUnauthorized: false,
      },
    },
    options: {
      ssl: true,
    },
  },
});