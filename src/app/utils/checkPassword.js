import errors from "../enums/errors";
import nouns from "../enums/nouns.json";

function checkPassword(password) {
   password = password || "";
   const { path, createError } = this;
   const passwordText = nouns["DEFAULT.PASSWORD"];

   for (let i = 0; i < password.length; i++) {
      let ch = password[i];
      if (
         !(
            (ch >= "0" && ch <= "9") ||
            (ch >= "a" && ch <= "z") ||
            (ch >= "A" && ch <= "Z") ||
            ch === "_"
         )
      )
         return createError({ path, message: errors.INVALID(passwordText) });
   }
   if (password.length < 8) {
      return createError({
         path,
         message: errors.MIN_X_CHARACTERS(passwordText, 8),
      });
   }
   return true;
}

export default checkPassword;
