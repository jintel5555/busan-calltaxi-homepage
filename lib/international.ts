import { siteConfig } from "@/lib/site";

export const languageOptions = [
  { locale: "ko", label: "한국 · 한국어", shortLabel: "한국어", path: "/", lang: "ko" },
  { locale: "zh-tw", label: "台灣 · 繁體中文", shortLabel: "繁體中文", path: "/zh-tw", lang: "zh-Hant" },
  { locale: "ja", label: "日本 · 日本語", shortLabel: "日本語", path: "/ja", lang: "ja" },
  { locale: "en", label: "International · English", shortLabel: "English", path: "/en", lang: "en" }
] as const;

export type SiteLocale = (typeof languageOptions)[number]["locale"];
export type InternationalLocale = Exclude<SiteLocale, "ko">;
export const internationalLocales: InternationalLocale[] = ["zh-tw", "ja", "en"];

export function isInternationalLocale(value: string): value is InternationalLocale {
  return internationalLocales.some((locale) => locale === value);
}

export function localeFromPath(pathname: string): SiteLocale {
  const segment = pathname.split("/")[1];
  return isInternationalLocale(segment) ? segment : "ko";
}

export const languageAlternates = {
  ko: `${siteConfig.url}/`,
  "zh-Hant-TW": `${siteConfig.url}/zh-tw`,
  ja: `${siteConfig.url}/ja`,
  en: `${siteConfig.url}/en`,
  "x-default": `${siteConfig.url}/`
};

export const internationalContacts = {
  whatsapp: "https://wa.me/821090907112",
  line: "https://line.me/ti/p/g4hynDPjMs",
  facebook: "https://www.facebook.com/profile.php?id=61576034524144",
  instagram: "https://www.instagram.com/aivisions77/",
  threads: "https://www.threads.com/@aivisions77"
};

export type InternationalCopy = {
  lang: string;
  ogLocale: string;
  brand: string;
  subtitle: string;
  metaTitle: string;
  description: string;
  language: string;
  theme: string;
  menu: string;
  closeMenu: string;
  nav: { tour: string; airport: string; booking: string; faq: string };
  hero: { badge: string; title: string; text: string; chips: string[] };
  messageOnly: string;
  messageLabel: string;
  whatsapp: string;
  line: string;
  tour: { title: string; text: string; courses: { title: string; stops: string; text: string }[]; note: string };
  airport: { title: string; text: string; pickup: string; pickupText: string; dropoff: string; dropoffText: string; checklist: string[]; note: string };
  booking: { title: string; text: string; name: string; service: string; options: string[]; date: string; time: string; from: string; to: string; passengers: string; luggage: string; flight: string; notes: string; send: string; copy: string; copied: string; copyFailed: string; preview: string; required: string; disclaimer: string };
  faq: { title: string; items: { question: string; answer: string }[] };
  social: string;
  footer: string;
  koreaPhone: string;
};

