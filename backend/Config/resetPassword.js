import {Resend} from "resend";
function getResend() {
    return new Resend(process.env.RESEND_API_KEY);
}
export default getResend;
