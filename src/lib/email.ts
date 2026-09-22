import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "NEC Nepal <no-reply@necnepal.com>";

export async function sendEmail(to: string | string[], subject: string, html: string) {
  const result = await resend.emails.send({ from: FROM, to, subject, html });
  if (result.error) {
    console.error("Resend error:", result.error);
  }
  return result;
}

export function birthdayWishHtml(name: string, gender: "MALE" | "FEMALE" | "OTHER" | null) {
  const greeting =
    gender === "FEMALE"
      ? `Dear ${name} ji,`
      : gender === "MALE"
      ? `Dear ${name} ji,`
      : `Dear ${name},`;
  return `
    <div style="font-family: Arial, sans-serif; color: #14181C;">
      <p>${greeting}</p>
      <p>Wishing you a very happy birthday from all of us at Netreshwori Engineering
      Consultancy Pvt. Ltd.! Thank you for everything you bring to the team — hope
      you have a wonderful day tomorrow.</p>
      <p>— Team NEC</p>
    </div>
  `;
}

export function workAnniversaryHtml(name: string, years: number) {
  return `
    <div style="font-family: Arial, sans-serif; color: #14181C;">
      <p>Dear ${name} ji,</p>
      <p>Today marks ${years} year${years === 1 ? "" : "s"} since you joined
      Netreshwori Engineering Consultancy Pvt. Ltd. Thank you for your continued
      dedication — we're glad to have you on the team.</p>
      <p>— Team NEC</p>
    </div>
  `;
}
