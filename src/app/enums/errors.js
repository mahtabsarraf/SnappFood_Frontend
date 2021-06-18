const errors = Object.freeze({
   REQUIRED: "این فیلد لازم است.",
   NETWORK_ERROR: "خطا در اتصال به اینترنت ",
   SEND_EMAIL_FAILED: "ایمیل ارسال نشد.",
   USER_EXISTS: "این نام کاربری قبلا استفاده شده‌است.",
   EMAIL_EXISTS: "این ایمیل قبلا استفاده شده‌است.",
   SERVER_CONNECTION_ERROR: "خطا در برقراری ارتباط با سرور",
   CAN_NOT_START_WITH(x, y) {
      return `${x} نباید با ${y} شروع شود.`;
   },
   CAN_NOT_END_WITH(x, y) {
      return `${x} نباید با ${y} تمام شود.`;
   },

   INVALID(x) {
      return `${x} نامعتبر است.`;
   },
   EQUAL_TO(x, y) {
      return `فیلدهای ${x} و ${y} باید برابر باشند.`;
   },
   FILL_THIS_FIELD(noun) {
      return `${noun} را وارد نمایید.`;
   },
   LEAST_X_CHARACTERS_AND_MAX_Y_CHARACTERS(noun, x, y) {
      return `${noun} باید حداقل ${x} و حداکثر ${y} کاراکتر باشد.`;
   },
   MAX_X_CHARACTERS(noun, x) {
      return `${noun} باید حداکثر ${x} کاراکتر باشد.`;
   },
   MIN_X_CHARACTERS(noun, x) {
      return `${noun} باید حداقل ${x} کاراکتر باشد.`;
   },
   SHOULD_BE_EMAIL(noun) {
      return `${noun} نامعتبر است.`;
   },
   SHOULD_BE_INTEGER(noun) {
      return `${noun} باید عدد صحیح باشد.`;
   },
   SHOULD_BE_STRING(noun) {
      return `${noun} باید رشته باشد.`;
   },
   SHOULD_BE_BOOLEAN(noun) {
      return `${noun} باید بولین باشد.`;
   },
   SHOULD_BE_ARRAY(noun) {
      return `${noun} باید آرایه باشد.`;
   },
   SHOULD_BE_FLOAT(noun) {
      return `${noun} باید اعشاری باشد.`;
   },
   SHOULD_BE_PHONE_NUMBER(noun) {
      return `${noun} نامعتبر است.`;
   },
   SHOULD_BE_POSITIVE(noun) {
      return `${noun} باید عددی مثبت باشد.`;
   },
   SHOULD_BE_UUID(noun) {
      return `${noun} باید UUID باشد.`;
   },
   SHOULD_BE_INT_AND_GT_X(noun, x) {
      return `${noun} ${x} باشد باید عدد صحیح و بزرگتر از  .`;
   },
   SHOULD_BE_INTEGER_AND_GREATER_THAN_X(noun, x) {
      return `${noun} باید عدد صحیح و بزرگتر از ${x} باشد.`;
   },
   SHOULD_BE_LINK(noun) {
      return `${noun} باید لینک باشد.`;
   },
   SHOULD_BE_URL(noun) {
      return `${noun} باید آدرس اینترنتی باشد.`;
   },
   SHOULD_BE_NUMBER(noun) {
      return `${noun} باید عدد باشد.`;
   },
   SHOULD_BE_LESS_THAN_AND_GREATER_THAN(noun, x, y) {
      return `باید بین دو عدد ${x} و ${y} باشد.`;
   },
   SHOULD_BE_ENGLISH(noun) {
      return `${noun} باید فقط شامل حروف انگلیسی باشد.`;
   },
});

export default errors;