export const internationalCopy: Record<InternationalLocale, InternationalCopy> = {
  en: {
    lang: "en", ogLocale: "en_US", brand: "Busan Call Taxi", subtitle: "Busan tours · Gimhae Airport transfers",
    metaTitle: "Busan Taxi Tours & Gimhae Airport Transfers | Busan Call Taxi",
    description: "Plan a private Busan taxi tour or a Gimhae Airport pickup and drop-off. Send your itinerary by text on WhatsApp or LINE to check availability and receive a quote.",
    language: "Language", theme: "Change color theme", menu: "Open menu", closeMenu: "Close menu",
    nav: { tour: "Taxi tours", airport: "Airport transfers", booking: "Booking", faq: "FAQ" },
    hero: { badge: "Explore Busan, at your own pace", title: "Busan Call Taxi", text: "From your airport arrival to your last seaside stop. Plan a Busan taxi tour and Gimhae Airport pickup or drop-off around your trip.", chips: ["Private taxi tours", "Airport pickup & drop-off", "Hotel pickup"] },
    messageLabel: "Text messages only · WhatsApp / LINE",
    messageOnly: "Please contact us by text message only on WhatsApp or LINE. Written messages help us confirm your itinerary clearly across languages. Please do not call or send voice messages.",
    whatsapp: "WhatsApp chat", line: "LINE chat",
    tour: { title: "Your Busan, your itinerary", text: "Choose the places you want to see. Share your hotel location, available time and group size so we can discuss a suitable route.", courses: [
      { title: "Coastal Busan", stops: "Haeundae · Cheongsapo · Songjeong · Haedong Yonggungsa", text: "Combine beach stops, coastal views and the seaside temple. Allow time for walking and confirm attraction hours separately." },
      { title: "Old town & Yeongdo", stops: "Gamcheon Culture Village · Songdo · Huinnyeoul Culture Village", text: "Explore colorful streets and waterfront neighborhoods. Village paths can include hills and stairs; tell us about mobility needs." },
      { title: "Busan after sunset", stops: "Gwangalli · Marine City · your hotel", text: "Enjoy waterfront night views with a return transfer to your accommodation. The route depends on traffic and your preferred finishing time." }
    ], note: "These are sample routes, not fixed packages. Admission tickets, meals and attraction reservations should be checked separately. Vehicle availability and the fare are confirmed during consultation." },
    airport: { title: "Gimhae Airport, both ways", text: "Arrange your arrival transfer or the ride back to the airport from your Busan hotel. Early-morning and late-night trips require an availability check in advance.", pickup: "Airport → Busan", pickupText: "Send your flight number, arrival date, domestic or international terminal, group size and luggage details. Confirm the meeting point by text before arrival; pickup follows your agreed booking details.", dropoff: "Busan → Airport", dropoffText: "Share your hotel address, flight departure time and terminal. Discuss the pickup time with enough allowance for traffic, check-in and airport procedures.", checklist: ["Flight number & terminal", "Hotel name or exact address", "Passengers & luggage", "Arrival / departure date and time"], note: "A message is an inquiry, not a confirmed reservation. Waiting time, flight changes, vehicle capacity, fare and any extra charges must be agreed before the trip." },
    booking: { title: "Send us your travel plans", text: "Fill in your trip details and send a text inquiry. Use WhatsApp to open the prepared message, or copy it into LINE.", name: "Name", service: "Service", options: ["Busan taxi tour", "Gimhae Airport pickup", "Gimhae Airport drop-off"], date: "Travel date (Korea time)", time: "Pickup time (Korea time)", from: "Pickup address / hotel", to: "Destination / tour stops", passengers: "Passengers", luggage: "Luggage details", flight: "Flight number / terminal (if applicable)", notes: "Other requests / return trip", send: "Send via WhatsApp", copy: "Copy message for LINE", copied: "Message copied. Paste it into your LINE chat.", copyFailed: "Please select and copy the prepared message below.", preview: "Prepared message", required: "Please complete the required trip details.", disclaimer: "Please use text only. Your booking is confirmed only after we agree on availability, itinerary and price in the chat." },
    faq: { title: "Before your trip", items: [
      { question: "Can I call to make a reservation?", answer: "For international inquiries, please use written messages on WhatsApp or LINE only. Do not call or send voice messages; text makes dates, addresses and meeting points easier to confirm." },
      { question: "Can I start a tour at the airport or my hotel?", answer: "Airport and hotel pickup can be discussed with a taxi tour. Send your arrival details and desired stops so availability, luggage capacity and the route can be checked." },
      { question: "How much does a transfer or taxi tour cost?", answer: "The quote depends on the route, date, vehicle, tour duration, stops and waiting time. Request a quote by text and confirm what is included before booking." },
      { question: "Is a foreign-language guide included?", answer: "Language selection is for the website and written inquiries. It does not guarantee a driver or tour guide who speaks your language. Please confirm any guiding or language assistance needs before booking." },
      { question: "What if my flight changes?", answer: "Send updated flight details by text as soon as possible. Changes, waiting arrangements and any additional charges need to be confirmed with the operator." }
    ] },
    social: "Find us online", footer: "Busan sightseeing and Gimhae Airport transfers. Advance booking recommended.", koreaPhone: "Korean domestic contact: 0507-1333-7114 · International inquiries: text only"
  },
  "zh-tw": {
    lang: "zh-Hant", ogLocale: "zh_TW", brand: "釜山專業包車計程車", subtitle: "釜山觀光包車 · 金海機場接送",
    metaTitle: "釜山觀光包車・金海機場接送 | 釜山專業包車計程車",
    description: "安排釜山觀光計程車、金海機場接機與送機。透過 WhatsApp 或 LINE 文字訊息提供行程，確認可預約時間及報價。",
    language: "語言", theme: "切換顯示模式", menu: "開啟選單", closeMenu: "關閉選單",
    nav: { tour: "觀光包車", airport: "機場接送", booking: "預約諮詢", faq: "常見問題" },
    hero: { badge: "用自己的步調，探索釜山", title: "釜山專業包車計程車", text: "從金海機場抵達，到海邊的最後一站。依照您的旅遊計畫，安排釜山觀光計程車、機場接機與送機。", chips: ["釜山觀光包車", "金海機場接送", "飯店接送"] },
    messageLabel: "僅接受文字諮詢 · WhatsApp / LINE",
    messageOnly: "為了跨語言溝通與正確確認行程，請僅透過 WhatsApp 或 LINE 傳送文字訊息諮詢。請勿撥打電話或傳送語音訊息。",
    whatsapp: "WhatsApp 文字諮詢", line: "LINE 文字諮詢",
    tour: { title: "依照您的喜好，規劃釜山行程", text: "告訴我們想去的景點、住宿位置、可用時間與乘車人數，一起討論合適的觀光路線。", courses: [
      { title: "海岸風景路線", stops: "海雲台 · 青沙浦 · 松亭 · 海東龍宮寺", text: "串連海灘、海岸風景與海邊寺廟。請預留步行時間，景點開放時間與門票另行確認。" },
      { title: "舊城區與影島", stops: "甘川文化村 · 松島 · 白淺灘文化村", text: "走訪彩色街道與海岸聚落。文化村部分路段有坡道與階梯，行動需求請事先告知。" },
      { title: "釜山夜景路線", stops: "廣安里 · Marine City · 住宿飯店", text: "欣賞海岸夜景後返回住宿地點。實際路線依交通狀況與您希望結束的時間調整。" }
    ], note: "以上為路線範例，並非固定套裝行程。景點門票、餐飲與設施預約需另外確認；車輛、費用與可預約時段以諮詢結果為準。" },
    airport: { title: "金海機場接機與送機", text: "從機場前往釜山住宿，或從飯店返回機場。清晨與深夜接送請提前詢問可預約時段。", pickup: "機場 → 釜山", pickupText: "請提供航班編號、抵達日期、國內線或國際線航廈、人數與行李資訊。抵達前以文字確認會合地點，依雙方確認的預約內容接送。", dropoff: "釜山 → 機場", dropoffText: "請提供飯店地址、航班起飛時間與航廈。接送時間需預留交通、報到與機場手續所需時間。", checklist: ["航班編號與航廈", "飯店名稱或詳細地址", "人數與行李資訊", "抵達／起飛日期及時間"], note: "傳送訊息屬於諮詢，並不代表預約完成。等候時間、航班異動、車輛容量、費用及可能的額外費用，需在出發前確認。" },
    booking: { title: "傳送您的旅遊計畫", text: "填寫行程後，可透過 WhatsApp 開啟預填訊息，或複製內容到 LINE 文字諮詢。", name: "姓名", service: "服務項目", options: ["釜山觀光包車", "金海機場接機", "金海機場送機"], date: "乘車日期（韓國時間）", time: "接送時間（韓國時間）", from: "上車地址／飯店", to: "目的地／想去的景點", passengers: "乘車人數", luggage: "行李資訊", flight: "航班編號／航廈（如適用）", notes: "其他需求／回程安排", send: "透過 WhatsApp 傳送", copy: "複製訊息到 LINE", copied: "訊息已複製，請貼到 LINE 對話。", copyFailed: "請選取並複製下方的預填訊息。", preview: "預填訊息", required: "請填寫必要的行程資訊。", disclaimer: "請僅使用文字訊息。雙方確認可預約時段、行程與報價後，預約才算完成。" },
    faq: { title: "出發前常見問題", items: [
      { question: "可以打電話預約嗎？", answer: "海外旅客請僅透過 WhatsApp 或 LINE 傳送文字訊息，請勿來電或傳送語音。以文字確認日期、地址與會合地點，可減少跨語言溝通誤會。" },
      { question: "可以從機場或飯店開始觀光嗎？", answer: "可以一起諮詢機場或飯店接送與觀光行程。請提供抵達資訊與想去的景點，以便確認車輛、行李空間與路線。" },
      { question: "機場接送或包車費用是多少？", answer: "費用依路線、日期、車輛、觀光時間、停靠點與等候時間而定。請以文字索取報價，並在預約前確認包含的項目。" },
      { question: "包含中文導遊或中文司機嗎？", answer: "語言選擇適用於網站及文字諮詢，不代表一定提供中文司機或導遊。若需要導覽或語言協助，請在預約前確認。" },
      { question: "航班異動怎麼辦？", answer: "請盡早以文字提供更新後的航班資訊。時間調整、等候安排與可能的追加費用需與業者重新確認。" }
    ] },
    social: "追蹤我們", footer: "釜山觀光計程車與金海機場接送，建議提前預約。", koreaPhone: "韓國國內聯絡電話：0507-1333-7114 · 海外旅客請以文字諮詢"
  },
  ja: {
    lang: "ja", ogLocale: "ja_JP", brand: "釜山コールタクシー", subtitle: "釜山観光 · 金海空港送迎",
    metaTitle: "釜山観光タクシー・金海空港送迎 | 釜山コールタクシー",
    description: "釜山観光タクシーと金海空港のお迎え・お送りをご相談ください。WhatsAppまたはLINEのテキストで日程を送り、予約可否と料金を確認できます。",
    language: "言語", theme: "表示モードを切り替え", menu: "メニューを開く", closeMenu: "メニューを閉じる",
    nav: { tour: "観光タクシー", airport: "空港送迎", booking: "予約相談", faq: "よくある質問" },
    hero: { badge: "自分のペースで、釜山を旅する", title: "釜山コールタクシー", text: "空港到着から、海辺の最後の立ち寄り先まで。旅の予定に合わせて、釜山観光タクシーと金海空港のお迎え・お送りをご相談ください。", chips: ["釜山観光タクシー", "金海空港送迎", "ホテル送迎"] },
    messageLabel: "テキストのみ · WhatsApp / LINE",
    messageOnly: "言語の違いによる行き違いを減らし、日程を正確に確認するため、WhatsAppまたはLINEのテキストメッセージでご連絡ください。通話・音声メッセージはご遠慮ください。",
    whatsapp: "WhatsAppで相談", line: "LINEで相談",
    tour: { title: "行きたい場所から、旅を組み立てる", text: "ご希望の観光地、ホテルの場所、利用時間、人数をお知らせください。移動の順番と予約可否をご相談いただけます。", courses: [
      { title: "海岸をめぐるコース", stops: "海雲台 · 青沙浦 · 松亭 · 海東龍宮寺", text: "ビーチ、海岸の景色、海辺のお寺をめぐる例です。歩く時間を確保し、営業時間や入場券は別途ご確認ください。" },
      { title: "旧市街と影島", stops: "甘川文化村 · 松島 · ヒンヨウル文化村", text: "色鮮やかな路地と海辺の町を訪れます。坂や階段のある場所もあるため、移動に配慮が必要な場合は事前にお伝えください。" },
      { title: "釜山の夜景", stops: "広安里 · マリンシティ · ご宿泊ホテル", text: "海辺の夜景を楽しみ、ホテルへ戻るコース例です。交通状況や終了希望時刻に合わせてルートをご相談ください。" }
    ], note: "コースは参考例で、固定のパッケージではありません。入場券、食事、施設の予約は別途ご確認ください。車両、料金、利用可能時間は相談時に確認します。" },
    airport: { title: "金海空港のお迎え・お送り", text: "空港から釜山のホテルへ、またはホテルから空港へ。早朝・深夜の送迎は事前に予約可否をご確認ください。", pickup: "空港 → 釜山", pickupText: "便名、到着日、国内線・国際線ターミナル、人数、荷物の情報をお送りください。到着前にテキストで集合場所を確認し、合意した予約内容に沿って送迎します。", dropoff: "釜山 → 空港", dropoffText: "ホテルの住所、出発便の時刻、ターミナルをお知らせください。交通、チェックイン、空港での手続きに余裕を持てる出発時間をご相談ください。", checklist: ["便名とターミナル", "ホテル名・詳しい住所", "人数と荷物", "到着・出発の日時"], note: "メッセージを送っただけでは予約は確定しません。待機時間、便の変更、車両の定員、料金や追加費用は利用前に確認が必要です。" },
    booking: { title: "旅の予定をお送りください", text: "必要事項を入力し、WhatsAppで作成済みメッセージを開くか、LINEにコピーしてご相談ください。", name: "お名前", service: "サービス", options: ["釜山観光タクシー", "金海空港のお迎え", "金海空港へのお送り"], date: "利用日（韓国時間）", time: "お迎え時刻（韓国時間）", from: "乗車場所・ホテル", to: "目的地・観光地", passengers: "人数", luggage: "荷物の情報", flight: "便名・ターミナル（該当する場合）", notes: "その他のご希望・帰りの予定", send: "WhatsAppで送る", copy: "LINE用メッセージをコピー", copied: "コピーしました。LINEのトークに貼り付けてください。", copyFailed: "下のメッセージを選択してコピーしてください。", preview: "作成済みメッセージ", required: "必須の旅行情報を入力してください。", disclaimer: "テキストのみでご連絡ください。予約可否、行程、料金をチャットで合意した後に予約が確定します。" },
    faq: { title: "ご利用前のよくある質問", items: [
      { question: "電話で予約できますか？", answer: "海外からのご相談はWhatsAppまたはLINEのテキストのみでお願いします。通話や音声メッセージはご遠慮ください。日時、住所、集合場所を文章で確認するためです。" },
      { question: "空港やホテルから観光を始められますか？", answer: "空港・ホテル送迎と観光をまとめてご相談いただけます。到着情報と希望の観光地を送り、車両、荷物のスペース、移動ルートをご確認ください。" },
      { question: "空港送迎や観光タクシーの料金は？", answer: "ルート、日付、車両、観光時間、立ち寄り先、待機時間により異なります。テキストで見積もりを依頼し、料金に含まれる内容を予約前にご確認ください。" },
      { question: "日本語ガイドは含まれますか？", answer: "言語選択はサイトと文章での相談に対応するもので、日本語を話す運転手やガイドを保証するものではありません。案内や言語サポートが必要な場合は予約前にご相談ください。" },
      { question: "飛行機の予定が変更になったら？", answer: "変更後の便名や時刻を、できるだけ早くテキストでお知らせください。時間変更、待機、追加料金については改めて確認が必要です。" }
    ] },
    social: "SNS", footer: "釜山観光と金海空港送迎。事前予約をおすすめします。", koreaPhone: "韓国国内のお問い合わせ：0507-1333-7114 · 海外からはテキストのみ"
  }
};
