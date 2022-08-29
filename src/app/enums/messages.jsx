const messages = Object.freeze({
   commentsForFood: (amount) => `تعداد ${amount} نظر برای این غذا ثبت شده است.`,
   commentFromAt: (name, date) =>
      `این نظر در تاریخ ${date} توسط کاربر ${name} ثبت شده است.`,
   rateFromComment: (rate, comment) => `امتیاز ${rate} از ${comment} نظر`,
});

export default messages;
